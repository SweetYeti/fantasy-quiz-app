import React, { useState, useEffect } from 'react';

const QuizQuestion = ({ question, onAnswer, onNext, onPrevious, currentAnswer, isLast, isFirst, totalQuestions, backgroundImage }) => {
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    return () => setFadeIn(false);
  }, [question]);

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'combinedChoice':
        return (
          <div>
            <div className="options-container">
              {question.options.filter(option => option.value !== 'Other').map((option) => (
                <button
                  key={option.value}
                  className={`option-button ${currentAnswer?.value === option.value ? 'selected' : ''}`}
                  onClick={() => {
                    onAnswer({ value: option.value });
                    setShowFollowUp(true);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {showFollowUp && (
              <div className="follow-up-container show">
                <textarea
                  value={currentAnswer?.explanation || ''}
                  onChange={(e) => onAnswer({ value: currentAnswer.value, explanation: e.target.value })}
                  className="text-input"
                  placeholder={question.followUpQuestion || "Please provide more details..."}
                />
              </div>
            )}
          </div>
        );
      case 'text':
      case 'longText':
        return (
          <textarea
            value={currentAnswer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            className="text-input"
            placeholder="Type your answer here..."
          />
        );
      case 'image':
        return (
          <div className="options-grid">
            {question.options.map((option) => (
              <button
                key={option.value}
                className={`option-button ${currentAnswer === option.value ? 'selected' : ''}`}
                onClick={() => onAnswer(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`quiz-question ${fadeIn ? 'fade-in' : ''}`} style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="question-content">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(question.id / totalQuestions) * 100}%` }}></div>
        </div>
        <p className="question-text">{question.text}</p>
        {renderQuestionInput()}
        <div className="navigation-buttons">
          {!isFirst && <button onClick={onPrevious}>Back</button>}
          {!isLast && <button onClick={onNext} disabled={!currentAnswer}>Next</button>}
          {isLast && <button onClick={onNext} disabled={!currentAnswer}>Finish</button>}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;