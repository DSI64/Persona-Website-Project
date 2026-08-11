import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { characterDB } from './Characters';
import "../pages-css/CharacterDetail.css";

export default function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const character = characterDB.find(c => c.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!character) {
    return (
      <div className="not-found-page">
        <h2>Character file not found in the database.</h2>
        <button className="back-btn" onClick={() => navigate('/characters')}>Back to Operatives</button>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % character.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + character.images.length) % character.images.length);
  };

  return (
    <div className="detail-page" data-game={character.game}>
      <div className="detail-nav-bar">
        <button className="back-btn" onClick={() => navigate('/characters')}>
          ← Back to Operatives
        </button>
      </div>

      <div className="detail-container">
        {/* LEFT COLUMN: Image Carousel */}
        <div className="detail-left-column">
          <div className="detail-image-carousel-box">
            <button className="carousel-arrow left" onClick={prevImage}>❮</button>
            <div className="carousel-image-display">
              <img 
                src={character.images[currentImageIndex]} 
                alt={`${character.name} view ${currentImageIndex + 1}`} 
                className="carousel-img-element"
              />
              <span className="carousel-counter">{currentImageIndex + 1} / {character.images.length}</span>
            </div>
            <button className="carousel-arrow right" onClick={nextImage}>❯</button>
          </div>
        </div>

        {/* RIGHT COLUMN: Character Profile & Details */}
        <div className="detail-right-column">
          {/* Header Info */}
          <div className="ranks-header-wrap">
            <span className="detail-arcana-tag">{character.arcana} Arcana</span>
            <h1 className="detail-name">{character.name}</h1>
            <p className="detail-subtitle">{character.title}</p>
          </div>

          {/* Character Profile Container */}
          <div className="detail-bio-box">
            <div className="bio-header">
              <h2>Character Profile</h2>
            </div>
            
            <ul className="detail-meta-list">
              <li><strong>Arcana:</strong> {character.arcana}</li>
              <li><strong>Birthday:</strong> {character.birthday}</li>
              <li>
                <strong>Persona(s):</strong>{" "}
                {character.personas ? (
                  character.personas.split(', ').map((personaName, idx) => (
                    <span key={idx}>
                      <button 
                        className="persona-link-tag" 
                        onClick={() => navigate(`/compendium?search=${encodeURIComponent(personaName)}`)}
                      >
                        {personaName}
                      </button>
                      {idx < character.personas.split(', ').length - 1 ? ', ' : ''}
                    </span>
                  ))
                ) : (
                  "N/A"
                )}
              </li>
              <li><strong>Appearances:</strong> {character.appearances}</li>
              <li><strong>Voice Actors:</strong> {character.voiceActors || "N/A"}</li>
              {character.likes && <li><strong>Likes:</strong> {character.likes}</li>}
              {character.dislikes && <li><strong>Dislikes:</strong> {character.dislikes}</li>}
            </ul>

            {/* Dashed Separator below Dislikes */}
            <hr className="detail-divider" />

            {/* Background Narrative Section */}
            <div className="detail-bio-block">
              <h3>Background</h3>
              <p>{character.profile}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}