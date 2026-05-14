import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const UC_DOMAINS = ['@uc.cl', '@estudiante.uc.cl'];

function isUCEmail(email) {
  const lower = (email ?? '').toLowerCase().trim();
  return UC_DOMAINS.some((domain) => lower.endsWith(domain));
}

function loadUser() {
  try {
    const raw = localStorage.getItem('uconecta_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveUser(user) {
  if (user) {
    localStorage.setItem('uconecta_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('uconecta_user');
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);
  const isAuthenticated = Boolean(user);

  const login = useCallback(async (email, _password) => {
    if (!isUCEmail(email)) {
      throw new Error('Solo puedes iniciar sesión con un correo @uc.cl o @estudiante.uc.cl');
    }
    await new Promise((r) => setTimeout(r, 1000));
    const loggedUser = { email: email.toLowerCase().trim(), name: email.split('@')[0] };
    setUser(loggedUser);
    saveUser(loggedUser);
    return loggedUser;
  }, []);

  const register = useCallback(async ({ name, email, password, carrera }) => {
    if (!isUCEmail(email)) {
      throw new Error('Solo puedes registrarte con un correo @uc.cl o @estudiante.uc.cl');
    }
    await new Promise((r) => setTimeout(r, 1000));
    const newUser = {
      email: email.toLowerCase().trim(),
      name: name.trim(),
      carrera,
    };
    setUser(newUser);
    saveUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    saveUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, login, register, logout }),
    [user, isAuthenticated, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
