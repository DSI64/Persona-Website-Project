import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socialLinksDB } from './SocialLinks';
import "../pages-css/SocialLinkDetail.css";

export default function SocialLinkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Case-insensitive lookup safeguard
  const character = socialLinksDB.find(
    (c) => c.id?.toLowerCase() === id?.toLowerCase()
  );

  const [openRanks, setOpenRanks] = useState({});

  if (!character) {
    return (
      <div className="not-found-page">
        <h2>Character not found!</h2>
        <button onClick={() => navigate('/social-links')}>Back to Roster</button>
      </div>
    );
  }

  const toggleRank = (rankNumber) => {
    setOpenRanks((prev) => ({
      ...prev,
      [rankNumber]: !prev[rankNumber],
    }));
  };

  return (
    <div className="detail-page" data-game={character.game}>
      <div className="detail-nav-bar">
        <button className="back-btn" onClick={() => navigate('/social-links')}>
          ← Back to Roster
        </button>
      </div>

      <div className="detail-container">
        {/* LEFT COLUMN */}
        <div className="detail-left-column">
          <div className="detail-image-box">
            {/* Render img tag if image is a path, or fallback text/emoji */}
            {character.image?.includes('/') || character.image?.includes('.') ? (
              <img src={character.image} alt={character.name} />
            ) : (
              <span>{character.image}</span>
            )}
          </div>
          
          <div className="detail-info-box">
            <span className="detail-arcana-tag">{character.arcana} Arcana</span>
            <h1 className="detail-name">{character.name}</h1>
            <p className="detail-subtitle">{character.title}</p>
            
            <div className="detail-bio-block">
              <h3>Biography</h3>
              <p>{character.bio}</p>
            </div>

            <ul className="detail-meta-list">
              <li><strong>Game:</strong> {character.game}</li>
              <li><strong>Availability:</strong> {character.availability}</li>
              <li><strong>Requirements:</strong> {character.requirements}</li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="detail-right-column">
          <div className="ranks-header-wrap">
            <h2>Rank Progression</h2>
            <p>Select a rank to inspect dialogue choices and optimal responses.</p>
          </div>

          <div className="detail-ranks-container">
            {/* Optional chaining on ranks array */}
            {character.ranks?.map((r) => {
              const isOpen = openRanks[r.rank];
              return (
                <div key={r.rank} className={`detail-rank-card ${r.isRomance ? 'romance-rank' : ''}`}>
                  <button className="detail-rank-btn" onClick={() => toggleRank(r.rank)}>
                    <span className="rank-title-group">
                      <strong>Rank {r.rank}</strong>
                      {r.isRomance && <span className="romance-tag">❤️ Romance Option</span>}
                    </span>
                    <span className={`arrow-icon ${isOpen ? 'open' : ''}`}>▼</span>
                  </button>

                  {isOpen && (
                    <div className="detail-rank-content">
                      {/* Optional chaining on choices array */}
                      {r.choices?.map((choice, index) => (
                        <div 
                          key={index} 
                          className="choice-block" 
                          style={{ marginBottom: index < (r.choices?.length || 0) - 1 ? '1rem' : '0' }}
                        >
                          <p className="rank-prompt"><strong>Prompt:</strong> "{choice.prompt}"</p>
                          
                          {choice.options && choice.options.length > 0 ? (
                            <div className="rank-options-wrapper">
                              <strong>Dialogue Options:</strong>
                              <ul className="rank-options-list">
                                {choice.options.map((opt, i) => (
                                  <li 
                                    key={i} 
                                    className={`option-item ${opt === choice.bestChoice ? 'best-option' : ''}`}
                                  >
                                    {opt === choice.bestChoice ? `✓ ${opt} (Best)` : opt}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p className="rank-answer"><strong>Best Response:</strong> ✓ {choice.bestChoice}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}