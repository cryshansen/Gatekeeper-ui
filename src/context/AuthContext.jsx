import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = unknown (cookie may or may not be valid until a secure call confirms it)
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const login = useCallback(async (username, password) => {
    await authApi.login(username, password);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setIsAuthenticated(false);
    }
  }, []);

  const notifyUnauthorized = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout, notifyUnauthorized }),
    [isAuthenticated, login, logout, notifyUnauthorized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
