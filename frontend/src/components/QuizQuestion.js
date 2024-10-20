import React, { useState, useEffect } from 'react';
import { debounce } from '../utils/debounce';

const QuizQuestion = ({ question, onAnswer, onNext, onPrevious, currentAnswer, isLast, isFirst, totalQuestions, backgroundImage }) => {
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    return () => setFadeIn(false);
  }, [question]);

  const debouncedOnAnswer = debounce(onAnswer, 300);

  const handleTextChange = (e) => {
    const value = e.target.value;
    debouncedOnAnswer({ value });
  };

  const renderQuestionInput = () => {
    console.log('Current answer:', currentAnswer);
    switch (question.type) {
      case 'combinedChoice':
        return (
          <div className="question-input">
            <div className="options-container combined-choice">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  className={`option-button ${currentAnswer?.value === option.value ? 'selected' : ''}`}
                  onClick={() => {
                    onAnswer({ value: option.value });
                    setShowFollowUp(option.value === "Other" || question.followUpQuestion);
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
                  onChange={(e) => {
                    const currentValue = currentAnswer?.value || '';
                    onAnswer({ value: currentValue, explanation: e.target.value });
                  }}
                  className="text-input"
                  placeholder={question.followUpQuestion || "Please provide more details..."}
                  maxLength={question.maxWords * 5}
                />
              </div>
            )}
          </div>
        );
      case 'text':
      case 'longText':
        return (
          <textarea
            value={currentAnswer?.value || ''}
            onChange={(e) => onAnswer({ value: e.target.value })}
            className="text-input"
            placeholder="Type your answer here..."
            maxLength={question.maxWords * 5}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={currentAnswer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            className="number-input"
            min={question.min}
            max={question.max}
            placeholder="Enter a number"
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
          <div className="progress" style={{ width: `${((question.id) / totalQuestions) * 100}%` }}></div>
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