import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('careertrack_token');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get('/api/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('careertrack_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('careertrack_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const signup = async (name, email, password) => {
    const res = await api.post('/api/auth/signup', { name, email, password });
    localStorage.setItem('careertrack_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem('careertrack_token');
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, signup, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
