"""
Pydantic models for technical support/complaint form data
"""

from pydantic import BaseModel, EmailStr, Field, validator
from typing import List, Optional, Dict, Any
from datetime import datetime
import re

class TechnicalSupportFormData(BaseModel):
    """Model for technical support/complaint form data"""
    
    # Product Details
    serial_number: Optional[str] = Field(None, min_length=3, max_length=50, description="Product serial number")
    product_category: str = Field(..., description="Product category selection")
    rating: Optional[int] = Field(None, ge=1, le=5, description="Product rating (1-5)")
    model: str = Field(..., min_length=2, max_length=100, description="Product model")
    brand: str = Field(..., description="Product brand selection")
    
    # Customer Details
    company: str = Field(..., min_length=2, max_length=200, description="Company name")
    company_address: str = Field(..., min_length=1, max_length=500, description="Complete company address")
    contact_person: str = Field(..., min_length=0, max_length=100, description="Primary contact person name")
    alternative_contact: Optional[str] = Field(None, min_length=0, max_length=100, description="Alternative contact person")
    mobile_number: str = Field(..., min_length=10, max_length=15, description="Mobile number")
    email: EmailStr = Field(..., description="Email address")
    
    # General Information
    service_center: str = Field(..., description="Preferred service center")
    call_type: str = Field(..., description="Type of call/service request")
    call_category: str = Field(..., description="Category of the call")
    call_condition: str = Field(..., description="Current condition/status of the equipment")
    preferred_time: Optional[str] = Field(None, description="Preferred service time")
    
    # Problem Details
    problem_description: str = Field(..., min_length=0, max_length=2000, description="Detailed problem description")
    
    # Optional fields
    submitted_at: Optional[str] = Field(None, description="Form submission timestamp")
    
    @validator('serial_number')
    def validate_serial_number(cls, v):
        """Validate serial number format"""
        if v is None:
            return v
            
        if not v.strip():
            raise ValueError('Serial number cannot be empty')
        
        # Remove extra spaces and convert to uppercase
        cleaned = v.strip().upper()
        
        # Check for basic alphanumeric format
        if not re.match(r'^[A-Z0-9\-_]+$', cleaned):
            raise ValueError('Serial number should contain only letters, numbers, hyphens, and underscores')
        
        return cleaned
    
    @validator('product_category')
    def validate_product_category(cls, v):
        """Validate product category"""
        valid_categories = [
            'energy-meters',
            'protection-relays', 
            'monitoring-systems'
        ]
        if v not in valid_categories:
            raise ValueError(f'Product category must be one of: {", ".join(valid_categories)}')
        return v
    
    @validator('rating')
    def validate_rating(cls, v):
        """Validate rating value"""
        if v is not None and (v < 1 or v > 5):
            raise ValueError('Rating must be between 1 and 5')
        return v
    
    @validator('brand')
    def validate_brand(cls, v):
        """Validate brand selection"""
        valid_brands = ['krykard', 'other']
        if v not in valid_brands:
            raise ValueError(f'Brand must be one of: {", ".join(valid_brands)}')
        return v
    
    @validator('contact_person', 'alternative_contact')
    def validate_person_name(cls, v):
        """Validate person name fields"""
        if v is not None and not v.strip():
            raise ValueError('Name cannot be empty if provided')
        
        if v:
            # Remove extra spaces and capitalize properly
            return ' '.join(word.capitalize() for word in v.strip().split())
        return v
    
    @validator('mobile_number')
    def validate_mobile(cls, v):
        """Validate mobile number"""
        # Remove all non-digit characters except +
        cleaned = re.sub(r'[^\d+]', '', v)
        
        # Check if it's a valid phone number format
        if not re.match(r'^[\+]?[0-9]{10,15}$', cleaned):
            raise ValueError('Invalid phone number format')
        
        return cleaned
    
    @validator('service_center')
    def validate_service_center(cls, v):
        """Validate service center selection"""
        valid_centers = ['chennai', 'mumbai', 'delhi', 'bangalore']
        if v not in valid_centers:
            raise ValueError(f'Service center must be one of: {", ".join(valid_centers)}')
        return v
    
    @validator('call_type')
    def validate_call_type(cls, v):
        """Validate call type"""
        valid_types = ['installation', 'repair', 'maintenance', 'inquiry']
        if v not in valid_types:
            raise ValueError(f'Call type must be one of: {", ".join(valid_types)}')
        return v
    
    @validator('call_category')
    def validate_call_category(cls, v):
        """Validate call category"""
        valid_categories = ['urgent', 'normal', 'scheduled']
        if v not in valid_categories:
            raise ValueError(f'Call category must be one of: {", ".join(valid_categories)}')
        return v
    
    @validator('call_condition')
    def validate_call_condition(cls, v):
        """Validate call condition"""
        valid_conditions = [
            'working',           # Working with issues
            'not-working',       # Not working
            'intermittent',      # Intermittent problems  
            'new-install'        # New installation
        ]
        if v not in valid_conditions:
            raise ValueError(f'Call condition must be one of: {", ".join(valid_conditions)}')
        return v
    
    @validator('preferred_time')
    def validate_preferred_time(cls, v):
        """Validate preferred time format"""
        if v is not None and v.strip():
            # Accept various time formats from frontend
            # Frontend sends formatted strings like "Mon Dec 09 at 2:30 PM" or "Time: 2:30 PM"
            return v.strip()
        return v
    
    @validator('email')
    def validate_email_domain(cls, v):
        """Additional email validation"""
        # Check for common typos in email domains
        email_str = str(v).lower()
        
        # List of suspicious domains that should be flagged
        suspicious_domains = ['test.com', 'example.com', 'temp.com', 'dummy.com']
        domain = email_str.split('@')[1] if '@' in email_str else ''
        
        if domain in suspicious_domains:
            raise ValueError('Please provide a valid business email address')
        
        return v
    
    @validator('problem_description')
    def validate_problem_description(cls, v):
        """Validate problem description"""
        if not v.strip():
            raise ValueError('Problem description cannot be empty')
        
        if len(v.strip()) < 10:
            raise ValueError('Problem description must be at least 10 characters long')
        
        return v.strip()
    
    def get_product_category_display_name(self) -> str:
        """Get display name for selected product category"""
        category_map = {
            'energy-meters': 'Energy Meters',
            'protection-relays': 'Protection Relays', 
            'monitoring-systems': 'Monitoring Systems'
        }
        return category_map.get(self.product_category, self.product_category.replace('-', ' ').title())
    
    def get_brand_display_name(self) -> str:
        """Get display name for selected brand"""
        brand_map = {
            'krykard': 'Krykard',
            'other': 'Other'
        }
        return brand_map.get(self.brand, self.brand.title())
    
    def get_service_center_display_name(self) -> str:
        """Get display name for selected service center"""
        center_map = {
            'chennai': 'Chennai',
            'mumbai': 'Mumbai',
            'delhi': 'Delhi',
            'bangalore': 'Bangalore'
        }
        return center_map.get(self.service_center, self.service_center.title())
    
    def get_call_type_display_name(self) -> str:
        """Get display name for call type"""
        type_map = {
            'installation': 'Installation',
            'repair': 'Repair',
            'maintenance': 'Maintenance',
            'inquiry': 'Inquiry'
        }
        return type_map.get(self.call_type, self.call_type.title())
    
    def get_call_category_display_name(self) -> str:
        """Get display name for call category"""
        category_map = {
            'urgent': 'Urgent',
            'normal': 'Normal', 
            'scheduled': 'Scheduled'
        }
        return category_map.get(self.call_category, self.call_category.title())
    
    def get_call_condition_display_name(self) -> str:
        """Get display name for call condition"""
        condition_map = {
            'working': 'Working with Issues',
            'not-working': 'Not Working',
            'intermittent': 'Intermittent Problems',
            'new-install': 'New Installation'
        }
        return condition_map.get(self.call_condition, self.call_condition.replace('-', ' ').title())
    
    def get_priority_level(self) -> str:
        """Determine priority level based on call category and condition"""
        # High priority conditions
        if self.call_category == 'urgent' or self.call_condition in ['not-working']:
            return 'high'
        
        # Low priority conditions  
        if self.call_category == 'scheduled' or self.call_type == 'inquiry':
            return 'low'
        
        # Default to medium priority
        return 'medium'
    
    def get_estimated_response_time(self) -> str:
        """Get estimated response time based on priority"""
        priority = self.get_priority_level()
        
        if priority == 'high':
            return '2-4 hours'
        elif priority == 'low':
            return '24-48 hours'
        else:
            return '4-8 hours'
    
    def to_template_context(self) -> Dict[str, Any]:
        """Convert to template context for email rendering"""
        return {
            # Product details
            'serial_number': self.serial_number or 'Not provided',
            'product_category': self.get_product_category_display_name(),
            'product_category_raw': self.product_category,
            'rating': self.rating or 'Not rated',
            'model': self.model,
            'brand': self.get_brand_display_name(),
            'brand_raw': self.brand,
            
            # Customer details
            'company': self.company,
            'company_address': self.company_address,
            'contact_person': self.contact_person,
            'alternative_contact': self.alternative_contact or 'Not provided',
            'mobile_number': self.mobile_number,
            'email': self.email,
            
            # General information
            'service_center': self.get_service_center_display_name(),
            'service_center_raw': self.service_center,
            'call_type': self.get_call_type_display_name(),
            'call_type_raw': self.call_type,
            'call_category': self.get_call_category_display_name(),
            'call_category_raw': self.call_category,
            'call_condition': self.get_call_condition_display_name(),
            'call_condition_raw': self.call_condition,
            'preferred_time': self.preferred_time or 'Not specified',
            
            # Problem details
            'problem_description': self.problem_description,
            
            # Additional computed fields
            'priority_level': self.get_priority_level(),
            'estimated_response_time': self.get_estimated_response_time(),
            'submitted_at': self.submitted_at or datetime.now().isoformat(),
            'has_rating': self.rating is not None,
            'has_serial_number': bool(self.serial_number),
            'has_alternative_contact': bool(self.alternative_contact),
            'has_preferred_time': bool(self.preferred_time),
            
            # Formatting helpers
            'formatted_submission_date': datetime.now().strftime('%B %d, %Y at %I:%M %p'),
            'ticket_id': f"TS{datetime.now().strftime('%Y%m%d')}{hash(str(self.serial_number or '') + str(self.email)) % 10000:04d}"
        }

class TechnicalSupportResponse(BaseModel):
    """Response model for technical support operations"""
    
    success: bool = Field(..., description="Whether the operation was successful")
    message: str = Field(..., description="Response message")
    ticket_id: Optional[str] = Field(None, description="Generated support ticket ID")
    details: Optional[Dict[str, Any]] = Field(None, description="Additional details")
    emails_sent: Optional[Dict[str, bool]] = Field(None, description="Status of individual email sends")
    timestamp: Optional[str] = Field(None, description="Response timestamp")
    priority_level: Optional[str] = Field(None, description="Assigned priority level")
    estimated_response_time: Optional[str] = Field(None, description="Estimated response time")
    
    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "message": "Technical support request submitted successfully",
                "ticket_id": "TS20250809001234",
                "details": {
                    "support_email": "energy@atandra.in"
                },
                "emails_sent": {
                    "customer": True,
                    "support_team": True,
                    "service_center": True
                },
                "priority_level": "high",
                "estimated_response_time": "2-4 hours",
                "timestamp": "2025-08-09T10:30:00+05:30"
            }
        }

class TechnicalSupportError(BaseModel):
    """Error model for technical support operations"""
    
    success: bool = False
    message: str = Field(..., description="Error message")
    error_type: str = Field(..., description="Type of error")
    details: Optional[Dict[str, Any]] = Field(None, description="Error details")
    timestamp: Optional[str] = Field(None, description="Error timestamp")
    
    class Config:
        schema_extra = {
            "example": {
                "success": False,
                "message": "Failed to submit technical support request",
                "error_type": "validation_error",
                "details": {
                    "field_errors": {
                        "serial_number": "Serial number format is invalid",
                        "problem_description": "Description is too short",
                        "service_center": "Invalid service center selection"
                    }
                },
                "timestamp": "2025-08-09T10:30:00+05:30"
            }
        }