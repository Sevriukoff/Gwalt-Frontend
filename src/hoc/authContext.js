'use client'

import {createContext, useContext, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children, initialIsAuthenticated = false, initialUserId = -1 }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
  const [userId, setUserId] = useState(initialUserId);

  return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};