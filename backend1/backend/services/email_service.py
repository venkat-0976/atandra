"""
Email service for handling SMTP operations
"""

import asyncio
import logging
from typing import Dict, List, Optional, Tuple
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
import aiosmtplib
from jinja2 import Environment, FileSystemLoader, select_autoescape
import os
from datetime import datetime

from config.settings import get_settings
from models.email import ContactFormData, EmailResponse, EmailError

logger = logging.getLogger(__name__)

class EmailService:
    """Service class for handling email operations"""
    
    def __init__(self):
        self.settings = get_settings()
        self.template_env = self._setup_template_environment()
        self._smtp_config = self.settings.smtp_config
        
    def _setup_template_environment(self) -> Environment:
        """Setup Jinja2 template environment"""
        template_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), self.settings.template_directory)
        
        # Create templates directory if it doesn't exist
        os.makedirs(template_dir, exist_ok=True)
        
        env = Environment(
            loader=FileSystemLoader(template_dir),
            autoescape=select_autoescape(['html', 'xml'])
        )
        
        # Add custom filters
        env.filters['datetime_format'] = self._datetime_format_filter
        
        return env
    
    def _datetime_format_filter(self, value: str, format_string: str = "%B %d, %Y at %I:%M %p") -> str:
        """Custom filter for datetime formatting"""
        try:
            if isinstance(value, str):
                dt = datetime.fromisoformat(value.replace('Z', '+00:00'))
            else:
                dt = value
            return dt.strftime(format_string)
        except:
            return value
    
    async def _create_smtp_connection(self) -> aiosmtplib.SMTP:
        """Create and return SMTP connection"""
        try:
            # Create SMTP connection
            smtp = aiosmtplib.SMTP(
                hostname=self._smtp_config['hostname'],
                port=self._smtp_config['port'],
                timeout=self._smtp_config['timeout']
            )
            
            # Connect to server
            await smtp.connect()
            
            # For Gmail (port 587), we need STARTTLS
            if self._smtp_config['use_tls'] and self._smtp_config['port'] == 587:
                try:
                    await smtp.starttls()
                except Exception as tls_error:
                    logger.warning(f"STARTTLS failed or already active: {tls_error}")
                    # Continue anyway, connection might already be secure
            
            # Authenticate
            if self._smtp_config['username'] and self._smtp_config['password']:
                await smtp.login(
                    self._smtp_config['username'],
                    self._smtp_config['password']
                )
            
            return smtp
            
        except Exception as e:
            logger.error(f"Failed to create SMTP connection: {e}")
            raise Exception(f"SMTP connection failed: {e}")
    
    def _create_email_message(
        self,
        to_email: str,
        to_name: str,
        subject: str,
        html_content: str,
        text_content: Optional[str] = None
    ) -> MIMEMultipart:
        """Create email message"""
        
        message = MIMEMultipart('alternative')
        message['Subject'] = subject
        message['From'] = formataddr((self.settings.email_from_name, self.settings.from_email))
        message['To'] = formataddr((to_name, to_email))
        message['Reply-To'] = self.settings.email_reply_to
        
        # Add text content if provided
        if text_content:
            text_part = MIMEText(text_content, 'plain', 'utf-8')
            message.attach(text_part)
        
        # Add HTML content
        html_part = MIMEText(html_content, 'html', 'utf-8')
        message.attach(html_part)
        
        return message
    
    async def _send_single_email(
        self,
        smtp: aiosmtplib.SMTP,
        message: MIMEMultipart,
        to_email: str,
        max_retries: int = 3
    ) -> Tuple[bool, Optional[str]]:
        """Send a single email with retry logic"""
        
        for attempt in range(max_retries):
            try:
                await smtp.send_message(message)
                logger.info(f"Email sent successfully to {to_email}")
                return True, None
                
            except Exception as e:
                error_msg = str(e)
                logger.warning(f"Attempt {attempt + 1} failed to send email to {to_email}: {error_msg}")
                
                if attempt < max_retries - 1:
                    await asyncio.sleep(self.settings.email_retry_delay)
                else:
                    logger.error(f"Failed to send email to {to_email} after {max_retries} attempts: {error_msg}")
                    return False, error_msg
        
        return False, "Unknown error occurred"
    
    def _render_customer_email(self, contact_data: ContactFormData) -> Tuple[str, str]:
        """Render customer email template"""
        try:
            template = self.template_env.get_template('customer_email.html')
            
            context = {
                **contact_data.to_template_context(),
                'company_name': self.settings.company_name,
                'company_email': self.settings.company_email,
                'company_phone': self.settings.company_phone,
                'company_address': self.settings.company_address,
                'company_website': self.settings.company_website,
                'current_year': datetime.now().year
            }
            
            html_content = template.render(context)
            
            # Generate subject
            subject = f"Thank you for your inquiry, {contact_data.name}!"
            
            return subject, html_content
            
        except Exception as e:
            logger.error(f"Error rendering customer email template: {e}")
            raise Exception(f"Template rendering failed: {e}")
    
    def _render_company_email(self, contact_data: ContactFormData) -> Tuple[str, str]:
        """Render company email template"""
        try:
            template = self.template_env.get_template('company_email.html')
            
            context = {
                **contact_data.to_template_context(),
                'company_name': self.settings.company_name,
                'inquiry_date': datetime.now().strftime("%B %d, %Y at %I:%M %p IST"),
                'current_year': datetime.now().year
            }
            
            html_content = template.render(context)
            
            # Generate subject
            subject = f"New Contact Form Inquiry from {contact_data.name} - {contact_data.company}"
            
            return subject, html_content
            
        except Exception as e:
            logger.error(f"Error rendering company email template: {e}")
            raise Exception(f"Template rendering failed: {e}")
    
    async def send_contact_form_emails(self, contact_data: ContactFormData) -> EmailResponse:
        """Send both customer and company emails for contact form submission"""
        
        logger.info(f"Processing email request for {contact_data.name} ({contact_data.email})")
        
        try:
            # Render email templates
            customer_subject, customer_html = self._render_customer_email(contact_data)
            company_subject, company_html = self._render_company_email(contact_data)
            
            # Create email messages
            customer_message = self._create_email_message(
                to_email=contact_data.email,
                to_name=contact_data.name,
                subject=customer_subject,
                html_content=customer_html
            )
            
            company_message = self._create_email_message(
                to_email=self.settings.company_email,
                to_name=self.settings.company_name,
                subject=company_subject,
                html_content=company_html
            )
            
            # Establish SMTP connection
            smtp = await self._create_smtp_connection()
            
            try:
                # Send emails concurrently
                customer_result, company_result = await asyncio.gather(
                    self._send_single_email(smtp, customer_message, contact_data.email),
                    self._send_single_email(smtp, company_message, self.settings.company_email),
                    return_exceptions=True
                )
                
                # Process results
                customer_success, customer_error = customer_result
                company_success, company_error = company_result
                
                emails_sent = {
                    "customer": customer_success,
                    "company": company_success
                }
                
                # Determine overall success
                if customer_success and company_success:
                    return EmailResponse(
                        success=True,
                        message="Emails sent successfully",
                        details={
                            "customer_email": contact_data.email,
                            "company_email": self.settings.company_email
                        },
                        emails_sent=emails_sent,
                        timestamp=self.settings.get_current_timestamp()
                    )
                elif customer_success or company_success:
                    # Partial success
                    failed_recipient = "company" if customer_success else "customer"
                    error_detail = company_error if customer_success else customer_error
                    
                    return EmailResponse(
                        success=False,
                        message=f"Partial success: Failed to send email to {failed_recipient}",
                        details={
                            "customer_email": contact_data.email,
                            "company_email": self.settings.company_email,
                            "error": error_detail
                        },
                        emails_sent=emails_sent,
                        timestamp=self.settings.get_current_timestamp()
                    )
                else:
                    # Both failed
                    return EmailResponse(
                        success=False,
                        message="Failed to send email",
                        details={
                            "customer_error": customer_error,
                            "company_error": company_error
                        },
                        emails_sent=emails_sent,
                        timestamp=self.settings.get_current_timestamp()
                    )
                    
            finally:
                # Always close SMTP connection
                await smtp.quit()
                
        except Exception as e:
            logger.error(f"Email service error: {e}", exc_info=True)
            return EmailResponse(
                success=False,
                message="Email service error occurred",
                details={"error": str(e)},
                timestamp=self.settings.get_current_timestamp()
            )
    
    async def test_smtp_connection(self) -> Dict[str, any]:
        """Test SMTP connection"""
        try:
            smtp = await self._create_smtp_connection()
            await smtp.quit()
            
            return {
                "success": True,
                "message": "SMTP connection successful",
                "smtp_host": self._smtp_config['hostname'],
                "smtp_port": self._smtp_config['port']
            }
            
        except Exception as e:
            logger.error(f"SMTP connection test failed: {e}")
            return {
                "success": False,
                "message": f"SMTP connection failed: {str(e)}",
                "smtp_host": self._smtp_config['hostname'],
                "smtp_port": self._smtp_config['port']
            }

# Global email service instance
email_service = EmailService()