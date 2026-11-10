'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface SignUpData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ⚠️ DEMO MODE: Data disimpan di sessionStorage saja.
// Produksi harus menggunakan PostgreSQL + JWT + HTTP-only cookies.
const DEMO_USERS_KEY = 'wus_demo_users';
const DEMO_SESSION_KEY = 'wus_demo_session';

function getDemoUsers(): Array<{ id: string; name: string; email: string; phone: string; passwordHash: string }> {
  try {
    return JSON.parse(localStorage.getItem(DEMO_USERS_KEY) || '[]');
  } catch { return []; }
}

function simpleHash(str: string): string {
  // DEMO ONLY — not for production
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isAuthenticated: false, isLoading: true });

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      try {
        const session = sessionStorage.getItem(DEMO_SESSION_KEY);
        if (session) {
          const user = JSON.parse(session) as User;
          setState({ user, isAuthenticated: true, isLoading: false });
        } else {
          setState(s => ({ ...s, isLoading: false }));
        }
      } catch {
        setState(s => ({ ...s, isLoading: false }));
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setState(s => ({ ...s, isLoading: true }));
    await new Promise(r => setTimeout(r, 800)); // simulate network

    const users = getDemoUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      setState(s => ({ ...s, isLoading: false }));
      return { success: false, error: 'Email tidak terdaftar.' };
    }
    if (found.passwordHash !== simpleHash(password)) {
      setState(s => ({ ...s, isLoading: false }));
      return { success: false, error: 'Kata sandi salah.' };
    }

    const user: User = { id: found.id, name: found.name, email: found.email, phone: found.phone, address: 'Jl. Melati No.12, Surakarta' };
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
    return { success: true };
  };

  const signUp = async (data: SignUpData) => {
    setState(s => ({ ...s, isLoading: true }));
    await new Promise(r => setTimeout(r, 800));

    const users = getDemoUsers();
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      setState(s => ({ ...s, isLoading: false }));
      return { success: false, error: 'Email sudah terdaftar.' };
    }

    const newUser = { id: `user-${Date.now()}`, name: data.name, email: data.email, phone: data.phone, passwordHash: simpleHash(data.password) };
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify([...users, newUser]));

    const user: User = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, address: '' };
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
    return { success: true };
  };

  const signOut = () => {
    sessionStorage.removeItem(DEMO_SESSION_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const updateUser = (data: Partial<User>) => {
    if (!state.user) return;
    const updated = { ...state.user, ...data };
    sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(updated));
    setState(s => ({ ...s, user: updated }));
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
