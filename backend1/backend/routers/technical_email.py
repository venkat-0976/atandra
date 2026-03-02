"""
Technical support email router for handling technical support/complaint form endpoints
"""

from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
import logging
from typing import Dict, Any
import time
from collections import defaultdict, deque

from models.technical_email import TechnicalSupportFormData, TechnicalSupportResponse, TechnicalSupportError
from services.technical_email_service import technical_email_service
from config.technical_settings import get_settings

logger = logging.getLogger(__name__)

# Rate limiting storage (in production, use Redis or similar)
technical_rate_limit_storage = defaultdict(deque)

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
    client_requests = technical_rate_limit_storage[client_ip]
    
    # Remove old requests outside the time window
    while client_requests and client_requests[0] < current_time - settings.rate_limit_window:
        client_requests.popleft()
    
    # Check if limit exceeded
    if len(client_requests) >= settings.rate_limit_requests:
        return False
    
    # Add current request
    client_requests.append(current_time)
    return True

def get_estimated_response_time(priority_level: str) -> str:
    """Get estimated response time based on priority level"""
    response_times = {
        'high': '2-4 hours',
        'medium': '4-8 hours',
        'low': '8-24 hours'
    }
    return response_times.get(priority_level, '4-8 hours')

@router.post("/send-technical-support-emails", response_model=TechnicalSupportResponse)
async def send_technical_support_emails(
    support_data: TechnicalSupportFormData,
    request: Request,
    settings = Depends(get_settings)
):
    """
    Send technical support emails to customer, support team, and service center
    
    This endpoint:
    1. Validates the technical support form data
    2. Generates a unique ticket ID
    3. Sends acknowledgment email to the customer
    4. Sends new ticket notification to the support team
    5. Sends service request to the appropriate service center
    6. Returns the status of all email operations
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
    
    logger.info(f"Received technical support request from {support_data.contact_person} "
                f"({support_data.email}) for product {support_data.serial_number}")
    
    try:
        # Generate template context and get priority level
        template_context = support_data.to_template_context()
        priority_level = support_data.get_priority_level()
        ticket_id = template_context['ticket_id']
        
        # Send emails using the technical email service
        result = await technical_email_service.send_technical_support_emails(support_data)
        
        # Enhance the result with additional information
        if result.success:
            result.ticket_id = ticket_id
            result.priority_level = priority_level
            result.estimated_response_time = get_estimated_response_time(priority_level)
            result.timestamp = settings.get_current_timestamp()
            
            logger.info(f"Successfully processed technical support request for {support_data.contact_person} "
                       f"(Ticket: {ticket_id}, Priority: {priority_level})")
        else:
            logger.warning(f"Technical support email processing failed for {support_data.contact_person}: {result.message}")
        
        return result
        
    except ValueError as ve:
        logger.warning(f"Validation error for technical support request: {ve}")
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "message": f"Validation error: {str(ve)}",
                "error_type": "validation_error"
            }
        )
    except Exception as e:
        logger.error(f"Unexpected error processing technical support request: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "message": "Internal server error while processing technical support request",
                "error_type": "server_error"
            }
        )

@router.get("/technical-support/health")
async def technical_support_health_check():
    """
    Health check endpoint for technical support email service
    
    Returns the status of the technical email service and SMTP connection
    """
    try:
        # Test SMTP connection
        smtp_test = await technical_email_service.test_smtp_connection()
        
        # Check service center email configurations
        service_centers_status = await technical_email_service.check_service_centers_config()
        
        overall_status = "healthy" if smtp_test["success"] and service_centers_status["success"] else "degraded"
        
        return {
            "status": overall_status,
            "service": "technical_support_email_service",
            "smtp_connection": smtp_test,
            "service_centers": service_centers_status,
            "timestamp": get_settings().get_current_timestamp()
        }
        
    except Exception as e:
        logger.error(f"Technical support health check failed: {e}")
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy",
                "service": "technical_support_email_service",
                "error": str(e),
                "timestamp": get_settings().get_current_timestamp()
            }
        )

@router.get("/technical-support/service-centers")
async def get_service_centers():
    """
    Get list of available service centers and their contact information
    
    Useful for frontend dropdown population and service center validation
    """
    try:
        service_centers = await technical_email_service.get_service_centers_list()
        
        return {
            "success": True,
            "service_centers": service_centers,
            "total_centers": len(service_centers),
            "timestamp": get_settings().get_current_timestamp()
        }
        
    except Exception as e:
        logger.error(f"Error fetching service centers: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Error fetching service centers",
                "error": str(e),
                "timestamp": get_settings().get_current_timestamp()
            }
        )

@router.get("/technical-support/ticket-status/{ticket_id}")
async def get_ticket_status(ticket_id: str):
    """
    Get status of a technical support ticket
    
    This endpoint allows checking the current status of a support ticket
    """
    try:
        # Validate ticket ID format
        if not ticket_id.startswith('TS') or len(ticket_id) != 14:
            raise HTTPException(
                status_code=400,
                detail={
                    "success": False,
                    "message": "Invalid ticket ID format",
                    "error_type": "invalid_ticket_id"
                }
            )
        
        # Get ticket status from service
        ticket_status = await technical_email_service.get_ticket_status(ticket_id)
        
        return ticket_status
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching ticket status for {ticket_id}: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Error fetching ticket status",
                "error": str(e),
                "timestamp": get_settings().get_current_timestamp()
            }
        )

@router.get("/technical-support/test-connection")
async def test_technical_smtp_connection():
    """
    Test SMTP connection endpoint for technical support emails
    
    This endpoint is useful for debugging SMTP connectivity issues specific to technical support
    """
    try:
        result = await technical_email_service.test_smtp_connection()
        
        if result["success"]:
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Technical support SMTP connection test successful",
                    "details": result,
                    "timestamp": get_settings().get_current_timestamp()
                }
            )
        else:
            return JSONResponse(
                status_code=503,
                content={
                    "success": False,
                    "message": "Technical support SMTP connection test failed",
                    "details": result,
                    "timestamp": get_settings().get_current_timestamp()
                }
            )
            
    except Exception as e:
        logger.error(f"Technical support SMTP connection test error: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Error testing technical support SMTP connection",
                "error": str(e),
                "timestamp": get_settings().get_current_timestamp()
            }
        )

@router.get("/technical-support/rate-limit-status")
async def get_technical_rate_limit_status(request: Request, settings = Depends(get_settings)):
    """
    Get current rate limit status for technical support requests
    
    Useful for debugging rate limiting issues
    """
    client_ip = get_client_ip(request)
    current_time = time.time()
    client_requests = technical_rate_limit_storage[client_ip]
    
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
        "service": "technical_support",
        "timestamp": settings.get_current_timestamp()
    }

@router.get("/technical-support/priority-levels")
async def get_priority_levels():
    """
    Get available priority levels and their descriptions
    
    Useful for understanding how priority levels are determined
    """
    priority_levels = {
        "high": {
            "description": "Urgent issues requiring immediate attention",
            "keywords": ["urgent", "emergency", "high-priority", "equipment-down", "down"],
            "estimated_response": "2-4 hours",
            "examples": ["Equipment failure", "Production halt", "Safety concerns"]
        },
        "medium": {
            "description": "Standard issues requiring normal attention",
            "keywords": [],
            "estimated_response": "4-8 hours",
            "examples": ["Performance issues", "Configuration problems", "Software bugs"]
        },
        "low": {
            "description": "Non-urgent issues that can be scheduled",
            "keywords": ["low-priority", "routine", "scheduled"],
            "estimated_response": "8-24 hours",
            "examples": ["Feature requests", "Documentation updates", "Routine maintenance"]
        }
    }
    
    return {
        "success": True,
        "priority_levels": priority_levels,
        "default_priority": "medium",
        "timestamp": get_settings().get_current_timestamp()
    }

@router.post("/technical-support/resend-emails/{ticket_id}")
async def resend_technical_support_emails(
    ticket_id: str,
    request: Request,
    settings = Depends(get_settings)
):
    """
    Resend technical support emails for a specific ticket
    
    This endpoint allows resending emails in case of delivery issues
    """
    client_ip = get_client_ip(request)
    
    # Rate limiting (stricter for resend operations)
    if not check_rate_limit(client_ip, settings):
        logger.warning(f"Rate limit exceeded for resend operation from IP: {client_ip}")
        raise HTTPException(
            status_code=429,
            detail={
                "success": False,
                "message": "Too many resend requests. Please try again later.",
                "error_type": "rate_limit_exceeded"
            }
        )
    
    try:
        # Validate ticket ID format
        if not ticket_id.startswith('TS') or len(ticket_id) != 14:
            raise HTTPException(
                status_code=400,
                detail={
                    "success": False,
                    "message": "Invalid ticket ID format",
                    "error_type": "invalid_ticket_id"
                }
            )
        
        # Resend emails using the technical email service
        result = await technical_email_service.resend_support_emails(ticket_id)
        
        if result.success:
            logger.info(f"Successfully resent emails for ticket {ticket_id}")
        else:
            logger.warning(f"Failed to resend emails for ticket {ticket_id}: {result.message}")
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error resending emails for ticket {ticket_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "message": "Internal server error while resending emails",
                "error_type": "server_error"
            }
        )