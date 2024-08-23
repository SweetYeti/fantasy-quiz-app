import React, { useState } from 'react';


const EmailCapture = ({ onSubmit, onSkip, onBack }) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consent) {
      onSubmit(email);
    } else {
      alert('Please opt in to receive magical updates.');
    }
  };

  return (
    <div className="email-capture">
      <div className="content-frame">
        <h2>Stay Updated with Hanna's Magical Art</h2>
        <p>Sign up for exclusive updates and art deals from Hanna:</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
            <button type="submit" className="subscribe-button" disabled={!consent}>Subscribe</button>
          </div>
          <div className="email-capture-consent-wrapper">
            <div className="email-capture-consent-checkbox">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="consent">
                Yes, I'd like to receive magical updates!
              </label>
            </div>
          </div>
          <div className="button-container">
            <button type="button" onClick={onBack} className="back-button">Back</button>
            <button type="button" onClick={onSkip} className="skip-button">Just show my reading</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailCapture;