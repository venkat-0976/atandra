import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, Timestamp, doc, setDoc } from 'firebase/firestore';
import { ref, set, get, child, serverTimestamp } from 'firebase/database';
import { db, rtdb } from '@/lib/firebase';
import { getApp, getApps } from 'firebase/app';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TestFirestore = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [testDocs, setTestDocs] = useState<any[]>([]);
  const [firebaseConfig, setFirebaseConfig] = useState<any>(null);

  useEffect(() => {
    try {
      // Check if Firebase is initialized
      const apps = getApps();
      console.log("Firebase apps initialized:", apps.length);

      if (apps.length === 0) {
        setError("No Firebase apps initialized. Please check your Firebase configuration.");
        return;
      }

      // Get the current Firebase app configuration
      const app = getApp();
      const config = app.options;

      // Check if rtdb is defined
      const rtdbStatus = rtdb ? "Realtime Database is initialized" : "Realtime Database is NOT initialized";
      console.log(rtdbStatus);

      // Check if db is defined
      const firestoreStatus = db ? "Firestore is initialized" : "Firestore is NOT initialized";
      console.log(firestoreStatus);

      setFirebaseConfig({
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId,
        databaseURL: config.databaseURL,
        rtdbStatus,
        firestoreStatus
      });
    } catch (err) {
      console.error("Error getting Firebase config:", err);
      setError(`Could not retrieve Firebase configuration: ${err.message}`);
    }
  }, []);

  const testFirestoreWrite = async () => {
    setLoading(true);
    setError('');
    setTestResult('');
    setTestDocs([]);

    try {
      console.log("Testing database connections...");

      // Test Realtime Database first
      try {
        console.log("Testing Realtime Database write...");
        const testId = `test_${Date.now()}`;
        const testRef = ref(rtdb, `databaseTest/${testId}`);

        // Test data for Realtime Database
        const rtdbTestData = {
          message: 'Test entry',
          timestamp: serverTimestamp()
        };

        await set(testRef, rtdbTestData);
        console.log("Data written to Realtime Database, ID:", testId);
        setTestResult(`Successfully wrote to Realtime Database! Entry ID: ${testId}`);

        // Try to read from Realtime Database
        try {
          console.log("Testing Realtime Database read...");
          const snapshot = await get(ref(rtdb, 'databaseTest'));
          if (snapshot.exists()) {
            const rtdbData = snapshot.val();
            console.log("Read from Realtime Database:", rtdbData);

            // Convert object to array
            const rtdbDocs = Object.keys(rtdbData).map(key => ({
              id: key,
              ...rtdbData[key]
            }));

            setTestDocs(rtdbDocs);
            setTestResult(prev => `${prev}\nSuccessfully read ${rtdbDocs.length} entries from Realtime Database!`);
          } else {
            console.log("No data available in Realtime Database");
            setTestResult(prev => `${prev}\nNo data available in Realtime Database.`);
          }
        } catch (rtdbReadErr) {
          console.error("Realtime Database read failed:", rtdbReadErr);
          setTestResult(prev => `${prev}\nFailed to read from Realtime Database: ${rtdbReadErr.message}`);

          // Try Firestore as fallback
          testFirestore();
        }
      } catch (rtdbErr) {
        console.error("Realtime Database test failed:", rtdbErr);
        setTestResult(`Realtime Database test failed: ${rtdbErr.message}. Trying Firestore...`);

        // Try Firestore as fallback
        testFirestore();
      }

    } catch (err: any) {
      console.error("Error testing databases:", err);
      setError(`Database tests failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to test Firestore
  const testFirestore = async () => {
    try {
      console.log("Testing Firestore write...");

      // Test data for Firestore
      const firestoreTestData = {
        message: 'Test document',
        timestamp: Timestamp.now()
      };

      // Try addDoc first
      try {
        console.log("Testing addDoc method...");
        const docRef = await addDoc(collection(db, 'firestoreTest'), firestoreTestData);
        console.log("Document written with addDoc, ID:", docRef.id);
        setTestResult(prev => `${prev}\nSuccessfully wrote to Firestore using addDoc! Document ID: ${docRef.id}`);
      } catch (addDocErr) {
        console.error("addDoc test failed:", addDocErr);

        // If addDoc fails, try setDoc
        try {
          console.log("Testing setDoc method...");
          const testDocId = `test_${Date.now()}`;
          await setDoc(doc(db, 'firestoreTest', testDocId), firestoreTestData);
          console.log("Document written with setDoc, ID:", testDocId);
          setTestResult(prev => `${prev}\nSuccessfully wrote to Firestore using setDoc! Document ID: ${testDocId}`);
        } catch (setDocErr) {
          console.error("setDoc test failed:", setDocErr);
          setTestResult(prev => `${prev}\nBoth Firestore methods failed. addDoc error: ${addDocErr.message}, setDoc error: ${setDocErr.message}`);
          return;
        }
      }

      // Now try to read from the test collection
      try {
        console.log("Testing Firestore read...");
        const querySnapshot = await getDocs(collection(db, 'firestoreTest'));
        const docs: any[] = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });

        setTestDocs(prev => [...prev, ...docs]);
        console.log("Read documents from Firestore:", docs);
        setTestResult(prev => `${prev}\nSuccessfully read ${docs.length} documents from Firestore!`);
      } catch (readErr) {
        console.error("Firestore read test failed:", readErr);
        setTestResult(prev => `${prev}\nFirestore read test failed: ${readErr.message}`);
      }
    } catch (err) {
      console.error("Error in Firestore test:", err);
      setTestResult(prev => `${prev}\nFirestore test error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <Card className="border border-blue-500/20 bg-gradient-to-br from-blue-950 to-black text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Test Database Connection</CardTitle>
            <CardDescription className="text-blue-300 text-center">
              This page tests if Firebase Realtime Database and Firestore are properly configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/50 border-red-500/50 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {testResult && (
              <Alert className="mb-4 bg-green-900/50 border-green-500/50 text-green-200">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>{testResult}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={testFirestoreWrite}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-2"
            >
              {loading ? 'Testing...' : 'Test Database Connections'}
            </Button>

            <Button
              onClick={() => {
                console.log("Firebase Config:", firebaseConfig);
                console.log("Realtime Database:", rtdb);
                console.log("Firestore:", db);
                setTestResult("Diagnostic information logged to console. Please open browser developer tools to view.");
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Run Diagnostics
            </Button>

            {firebaseConfig && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Firebase Configuration:</h3>
                <div className="bg-blue-900/30 p-3 rounded-md">
                  <pre className="text-xs overflow-auto max-h-40">
                    {JSON.stringify(firebaseConfig, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {testDocs.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Test Documents:</h3>
                <div className="bg-blue-900/30 p-3 rounded-md">
                  <pre className="text-xs overflow-auto max-h-40">
                    {JSON.stringify(testDocs, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <p className="text-sm text-blue-300/70">
              <a href="/admin/create" className="text-blue-400 hover:underline">Back to Admin Creation</a>
            </p>
            <p className="text-sm text-blue-300/70">
              <a href="/admin/diagnostic" className="text-blue-400 hover:underline">Go to Diagnostic Page</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TestFirestore;
