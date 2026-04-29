import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const STORAGE_USERS = "caminho-reino-users";
const STORAGE_CURRENT_USER = "caminho-reino-current-user";
const STORAGE_RESET_TOKENS = "caminho-reino-reset-tokens";

const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
};

const loadCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_CURRENT_USER));
  } catch {
    return null;
  }
};

const saveCurrentUser = (user) => {
  localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(user));
};

const removeCurrentUser = () => {
  localStorage.removeItem(STORAGE_CURRENT_USER);
};

const loadResetTokens = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_RESET_TOKENS) || '{}');
  } catch {
    return {};
  }
};

const saveResetTokens = (tokens) => {
  localStorage.setItem(STORAGE_RESET_TOKENS, JSON.stringify(tokens));
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = loadCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setProgress(storedUser.progress || null);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found || found.password !== password) {
      const message = 'Email or password incorrect';
      setError(message);
      return { success: false, error: message };
    }

    const currentUser = { ...found };
    setUser(currentUser);
    setProgress(currentUser.progress || null);
    saveCurrentUser(currentUser);

    return { success: true };
  };

  const register = async (name, email, password) => {
    setError(null);
    const users = loadUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      const message = 'Email already registered';
      setError(message);
      return { success: false, error: message };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      progress: {
        quests_completed: 0,
        badges: 0,
        study_time: 0,
        points: 0
      }
    };

    users.push(newUser);
    saveUsers(users);
    saveCurrentUser(newUser);
    setUser(newUser);
    setProgress(newUser.progress);

    return { success: true };
  };

  const forgotPassword = async (email) => {
    setError(null);
    const users = loadUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      const message = 'Email not found';
      setError(message);
      return { success: false, error: message };
    }

    const token = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const tokens = loadResetTokens();
    tokens[token] = found.email;
    saveResetTokens(tokens);

    return {
      success: true,
      message: 'Password reset token generated',
      resetToken: token
    };
  };

  const resetPassword = async (token, newPassword) => {
    setError(null);
    const tokens = loadResetTokens();
    const email = tokens[token];

    if (!email) {
      const message = 'Invalid or expired token';
      setError(message);
      return { success: false, error: message };
    }

    const users = loadUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
      const message = 'User not found';
      setError(message);
      return { success: false, error: message };
    }

    users[userIndex].password = newPassword;
    saveUsers(users);

    delete tokens[token];
    saveResetTokens(tokens);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setProgress(null);
    removeCurrentUser();
  };

  return (
    <AuthContext.Provider value={{
      user,
      progress,
      loading,
      error,
      login,
      register,
      forgotPassword,
      resetPassword,
      logout,
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
