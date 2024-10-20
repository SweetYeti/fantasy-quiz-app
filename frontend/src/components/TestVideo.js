import React from 'react';

const TestVideo = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src="/videos/magical-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ position: 'relative', zIndex: 1, padding: '20px', color: 'white' }}>
        <h1>Test Video Component</h1>
        <p>If you can see this text, the component is rendering correctly.</p>
      </div>
    </div>
  );
};

export default TestVideo;