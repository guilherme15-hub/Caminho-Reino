import React, { useState } from 'react';
import './QuizGame.css';

const questions = [
  {
    question: "Quantos mandamentos Deus deu a Moisés no Monte Sinai?",
    answers: [
      { text: "7 mandamentos", color: "red", shape: "triangle", isCorrect: false },
      { text: "10 mandamentos", color: "blue", shape: "diamond", isCorrect: true },
      { text: "12 mandamentos", color: "yellow", shape: "circle", isCorrect: false },
      { text: "5 mandamentos", color: "green", shape: "square", isCorrect: false }
    ]
  },
  {
    question: "Quem foi engolido por um grande peixe após desobedecer a Deus?",
    answers: [
      { text: "Moisés", color: "red", shape: "triangle", isCorrect: false },
      { text: "Pedro", color: "blue", shape: "diamond", isCorrect: false },
      { text: "Elias", color: "yellow", shape: "circle", isCorrect: false },
      { text: "Jonas", color: "green", shape: "square", isCorrect: true }
    ]
  },
  {
    question: "Qual foi o primeiro milagre de Jesus registrado na Bíblia?",
    answers: [
      { text: "Curar um cego", color: "red", shape: "triangle", isCorrect: false },
      { text: "Andar sobre as águas", color: "blue", shape: "diamond", isCorrect: false },
      { text: "Transformar água em vinho", color: "yellow", shape: "circle", isCorrect: true },
      { text: "Multiplicar os pães", color: "green", shape: "square", isCorrect: false }
    ]
  },
  {
    question: "Quem derrotou o gigante Golias com apenas uma funda e uma pedra?",
    answers: [
      { text: "Davi", color: "red", shape: "triangle", isCorrect: true },
      { text: "Salomão", color: "blue", shape: "diamond", isCorrect: false },
      { text: "Sansão", color: "yellow", shape: "circle", isCorrect: false },
      { text: "Josué", color: "green", shape: "square", isCorrect: false }
    ]
  },
  {
    question: "Onde Jesus nasceu segundo a Bíblia?",
    answers: [
      { text: "Jerusalém", color: "red", shape: "triangle", isCorrect: false },
      { text: "Nazaré", color: "blue", shape: "diamond", isCorrect: false },
      { text: "Egito", color: "yellow", shape: "circle", isCorrect: false },
      { text: "Belém", color: "green", shape: "square", isCorrect: true }
    ]
  }
];

export default function QuizGame({ onQuit }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = questions[currentQIndex].answers[answerIndex].isCorrect;
    if (isCorrect) {
      setScore(score + 1000); // Pontuação estilo Kahoot
    }
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      if (currentQIndex + 1 < questions.length) {
        setCurrentQIndex(currentQIndex + 1);
      } else {
        setIsFinished(true);
      }
    }, 2500); // Exibe o resultado por 2.5 segundos
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

  if (isFinished) {
    return (
      <div className="quiz-container podium-bg">
        <h1 className="podium-title">Pódio Divino!</h1>
        <div className="score-display">Score final: {score}</div>
        <button className="quit-btn" onClick={onQuit} style={{fontSize: '1.2rem', padding: '15px 30px'}}>Sair do Jogo</button>
      </div>
    );
  }

  const q = questions[currentQIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="question-counter">{currentQIndex + 1} de {questions.length}</div>
        <button className="quit-btn" onClick={onQuit}>Sair</button>
      </div>

      <div className="question-box">
        {q.question}
      </div>

      {showResult && (
        <div className={`result-overlay ${q.answers[selectedAnswer].isCorrect ? 'correct' : 'wrong'}`}>
          <h2>{q.answers[selectedAnswer].isCorrect ? 'Correto!' : 'Incorreto!'}</h2>
          <p>Score atual: {score}</p>
        </div>
      )}

      <div className="answers-grid">
        {q.answers.map((ans, idx) => (
          <button 
            key={idx} 
            className={`answer-btn color-${ans.color} ${showResult && selectedAnswer !== idx ? 'dimmed' : ''}`}
            onClick={() => handleAnswer(idx)}
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
