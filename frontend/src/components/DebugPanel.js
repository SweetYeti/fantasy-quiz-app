import React from 'react';

const DebugPanel = ({ 
  setCurrentQuestion, 
  setShowEmailCapture, 
  setShowResults, 
  setQuizStarted, 
  setShowCommissionForm,
  totalQuestions
}) => {
  const handleJump = (section) => {
    setQuizStarted(true);
    setShowEmailCapture(false);
    setShowResults(false);
    setShowCommissionForm(false);

    switch(section) {
      case 'start':
        setQuizStarted(false);
        break;
      case 'email':
        setShowEmailCapture(true);
        break;
      case 'results':
        setShowResults(true);
        break;
      case 'commission':
        setShowCommissionForm(true);
        break;
      default:
        setCurrentQuestion(parseInt(section));
    }
  };

  return (
    <div className="debug-panel">
      <h3>Debug Panel</h3>
      <button onClick={() => handleJump('start')}>Start Page</button>
      {Array.from({length: totalQuestions}, (_, i) => (
        <button key={i} onClick={() => handleJump(i)}>Question {i + 1}</button>
      ))}
      <button onClick={() => handleJump('email')}>Email Capture</button>
      <button onClick={() => handleJump('results')}>Results</button>
      <button onClick={() => handleJump('commission')}>Commission Form</button>
    </div>
  );
};

export default DebugPanel;