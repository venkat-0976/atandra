"""
Configuration settings for the FastAPI email service
"""

import os
from typing import List
from functools import lru_cache
try:
    from pydantic_settings import BaseSettings
except ImportError:
    from pydantic import BaseSettings
from datetime import datetime
import pytz

class Settings(BaseSettings):
    """Application settings"""
    
    # Environment
    environment: str = "development"
    
    # SMTP Configuration
    smtp_host: str = "smtp.postmarkapp.com"
    smtp_port: int = 587
    smtp_username: str = "dee839e8-2b7b-4dd2-98a6-cf4dfa7b43c5"
    smtp_password: str = "dee839e8-2b7b-4dd2-98a6-cf4dfa7b43c5"
    smtp_use_tls: bool = True
    smtp_timeout: int = 10
    sender_email: str = "enquiry@atandra.in"
    # Company Information
    company_name: str = "Atandra Energy Pvt Ltd"
    company_email: str = "Sales.support@atandra.in"
    company_phone: str = "+91 95000 97966"
    company_address: str = "No.5, Kumaran St, Pazhvanthangal, Chennai, Tamil Nadu, India, 600114"
    company_website: str = "https://atandra.in"
    
    # Email Settings
    email_from_name: str = "Atandra Energy"
    email_reply_to: str = ""
    email_max_retries: int = 3
    email_retry_delay: int = 5  # seconds
    
    # CORS Settings
    cors_origins: str = "http://localhost:8080,http://localhost:8081,http://localhost:8082"
    
    # Rate Limiting
    rate_limit_requests: int = 10
    rate_limit_window: int = 60  # seconds
    
    # Logging
    log_level: str = "INFO"
    
    # Template Settings
    template_directory: str = "templates"
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "ignore"  # Ignore extra environment variables not defined in the model
        
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
        # Set reply_to to company_email if not provided
        if not self.email_reply_to and self.company_email:
            self.email_reply_to = self.company_email
            
        # Set company_email to smtp_username if not provided
        if not self.company_email and self.smtp_username:
            self.company_email = self.smtp_username
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Get CORS origins as a list"""
        if isinstance(self.cors_origins, str):
            return [origin.strip() for origin in self.cors_origins.split(",")]
        return self.cors_origins
    
    @property
    def smtp_config(self) -> dict:
        """Get SMTP configuration dictionary"""
        return {
            "hostname": self.smtp_host,
            "port": self.smtp_port,
            "username": self.smtp_username,
            "password": self.smtp_password,
            "use_tls": self.smtp_use_tls,
            "timeout": self.smtp_timeout
        }
    
    @property
    def email_sender(self) -> str:
        """Get formatted email sender"""
        return f"{self.email_from_name} <{self.smtp_username}>"
    @property
    def from_email(self) -> str:
        """Email used in From header (for Postmark use sender_email so token is not used as From)."""
        return (self.sender_email or self.smtp_username or "").strip() or "noreply@atandra.in"
    @staticmethod
    def get_current_timestamp() -> str:
        """Get current timestamp in IST"""
        ist = pytz.timezone('Asia/Kolkata')
        return datetime.now(ist).isoformat()
    
    def get_template_path(self, template_name: str) -> str:
        """Get full path to email template"""
        return os.path.join(self.template_directory, template_name)

@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()