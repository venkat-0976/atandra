import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

const DiagnosticPage = () => {
  const [status, setStatus] = useState<string>('');
  
  const checkBrowserInfo = () => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toString()
    };
    
    console.log('Browser Information:', info);
    setStatus('Browser information logged to console. This page is working correctly!');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <Card className="border border-blue-500/20 bg-gradient-to-br from-blue-950 to-black text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Diagnostic Page</CardTitle>
            <CardDescription className="text-blue-300 text-center">
              This page doesn't use Firebase and should always load
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status && (
              <Alert className="mb-4 bg-green-900/50 border-green-500/50 text-green-200">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>{status}</AlertDescription>
              </Alert>
            )}
            
            <Button
              onClick={checkBrowserInfo}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Run Basic Diagnostics
            </Button>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Navigation:</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/admin/test-firestore" className="text-blue-400 hover:underline block">
                    Test Database Connection
                  </a>
                </li>
                <li>
                  <a href="/admin/create" className="text-blue-400 hover:underline block">
                    Create Admin Account
                  </a>
                </li>
                <li>
                  <a href="/admin/login" className="text-blue-400 hover:underline block">
                    Admin Login
                  </a>
                </li>
                <li>
                  <a href="/" className="text-blue-400 hover:underline block">
                    Home Page
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-blue-300/70">
              This page is for diagnostic purposes only
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DiagnosticPage;
