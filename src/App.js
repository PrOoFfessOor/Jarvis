import React, { useState, useEffect } from "react";

function App() {
  const [step, setStep] = useState("home");
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is 5 + 3?",
      options: ["5", "8", "9", "7"],
      answer: "8",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "H2"],
      answer: "H2O",
    },
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      body {
        font-family: 'Segoe UI', sans-serif;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #1e90ff, #ff6ec4);
        color: white;
      }
      .app {
        text-align: center;
        padding: 40px 20px;
      }
      .screen {
        background: rgba(0, 0, 0, 0.3);
        padding: 40px;
        border-radius: 12px;
        max-width: 500px;
        margin: auto;
      }
      button {
        background: #fff;
        color: #333;
        padding: 12px 20px;
        margin: 10px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      button:hover {
        background: #f0f0f0;
      }
      .options {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const startQuiz = () => {
    setScore(0);
    setIndex(0);
    setStep("quiz");
  };

  const handleAnswer = (option) => {
    if (option === questions[index].answer) {
      setScore(score + 1);
    }
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setStep("result");
    }
  };

  const restartQuiz = () => {
    setStep("home");
    setScore(0);
    setIndex(0);
  };

  return (
    <div className="app">
      {step === "home" && (
        <div className="screen">
          <h1>Welcome to BrainPlay!</h1>
          <p>Sharpen your mind with fun challenges!</p>
          <button onClick={startQuiz}>Start Game</button>
        </div>
      )}

      {step === "quiz" && (
        <div className="screen">
          <h2>Question {index + 1}</h2>
          <p>{questions[index].question}</p>
          <div className="options">
            {questions[index].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="screen">
          <h1>Game Over!</h1>
          <p>Your Score: {score}</p>
          <button onClick={restartQuiz}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;