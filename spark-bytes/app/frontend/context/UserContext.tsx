// this provides context for the user's "state" it can give info for if the user 
// is a student or a event organizer 

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface UserContextType {
  isLoggedIn: boolean;
  userType: 'student' | 'event_organiser' | null;
  userId: string | null;
  login: (type: 'student' | 'event_organiser', token: string, userId: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userType, setUserType] = useState<'student' | 'event_organiser' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Check local storage for user state on initial load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const type = localStorage.getItem('user_type');
    const id = localStorage.getItem('user_id');
    if (token && type) {
      setIsLoggedIn(true);
      setUserType(type as 'student' | 'event_organiser');
      setUserId(id);
    }
  }, []);

  const login = (type: 'student' | 'event_organiser', token: string, id: string) => {
    console.log(id);
    setIsLoggedIn(true);
    setUserType(type);
    setUserId(id);
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_type', type);
    localStorage.setItem('user_id', id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserId(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_id');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userType, userId, login, logout }}>
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