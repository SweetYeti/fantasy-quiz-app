import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './InteractiveTarotCard.css';

const InteractiveTarotCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="tarot-card-container" onClick={flipCard}>
      <motion.div
        className="tarot-card"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="tarot-card-face tarot-card-front">
          <h3>Your Spiritual Emblem</h3>
          <div className="tarot-card-image"></div>
          <p>{frontContent}</p>
        </div>
        <div className="tarot-card-face tarot-card-back">
          <h3>Hidden Insights</h3>
          <p>{backContent}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveTarotCard;