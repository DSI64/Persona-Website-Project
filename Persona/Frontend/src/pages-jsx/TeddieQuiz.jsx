import { useState, useEffect } from "react";
import "../pages-css/TeddieQuiz.css";

const QUIZ_DATA = {
  P3: [
    {
      id: 1,
      question:
        "What is the name of the high school attended by the members of SEES?",
      options: [
        "Shujin Academy",
        "Gekkoukan High School",
        "Yasogami High School",
        "Koumi High",
      ],
      correct: 1,
      teddieComment: "Gekkoukan High! Sharp uniforms, spooky midnight hours!",
    },
    {
      id: 2,
      question: "What hidden 25th hour of the day is unique to Persona 3?",
      options: [
        "The Dark Hour",
        "The Midnight Channel",
        "The Phantom Time",
        "The Velvet Hour",
      ],
      correct: 0,
      teddieComment: "The Dark Hour! When coffins line the streets—spooky!",
    },
    {
      id: 3,
      question:
        "What colossal tower serves as the main dungeon during the Dark Hour?",
      options: ["Mementos", "The TV World", "Tartarus", "The Velvet Tower"],
      correct: 2,
      teddieComment:
        "Tartarus! Climbing that thing takes some serious stamina, bear-y true!",
    },
  ],
  P4: [
    {
      id: 1,
      question:
        "What is the name of the local department store chain found in Inaba?",
      options: ["MegaMall", "Junes", "Hermes Mart", "Star Plaza"],
      correct: 1,
      teddieComment: "Bear-y correct! Every day's great at your J-J-Junes!",
    },
    {
      id: 2,
      question:
        "Through what household object do the Investigation Team enter the Midnight Channel?",
      options: [
        "A retro microwave",
        "A flat-screen TV",
        "An old-box television",
        "A magical mirror",
      ],
      correct: 2,
      teddieComment:
        "Spot on! Just don't lean too close or you'll fall right through!",
    },
    {
      id: 3,
      question:
        "What is the primary weather phenomenon that plagues Inaba before major events?",
      options: [
        "Heavy snowstorms",
        "Mysterious dense fog",
        "Acid rain",
        "Endless sunshine",
      ],
      correct: 1,
      teddieComment: "Correct! That spooky fog hides all sorts of shadows...",
    },
  ],
  P5: [
    {
      id: 1,
      question: "What is the name of Joker's high school in Tokyo?",
      options: [
        "Shujin Academy",
        "Gekkoukan High School",
        "Yasogami High School",
        "Yongen High",
      ],
      correct: 0,
      teddieComment: "Shujin Academy! Watch out for those strict teachers!",
    },
    {
      id: 2,
      question:
        "What is the name of the cognitive collective dungeon that represents the public's desires?",
      options: ["Tartarus", "Mementos", "The TV World", "The Velvet Realm"],
      correct: 1,
      teddieComment: "Mementos! The subway of the heart, bear-y fascinating!",
    },
    {
      id: 3,
      question:
        "What alias does Joker use as the leader of the Phantom Thieves?",
      options: ["King Moron", "Ren / Crow", "Leader / Joker", "Prince"],
      correct: 2,
      teddieComment: "Joker! Stealing hearts with style!",
    },
  ],
};

const DIFFICULTY_SETTINGS = {
  easy: { name: "Student (15s)", time: 15, points: 50 },
  normal: { name: "Challenger (10s)", time: 10, points: 100 },
  hard: { name: "Hardcore (5s)", time: 5, points: 200 },
};

export default function TeddieQuiz() {
  const [gameState, setGameState] = useState("START"); // 'START' | 'PLAYING' | 'FINISHED'
  const [selectedGame, setSelectedGame] = useState("P4");
  const [difficulty, setDifficulty] = useState("normal");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  const questions = QUIZ_DATA[selectedGame];
  const currentQ = questions[currentIndex];
  const currentTimerLimit = DIFFICULTY_SETTINGS[difficulty].time;

  // Timer effect
  useEffect(() => {
    if (gameState !== "PLAYING" || isAnswered) return;

    if (timeLeft <= 0) {
      setIsAnswered(true);
      setSelectedOption(-1); // Timeout flag
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, gameState]);

  const startQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(currentTimerLimit);
    setGameState("PLAYING");
  };

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correct) {
      setScore((prev) => prev + DIFFICULTY_SETTINGS[difficulty].points);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(currentTimerLimit);
    } else {
      setGameState("FINISHED");
    }
  };

  return (
    <div className="p4-quiz-container">
      {/* Studio Header Banner */}
      <div className="quiz-header">
        <div className="quiz-title-group">
          <h1>
            MIDNIGHT <span className="yellow-highlight">QUIZ SHOW</span>
          </h1>
          <p className="subtitle-spacing">
            HOSTED BY TEDDIE // INABA BROADCAST NETWORK
          </p>
        </div>
        {gameState === "PLAYING" && (
          <div className="quiz-score-badge">
            <span>SCORE</span>
            <h2>{score} PTS</h2>
          </div>
        )}
      </div>

      {/* START SCREEN: Game & Difficulty Selection */}
      {gameState === "START" && (
        <div className="quiz-setup-card">
          <div className="setup-intro">
            <span className="setup-bear-icon">🐻</span>
            <h2>WELCOME TO THE STAGE!</h2>
            <p>
              Choose your target archive and broadcast difficulty before
              stepping into the spotlight!
            </p>
          </div>

          <div className="setup-section">
            <h3>1. SELECT PERSONA ARCHIVE</h3>
            <div className="setup-btn-row">
              {["P3", "P4", "P5"].map((gameKey) => (
                <button
                  key={gameKey}
                  className={`setup-choice-btn ${selectedGame === gameKey ? "active" : ""}`}
                  onClick={() => setSelectedGame(gameKey)}
                >
                  PERSONA {gameKey.replace("P", "")}
                </button>
              ))}
            </div>
          </div>

          <div className="setup-section">
            <h3>2. SELECT BROADCAST DIFFICULTY</h3>
            <div className="setup-btn-row">
              {Object.entries(DIFFICULTY_SETTINGS).map(([key, setting]) => (
                <button
                  key={key}
                  className={`setup-choice-btn ${difficulty === key ? "active" : ""}`}
                  onClick={() => setDifficulty(key)}
                >
                  {setting.name}
                </button>
              ))}
            </div>
          </div>

          <button className="start-broadcast-btn" onClick={startQuiz}>
            START BROADCAST ➔
          </button>
        </div>
      )}

      {/* PLAYING SCREEN */}
      {gameState === "PLAYING" && (
        <div className="quiz-workspace">
          <div className="quiz-stage-card">
            <div className="stage-meta-row">
              <span className="question-counter">
                QUESTION {currentIndex + 1} OF {questions.length}
              </span>
              <span
                className={`timer-display ${timeLeft <= 2 ? "warning" : ""}`}
              >
                ⏱ TIME: {timeLeft}s
              </span>
              <span className="channel-tag">
                {selectedGame} ({difficulty.toUpperCase()})
              </span>
            </div>

            {/* Timer Progress Bar */}
            <div className="timer-bar-container">
              <div
                className="timer-bar-fill"
                style={{ width: `${(timeLeft / currentTimerLimit) * 100}%` }}
              ></div>
            </div>

            <div className="question-box">
              <h2>{currentQ.question}</h2>
            </div>

            <div className="options-grid">
              {currentQ.options.map((option, idx) => {
                let btnStyle = "";
                if (isAnswered) {
                  if (idx === currentQ.correct) btnStyle = "correct";
                  else if (idx === selectedOption) btnStyle = "incorrect";
                  else btnStyle = "dimmed";
                }

                return (
                  <button
                    key={idx}
                    className={`quiz-option-btn ${btnStyle}`}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswered}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="option-text">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Teddie Commentary Box */}
            {isAnswered && (
              <div className="teddie-feedback-box">
                <div className="teddie-avatar-bubble">
                  <span className="teddie-icon">🐻</span>
                  <div className="tedlied-speech">
                    <h3>TEDDIE SAYS:</h3>
                    <p>
                      {selectedOption === -1
                        ? "Time's up! Too slow, bear-y unfortunate!"
                        : selectedOption === currentQ.correct
                          ? currentQ.teddieComment
                          : "Oof, bear-y tragic! That wasn't quite right!"}
                    </p>
                  </div>
                </div>
                <button
                  className="next-question-btn"
                  onClick={handleNextQuestion}
                >
                  {currentIndex < questions.length - 1
                    ? "NEXT QUESTION ➔"
                    : "VIEW FINAL RESULTS"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESULTS SCREEN */}
      {gameState === "FINISHED" && (
        <div className="quiz-results-card">
          <div className="results-content">
            <h2>BROADCAST CONCLUDED!</h2>
            <p className="results-subtitle">
              You survived Teddie's Midnight Quiz Show ({selectedGame})!
            </p>

            <div className="final-score-display">
              <span className="score-label-text">FINAL SCORE</span>
              <h1 className="score-value-text">{score} PTS</h1>
            </div>

            <p className="teddie-closing-line">
              {score > 0
                ? "Unbearably amazing! You're a true investigation master!"
                : "Oof... zero points! Time for some remedial training in Inaba!"}
            </p>

            <button
              className="restart-btn"
              onClick={() => setGameState("START")}
            >
              BACK TO SETUP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
