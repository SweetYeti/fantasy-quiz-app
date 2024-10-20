import React from 'react';

const Section = ({ title, content }) => {
  return (
    <div className="section">
      <h3 className="section-title">{title}</h3>
      <div className="section-content">{content}</div>
    </div>
  );
};

export default Section;