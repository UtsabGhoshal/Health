import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseEnabled } from '@/lib/firebase';

export type UserRole = 'patient' | 'doctor' | 'hospital';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  profileComplete?: boolean;
  createdAt?: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
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

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string, displayName: string, role: UserRole) {
    if (!isFirebaseEnabled) {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create account');
      localStorage.setItem('auth_token', data.token);
      setCurrentUser({} as any);
      setUserData(data.user);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName });

      // Create user document in Firestore
      const userDocData: UserData = {
        uid: user.uid,
        email: user.email!,
        displayName,
        role,
        profileComplete: false,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), userDocData);
      setUserData(userDocData);
    } catch (error: any) {
      // Provide user-friendly error messages
      let errorMessage = 'Failed to create account';

      switch (error.code) {
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection and try again.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        default:
          errorMessage = error.message || 'Failed to create account';
      }

      throw new Error(errorMessage);
    }
  }

  async function login(email: string, password: string) {
    if (!isFirebaseEnabled) {
      throw new Error('Firebase is not configured. Please provide the VITE_FIREBASE_* environment variables.');
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      // Provide user-friendly error messages
      let errorMessage = 'Failed to sign in';

      switch (error.code) {
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection and try again.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message || 'Failed to sign in';
      }

      throw new Error(errorMessage);
    }
  }

  async function logout() {
    setUserData(null);
    if (!isFirebaseEnabled) return;
    await signOut(auth);
  }

  useEffect(() => {
    if (!isFirebaseEnabled) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
