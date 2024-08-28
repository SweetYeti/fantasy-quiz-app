import React from 'react';
import './ThankYouConfirmation.css';

const ThankYouConfirmation = ({ onReturnToReading }) => {
  return (
    <div className="thank-you-confirmation">
      <div className="content-frame">
        <h1>Thank You for Your Commission Request!</h1>
        <p className="subtitle">Your magical portrait journey has begun. We'll be in touch soon with next steps.</p>
        
        <div className="action-buttons">
          <button onClick={onReturnToReading} className="primary-button">
            Return to Your Reading
          </button>
        </div>

        <div className="external-links">
          <a href="https://hannasnaturalmagic.com" target="_blank" rel="noopener noreferrer" className="text-link">
            Visit Website
          </a>
          <span className="separator">|</span>
          <a href="https://hannasnaturalmagic.com/shop" target="_blank" rel="noopener noreferrer" className="text-link">
            Visit Shop
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYouConfirmation;