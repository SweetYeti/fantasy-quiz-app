import React, { useEffect, useRef } from 'react';

const VideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handlePreventClick = (event) => {
      event.preventDefault();
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('click', handlePreventClick);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('click', handlePreventClick);
      }
    };
  }, []);

  return (
    <video autoPlay loop muted className="video-background">
      <source src={`${process.env.PUBLIC_URL}/videos/magical-background.mp4`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;