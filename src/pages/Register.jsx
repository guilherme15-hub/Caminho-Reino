import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

export default function RegisterPage({ onSwitchToLogin, onRegisterSuccess }) {
  const { register, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    setLoading(true);
    
    const result = await register(name, email, password);
    
    setLoading(false);
    
    if (result.success) {
      if (onRegisterSuccess) onRegisterSuccess();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <h1>👑 Caminho do Reino</h1>
        </div>
        
        <h2>Criar Conta</h2>
        
        {error && (
          <div className="auth-error">
            {error === 'Failed to fetch'
              ? 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.'
              : error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>
          
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
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
              required
            />
          </div>
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>
        
        <div className="auth-links">
          <button type="button" className="link-btn" onClick={onSwitchToLogin}>
            Já tem conta? Entre
          </button>
        </div>
      </div>
    </div>
  );
}