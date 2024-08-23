import React, { useRef } from 'react';

const StartPage = ({ onStartQuiz }) => {
  const videoRef = useRef(null);

  return (
    <div className="start-page" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src="/videos/magical-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content" style={{
        position: 'relative',
        zIndex: 1,
        padding: '20px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1>Uncover Your Magical Essence</h1>
        <p>Welcome to this enchanting journey of self-discovery!</p>
        <button onClick={onStartQuiz} className="start-quiz-button">Begin Your Magical Quest</button>
      </div>
    </div>
  );
};

export default StartPage;