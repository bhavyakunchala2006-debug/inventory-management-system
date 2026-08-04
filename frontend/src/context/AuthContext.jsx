import React, { createContext, useState, useEffect } from 'react';
import { getToken, getUser, setToken, setUser, clearAuthStorage } from '../utils/tokenStorage';
import { loginApi, registerApi, getProfileApi, changePasswordApi } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setTokenState(null);
    setUserState(null);
    clearAuthStorage();
  };

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const profile = await getProfileApi();
          setUserState(profile);
          setUser(profile);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    setTokenState(data.token);
    setUserState(data.user);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await registerApi(userData);
    setTokenState(data.token);
    setUserState(data.user);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const changePassword = async (passwordData) => {
    const data = await changePasswordApi(passwordData);
    return data;
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (Array.isArray(roles)) return roles.includes(user.role);
    return user.role === roles;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        changePassword,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
