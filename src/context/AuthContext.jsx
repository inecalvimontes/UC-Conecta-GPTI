import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const UC_DOMAINS = ['@uc.cl', '@estudiante.uc.cl'];

function isUCEmail(email) {
  const lower = (email ?? '').toLowerCase().trim();
  return UC_DOMAINS.some((domain) => lower.endsWith(domain));
}

function loadUserData() {
  try {
    const raw = localStorage.getItem('uconecta_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveUserData(userData) {
  if (userData) {
    localStorage.setItem('uconecta_user', JSON.stringify(userData));
  } else {
    localStorage.removeItem('uconecta_user');
  }
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(loadUserData);
  const isAuthenticated = Boolean(userData?.user);

  const login = useCallback(async (email, _password) => {
    if (!isUCEmail(email)) {
      throw new Error('Solo puedes iniciar sesión con un correo @uc.cl o @estudiante.uc.cl');
    }
    await new Promise((r) => setTimeout(r, 1000));
    const user = { email: email.toLowerCase().trim(), name: email.split('@')[0] };
    const newUserData = {
      user,
      subscriptions: [],
    };
    setUserData(newUserData);
    saveUserData(newUserData);
    return user;
  }, []);

  const register = useCallback(async ({ name, email, password, carrera }) => {
    if (!isUCEmail(email)) {
      throw new Error('Solo puedes registrarte con un correo @uc.cl o @estudiante.uc.cl');
    }
    await new Promise((r) => setTimeout(r, 1000));
    const user = {
      email: email.toLowerCase().trim(),
      name: name.trim(),
      carrera,
    };
    const newUserData = {
      user,
      subscriptions: [],
    };
    setUserData(newUserData);
    saveUserData(newUserData);
    return user;
  }, []);

  const logout = useCallback(() => {
    setUserData(null);
    saveUserData(null);
  }, []);

  const subscribe = useCallback((eventId) => {
    setUserData((prev) => {
      if (!prev) return prev;
      const subscriptions = prev.subscriptions.includes(eventId)
        ? prev.subscriptions
        : [...prev.subscriptions, eventId];
      const newUserData = { ...prev, subscriptions };
      saveUserData(newUserData);
      return newUserData;
    });
  }, []);

  const unsubscribe = useCallback((eventId) => {
    setUserData((prev) => {
      if (!prev) return prev;
      const subscriptions = prev.subscriptions.filter((id) => id !== eventId);
      const newUserData = { ...prev, subscriptions };
      saveUserData(newUserData);
      return newUserData;
    });
  }, []);

  const isSubscribed = useCallback((eventId) => {
    return userData?.subscriptions.includes(eventId) ?? false;
  }, [userData]);

  const value = useMemo(
    () => ({
      user: userData?.user || null,
      isAuthenticated,
      subscriptions: userData?.subscriptions || [],
      login,
      register,
      logout,
      subscribe,
      unsubscribe,
      isSubscribed,
    }),
    [userData, isAuthenticated, login, register, logout, subscribe, unsubscribe, isSubscribed],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
