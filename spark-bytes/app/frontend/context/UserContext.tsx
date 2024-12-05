// this provides context for the user's "state" it can give info for if the user 
// is a student or a event organizer 

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface UserContextType {
  isLoggedIn: boolean;
  userType: 'student' | 'event_organiser' | null;
  login: (type: 'student' | 'event_organiser') => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userType, setUserType] = useState<'student' | 'event_organiser' | null>(null);

  // Check local storage for user state on initial load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const type = localStorage.getItem('user_type');
    if (token && type) {
      setIsLoggedIn(true);
      setUserType(type as 'student' | 'event_organiser');
    }
  }, []);

  const login = (type: 'student' | 'event_organiser', token: string) => {
    setIsLoggedIn(true);
    setUserType(type);
    localStorage.setItem('access_token', token); // Replace with actual token
    localStorage.setItem('user_type', type);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_type');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 