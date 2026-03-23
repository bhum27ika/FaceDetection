'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  skinType?: string;
  allergies?: string[];
  pastProducts?: string[];
  skinConcerns?: string[];
  ageRange?: string;
  budget?: string;
  preferredProductTypes?: string[];
  completedQuestionnaire?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('dermaai_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    // Simple validation
    if (!email || !password || !name) {
      throw new Error('Please fill in all fields');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const newUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      completedQuestionnaire: false,
    };

    // Store in localStorage with password (mock - never do this in production!)
    localStorage.setItem('dermaai_users', JSON.stringify({
      ...JSON.parse(localStorage.getItem('dermaai_users') || '{}'),
      [email]: { password, user: newUser },
    }));

    setUser(newUser);
    localStorage.setItem('dermaai_user', JSON.stringify(newUser));
  };

  const signIn = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('dermaai_users') || '{}');
    
    if (!users[email] || users[email].password !== password) {
      throw new Error('Invalid email or password');
    }

    const userData = users[email].user;
    setUser(userData);
    localStorage.setItem('dermaai_user', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('dermaai_user');
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...profile };
      setUser(updated);
      localStorage.setItem('dermaai_user', JSON.stringify(updated));
      
      // Also update in users database
      const users = JSON.parse(localStorage.getItem('dermaai_users') || '{}');
      if (users[user.email]) {
        users[user.email].user = updated;
        localStorage.setItem('dermaai_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
