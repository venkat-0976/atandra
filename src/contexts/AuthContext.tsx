import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ref, get } from 'firebase/database';
import { auth, db, rtdb } from '@/lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // During SSR, start with loading=false so children render immediately
  const isSSR = typeof window === 'undefined';
  const [loading, setLoading] = useState(isSSR ? false : true);

  // Check if user is an admin
  const checkAdminStatus = async (user: User) => {
    try {
      // First try Realtime Database
      try {
        console.log("Checking admin status in Realtime Database...");
        const adminRef = ref(rtdb, `admins/${user.uid}`);
        const snapshot = await get(adminRef);

        if (snapshot.exists()) {
          console.log("Admin found in Realtime Database");
          setIsAdmin(true);
          return;
        } else {
          console.log("Admin not found in Realtime Database");
        }
      } catch (rtdbError) {
        console.error('Error checking admin status in Realtime Database:', rtdbError);
        // Continue to Firestore check if Realtime Database fails
      }

      // Fallback to Firestore if Realtime Database check fails or admin not found
      console.log("Checking admin status in Firestore...");
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDoc = await getDoc(adminDocRef);

      if (adminDoc.exists()) {
        console.log("Admin found in Firestore");
        setIsAdmin(true);
      } else {
        console.log("Admin not found in Firestore");
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Skip during SSR - auth state will be checked on client
    if (typeof window === 'undefined') {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        await checkAdminStatus(user);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    logout
  };

  // During SSR, always render children immediately
  // On client, wait for auth state to load
  const shouldRenderChildren = isSSR || !loading;

  return (
    <AuthContext.Provider value={value}>
      {shouldRenderChildren && children}
    </AuthContext.Provider>
  );
};
