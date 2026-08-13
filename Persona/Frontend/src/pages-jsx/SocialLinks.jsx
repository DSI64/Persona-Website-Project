import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { socialLinkDB } from '../data/socialLinkDB';
import "../pages-css/SocialLinks.css";

const allArcanas = [...new Set(socialLinkDB.map(s => s.arcana))].sort();

export default function SocialLinks() {
  const [filterGame, setFilterGame] = useState("All");
  const [filterArcana, setFilterArcana] = useState("All");
  const navigate = useNavigate();

  const filteredLinks = useMemo(() => {
    return socialLinkDB.filter(link => {
      const matchGame = filterGame === "All" || link.game === filterGame;
      const matchArcana = filterArcana === "All" || link.arcana === filterArcana;
      return matchGame && matchArcana;
    });
  }, [filterGame, filterArcana]);

  return (
    <div className="roster-page">
      <div className="roster-header">
        <h1>Social Links & Confidants</h1>

        <div className="filters">
          <div className="filter-group">
            <label>Title:</label>
            <select value={filterGame} onChange={(e) => setFilterGame(e.target.value)}>
              <option value="All">All Games</option>
              <option value="P3">Persona 3 Reload</option>
              <option value="P3P">Persona 3 Portable</option>
              <option value="P4G">Persona 4 Golden</option>
              <option value="P5">Persona 5 Royal</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Arcana:</label>
            <select value={filterArcana} onChange={(e) => setFilterArcana(e.target.value)}>
              <option value="All">All Arcanas</option>
              {allArcanas.map(arcana => (
                <option key={arcana} value={arcana}>{arcana}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="roster-grid">
        {filteredLinks.length > 0 ? (
          filteredLinks.map(link => (
            <div
              key={link.id}
              className="roster-card"
              data-game={link.game}
              onClick={() => navigate(`/social-links/${link.id}`)}
            >
<div className="card-image-placeholder">
  {link.image?.includes('/') || link.image?.includes('.') ? (
    <img src={link.image} alt={link.name} />
  ) : (
    <span>{link.image}</span>
  )}
</div>
              <div className="card-info">
                <span className="card-arcana">{link.arcana}</span>
                <h3 className="card-name">{link.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No social links match this filter.</div>
        )}
      </div>
    </div>
  );
}