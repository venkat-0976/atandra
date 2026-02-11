import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { ref, set, serverTimestamp } from 'firebase/database';
import { auth, db, rtdb } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CreateAdmin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<'unknown' | 'connected' | 'error'>('unknown');

  // Check database connectivity on component mount
  useEffect(() => {
    const checkDatabases = async () => {
      try {
        console.log("Checking Realtime Database connectivity...");
        // Try to add a test entry to check connectivity
        const testData = {
          test: true,
          timestamp: serverTimestamp()
        };

        try {
          // Try using Realtime Database
          const testId = `test_${Date.now()}`;
          const testRef = ref(rtdb, `databaseTest/${testId}`);
          await set(testRef, testData);
          console.log("Realtime Database test successful, ID:", testId);
          setDbStatus('connected');
        } catch (rtdbError) {
          console.error("Realtime Database test failed:", rtdbError);

          // If Realtime Database fails, try Firestore as fallback
          try {
            console.log("Trying Firestore as fallback...");
            const testDocId = `test_${Date.now()}`;
            await setDoc(doc(db, 'firestoreTest', testDocId), {
              test: true,
              timestamp: Timestamp.now()
            });
            console.log("Firestore test successful with setDoc, ID:", testDocId);
            setDbStatus('connected');
          } catch (firestoreError) {
            console.error("Firestore fallback test failed:", firestoreError);
            setDbStatus('error');
            setError(`Database connection issue: ${firestoreError.message}`);
          }
        }
      } catch (err) {
        console.error("Database check failed:", err);
        setDbStatus('error');
        setError(`Database connection issue: ${err.message}`);
      }
    };

    checkDatabases();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset messages
    setError('');
    setSuccess('');

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      // Create user with Firebase Authentication
      console.log("Creating user in Firebase Auth...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created in Auth:", user.uid);

      try {
        // Add user to admins in Realtime Database
        console.log("Attempting to add user to Realtime Database...");
        const adminData = {
          name: name,
          email: user.email,
          createdAt: serverTimestamp(),
          role: 'admin',
          uid: user.uid
        };

        console.log("Admin data:", adminData);
        console.log("Database path:", `admins/${user.uid}`);

        let success = false;

        // Try Realtime Database first
        try {
          console.log("Trying Realtime Database...");
          const adminRef = ref(rtdb, `admins/${user.uid}`);
          await set(adminRef, adminData);
          console.log("User added to Realtime Database successfully");
          success = true;
        } catch (rtdbErr) {
          console.error("Realtime Database failed:", rtdbErr);

          // If Realtime Database fails, try Firestore as fallback
          try {
            console.log("Trying Firestore as fallback...");
            await setDoc(doc(db, 'admins', user.uid), {
              name: name,
              email: user.email,
              createdAt: Timestamp.now(),
              role: 'admin'
            });
            console.log("User added to Firestore successfully as fallback");
            success = true;
          } catch (firestoreErr) {
            console.error("Firestore fallback failed:", firestoreErr);
            throw new Error(`Both Realtime Database and Firestore failed: ${firestoreErr.message}`);
          }
        }

        if (success) {
          // Success message
          setSuccess('Admin account created successfully! You can now log in with these credentials.');

          // Clear form
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      } catch (dbErr: any) {
        console.error('Error adding user to database:', dbErr);
        setError(`Authentication successful but failed to save admin data: ${dbErr.message}`);

        // Try to delete the auth user if database operations fail
        try {
          await user.delete();
          console.log("Deleted auth user after database failure");
        } catch (deleteErr) {
          console.error("Failed to delete auth user after database failure:", deleteErr);
        }
      }
    } catch (err: any) {
      console.error('Error creating admin:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else {
        setError(`Failed to create admin account: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <Card className="border border-blue-500/20 bg-gradient-to-br from-blue-950 to-black text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Admin Account</CardTitle>
            <CardDescription className="text-blue-300 text-center">
              Enter your details to create a new administrator account
            </CardDescription>
            {dbStatus === 'connected' && (
              <div className="flex items-center justify-center mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-xs text-green-400">Database Connected</span>
              </div>
            )}
            {dbStatus === 'error' && (
              <div className="flex items-center justify-center mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                <span className="text-xs text-red-400">Database Connection Issue</span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/50 border-red-500/50 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 bg-green-900/50 border-green-500/50 text-green-200">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-100">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-blue-950/30 border-blue-500/30 text-white placeholder:text-blue-300/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-100">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-blue-950/30 border-blue-500/30 text-white placeholder:text-blue-300/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-100">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-blue-950/30 border-blue-500/30 text-white placeholder:text-blue-300/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-blue-100">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-blue-950/30 border-blue-500/30 text-white placeholder:text-blue-300/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? 'Creating Admin...' : 'Create Admin Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col justify-center space-y-2">
            <p className="text-sm text-blue-300/70">
              Already have an account? <a href="/admin/login" className="text-blue-400 hover:underline">Sign in</a>
            </p>
            <p className="text-sm text-blue-300/70">
              Having issues? <a href="/admin/test-firestore" className="text-blue-400 hover:underline">Test Database Connection</a>
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

export default CreateAdmin;
