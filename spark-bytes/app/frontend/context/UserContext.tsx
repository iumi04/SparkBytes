// this provides context for the user's "state" it can give info for if the user 
// is a student or a event organizer 

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
      // Fetch user data from the database
      fetch('http://localhost:5000/get-login', { // Adjust the URL as needed
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the user data contains a 'role' field
        const type = data.length > 0 ? data[0].role : null; // Adjust based on your data structure
        setIsLoggedIn(true);
        setUserType(type);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        setUserType(null);
      });
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
    alert('You have been logged out successfully.');
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