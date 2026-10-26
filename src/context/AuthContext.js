import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { storageService } from '../storage/storageService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    checkInitialState();
  }, []);

  const checkInitialState = async () => {
    try {
      setLoading(true);
      const seen = await storageService.getOnboardingSeen();
      setHasSeenOnboarding(seen);

      const session = await authService.getCurrentSession();
      if (session) {
        setUser(session);
      }
    } catch (e) {
      console.error('Failed to load initial auth state:', e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, rememberMe) => {
    const loggedUser = await authService.login(email, password, rememberMe);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (fullName, email, password) => {
    const newUser = await authService.register(fullName, email, password);
    return newUser;
  };

  const verifyOTP = async (otpCode) => {
    return await authService.verifyOTP(otpCode);
  };

  const resetPassword = async (email, newPassword) => {
    return await authService.resetPassword(email, newPassword);
  };

  const updateProfile = async (fields) => {
    const updated = await userService.updateProfile(fields);
    setUser(updated);
    return updated;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const completeOnboarding = async () => {
    await storageService.setOnboardingSeen(true);
    setHasSeenOnboarding(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        hasSeenOnboarding,
        login,
        register,
        verifyOTP,
        resetPassword,
        updateProfile,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
