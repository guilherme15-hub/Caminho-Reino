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
          question: "Em João 10:17-18, Jesus diz que ninguém tira Sua vida, mas Ele a entrega. O que isso revela sobre Sua morte?",
          answers: [
            { text: "Foi um acidente", color: "red", shape: "triangle", isCorrect: false },
            { text: "Foi uma decisão voluntária por amor", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Foi imposta pelos líderes religiosos", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Foi uma derrota para Satanás", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Qual foi a razão principal pela qual Jesus veio à terra, segundo Lucas 9:56?",
          answers: [
            { text: "Para estabelecer um reino político", color: "red", shape: "triangle", isCorrect: false },
            { text: "Para buscar e salvar o que estava perdido", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Para realizar milagres e impressionar multidões", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Para ensinar a lei de Moisés", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Isaías 53:5 diz que Jesus foi ferido por nossas transgressões. O que isso significa?",
          answers: [
            { text: "Jesus sofreu física e espiritualmente em nosso lugar", color: "red", shape: "triangle", isCorrect: true },
            { text: "Jesus foi punido por Seus próprios pecados", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Jesus foi ferido pelos soldados romanos", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Jesus foi ferido pela multidão", color: "green", shape: "square", isCorrect: false }
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
          question: "Romanos 5:8 diz que Cristo morreu por nós. O que isso demonstra sobre o amor de Deus?",
          answers: [
            { text: "Deus nos ama mesmo sendo pecadores", color: "red", shape: "triangle", isCorrect: true },
            { text: "Deus só ama pessoas boas", color: "blue", shape: "diamond", isCorrect: false },
            { text: "Deus mudou de ideia sobre nós", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Deus precisou nos salvar por obrigação", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Em João 15:13, Jesus diz que não há maior amor do que este. Qual é esse amor?",
          answers: [
            { text: "Amar os amigos", color: "red", shape: "triangle", isCorrect: false },
            { text: "Dar a vida pelos amigos", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Amar a família", color: "yellow", shape: "circle", isCorrect: false },
            { text: "Amar a pátria", color: "green", shape: "square", isCorrect: false }
          ]
        },
        {
          question: "Após a crucificação, Jesus foi colocado em um túmulo novo. O que isso simboliza?",
          answers: [
            { text: "O fim da história", color: "red", shape: "triangle", isCorrect: false },
            { text: "O sacrifício completo e a sepultura do velho homem", color: "blue", shape: "diamond", isCorrect: true },
            { text: "Uma sepultura comum", color: "yellow", shape: "circle", isCorrect: false },
            { text: "O esquecimento de Jesus", color: "green", shape: "square", isCorrect: false }
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

  const handleAnswer = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const chapter = lessonData.chapters[currentChapter];
    const isCorrect = chapter.questions[currentQIndex].answers[answerIndex].isCorrect;
    
    if (isCorrect) {
      setScore(score + 1000);
    }
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      
      if (currentQIndex + 1 < chapter.questions.length) {
        setCurrentQIndex(currentQIndex + 1);
      } else {
        // Capítulo completo - adicionar recompensa
        const reward = chapter.reward;
        setInventory(prev => [...prev, { ...reward, chapterId: chapter.id }]);
        setChaptersCompleted(prev => [...prev, chapter.id]);
        setTotalScore(prev => prev + score + (isCorrect ? 1000 : 0));
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
            const isCompleted = chaptersCompleted.includes(chapter.id);
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
                    <button className="play-btn" onClick={() => startChapter(chapter.id)}>
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
    
    return (
      <div className="quiz-container result-bg">
        <div className="result-content">
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
          
          <div className="result-buttons">
            <button className="menu-btn primary" onClick={() => setGameState('map')}>
              Ver Mapa
            </button>
            <button className="menu-btn secondary" onClick={() => setGameState('inventory')}>
              Ver Inventário
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
