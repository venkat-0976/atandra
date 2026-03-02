"""
Pydantic models for email-related data
"""

from pydantic import BaseModel, EmailStr, Field, validator
from typing import List, Optional, Dict, Any
from datetime import datetime
import re

class ContactFormData(BaseModel):
    """Model for contact form data"""
    
    # Required fields
    name: str = Field(..., min_length=2, max_length=100, description="Customer's full name")
    email: EmailStr = Field(..., description="Customer's email address")
    company: str = Field(..., min_length=2, max_length=200, description="Company name")
    designation: str = Field(..., min_length=2, max_length=100, description="Job title/designation")
    city: str = Field(..., min_length=2, max_length=100, description="City name")
    mobile: str = Field(..., min_length=10, max_length=20, description="Phone number")
    pincode: str = Field(..., min_length=4, max_length=10, description="Postal code")
    products: str = Field(..., description="Product interest category")
    
    # Optional fields
    remarks: Optional[str] = Field(None, max_length=1000, description="Additional remarks")
    services: List[str] = Field(default=[], description="Requested services")
    submitted_at: Optional[str] = Field(None, description="Form submission timestamp")
    
    @validator('name')
    def validate_name(cls, v):
        """Validate name field"""
        if not v.strip():
            raise ValueError('Name cannot be empty')
        # Remove extra spaces and capitalize properly
        return ' '.join(word.capitalize() for word in v.strip().split())
    
    @validator('mobile')
    def validate_mobile(cls, v):
        """Validate mobile number"""
        # Remove all non-digit characters except +
        cleaned = re.sub(r'[^\d+]', '', v)
        
        # Check if it's a valid phone number format
        if not re.match(r'^[\+]?[0-9]{10,15}$', cleaned):
            raise ValueError('Invalid phone number format')
        
        return cleaned
    
    @validator('pincode')
    def validate_pincode(cls, v):
        """Validate pincode"""
        # Remove non-digit characters
        cleaned = re.sub(r'[^\d]', '', v)
        
        if len(cleaned) < 4:
            raise ValueError('Pincode must be at least 4 digits')
        
        return cleaned
    
    @validator('products')
    def validate_products(cls, v):
        """Validate product selection"""
        valid_products = ['measure', 'protect', 'conserve', 'consultation']
        if v not in valid_products:
            raise ValueError(f'Invalid product selection. Must be one of: {valid_products}')
        return v
    
    @validator('services')
    def validate_services(cls, v):
        """Validate services list"""
        valid_services = ['request-demo', 'request-callback', 'send-details', 'send-updates']
        invalid_services = [service for service in v if service not in valid_services]
        
        if invalid_services:
            raise ValueError(f'Invalid services: {invalid_services}. Valid options: {valid_services}')
        
        return v
    
    @validator('email')
    def validate_email_domain(cls, v):
        """Additional email validation"""
        # Check for common typos in email domains
        email_str = str(v).lower()
        
        # List of suspicious domains (you can expand this)
        suspicious_domains = ['test.com', 'example.com', 'temp.com']
        domain = email_str.split('@')[1] if '@' in email_str else ''
        
        if domain in suspicious_domains:
            raise ValueError('Please provide a valid business email address')
        
        return v
    
    def get_product_display_name(self) -> str:
        """Get display name for selected product"""
        product_names = {
            'measure': 'Measurement Solutions',
            'protect': 'Protection Systems',
            'conserve': 'Conservation Technologies',
            'consultation': 'Energy Consultation'
        }
        return product_names.get(self.products, self.products)
    
    def get_services_display_names(self) -> List[str]:
        """Get display names for selected services"""
        service_names = {
            'request-demo': 'Request Demo',
            'request-callback': 'Request Call Back',
            'send-details': 'Send Product Details',
            'send-updates': 'Stay Updated'
        }
        return [service_names.get(service, service) for service in self.services]
    
    def to_template_context(self) -> Dict[str, Any]:
        """Convert to template context for email rendering"""
        return {
            'name': self.name,
            'email': self.email,
            'company': self.company,
            'designation': self.designation,
            'city': self.city,
            'mobile': self.mobile,
            'pincode': self.pincode,
            'products': self.get_product_display_name(),
            'products_raw': self.products,
            'remarks': self.remarks or 'No additional remarks provided',
            'services': self.get_services_display_names(),
            'services_raw': self.services,
            'submitted_at': self.submitted_at or datetime.now().isoformat(),
            'has_services': len(self.services) > 0,
            'has_remarks': bool(self.remarks and self.remarks.strip())
        }

class EmailResponse(BaseModel):
    """Response model for email operations"""
    
    success: bool = Field(..., description="Whether the operation was successful")
    message: str = Field(..., description="Response message")
    details: Optional[Dict[str, Any]] = Field(None, description="Additional details")
    emails_sent: Optional[Dict[str, bool]] = Field(None, description="Status of individual email sends")
    timestamp: Optional[str] = Field(None, description="Response timestamp")
    
    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "message": "Emails sent successfully",
                "details": {
                    "customer_email": "john@example.com",
                    "company_email": "info@atandraenergy.com"
                },
                "emails_sent": {
                    "customer": True,
                    "company": True
                },
                "timestamp": "2025-07-29T10:30:00+05:30"
            }
        }

class EmailError(BaseModel):
    """Error model for email operations"""
    
    success: bool = False
    message: str = Field(..., description="Error message")
    error_type: str = Field(..., description="Type of error")
    details: Optional[Dict[str, Any]] = Field(None, description="Error details")
    timestamp: Optional[str] = Field(None, description="Error timestamp")
    
    class Config:
        schema_extra = {
            "example": {
                "success": False,
                "message": "Failed to send email",
                "error_type": "smtp_error",
                "details": {
                    "smtp_error": "Connection timeout",
                    "recipient": "customer@example.com"
                },
                "timestamp": "2025-07-29T10:30:00+05:30"
            }
        }