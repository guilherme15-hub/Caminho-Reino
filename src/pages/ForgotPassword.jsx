import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

export default function ForgotPasswordPage({ onBackToLogin }) {
  const { forgotPassword, error } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await forgotPassword(email);
    
    setLoading(false);
    
    if (result.success) {
      setSuccess(true);
      setResetToken(result.token || '');
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-logo">
            <h1>👑 Caminho do Reino</h1>
          </div>
          
          <div className="auth-success">
            <h2>📧 Email Enviado!</h2>
            <p>Verifique sua caixa de email para recuperar sua senha.</p>
            {resetToken && (
              <div className="debug-token">
                <p><strong>Token (teste):</strong></p>
                <code>{resetToken}</code>
              </div>
            )}
          </div>
          
          <button type="button" className="auth-btn" onClick={onBackToLogin}>
            Voltar ao Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <h1>👑 Caminho do Reino</h1>
        </div>
        
        <h2>Esqueci a Senha</h2>
        <p className="auth-subtitle">Digite seu email para receber o link de recuperação</p>
        
        {error && <div className="auth-error">{error}</div>}
        
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
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
          </button>
        </form>
        
        <div className="auth-links">
          <button type="button" className="link-btn" onClick={onBackToLogin}>
            ← Voltar ao Login
          </button>
        </div>
      </div>
    </div>
  );
}