'use client'

import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const logoutCallbacks = [];
    const loginCallbacks = [];

    const addLogoutCallback = (callback) => {
        logoutCallbacks.push(callback);
    };

    const addLoginCallback = (callback) => {
        loginCallbacks.push(callback);
    };

    const performLogout = () => {
        localStorage.removeItem('isAuth');
        logoutCallbacks.forEach((callback) => callback());
    };

    const performLogin = (id) => {
        localStorage.setItem('isAuth', id);
        loginCallbacks.forEach((callback) => callback());
    };

    return (
        <AuthContext.Provider value={{ addLogoutCallback, addLoginCallback, performLogout, performLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
