import React, { useEffect, useState } from 'react';
import SupportOptions from './SupportOptions';

const ResultsPage = ({ profile, isLoading, country, onCommissionStart }) => {
  const [animatedSections, setAnimatedSections] = useState([]);

  useEffect(() => {
    if (!isLoading && profile && !profile.error) {
      const sections = [
        'introduction', 'spiritualArchetype', 'elementalJourney', 'wisdomOfTheAges',
        'innerLandscape', 'challengesAsCatalysts', 'pathForward', 'dailyPractices',
        'spiritualEmblem', 'reflectiveQuestions', 'personalMantra', 'supportOptions'
      ];
      
      let timer = 0;
      sections.forEach((section, index) => {
        setTimeout(() => {
          setAnimatedSections(prev => [...prev, section]);
        }, timer);
        timer += 300; // Increase delay for each section
      });
    }
  }, [isLoading, profile]);

  const renderSection = (sectionName, content) => {
    const isAnimated = animatedSections.includes(sectionName);
    return (
      <div className={`results-section ${isAnimated ? 'animate-in' : ''}`}>
        {content}
      </div>
    );
  };

  return (
    <div className="results-page">
      <div className="content-frame">
        {isLoading ? (
          <div className="loading">Generating your magical profile...</div>
        ) : profile && !profile.error ? (
          <>
            {renderSection('introduction', (
              <>
                <h1 className="results-title">Your Magical Essence Unveiled</h1>
                <p className="results-introduction">{profile.introduction}</p>
              </>
            ))}
            {renderSection('spiritualArchetype', (
              <>
                <h2 className="results-section-title">Your Spiritual Archetype: {profile.spiritualArchetype.name}</h2>
                <p className="results-section-content">{profile.spiritualArchetype.description}</p>
              </>
            ))}
            {renderSection('elementalJourney', (
              <>
                <h2 className="results-section-title">Your Elemental Journey</h2>
                <p className="results-section-content">{profile.elementalJourney}</p>
              </>
            ))}
            {renderSection('wisdomOfTheAges', (
              <>
                <h2 className="results-section-title">Wisdom of the Ages</h2>
                <p className="results-section-content">{profile.wisdom}</p>
              </>
            ))}
            {renderSection('innerLandscape', (
              <>
                <h2 className="results-section-title">Your Inner Landscape</h2>
                <p className="results-section-content">{profile.innerLandscape}</p>
              </>
            ))}
            {renderSection('challengesAsCatalysts', (
              <>
                <h2 className="results-section-title">Challenges as Catalysts</h2>
                <p className="results-section-content">{profile.challengesAsCatalysts}</p>
              </>
            ))}
            {renderSection('pathForward', (
              <>
                <h2 className="results-section-title">Your Path Forward</h2>
                <p className="results-section-content">{profile.pathForward}</p>
              </>
            ))}
            {renderSection('dailyPractices', (
              <>
                <h2 className="results-section-title">Your Daily Magical Practices</h2>
                {profile.dailyPractices.map((practice, index) => (
                  <div key={index} className="results-daily-practice">
                    <h3 className="results-practice-title">{practice.practice}</h3>
                    <p className="results-practice-description">{practice.description}</p>
                  </div>
                ))}
              </>
            ))}
            {renderSection('spiritualEmblem', (
              <>
                <h2 className="results-section-title">Your Spiritual Emblem</h2>
                <p className="results-section-content">{profile.spiritualEmblem}</p>
              </>
            ))}
            {renderSection('reflectiveQuestions', (
              <>
                <h2 className="results-section-title">Reflective Questions for Your Journey</h2>
                <ul className="results-reflective-questions">
                  {profile.reflectiveQuestions.map((question, index) => (
                    <li key={index} className="results-question">{question}</li>
                  ))}
                </ul>
              </>
            ))}
            {renderSection('personalMantra', (
              <>
                <h2 className="results-section-title">Your Personal Mantra</h2>
                <blockquote className="results-personal-mantra">{profile.personalMantra}</blockquote>
              </>
            ))}
            {renderSection('supportOptions', (
              <SupportOptions country={country} onCommissionStart={onCommissionStart} />
            ))}
          </>
        ) : (
          <div className="error">
            <p>Error: {profile?.error || 'Failed to generate profile'}</p>
            <p>Details: {profile?.details || 'No additional details available'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;