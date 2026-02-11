import React from 'react';

const TestPage = () => {
  console.log('🧪 TestPage component rendering...');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        ✅ React App is Working!
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#007bff', marginBottom: '15px' }}>Test Results:</h2>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>✅ React:</strong> Successfully loaded and rendering
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>✅ TypeScript:</strong> Compilation successful
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>✅ Vite:</strong> Development server running
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>✅ CSS:</strong> Styles are applying correctly
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#d4edda', 
        color: '#155724',
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #c3e6cb',
        marginBottom: '20px'
      }}>
        <strong>Success!</strong> If you can see this page, your React application is working correctly.
        The blank page issue might be related to specific components or routing.
      </div>
      
      <div style={{ 
        backgroundColor: '#fff3cd', 
        color: '#856404',
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #ffeaa7',
        marginBottom: '20px'
      }}>
        <strong>Next Steps:</strong>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>Check browser console for any JavaScript errors</li>
          <li>Verify all imports are working correctly</li>
          <li>Test individual components one by one</li>
          <li>Check if the issue is with the main Index page or Layout component</li>
        </ul>
      </div>
      
      <button 
        onClick={() => {
          console.log('Button clicked - React event handling works!');
          alert('React event handling is working!');
        }}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginRight: '10px'
        }}
      >
        Test React Events
      </button>
      
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Go to Main Page
      </button>
      
      <div style={{ 
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#6c757d'
      }}>
        <strong>Debug Info:</strong><br />
        Current URL: {window.location.href}<br />
        Timestamp: {new Date().toISOString()}<br />
        User Agent: {navigator.userAgent.substring(0, 100)}...
      </div>
    </div>
  );
};

export default TestPage;
