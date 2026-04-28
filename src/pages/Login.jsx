import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

export default function LoginPage({ onSwitchToRegister, onLoginSuccess, onSwitchToForgot }) {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(email, password);
    
    setLoading(false);
    
    if (result.success) {
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <h1>👑 Caminho do Reino</h1>
        </div>
        
        <h2>Entrar na Conta</h2>
        
        {error && (
          <div className="auth-error">
            {error === 'Failed to fetch'
              ? 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.'
              : error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="auth-links">
          <button type="button" className="link-btn" onClick={onSwitchToRegister}>
            Não tem conta? Cadastre-se
          </button>
          <button type="button" className="link-btn" onClick={onSwitchToForgot}>
            Esqueci a senha
          </button>
        </div>
      </div>
    </div>
  );
}