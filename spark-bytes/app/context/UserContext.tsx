// this provides context for the user's "state" it can give info for if the user 
// is a student or a event organizer
// (it's not complete cuz its not fully connected to the data base i.e. the useEffect part)

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  isLoggedIn: boolean;
  userType: 'student' | 'event_organiser' | null;
  login: (type: 'student' | 'event_organiser') => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'student' | 'event_organiser' | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Here you would typically fetch user data from your API
      // For demonstration, let's assume the user type is stored in localStorage
      const type = localStorage.getItem('user_type') as 'student' | 'event_organiser' | null;
      setIsLoggedIn(true);
      setUserType(type);
    }
  }, []);

  const login = (type: 'student' | 'event_organiser') => {
    setIsLoggedIn(true);
    setUserType(type);
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