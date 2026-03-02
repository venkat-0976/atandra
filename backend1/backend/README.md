# Atandra Energy Python Backend

This is the Python Flask backend that replaces the Node.js backend for handling form submissions and email services.

## 🚀 Quick Start

### Windows
```bash
# Run the startup script
start.bat
```

### Linux/Mac
```bash
# Make the script executable
chmod +x start.sh

# Run the startup script
./start.sh
```

### Manual Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
# or
python start.py
```

## 📋 Features

- **Identical API**: Same endpoints and response format as Node.js backend
- **Form Validation**: Comprehensive validation using Marshmallow
- **Email Service**: SMTP email sending with HTML templates
- **Rate Limiting**: Built-in rate limiting for API protection
- **CORS Support**: Configured for frontend integration
- **Error Handling**: Robust error handling and logging
- **Health Checks**: Email service health monitoring

## 🔧 Configuration

Copy `.env.example` to `.env` and configure your settings:

```bash
cp .env.example .env
```

### Key Configuration Options

- `PORT`: Server port (default: 5007)
- `SMTP_HOST`: SMTP server hostname
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password (use app password for Yahoo)
- `FROM_EMAIL`: Sender email address
- `TO_EMAIL`: Recipient email address

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Email Service Health
```
GET /api/email/health
```

### Submit Enquiry Form
```
POST /api/email/send-enquiry
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "designation": "Manager",
  "city": "Chennai",
  "mobile": "+91 9876543210",
  "pincode": "600001",
  "products": "measure",
  "remarks": "Interested in power quality analyzers",
  "requestDemo": true,
  "requestCallback": false,
  "sendDetails": true,
  "sendUpdates": false
}
```

## 🔄 Migration from Node.js

This Python backend is a drop-in replacement for the Node.js backend:

1. **Same API endpoints**: All endpoints match exactly
2. **Same request/response format**: No frontend changes needed
3. **Same validation rules**: Identical form validation
4. **Same email templates**: HTML email templates preserved
5. **Same configuration**: Environment variables match

### Switching Backends

1. Stop the Node.js backend
2. Start the Python backend on the same port (5007)
3. No frontend changes required

## 🧪 Testing

### Test Form Submission
```bash
curl -X POST http://localhost:5007/api/email/send-enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "designation": "Manager",
    "city": "Chennai",
    "mobile": "+91 9876543210",
    "pincode": "600001",
    "products": "measure",
    "remarks": "Test enquiry",
    "requestDemo": true
  }'
```

### Test Health Check
```bash
curl http://localhost:5007/health
curl http://localhost:5007/api/email/health
```

## 📦 Dependencies

- **Flask**: Web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Flask-Limiter**: Rate limiting
- **Marshmallow**: Data validation and serialization
- **python-dotenv**: Environment variable management
- **Gunicorn**: WSGI HTTP Server (for production)

## 🔒 Security Features

- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Secure SMTP with TLS
- Environment-based configuration

## 📝 Logging

The application provides detailed logging:
- Request/response logging
- Email sending status
- Error tracking
- SMTP connection status

## 🚀 Production Deployment

For production deployment, use Gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5007 app:app
```

Or use the provided startup scripts which handle virtual environment setup automatically.

## 🆘 Troubleshooting

### Common Issues

1. **SMTP Authentication Failed**
   - Ensure you're using an app password for Yahoo
   - Check 2FA is enabled on your email account

2. **Port Already in Use**
   - Stop the Node.js backend first
   - Or change the PORT in .env file

3. **Module Not Found**
   - Ensure virtual environment is activated
   - Run `pip install -r requirements.txt`

4. **CORS Errors**
   - Check FRONTEND_URL in .env
   - Verify frontend is making requests to correct port

## 📞 Support

For issues or questions, check the logs for detailed error messages. The application provides comprehensive logging to help diagnose problems.
