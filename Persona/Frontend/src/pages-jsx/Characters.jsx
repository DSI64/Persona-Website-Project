import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { characterDB } from '../data/characterDB';
import "../pages-css/Characters.css";

const allArcanas = [...new Set(characterDB.map(c => c.arcana))].sort();

export default function Characters() {
  const [filterGame, setFilterGame] = useState("All");
  const [filterArcana, setFilterArcana] = useState("All");
  const navigate = useNavigate();

  const filteredCharacters = useMemo(() => {
    return characterDB.filter(char => {
      const matchGame = filterGame === "All" || char.game === filterGame;
      const matchArcana = filterArcana === "All" || char.arcana === filterArcana;
      return matchGame && matchArcana;
    });
  }, [filterGame, filterArcana]);

  return (
    <div className="roster-page">
      <div className="roster-header">
        <h1>Operatives</h1>
        
        <div className="filters">
          <div className="filter-group">
            <label>Title:</label>
            <select value={filterGame} onChange={(e) => setFilterGame(e.target.value)}>
              <option value="All">All Games</option>
              <option value="P1">Persona</option>
              <option value="P2">Persona 2</option>
              <option value="P3">Persona 3</option>
              <option value="P4">Persona 4</option>
              <option value="P5">Persona 5</option>
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
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map(char => (
            <div 
              key={char.id} 
              className="roster-card" 
              data-game={char.game}
              onClick={() => navigate(`/characters/${char.id}`)}
            >
              <div className="card-image-placeholder">
                <img 
                  src={char.images[0]} 
                  alt={char.name} 
                  className="roster-card-img" 
                />
              </div>
              <div className="card-info">
                <span className="card-arcana">{char.arcana}</span>
                <h3 className="card-name">{char.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No characters match this filter.</div>
        )}
      </div>
    </div>
  );
}