"""
FastAPI Email Service for Contact Form
Main application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging
from typing import Dict, Any

from config.settings import get_settings
from routers import email
from routers import technical_email

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Get settings
settings = get_settings()

# Create FastAPI app
app = FastAPI(
    title="Atandra Energy Email Service",
    description="Email service for handling contact form submissions",
    version="1.0.0",
    docs_url="/docs" if settings.environment == "development" else None,
    redoc_url="/redoc" if settings.environment == "development" else None,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(email.router, prefix="/api/email", tags=["email"])
app.include_router(technical_email.router, prefix="/api/service", tags=["technical_email"])

# Exception handlers
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    """Handle HTTP exceptions"""
    logger.error(f"HTTP error occurred: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail,
            "error_type": "http_error"
        }
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    """Handle validation errors"""
    logger.error(f"Validation error occurred: {exc.errors()}")
    # Sanitize error details to ensure JSON serializability
    def sanitize_error(error):
        error = dict(error)
        if "ctx" in error and error["ctx"]:
            for k, v in error["ctx"].items():
                if isinstance(v, Exception):
                    error["ctx"][k] = str(v)
        return error

    sanitized_errors = [sanitize_error(e) for e in exc.errors()]
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "message": "Validation error",
            "details": sanitized_errors,
            "error_type": "validation_error"
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Handle general exceptions"""
    logger.error(f"Unexpected error occurred: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal server error",
            "error_type": "server_error"
        }
    )

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with service information"""
    return {
        "service": "Atandra Energy Email Service",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs" if settings.environment == "development" else "disabled in production"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "email_service",
        "timestamp": settings.get_current_timestamp()
    }

# Startup event
@app.on_event("startup")
async def startup_event():
    """Application startup event"""
    logger.info("Starting Atandra Energy Email Service...")
    logger.info(f"Environment: {settings.environment}")
    logger.info(f"CORS Origins: {settings.cors_origins_list}")
    logger.info("Email service is ready to handle requests")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Application shutdown event"""
    logger.info("Shutting down Atandra Energy Email Service...")

if __name__ == "__main__":
    import uvicorn
    
    # Run the application
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.environment == "development",
        log_level="info"
    )