"""
Email router for handling email-related endpoints
"""

from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
import logging
from typing import Dict, Any
import time
from collections import defaultdict, deque

from models.email import ContactFormData, EmailResponse
from services.email_service import email_service
from config.settings import get_settings

logger = logging.getLogger(__name__)

# Rate limiting storage (in production, use Redis or similar)
rate_limit_storage = defaultdict(deque)

router = APIRouter()

def get_client_ip(request: Request) -> str:
    """Get client IP address from request"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host

def check_rate_limit(client_ip: str, settings) -> bool:
    """Check if client has exceeded rate limit"""
    current_time = time.time()
    client_requests = rate_limit_storage[client_ip]
    
    # Remove old requests outside the time window
    while client_requests and client_requests[0] < current_time - settings.rate_limit_window:
        client_requests.popleft()
    
    # Check if limit exceeded
    if len(client_requests) >= settings.rate_limit_requests:
        return False
    
    # Add current request
    client_requests.append(current_time)
    return True

@router.post("/send-contact-emails", response_model=EmailResponse)
async def send_contact_emails(
    contact_data: ContactFormData,
    request: Request,
    settings = Depends(get_settings)
):
    """
    Send contact form emails to both customer and company
    
    This endpoint:
    1. Validates the contact form data
    2. Sends a thank you email to the customer
    3. Sends a new inquiry notification to the company
    4. Returns the status of both email operations
    """
    
    client_ip = get_client_ip(request)
    
    # Rate limiting
    if not check_rate_limit(client_ip, settings):
        logger.warning(f"Rate limit exceeded for IP: {client_ip}")
        raise HTTPException(
            status_code=429,
            detail={
                "success": False,
                "message": "Too many requests. Please try again later.",
                "error_type": "rate_limit_exceeded"
            }
        )
    
    logger.info(f"Received contact form submission from {contact_data.name} ({contact_data.email})")
    
    try:
        # Send emails using the email service
        result = await email_service.send_contact_form_emails(contact_data)
        
        # Log the result
        if result.success:
            logger.info(f"Successfully processed email request for {contact_data.name}")
        else:
            logger.warning(f"Email processing failed for {contact_data.name}: {result.message}")
        
        return result
        
    except Exception as e:
        logger.error(f"Unexpected error processing email request: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "message": "Internal server error while processing email request",
                "error_type": "server_error"
            }
        )

@router.get("/health")
async def email_health_check():
    """
    Health check endpoint for email service
    
    Returns the status of the email service and SMTP connection
    """
    try:
        # Test SMTP connection
        smtp_test = await email_service.test_smtp_connection()
        
        return {
            "status": "healthy" if smtp_test["success"] else "degraded",
            "service": "email_service",
            "smtp_connection": smtp_test,
            "timestamp": get_settings().get_current_timestamp()
        }
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "service": "email_service",
                "error": str(e),
                "timestamp": get_settings().get_current_timestamp()
            }
        )

@router.get("/test-connection")
async def test_smtp_connection():
    """
    Test SMTP connection endpoint
    
    This endpoint is useful for debugging SMTP connectivity issues
    """
    try:
        result = await email_service.test_smtp_connection()
        
        if result["success"]:
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "SMTP connection test successful",
                    "details": result,
                    "timestamp": get_settings().get_current_timestamp()
                }
            )
        else:
            return JSONResponse(
                status_code=503,
                content={
                    "success": False,
                    "message": "SMTP connection test failed",
                    "details": result,
                    "timestamp": get_settings().get_current_timestamp()
                }
            )
            
    except Exception as e:
        logger.error(f"SMTP connection test error: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Error testing SMTP connection",
                "error": str(e),
                "timestamp": get_settings().get_current_timestamp()
            }
        )

@router.get("/rate-limit-status")
async def get_rate_limit_status(request: Request, settings = Depends(get_settings)):
    """
    Get current rate limit status for the client
    
    Useful for debugging rate limiting issues
    """
    client_ip = get_client_ip(request)
    current_time = time.time()
    client_requests = rate_limit_storage[client_ip]
    
    # Count valid requests within the time window
    valid_requests = sum(1 for req_time in client_requests 
                        if req_time > current_time - settings.rate_limit_window)
    
    remaining_requests = max(0, settings.rate_limit_requests - valid_requests)
    
    return {
        "client_ip": client_ip,
        "requests_made": valid_requests,
        "requests_remaining": remaining_requests,
        "rate_limit": settings.rate_limit_requests,
        "time_window": settings.rate_limit_window,
        "timestamp": settings.get_current_timestamp()
    }