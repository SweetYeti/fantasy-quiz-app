import React, { useState, useEffect } from 'react';
import CommissionForm from './CommissionForm';

const SupportOptions = ({ country, profile, onCommissionStart }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [showCommissionForm, setShowCommissionForm] = useState(false);

  useEffect(() => {
    // Fetch user's country and set currency
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setCurrency(data.currency);
        // Fetch exchange rate (you'd need to replace this with a real API)
        fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
          .then(response => response.json())
          .then(data => {
            setExchangeRate(data.rates[currency] || 1);
          });
      });
  }, [currency]);

  const getPrice = (usdPrice) => {
    const convertedPrice = usdPrice * exchangeRate;
    return Math.round(convertedPrice / 5) * 5;
  };

  const getSpelling = (word) => {
    const britishSpellings = {
      'watercolor': 'watercolour',
    };
    
    return ['GB', 'AU', 'NZ', 'IE'].includes(country) ? britishSpellings[word] || word : word;
  };

  const handleCommissionClick = () => {
    onCommissionStart();
  };

  const handleCommissionSubmit = (formData) => {
    // Handle form submission (we'll implement this later)
    console.log('Commission form submitted:', formData);
    setShowCommissionForm(false);
  };

  const handleCommissionCancel = () => {
    setShowCommissionForm(false);
  };

  return (
    <div className="support-options">
      <h2>Support This Magical Experience</h2>
      <div className="support-section donation">
        <p>If you've enjoyed uncovering your magical essence, consider supporting this site. Your donation helps cover running costs and allows us to continue providing these mystical insights.</p>
        <a href="https://www.buymeacoffee.com/yourname" target="_blank" rel="noopener noreferrer" className="donate-button">
          Buy Me a Coffee
        </a>
      </div>
      <div className="support-section commission">
        <h3>Bring Your Magical Portrait to Life</h3>
        <p>Let Hanna capture your unique magical essence in a custom watercolor illustration. Commission a one-of-a-kind artwork that embodies your spiritual journey.</p>
        <div className="commission-options">
          <div className="commission-option">
            <h4>{getSpelling('Watercolor')} Illustration</h4>
            <p>A delicate {getSpelling('watercolor')} painting capturing your essence.</p>
            <span className="price">{currency} {getPrice(200)}</span>
          </div>
          <div className="commission-option">
            <h4>Tarot-Inspired {getSpelling('Watercolor')}</h4>
            <p>Your {getSpelling('watercolor')} illustration reimagined as a personalized tarot card.</p>
            <span className="price">{currency} {getPrice(250)}</span>
          </div>
        </div>
        <button className="commission-button" onClick={handleCommissionClick}>
          Commission Your Magical Portrait
        </button>
      </div>
      {showCommissionForm && (
        <CommissionForm
          profile={profile}
          onSubmit={handleCommissionSubmit}
          onCancel={handleCommissionCancel}
        />
      )}
    </div>
  );
};

export default SupportOptions;