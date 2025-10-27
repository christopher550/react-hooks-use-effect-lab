import React, { useState, useEffect, useRef } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const timeoutRef = useRef();

  useEffect(() => {
    const tick = () => {
      timeoutRef.current = setTimeout(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            onAnswered(false);
            return prev - 1;
          } else {
            return prev - 1;
          }
        });
        tick(); // Set up the next timeout
      }, 1000);
    };

    tick(); // Start the timer

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [question.id, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
