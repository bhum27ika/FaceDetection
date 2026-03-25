import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  skinType: string;
  skinConcerns: string[];
  allergies: string[];
  completedQuestionnaire: boolean;
  budget?: string;
  preferredProductTypes?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    } catch (e) {
      console.error('Failed to restore user', e);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      skinType: 'normal',
      skinConcerns: [],
      allergies: [],
      completedQuestionnaire: false,
    };

    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const login = async (email: string, password: string) => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.email === email) {
        setUser(userData);
        return;
      }
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: 'User',
      email,
      skinType: 'normal',
      skinConcerns: [],
      allergies: [],
      completedQuestionnaire: false,
    };

    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, login, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
