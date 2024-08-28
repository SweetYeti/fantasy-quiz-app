import React from 'react';

const StartPage = ({ onStartQuiz }) => {
  return (
    <div className="start-page">
      <div className="content">
        <h4>Welcome to the Magical Self-Discovery Quiz!</h4>
        <p>Welcome, seeker of mystical wisdom, to an enchanting journey of self-discovery!</p>
        <p>Prepare to embark on a whimsical quest that will reveal the hidden facets of your magical self.</p>
        <ul>
          <li>Answer questions with your heart's truth</li>
          <li>Let your intuition guide you through the mystical realms</li>
          <li>Embrace the magic within as you explore your inner landscape</li>
        </ul>
        <p className="disclaimer">Remember, dear traveler, this magical reading is crafted for entertainment and self-reflection. It's not a professional or psychic reading, but a fun and inspiring journey into your imagination and personal magic.</p>
        <p>Are you ready to unveil the enchanting tapestry of your spirit?</p>
        <button onClick={onStartQuiz} className="start-quiz-button">Begin Your Journey</button>
      </div>
    </div>
  );
};

export default StartPage;