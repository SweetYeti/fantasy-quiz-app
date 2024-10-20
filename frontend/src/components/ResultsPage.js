import React from 'react';
import './ResultsPage.css';
import { validateProfile } from '../utils/validateProfile';
import GeneralReading from './GeneralReading';
import jsPDF from 'jspdf';

const ResultsSection = ({ title, children, className }) => (
  <section className={`results-section ${className}`}>
    <h2 className="section-title">{title}</h2>
    {children}
  </section>
);

const SubSectionGrid = ({ items, renderItem }) => (
  <div className="sub-section-grid">
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {renderItem(item)}
      </React.Fragment>
    ))}
  </div>
);

const ResultsPage = ({ profile, isLoading, error, onCommissionStart }) => {
  console.log('ResultsPage received profile:', profile);

  if (error) return <GeneralReading />;
  if (isLoading) {
    return (
      <div className="results-page loading">
        <p className="loading-message">Conjuring your magical profile...</p>
        <div className="loading-animation"></div>
      </div>
    );
  }
  if (!validateProfile(profile)) {
    console.error('Invalid profile structure:', profile);
    return <GeneralReading />;
  }

  const SupportOption = ({ icon, title, description, buttonText, onClick, href }) => (
    <div className="support-option">
      <span className="support-option-icon">{icon}</span>
      <h3 className="support-option-title">{title}</h3>
      <p className="support-option-description">{description}</p>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="commission-button">{buttonText}</a>
      ) : (
        <button className="commission-button" onClick={onClick}>{buttonText}</button>
      )}
    </div>
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;
    const pageHeight = doc.internal.pageSize.height;

    // Add title
    doc.setFontSize(20);
    doc.text('Your Magical Reading', 105, yOffset, { align: 'center' });
    yOffset += 20;

    // Helper function to add a section to the PDF
    const addSection = (title, content) => {
      doc.setFontSize(16);
      doc.text(title, 10, yOffset);
      yOffset += 10;
      doc.setFontSize(12);
      const splitContent = doc.splitTextToSize(content, 180);
      splitContent.forEach(line => {
        if (yOffset + 10 > pageHeight) {
          doc.addPage();
          yOffset = 10;
        }
        doc.text(line, 10, yOffset);
        yOffset += 7;
      });
      yOffset += 10;
    };

    // Add each section of the profile
    addSection('Spiritual Archetype', `${profile.spiritualArchetype.title}: ${profile.spiritualArchetype.description}`);
    addSection('Core Strengths', profile.coreStrengths.map(s => `${s.title}: ${s.description}`).join('\n\n'));
    addSection('Growth Areas', profile.growthAreas.map(a => `${a.title}: ${a.description}`).join('\n\n'));
    addSection('Elemental Influence', profile.elementalInfluence);
    addSection('Practical Wisdom', profile.practicalWisdom.map(w => `${w.title}: ${w.description}\nBenefit: ${w.benefit}`).join('\n\n'));
    addSection('Reflective Questions', profile.reflectiveQuestions.join('\n'));
    addSection('Personal Mantra', profile.personalMantra);
    addSection('Conclusion', profile.conclusion);

    // Save the PDF
    doc.save('Your_Magical_Reading.pdf');
  };

  return (
    <div className="results-page">
      <div className="results-container">
        <ResultsSection title="Your Mystical Archetype" className="spiritual-archetype">
          <div className="sub-section-item">
            <h3>{profile.spiritualArchetype.title}</h3>
            <p>{profile.spiritualArchetype.description}</p>
          </div>
        </ResultsSection>

        <ResultsSection title="Core Strengths" className="core-strengths">
          <SubSectionGrid 
            items={profile.coreStrengths}
            renderItem={(strength) => (
              <div className="sub-section-item">
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </div>
            )}
          />
        </ResultsSection>

        <ResultsSection title="Shadow Traits" className="growth-areas">
          <SubSectionGrid 
            items={profile.growthAreas}
            renderItem={(area) => (
              <div className="sub-section-item">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            )}
          />
        </ResultsSection>

        <ResultsSection title="Elemental Influence" className="elemental-influence">
          <div className="sub-section-item">
            <p>{profile.elementalInfluence}</p>
          </div>
        </ResultsSection>

        <ResultsSection title="Practical Wisdom" className="practical-wisdom">
          <SubSectionGrid 
            items={profile.practicalWisdom}
            renderItem={(wisdom) => (
              <div className="sub-section-item">
                <h3>{wisdom.title}</h3>
                <p>{wisdom.description}</p>
                <p className="benefit">Benefit: {wisdom.benefit}</p>
              </div>
            )}
          />
        </ResultsSection>

        <ResultsSection title="Reflective Questions" className="reflective-questions">
          <SubSectionGrid 
            items={profile.reflectiveQuestions}
            renderItem={(question) => (
              <div className="sub-section-item">
                <p>{question}</p>
              </div>
            )}
          />
        </ResultsSection>

        <ResultsSection title="Personal Mantra" className="personal-mantra">
          <div className="sub-section-item">
            <blockquote>{profile.personalMantra}</blockquote>
          </div>
        </ResultsSection>

        <ResultsSection title="Conclusion" className="conclusion">
          <div className="sub-section-item">
            <p>{profile.conclusion}</p>
          </div>
        </ResultsSection>

        <ResultsSection title="Download Your Reading" className="download-section">
          <button onClick={handleDownloadPDF} className="download-button">
            Download PDF
          </button>
        </ResultsSection>

        <section className="magical-portrait-section">
          <h2>Unveil Your Enchanted Self with Hanna's Magical Portrait Commissions</h2>
          <p>Hanna offers captivating portrait commissions that bring your inner magic to life. Each piece is an intuitive, deeply personal representation of you, woven with symbolism and insights that capture your unique essence and story.</p>
          <p>Available in two styles:</p>
          <ol>
            <li><strong>Magical Portrait: Standard</strong>: A mesmerising watercolour painting that captures your unique essence and story through personally meaningful symbolism and insights. A deeply personal representation of your inner magic.</li>
            <li><strong>Magical Portrait: Tarot Edition</strong>: Merge your essence with the timeless wisdom of tarot in a vivid, personalised illustration. Featuring a classic tarot border design, this portrait serves as a powerful reminder of your inner wisdom and potential.</li>
          </ol>
          <p>If you'd like to commission a portrait as a unique gift for a friend or loved one, simply mention this in your initial email. Hanna will work with you to create a personalised, enchanting artwork that captures the essence of the recipient. While Magical Portraits are her specialty, Hanna is open to exploring other fantasy-inspired subjects and ideas. Let your imagination soar and create a one-of-a-kind, meaningful gift!</p>
          <p>Sizes range from A5 to A4. Turnaround time is typically 2-3 weeks.</p>
          <p>To begin your Magical Portrait journey, simply reach out to Hanna with your vision.</p>
          <h3>Your Personalised Portrait Example</h3>
          <p>{profile.portraitDescription}</p>
          <button className="commission-button" onClick={onCommissionStart}>
            Commission Your Magical Portrait
          </button>
          <button className="commission-button" onClick={() => window.open('https://www.hanna-nygren.com/commissions', '_blank')}>
            View Commission Prices
          </button>
        </section>

        <div className="support-options-container">
          <div className="magical-glow"></div>
          <div className="support-options-content">
            <h2 className="support-options-title">Support This Magical Experience</h2>
            <div className="support-options-grid">
              <SupportOption 
                icon="🎨"
                title="Commission Your Magical Portrait"
                description="Bring your spiritual essence to life in a watercolour illustration."
                buttonText="Commission a Portrait"
                onClick={onCommissionStart}
              />
              <SupportOption 
                icon="☕️"
                title="Buy Me a Coffee"
                description="Help cover the costs of running this site and keep the magic flowing."
                buttonText="Buy Me a Coffee"
                href="https://buymeacoffee.com/hannanygren"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
