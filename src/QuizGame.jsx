import React, { useState } from 'react';
import './QuizGame.css';

// Dados da lição: Jesus se fez carne por amor
const lessonData = {
  title: "Jesus se fez carne por amor",
  theme: "Encarnação, cruz intencional, amor sacrificial",
  chapters: [
    {
      id: 1,
      title: "A Encarnação",
      description: "Jesus deixa a glória celestial e se torna humano",
      icon: "👶",
      questions: [
        {
          question: "Segundo João 1:14, o Verbo se fez carne e habitou entre nós. O que significa 'habitou entre nós'?",
          answers: [
            { text: "Jesus morou em uma tenda", color: "red", shape: "triangle", isCorrect: false },
            { text: "Jesus morou entre as pessoas, como um de nós", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Jesus construiu uma casa em Belém", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Jesus morou no templo", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Em Filipenses 2:5-8, Paulo diz que Jesus se esvaziou. O que Jesus abriu mão ao se encarnar?",
          answers: [
            { text: "Sua divindade", color: "red", shape: "triangle", isCorrect: false },
            { text: "Sua glória celestial e status de igualdade com Deus", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Seu conhecimento divino", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Sua onisciência", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Por que Jesus escolheu nascer de uma virgem em Belém?",
          answers: [
            { text: "Para cumprir profecias e mostrar humilhação", color: "red", shape: "triangle", isCorrect: true },
            { text: "Porque não havia outro lugar disponível", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Para impressionar os reis magos", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Porque Maria preferiu Belém", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Estrela de Belém",
        description: "A estrela que guiou os magos ao Salvador",
        icon: "⭐"
      }
    },
    {
      id: 2,
      title: "A Cruz Intencional",
      description: "Jesus escolhe ir à cruz por amor a nós",
      icon: "✝️",
      questions: [
        {
          question: "O que Jesus quis dizer quando afirmou em João 10:17-18 que ninguém tira Sua vida voluntariamente?",
          answers: [
            { text: "Que foi um acidente", color: "red", shape: "triangle", isCorrect: false },
            { text: "Que Ele escolheu livremente entregar Sua vida por nós", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Que foi imposta pelos líderes religiosos", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Que foi uma derrota para o reino de Deus", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Em Mateus 16:21, Jesus prediz Sua morte e ressurreição. Por que Jesus precisava sofrer?",
          answers: [
            { text: "Como punição por nossos pecados e para nos redimir", color: "red", shape: "triangle", isCorrect: true },
            { text: "Para ser igual aos profetas do Antigo Testamento", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Para demonstrar poder sobre Seus inimigos", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Para cumprir a lei de Moisés", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Segundo Hebreus 9:26, qual era o propósito final do sacrifício de Jesus na cruz?",
          answers: [
            { text: "Trazer condenação sobre o povo judeu", color: "red", shape: "triangle", isCorrect: false },
            { text: "Eliminar o pecado do mundo de uma vez por todas", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Estabelecer um governo político", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Restaurar apenas o povo de Israel", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Cruz de Luz",
        description: "Símbolo do amor sacrificial de Cristo",
        icon: "🕊️"
      }
    },
    {
      id: 3,
      title: "O Amor Sacrificial",
      description: "O amor de Deus se manifesta plenamente na cruz",
      icon: "❤️",
      questions: [
        {
          question: "O que Romanos 5:8 nos ensina ao dizer que Cristo morreu por nós enquanto éramos ainda pecadores?",
          answers: [
            { text: "Que Deus nos ama incondicionalmente, não por mérito", color: "red", shape: "triangle", isCorrect: true },
            { text: "Que Deus só ama pessoas boas e virtuosas", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Que éramos dignos do amor de Deus", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Que o pecado nos impede de ser amados", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Em 1 Tessalonicenses 5:9-10, Paulo diz que Jesus morreu para que vivamos com Ele. O que isso significa?",
          answers: [
            { text: "Que devemos viver com medo do julgamento", color: "red", shape: "triangle", isCorrect: false },
            { text: "Que através da morte de Jesus temos comunhão eterna com Deus", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Que viveremos em abundância material", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Que devemos viver escondidos do mundo", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "De acordo com Efésios 2:4-7, qual é o resultado do amor sacrificial de Deus manifestado na cruz?",
          answers: [
            { text: "Sofrimento contínuo e sofrimento eterno", color: "red", shape: "triangle", isCorrect: false },
            { text: "Ressurreição espiritual conosco e vida nos lugares celestiais", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Punição eterna sem redenção", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Esquecimento de nossos pecados passados", color: "green", shape: "square", isCorrect: false }
          ]
        }
      ],
      reward: {
        name: "Coração Divino",
        description: "O amor eterno de Deus por nós",
        icon: "💖"
      }
    }
  ]
};

export default function QuizGame({ onQuit }) {
  const [gameState, setGameState] = useState('menu'); // menu, map, quiz, result, inventory
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [chaptersCompleted, setChaptersCompleted] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const handleAnswer = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const chapter = lessonData.chapters[currentChapter];
    const isCorrect = chapter.questions[currentQIndex].answers[answerIndex].isCorrect;
    
    if (isCorrect) {
      setScore(score + 1000);
      setCorrectAnswers(prev => [...prev, true]);
    } else {
      setCorrectAnswers(prev => [...prev, false]);
    }
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      
      if (currentQIndex + 1 < chapter.questions.length) {
        setCurrentQIndex(currentQIndex + 1);
      } else {
        // Capítulo completo - verificar se acertou todas as perguntas
        const allAnswers = correctAnswers.concat([isCorrect]);
        const allCorrect = allAnswers.length === chapter.questions.length && 
                          allAnswers.every(answer => answer === true);
        
        if (allCorrect) {
          const reward = chapter.reward;
          setInventory(prev => [...prev, { ...reward, chapterId: currentChapter }]);
          setChaptersCompleted(prev => [...prev, currentChapter]);
          setTotalScore(prev => prev + score + 1000);
        }
        setGameState('result');
      }
    }, 2500);
  };

  const startChapter = (chapterId) => {
    setCurrentChapter(chapterId);
    setCurrentQIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setCorrectAnswers([]);
    setGameState('quiz');
  };

  const getShapeSvg = (shape) => {
    switch(shape) {
      case 'triangle': return <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>;
      case 'diamond': return <svg viewBox="0 0 24 24"><rect width="16" height="16" x="4" y="4" transform="rotate(45 12 12)"/></svg>;
      case 'circle': return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>;
      case 'square': return <svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>;
      default: return null;
    }
  };

  // Tela de Menu Inicial
  if (gameState === 'menu') {
    return (
      <div className="quiz-container menu-bg">
        <div className="menu-content">
          <h1 className="menu-title">👑</h1>
          <h2 className="menu-subtitle">{lessonData.title}</h2>
          <p className="menu-theme">{lessonData.theme}</p>
          
          <div className="menu-buttons">
            <button className="menu-btn primary" onClick={() => setGameState('map')}>
              🎮 Iniciar Jogo
            </button>
            <button className="menu-btn secondary" onClick={() => setGameState('inventory')}>
              🎒 Inventário {inventory.length > 0 && <span className="badge">{inventory.length}</span>}
            </button>
          </div>
          
          <div className="menu-info">
            <p>Complete os 3 capítulos para coletar todas as recompensas!</p>
          </div>
        </div>
      </div>
    );
  }

  // Tela do Mapa (Capítulos)
  if (gameState === 'map') {
    return (
      <div className="quiz-container map-bg">
        <div className="map-header">
          <button className="back-btn" onClick={() => setGameState('menu')}>← Voltar</button>
          <h2>🗺️ Mapa da Lição</h2>
          <div className="score-display">⭐ {totalScore}</div>
        </div>
        
        <div className="chapters-list">
          {lessonData.chapters.map((chapter, index) => {
            const isCompleted = chaptersCompleted.includes(index);
            return (
              <div key={chapter.id} className={`chapter-card ${isCompleted ? 'completed' : ''}`}>
                <div className="chapter-icon">{chapter.icon}</div>
                <div className="chapter-info">
                  <h3>Capítulo {index + 1}: {chapter.title}</h3>
                  <p>{chapter.description}</p>
                  <span className="chapter-questions">{chapter.questions.length} perguntas</span>
                </div>
                <div className="chapter-action">
                  {isCompleted ? (
                    <span className="completed-badge">✓ Concluído</span>
                  ) : (
                    <button className="play-btn" onClick={() => startChapter(index)}>
                      ▶ Jogar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Tela de Resultado do Capítulo
  if (gameState === 'result') {
    const chapter = lessonData.chapters[currentChapter];
    const reward = chapter.reward;
    const isChapterCompleted = chaptersCompleted.includes(currentChapter);
    
    return (
      <div className="quiz-container result-bg">
        <div className="result-content">
          {isChapterCompleted ? (
            <>
              <h1>🎉 Capítulo Completo!</h1>
              <div className="chapter-title">{chapter.title}</div>
              
              <div className="score-section">
                <div className="score-label">Pontuação deste capítulo</div>
                <div className="score-value">{score}</div>
              </div>
              
              <div className="reward-section">
                <h3>Recompensa Obtida!</h3>
                <div className="reward-card">
                  <div className="reward-icon">{reward.icon}</div>
                  <div className="reward-name">{reward.name}</div>
                  <div className="reward-desc">{reward.description}</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1>❌ Capítulo Não Concluído</h1>
              <div className="chapter-title">{chapter.title}</div>
              
              <div className="score-section">
                <div className="score-label">Você errou uma ou mais perguntas</div>
                <p style={{ textAlign: 'center', marginTop: '15px' }}>Acerte todas as 3 perguntas para ganhar a recompensa!</p>
              </div>
            </>
          )}
          
          <div className="result-buttons">
            {!isChapterCompleted && (
              <button className="menu-btn primary" onClick={() => startChapter(currentChapter)}>
                🔄 Tentar Novamente
              </button>
            )}
            <button className="menu-btn primary" onClick={() => setGameState('map')}>
              Ver Mapa
            </button>
            <button className="menu-btn secondary" onClick={() => setGameState('inventory')}>
              Ver Inventário
            </button>
            <button className="menu-btn secondary" onClick={() => { setGameState('menu'); setCurrentChapter(null); }}>
              🏠 Menu Inicial
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Inventário
  if (gameState === 'inventory') {
    return (
      <div className="quiz-container inventory-bg">
        <div className="inventory-header">
          <button className="back-btn" onClick={() => setGameState('map')}>← Voltar</button>
          <h2>🎒 Meu Inventário</h2>
          <button className="back-btn" onClick={() => { setGameState('menu'); setCurrentChapter(null); }} style={{ float: 'right' }}>🏠 Menu</button>
        </div>
        
        <div className="inventory-stats">
          <div className="stat">
            <span className="stat-value">{totalScore}</span>
            <span className="stat-label">Pontos Totais</span>
          </div>
          <div className="stat">
            <span className="stat-value">{chaptersCompleted.length}/{lessonData.chapters.length}</span>
            <span className="stat-label">Capítulos</span>
          </div>
          <div className="stat">
            <span className="stat-value">{inventory.length}</span>
            <span className="stat-label">Itens</span>
          </div>
        </div>
        
        {inventory.length === 0 ? (
          <div className="empty-inventory">
            <p>Seu inventário está vazio.</p>
            <p>Complete capítulos para ganhar recompensas!</p>
          </div>
        ) : (
          <div className="inventory-grid">
            {inventory.map((item, index) => (
              <div key={index} className="inventory-item">
                <div className="item-icon">{item.icon}</div>
                <div className="item-name">{item.name}</div>
                <div className="item-desc">{item.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Tela de Quiz (Perguntas)
  if (currentChapter === null) {
    return null; // Prevenir erro se currentChapter não for definido
  }
  
  const chapter = lessonData.chapters[currentChapter];
  const q = chapter.questions[currentQIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-btn" onClick={() => setGameState('map')}>← Mapa</button>
        <div className="chapter-name">{chapter.title}</div>
        <div className="score-display">⭐ {score}</div>
      </div>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{width: `${((currentQIndex + 1) / chapter.questions.length) * 100}%`}}
          ></div>
        </div>
        <div className="question-counter">Pergunta {currentQIndex + 1} de {chapter.questions.length}</div>
      </div>

      <div className="question-box">
        {q.question}
      </div>

      {showResult && (
        <div className={`result-overlay ${q.answers[selectedAnswer].isCorrect ? 'correct' : 'wrong'}`}>
          <h2>{q.answers[selectedAnswer].isCorrect ? '✅ Correto!' : '❌ Incorreto!'}</h2>
          <p>Pontuação: {score}</p>
        </div>
      )}

      <div className="answers-grid">
        {q.answers.map((ans, idx) => (
          <button 
            key={idx} 
            className={`answer-btn color-${ans.color} ${showResult && selectedAnswer !== idx ? 'dimmed' : ''}`}
            onClick={() => handleAnswer(idx)}
            disabled={showResult}
          >
            <div className="shape-icon">
              {getShapeSvg(ans.shape)}
            </div>
            <span className="answer-text">{ans.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
