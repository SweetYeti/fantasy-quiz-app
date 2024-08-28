import React from 'react';
import { FaPaypal, FaPatreon, FaCoffee } from 'react-icons/fa';

const SupportOptions = ({ country }) => {
  const currency = country === 'US' ? '$' : '£';

  return (
    <div className="support-options-container">
      <div className="magical-glow"></div>
      <div className="support-options-content">
        <h2 className="support-options-title">Support My Magical Creations</h2>
        <div className="support-options-grid">
          <div className="support-option">
            <FaPaypal className="support-option-icon" />
            <h3 className="support-option-title">One-Time Donation</h3>
            <p className="support-option-description">Support my work with a single magical contribution</p>
            <button className="support-option-button">Donate {currency}5</button>
          </div>
          <div className="support-option">
            <FaPatreon className="support-option-icon" />
            <h3 className="support-option-title">Become a Patron</h3>
            <p className="support-option-description">Get exclusive content and behind-the-scenes magic</p>
            <button className="support-option-button">Join for {currency}3/month</button>
          </div>
          <div className="support-option">
            <FaCoffee className="support-option-icon" />
            <h3 className="support-option-title">Buy Me a Coffee</h3>
            <p className="support-option-description">Fuel my creativity with a magical brew</p>
            <button className="support-option-button">Send {currency}3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportOptions;