import React, { useEffect, useRef } from 'react';

const VideoTest = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log('VideoTest mounted');
    if (videoRef.current) {
      console.log('Video element:', videoRef.current);
      console.log('Video ready state:', videoRef.current.readyState);
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls // Adding controls for debugging
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onLoadedData={() => console.log('Video loaded')}
        onError={(e) => console.error('Video error:', e)}
      >
        <source src="/videos/magical-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoTest;
