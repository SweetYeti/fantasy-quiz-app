import React, { useEffect, useState } from 'react';
import SupportOptions from './SupportOptions';
import './ResultsPage.css'; // Make sure to create this CSS file

const ResultsPage = ({ profile, isLoading, country, onCommissionStart }) => {
  const [animatedSections, setAnimatedSections] = useState([]);

  useEffect(() => {
    if (!isLoading && profile && !profile.error) {
      const sections = [
        'spiritualArchetype', 'coreStrengths', 'growthAreas', 'elementalInfluence',
        'practicalWisdom', 'dailyPractices', 'reflectiveQuestions', 'personalMantra',
        'magicalPortrait', 'conclusion', 'supportOptions'
      ];
      
      sections.forEach((section, index) => {
        setTimeout(() => {
          setAnimatedSections(prev => [...prev, section]);
        }, index * 300);
      });
    }
  }, [isLoading, profile]);

  const renderProfileItem = (item) => {
    if (typeof item === 'object' && item !== null) {
      return (
        <div className="profile-item">
          <h3>{item.title || item.practice}</h3>
          <p>{item.description}</p>
          {item.benefit && <p className="benefit"><strong>Benefit:</strong> {item.benefit}</p>}
        </div>
      );
    }
    return <p>{item}</p>;
  };

  const renderSection = (sectionName, title, content) => {
    const isAnimated = animatedSections.includes(sectionName);
    return (
      <section className={`results-section ${isAnimated ? 'animate-in' : ''}`}>
        <h2 className="section-title">{title}</h2>
        <div className="section-content">{content}</div>
      </section>
    );
  };

  if (isLoading) {
    return <div className="results-page loading">Loading your magical profile...</div>;
  }

  if (!profile || profile.error) {
    return (
      <div className="results-page error">
        <h2>Error</h2>
        <p>Sorry, we couldn't load your profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="results-container">
        {renderSection('spiritualArchetype', 'Your Archetype', renderProfileItem(profile.spiritualArchetype))}
        {renderSection('coreStrengths', 'Core Strengths', 
          <div className="grid-layout">
            {profile.coreStrengths.map((strength, index) => (
              <div key={index}>{renderProfileItem(strength)}</div>
            ))}
          </div>
        )}
        {renderSection('growthAreas', 'Growth Areas', 
          <div className="grid-layout">
            {profile.growthAreas.map((area, index) => (
              <div key={index}>{renderProfileItem(area)}</div>
            ))}
          </div>
        )}
        {renderSection('elementalInfluence', 'Elemental Influence', renderProfileItem({ description: profile.elementalInfluence }))}
        {renderSection('practicalWisdom', 'Practical Wisdom', 
          <div className="grid-layout">
            {profile.practicalWisdom.map((wisdom, index) => (
              <div key={index}>{renderProfileItem(wisdom)}</div>
            ))}
          </div>
        )}
        {renderSection('dailyPractices', 'Daily Practices', 
          <div className="grid-layout">
            {profile.dailyPractices.map((practice, index) => (
              <div key={index}>{renderProfileItem(practice)}</div>
            ))}
          </div>
        )}
        {renderSection('reflectiveQuestions', 'Reflective Questions', 
          <div className="grid-layout">
            {profile.reflectiveQuestions.map((question, index) => (
              <div key={index} className="profile-item">
                <p>{question}</p>
              </div>
            ))}
          </div>
        )}
        {renderSection('personalMantra', 'Personal Mantra', 
          <blockquote className="personal-mantra">{profile.personalMantra}</blockquote>
        )}
        {renderSection('magicalPortrait', 'Magical Portrait', 
          <>
            <p className="magical-portrait">{profile.magicalPortrait}</p>
            <button className="commission-button" onClick={onCommissionStart}>
              <div className="commission-button-particles">
                <div className="commission-button-particle"></div>
                <div className="commission-button-particle"></div>
                <div className="commission-button-particle"></div>
                <div className="commission-button-particle"></div>
              </div>
              <img src="/Images/paint-brush.png" alt="Paint brush" className="commission-button-icon" />
              Request Custom Artwork
            </button>
          </>
        )}
        {renderSection('conclusion', 'Conclusion', 
          <p className="conclusion">{profile.conclusion}</p>
        )}
        {renderSection('supportOptions', 'Support My Work', 
          <SupportOptions country={country} />
        )}
      </div>
    </div>
  );
};

export default ResultsPage;