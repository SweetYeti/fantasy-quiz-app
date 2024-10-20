import React from 'react';
import './DebugPanel.css'; // Make sure to create this CSS file

const DebugPanel = ({ 
  setCurrentQuestion, 
  setShowEmailCapture, 
  setShowResults, 
  setQuizStarted, 
  setShowCommissionForm, 
  totalQuestions,
  isDevelopmentMode,
  toggleDevelopmentMode
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
      <div className="debug-panel-scrollable">
        <button onClick={() => handleJump('start')}>Start Page</button>
        {Array.from({length: totalQuestions}, (_, i) => (
          <button key={i} onClick={() => handleJump(i)}>Question {i + 1}</button>
        ))}
        <button onClick={() => handleJump('email')}>Email Capture</button>
        <button onClick={() => handleJump('results')}>Results</button>
        <button onClick={() => handleJump('commission')}>Commission Form</button>
      </div>
      <div>
        <label>
          Development Mode:
          <input
            type="checkbox"
            checked={isDevelopmentMode}
            onChange={toggleDevelopmentMode}
          />
        </label>
      </div>
    </div>
  );
};

export default DebugPanel;