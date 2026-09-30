import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useNotificationStore from '../store/useNotificationStore';
import { loginApi, logoutApi, refreshSessionApi } from '../services/authApi';
import { decodeToken, isTokenExpired } from '../utils/jwt';

const AuthContext = createContext();

function buildUserFromIdToken(idToken) {
  const payload = decodeToken(idToken);
  if (!payload) return null;

  const groups = payload['cognito:groups'] || [];
  return {
    id: payload.sub,
    name: payload.email,
    email: payload.email,
    role: groups[0] || 'USER',
  };
}

export const AuthProvider = ({ children }) => {
  const [idToken, setIdToken] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const addNotification = useNotificationStore((state) => state.addNotification);
  const navigate = useNavigate();
  const refreshTimer = useRef(null);

  const login = async (email, password) => {
    const session = await loginApi({ email, password });
    setIdToken(session.idToken);
    return session;
  };

  const logout = () => {
    logoutApi();
    setIdToken(null);
    navigate('/login');
  };

  // On first load: is there already a valid (or refreshable) session?
  useEffect(() => {
    refreshSessionApi()
      .then((session) => setIdToken(session.idToken))
      .catch(() => setIdToken(null))
      .finally(() => setIsInitializing(false));
  }, []);

  // Refresh the token quietly, shortly BEFORE it expires, instead of
  // forcing a logout the moment it does (that was the Day 10 mock's
  // simplification — real sessions shouldn't die just because 60 minutes
  // passed while you were reading a ticket).
  useEffect(() => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    if (!idToken) return;

    const payload = decodeToken(idToken);
    const msUntilExpiry = payload.exp * 1000 - Date.now();
    const refreshAt = Math.max(msUntilExpiry - 30000, 0); // 30s head start

    refreshTimer.current = setTimeout(async () => {
      try {
        const session = await refreshSessionApi();
        setIdToken(session.idToken);
      } catch {
        // The refresh token itself is gone or expired — NOW it's a real logout
        setIdToken(null);
        addNotification({
          type: 'error',
          title: 'Session expired',
          message: 'Please log in again to continue.',
        });
        navigate('/login');
      }
    }, refreshAt);

    return () => clearTimeout(refreshTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken]);

  const user = useMemo(() => buildUserFromIdToken(idToken), [idToken]);

  const value = useMemo(
    () => ({
      user,
      idToken,
      isAuthenticated: Boolean(user && idToken && !isTokenExpired(idToken)),
      isInitializing,
      login,
      logout,
    }),
    [user, idToken, isInitializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;