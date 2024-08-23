import React, { useState, useEffect, useRef } from 'react';

const Firefly = ({ x, y, size, color, opacity }) => (
  <div
    className="firefly"
    style={{
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}`,
      opacity: opacity,
    }}
  />
);

const FireflyEffect = ({ isConjuring }) => {
  const [fireflies, setFireflies] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    const newFireflies = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      opacity: 1,
      color: '#e0d8b5',
    }));
    setFireflies(newFireflies);

    const updateFireflies = () => {
      setFireflies((prev) =>
        prev.map((fly) => {
          let { x, y, dx, dy, opacity, color } = fly;
          const maxSpeed = 5;

          if (isConjuring) {
            const distToCenter = Math.hypot(x - centerX, y - centerY);
            const angle = Math.atan2(centerY - y, centerX - x);
            dx += Math.cos(angle) * 0.5;
            dy += Math.sin(angle) * 0.5;
            opacity = 0.3 + 0.7 * (distToCenter / Math.max(width, height));
            // Change color to purple during conjuring
            color = `rgb(128, ${Math.floor(128 * (distToCenter / Math.max(width, height)))}, 255)`;
          } else {
            dx += (Math.random() - 0.5) * 0.1;
            dy += (Math.random() - 0.5) * 0.1;
            opacity = Math.min(opacity + 0.05, 1);
            color = '#e0d8b5';
          }

          // Limit speed
          const speed = Math.hypot(dx, dy);
          if (speed > maxSpeed) {
            dx = (dx / speed) * maxSpeed;
            dy = (dy / speed) * maxSpeed;
          }

          x += dx;
          y += dy;

          // Bounce off edges
          if (x < 0 || x > width) dx *= -1;
          if (y < 0 || y > height) dy *= -1;

          return { ...fly, x, y, dx, dy, opacity, color };
        })
      );
    };

    const intervalId = setInterval(updateFireflies, 16); // Approximately 60 FPS

    return () => {
      clearInterval(intervalId);
    };
  }, [isConjuring]);

  return (
    <div ref={containerRef} className={`firefly-container ${isConjuring ? 'conjuring' : ''}`}>
      {fireflies.map((fly) => (
        <Firefly
          key={fly.id}
          x={fly.x}
          y={fly.y}
          size={fly.size}
          color={fly.color}
          opacity={fly.opacity}
        />
      ))}
    </div>
  );
};

export default FireflyEffect;