import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const STORAGE_USER = "caminho-reino-user";

const loadUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_USER);
    if (stored) {
      return JSON.parse(stored);
    }
    // Cria usuário anônimo padrão se não existir
    const newUser = {
      id: Date.now(),
      name: 'Viajante',
      isAnonymous: true,
      progress: {
        quests_completed: 0,
        badges: 0,
        study_time: 0,
        points: 0
      }
    };
    localStorage.setItem(STORAGE_USER, JSON.stringify(newUser));
    return newUser;
  } catch {
    return null;
  }
};

const saveUser = (user) => {
  localStorage.setItem(STORAGE_USER, JSON.stringify(user));
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = loadUser();
    if (storedUser) {
      setUser(storedUser);
      setProgress(storedUser.progress || null);
    }
    setLoading(false);
  }, []);

  const updateProgress = (newProgress) => {
    if (user) {
      const updated = { ...user, progress: newProgress };
      setUser(updated);
      setProgress(newProgress);
      saveUser(updated);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      progress,
      loading,
      updateProgress,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
