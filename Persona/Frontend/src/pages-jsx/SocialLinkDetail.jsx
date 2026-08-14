import { useParams, useNavigate } from 'react-router-dom';
import { socialLinkDB } from '../data/socialLinkDB';
import "../pages-css/SocialLinkDetail.css";

export default function SocialLinkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Case-insensitive lookup safeguard
  const character = socialLinkDB.find(
    (c) => c.id?.toLowerCase() === id?.toLowerCase()
  );

  if (!character) {
    return (
      <div className="not-found-page">
        <h2>Character not found!</h2>
        <button onClick={() => navigate('/social-links')}>Back to Roster</button>
      </div>
    );
  }

  return (
    <div className="detail-page" data-game={character.game}>
      <div className="detail-nav-bar">
        <button className="back-btn" onClick={() => navigate('/social-links')}>
          ← Back to Roster
        </button>
      </div>

      <div className="detail-container">
        {/* LEFT COLUMN: Image Box */}
        <div className="detail-left-column">
          <div className="detail-image-box">
            {/* Render img tag if image is a path, or fallback text/emoji */}
            {character.image?.includes('/') || character.image?.includes('.') ? (
              <img src={character.image} alt={character.name} />
            ) : (
              <span>{character.image}</span>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Profile & Details */}
        <div className="detail-right-column">
          <div className="ranks-header-wrap">
            <span className="detail-arcana-tag">{character.arcana} Arcana</span>
            <h1 className="detail-name">{character.name}</h1>
            <p className="detail-subtitle">{character.title}</p>
          </div>

          <div className="detail-bio-box">
            <ul className="detail-meta-list">
              <li><strong>Game:</strong> {character.game}</li>
              <li><strong>Availability:</strong> {character.availability}</li>
              <li><strong>Requirements:</strong> {character.requirements}</li>
            </ul>

            <hr className="detail-divider" />

            <div className="detail-bio-block">
              <h3>Biography</h3>
              <p>{character.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}