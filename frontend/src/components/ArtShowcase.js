import React from 'react';

const ArtShowcase = ({ onContinue }) => {
  const artworks = [
    { id: 1, src: '/images/artwork1.jpg', title: 'Enchanted Forest', description: 'A mystical scene with glowing fireflies and ancient trees.' },
    { id: 2, src: '/images/artwork2.jpg', title: 'Celestial Witch', description: 'A powerful witch harnessing the energy of the stars.' },
    { id: 3, src: '/images/artwork3.jpg', title: 'Crystal Cave', description: 'A hidden cave filled with luminous crystals and magical artifacts.' },
  ];

  const commissionOptions = [
    { title: 'Digital Portrait', price: '$150', description: 'A fully rendered digital portrait of your magical persona.' },
    { title: 'Watercolor Illustration', price: '$200', description: 'A delicate watercolor painting capturing your essence.' },
    { title: 'Tarot Card Design', price: '$250', description: 'A custom tarot card featuring you as the central figure.' },
  ];

  return (
    <div className="art-showcase">
      <h2>Hanna's Magical Illustrations</h2>
      <div className="gallery">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="artwork">
            <img src={artwork.src} alt={artwork.title} />
            <h3>{artwork.title}</h3>
            <p>{artwork.description}</p>
          </div>
        ))}
      </div>
      <h3>Commission Your Own Magical Portrait</h3>
      <div className="commission-options">
        {commissionOptions.map((option, index) => (
          <div key={index} className="commission-option">
            <h4>{option.title}</h4>
            <p>{option.description}</p>
            <span className="price">{option.price}</span>
          </div>
        ))}
      </div>
      <p>Discover how your magical essence can be captured in a unique illustration!</p>
      <button onClick={onContinue} className="generate-reading-btn">Generate Your Magical Reading</button>
    </div>
  );
};

export default ArtShowcase;