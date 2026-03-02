"""
Technical Email service for handling SMTP operations for support requests
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

from config.technical_settings import get_settings
from models.technical_email import TechnicalSupportFormData, TechnicalSupportResponse, TechnicalSupportError

logger = logging.getLogger(__name__)

class TechnicalEmailService:
    """Service class for handling technical support email operations"""
    
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
        env.filters['priority_badge'] = self._priority_badge_filter
        env.filters['format_phone'] = self._format_phone_filter
        
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
    
    def _priority_badge_filter(self, priority: str) -> str:
        """Custom filter for priority level styling"""
        # Get priority styles from settings if available
        priority_styles = getattr(self.settings, 'priority_styles', {
            'high': 'background-color: #dc3545; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
            'medium': 'background-color: #fd7e14; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
            'low': 'background-color: #28a745; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
        })
        default_style = 'background-color: #6c757d; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
        return priority_styles.get(priority.lower(), default_style)
    
    def _format_phone_filter(self, phone: str) -> str:
        """Custom filter for phone number formatting"""
        # Remove non-digits except +
        cleaned = ''.join(c for c in phone if c.isdigit() or c == '+')
        
        if cleaned.startswith('+91') and len(cleaned) == 13:
            # Indian format: +91 XXXXX XXXXX
            return f"+91 {cleaned[3:8]} {cleaned[8:]}"
        elif len(cleaned) == 10:
            # Indian format without country code: XXXXX XXXXX
            return f"{cleaned[:5]} {cleaned[5:]}"
        else:
            return phone
    
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
        text_content: Optional[str] = None,
        reply_to: Optional[str] = None
    ) -> MIMEMultipart:
        """Create email message"""
        
        message = MIMEMultipart('alternative')
        message['Subject'] = subject
        message['From'] = formataddr((self.settings.email_from_name, self.settings.smtp_username))
        message['To'] = formataddr((to_name, to_email))
        message['Reply-To'] = reply_to or self.settings.email_reply_to
        
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
                logger.info(f"Technical support email sent successfully to {to_email}")
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
    
    def _get_estimated_response_time(self, priority: str) -> str:
        """Get estimated response time based on priority from settings"""
        # Get response times from settings if available
        response_times = getattr(self.settings, 'response_times', {
            'high': '2-4 hours',
            'medium': '1-2 business days',
            'low': '3-5 business days'
        })
        return response_times.get(priority.lower(), self.settings.default_response_time or '1-2 business days')
    
    def _get_service_center_email(self, service_center: str) -> str:
        """Get service center specific email from settings"""
        # Get service center emails from settings if available
        service_center_emails = getattr(self.settings, 'service_center_emails', {})
        
        # Clean service center name
        clean_name = service_center.lower().replace('-', '').replace('_', '').replace(' ', '')
        return service_center_emails.get(clean_name, self.settings.technical_support_email)
    
    def _render_customer_acknowledgment_email(self, support_data: TechnicalSupportFormData, ticket_id: str) -> Tuple[str, str]:
        """Render customer acknowledgment email template"""
        try:
            template = self.template_env.get_template('technical_customer_email.html')
            
            context = {
                **support_data.to_template_context(),
                'ticket_id': ticket_id,
                'company_name': self.settings.company_name,
                'company_email': self.settings.company_email,
                'company_phone': self.settings.company_phone,
                'company_address': self.settings.company_address,
                'company_website': self.settings.company_website,
                'technical_support_email': self.settings.technical_support_email,
                'estimated_response_time': self._get_estimated_response_time(support_data.get_priority_level()),
                'current_year': datetime.now().year
            }
            
            html_content = template.render(context)
            
            # Generate subject
            priority_text = f"[{support_data.get_priority_level().upper()} PRIORITY]" if support_data.get_priority_level() == 'high' else ""
            subject = f"Technical Support Request Received {priority_text} - Ticket #{ticket_id}"
            
            return subject, html_content
            
        except Exception as e:
            logger.error(f"Error rendering customer acknowledgment email template: {e}")
            raise Exception(f"Template rendering failed: {e}")
    
    def _render_support_team_email(self, support_data: TechnicalSupportFormData, ticket_id: str) -> Tuple[str, str]:
        """Render support team email template"""
        try:
            template = self.template_env.get_template('technical_company_email.html')
            
            context = {
                **support_data.to_template_context(),
                'ticket_id': ticket_id,
                'company_name': self.settings.company_name,
                'submission_date': datetime.now().strftime("%B %d, %Y at %I:%M %p IST"),
                'current_year': datetime.now().year
            }
            
            html_content = template.render(context)
            
            # Generate subject with priority indicator
            priority_indicators = getattr(self.settings, 'priority_indicators', {
                'high': '🔴 URGENT',
                'medium': '🟡 MEDIUM', 
                'low': '🟢 LOW'
            })
            priority_indicator = priority_indicators.get(support_data.get_priority_level(), '🟡 MEDIUM')
            
            subject = f"{priority_indicator} Technical Support Request - {support_data.company} - Ticket #{ticket_id}"
            
            return subject, html_content
            
        except Exception as e:
            logger.error(f"Error rendering support team email template: {e}")
            raise Exception(f"Template rendering failed: {e}")
    
    def _render_service_center_email(self, support_data: TechnicalSupportFormData, ticket_id: str) -> Tuple[str, str]:
        """Render service center email template"""
        try:
            template = self.template_env.get_template('service_center_notification.html')
            
            context = {
                **support_data.to_template_context(),
                'ticket_id': ticket_id,
                'company_name': self.settings.company_name,
                'submission_date': datetime.now().strftime("%B %d, %Y at %I:%M %p IST"),
                'current_year': datetime.now().year
            }
            
            html_content = template.render(context)
            
            # Generate subject
            priority_text = f"[{support_data.get_priority_level().upper()}]"
            subject = f"{priority_text} Service Request Assignment - {support_data.get_service_center_display_name()} - #{ticket_id}"
            
            return subject, html_content
            
        except Exception as e:
            logger.error(f"Error rendering service center email template: {e}")
            raise Exception(f"Template rendering failed: {e}")
    
    async def send_technical_support_emails(self, support_data: TechnicalSupportFormData) -> TechnicalSupportResponse:
        """Send technical support emails to customer, support team, and service center"""
        
        logger.info(f"Processing technical support request for {support_data.contact_person} ({support_data.email})")
        
        try:
            # Generate unique ticket ID
            ticket_id = support_data.to_template_context()['ticket_id']
            priority_level = support_data.get_priority_level()
            
            # Render email templates
            customer_subject, customer_html = self._render_customer_acknowledgment_email(support_data, ticket_id)
            support_subject, support_html = self._render_support_team_email(support_data, ticket_id)
            service_center_subject, service_center_html = self._render_service_center_email(support_data, ticket_id)
            
            # Always use technical support email for service center notifications
            # This ensures all technical support emails go to energy@atandra.in
            service_center_email = self.settings.technical_support_email
            
            # Create email messages
            # customer_message = self._create_email_message(
            #     to_email=support_data.email,
            #     to_name=support_data.contact_person,
            #     subject=customer_subject,
            #     html_content=customer_html,
            #     reply_to=self.settings.technical_support_email
            # )
            
            support_message = self._create_email_message(
                to_email=self.settings.technical_support_email,
                to_name="Technical Support Team",
                subject=support_subject,
                html_content=support_html,
                reply_to=support_data.email
            )
            
            service_center_message = self._create_email_message(
                to_email=service_center_email,
                to_name="Atandra Energy Technical Team",
                subject=service_center_subject,
                html_content=service_center_html,
                reply_to=support_data.email
            )
            
            # Establish SMTP connection
            smtp = await self._create_smtp_connection()
            
            try:
                # Send emails concurrently
                support_result, service_center_result = await asyncio.gather(
                    self._send_single_email(smtp, support_message, self.settings.technical_support_email),
                    self._send_single_email(smtp, service_center_message, service_center_email),
                    return_exceptions=True
                )
                
                # Process results
                # customer_success, customer_error = customer_result
                support_success, support_error = support_result
                service_center_success, service_center_error = service_center_result
                
                emails_sent = {
                    # "customer": customer_success,
                    "support_team": support_success,
                    "service_center": service_center_success
                }
                
                # Count successful sends
                successful_sends = sum(emails_sent.values())
                total_emails = len(emails_sent)
                
                # Determine overall success
                # ✅ Only internal emails are considered now
                if support_success and service_center_success:
                    return TechnicalSupportResponse(
                        success=True,
                        message="Technical support request submitted successfully. Internal notifications sent.",
                        ticket_id=ticket_id,
                        details={
            "support_email": self.settings.technical_support_email,
            "service_center_email": service_center_email,
            "service_center": support_data.get_service_center_display_name()
        },
        emails_sent=emails_sent,
        priority_level=priority_level,
        estimated_response_time=self._get_estimated_response_time(priority_level),
        timestamp=self.settings.get_current_timestamp()
    )
                else:
                    failed_recipients = []
                    errors = {}

                    if not support_success:
                        failed_recipients.append("support_team")
                        errors["support_team"] = support_error

                    if not service_center_success:
                        failed_recipients.append("service_center")
                        errors["service_center"] = service_center_error

                    return TechnicalSupportResponse(
                        success=False,
                        message=f"Failed to send internal notifications to: {', '.join(failed_recipients)}",
                        ticket_id=ticket_id,
                        details={
                            "failed_notifications": failed_recipients,
            "errors": errors
        },
        emails_sent=emails_sent,
        priority_level=priority_level,
        estimated_response_time=self._get_estimated_response_time(priority_level),
        timestamp=self.settings.get_current_timestamp()
    )

                    
            finally:
                # Always close SMTP connection
                await smtp.quit()
                
        except Exception as e:
            logger.error(f"Technical email service error: {e}", exc_info=True)
            return TechnicalSupportResponse(
                success=False,
                message="Technical support service error occurred",
                details={"error": str(e)},
                timestamp=self.settings.get_current_timestamp()
            )
    
    async def send_priority_escalation_email(
        self, 
        support_data: TechnicalSupportFormData, 
        ticket_id: str, 
        escalation_reason: str
    ) -> Dict[str, any]:
        """Send priority escalation email to management"""
        try:
            template = self.template_env.get_template('priority_escalation.html')
            
            context = {
                **support_data.to_template_context(),
                'ticket_id': ticket_id,
                'escalation_reason': escalation_reason,
                'company_name': self.settings.company_name,
                'escalation_date': datetime.now().strftime("%B %d, %Y at %I:%M %p IST"),
                'current_year': datetime.now().year
            }
            
            html_content = template.render(context)
            subject = f"🚨 PRIORITY ESCALATION - Ticket #{ticket_id} - {support_data.company}"
            
            message = self._create_email_message(
                to_email=self.settings.management_email,
                to_name="Management Team",
                subject=subject,
                html_content=html_content
            )
            
            smtp = await self._create_smtp_connection()
            
            try:
                success, error = await self._send_single_email(smtp, message, self.settings.management_email)
                
                if success:
                    return {
                        "success": True,
                        "message": "Priority escalation email sent successfully",
                        "ticket_id": ticket_id
                    }
                else:
                    return {
                        "success": False,
                        "message": f"Failed to send escalation email: {error}",
                        "ticket_id": ticket_id
                    }
                    
            finally:
                await smtp.quit()
                
        except Exception as e:
            logger.error(f"Escalation email error: {e}")
            return {
                "success": False,
                "message": f"Escalation email service error: {str(e)}",
                "ticket_id": ticket_id
            }
    
    async def test_smtp_connection(self) -> Dict[str, any]:
        """Test SMTP connection"""
        try:
            smtp = await self._create_smtp_connection()
            await smtp.quit()
            
            return {
                "success": True,
                "message": "Technical support SMTP connection successful",
                "smtp_host": self._smtp_config['hostname'],
                "smtp_port": self._smtp_config['port']
            }
            
        except Exception as e:
            logger.error(f"Technical support SMTP connection test failed: {e}")
            return {
                "success": False,
                "message": f"SMTP connection failed: {str(e)}",
                "smtp_host": self._smtp_config['hostname'],
                "smtp_port": self._smtp_config['port']
            }

# Global technical email service instance
technical_email_service = TechnicalEmailService()