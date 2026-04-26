import React, { useState } from 'react';
import './App.css';
import QuizGame from './QuizGame';

// Ícones simples em SVG
const HomeIcon = () => (<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>);
const DiscoverIcon = () => (<svg viewBox="0 0 24 24"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg>);
const CreateIcon = () => (<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>);
const LibraryIcon = () => (<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>);
const ProfileIcon = () => (<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>);
const SearchIcon = () => (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>);
const NotificationsIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>);

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');

  return (
    <div className="app-container">
      
      {/* Top Navigation Bar */}
      {activeTab !== 'play' && (
        <div className="top-bar">
          <div className="top-bar-logo">Caminho do Reino</div>
          <div className="top-bar-actions">
            <button className="icon-btn"><SearchIcon /></button>
            <button className="icon-btn"><NotificationsIcon /></button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="main-content">
        {activeTab === 'discover' && <DiscoverPage onPlay={() => setActiveTab('play')} />}
        {activeTab === 'play' && <QuizGame onQuit={() => setActiveTab('discover')} />}
        
        {activeTab !== 'discover' && activeTab !== 'play' && (
          <div style={{ padding: 20, textAlign:'center', color: '#fff', marginTop: '50px' }}>
            <h2>Em Desenvolvimento</h2>
            <p>Você está na aba {activeTab}. Apenas a tela "Descobrir" está implementada como modelo inicial.</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      {activeTab !== 'play' && (
        <div className="bottom-nav">
          <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <HomeIcon /> Início
          </button>
          <button className={`nav-item ${activeTab === 'discover' ? 'active' : ''}`} onClick={() => setActiveTab('discover')}>
            <DiscoverIcon /> Descobrir
          </button>
          
          <button className="nav-create-btn" onClick={() => setActiveTab('play')}>
            <span>+</span>
          </button>

          <button className={`nav-item ${activeTab === 'criar' ? 'active' : ''}`} onClick={() => setActiveTab('criar')}>
            <CreateIcon /> Criar
          </button>
          <button className={`nav-item ${activeTab === 'biblioteca' ? 'active' : ''}`} onClick={() => setActiveTab('biblioteca')}>
            <LibraryIcon /> Estudos
          </button>
        </div>
      )}

    </div>
  );
}

// ---------------------------
// Discover Page Components
// ---------------------------
function DiscoverPage({ onPlay }) {
  return (
    <div className="discover-container">
      
      {/* Hero Banner */}
      <div className="hero-card" onClick={onPlay} style={{cursor: 'pointer'}}>
        <img 
          src="/caminho_banner_bible.png" 
          alt="Trilha do Reino" 
          className="hero-card-image"
        />
        <div className="hero-card-content">
          <div className="tags">
            <span className="tag">Destaque</span>
            <span className="tag">Novo</span>
          </div>
          <h2>Boas-vindas ao Reino!</h2>
          <p>Comemore o aprendizado coletivo e ganhe recompensas ao trabalhar em conjunto. Explore trilhas temáticas espirituais.</p>
          <button className="hero-btn" onClick={(e) => { e.stopPropagation(); onPlay(); }}>Conheça o Caminho!</button>
        </div>
      </div>

      {/* Título de Seção */}
      <h3 className="section-title">Modos de Estudo</h3>
      
      {/* Sub Categorias (Tabs Horizontais) */}
      <div className="category-tabs">
        <button className="tab-btn active">Tudo</button>
        <button className="tab-btn">Participação</button>
        <button className="tab-btn">Competição em equipe</button>
        <button className="tab-btn">Colaboração</button>
      </div>

      <div style={{ height: '16px' }} />

      {/* Área de Cards na Grade */}
      <div className="grid-cards">
        
        <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
          <img src="/caminho_classic.png" alt="Clássico" className="game-card-image" style={{backgroundColor: '#e21b3c'}} />
          <div className="shape-badge"><svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg></div>
          <div className="game-card-content">
            <h3>Clássico (Estudo Individual)</h3>
          </div>
        </div>

        <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
          <img src="/caminho_reinos.png" alt="Reinos" className="game-card-image" style={{backgroundColor: '#25c0e8'}} />
          <div className="shape-badge"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg></div>
          <div className="game-card-content">
            <h3>Reinos das Cores</h3>
          </div>
        </div>

        <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
          <img src="/caminho_tesouro.png" alt="Tesouro" className="game-card-image" style={{backgroundColor: '#ffa602'}} />
          <div className="shape-badge"><svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg></div>
          <div className="game-card-content">
            <h3>Baú do Tesouro</h3>
          </div>
        </div>

        <div className="game-card" onClick={onPlay} style={{cursor: 'pointer'}}>
          <img src="/caminho_torre.png" alt="Torre" className="game-card-image" style={{backgroundColor: '#26890c'}} />
          <div className="shape-badge" style={{backgroundColor: '#e21b3c'}}><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div className="game-card-content">
            <h3>Torre Mais Alta</h3>
          </div>
        </div>

      </div>

    </div>
  );
}
