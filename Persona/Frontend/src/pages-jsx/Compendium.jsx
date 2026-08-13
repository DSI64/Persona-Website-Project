import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { personaDB } from '../data/personaDB';
import "../pages-css/Compendium.css";

export default function Compendium() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState("All");
  const [selectedPersona, setSelectedPersona] = useState(personaDB[0]);

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchTerm(query);
      const match = personaDB.find(p => p.name.toLowerCase() === query.toLowerCase());
      if (match) setSelectedPersona(match);
    }
  }, [searchParams]);

  const filteredPersonas = personaDB.filter(p => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === "All" || p.originGame === selectedGame;
    return matchesName && matchesGame;
  });

  // Helper function to map element keys to display labels
  const formatElementLabel = (elem) => {
    const key = elem.toLowerCase();
    if (key === 'curse' || key === 'dark') return 'CURSE / DARK';
    if (key === 'bless' || key === 'light') return 'BLESS / LIGHT';
    return elem.toUpperCase();
  };

  // Helper function to handle fallback image extensions if .png fails
  const handleImageError = (e, persona) => {
    const currentSrc = e.target.src;
    if (currentSrc.endsWith('.png')) {
      e.target.src = `/images/Persona Artwork/${persona.originGame}/${persona.id}.webp`;
    } else if (currentSrc.endsWith('.webp')) {
      e.target.src = `/images/Persona Artwork/${persona.originGame}/${persona.id}.jpg`;
    }
  };

  // Filter out neutral ('-') affinities
  const activeAffinities = selectedPersona
    ? Object.entries(selectedPersona.affinities).filter(([_, type]) => type !== "-")
    : [];

  return (
    <div className="compendium-page">
      <h1 className="compendium-title">Velvet Room Compendium</h1>

      <div className="compendium-layout">
        {/* Sidebar */}
        <div className="compendium-sidebar">
          <div className="filter-controls">
            <input 
              type="text" 
              placeholder="Search Persona..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="compendium-search"
            />

            <select 
              value={selectedGame} 
              onChange={(e) => setSelectedGame(e.target.value)}
              className="compendium-select"
            >
              <option value="All">All Origin Games</option>
              <option value="P1">Persona 1</option>
              <option value="P2">Persona 2</option>
              <option value="P3">Persona 3</option>
              <option value="P4">Persona 4</option>
              <option value="P5">Persona 5</option>
            </select>
          </div>

          <div className="persona-list">
            {filteredPersonas.length > 0 ? (
              filteredPersonas.map(persona => (
                <button 
                  key={persona.id}
                  className={`persona-list-item ${selectedPersona?.id === persona.id ? 'active' : ''}`}
                  onClick={() => setSelectedPersona(persona)}
                  data-game={persona.originGame}
                >
                  <span className="persona-list-name">{persona.name}</span>
                  <span className="persona-list-arcana">{persona.arcana}</span>
                </button>
              ))
            ) : (
              <div className="no-personas-found">No Personas found.</div>
            )}
          </div>
        </div>

        {/* Detailed View - Dynamically themed by Persona's Origin Game */}
        {selectedPersona && (
          <div className="compendium-detail" data-game={selectedPersona.originGame}>
            {/* Persona Header Image (Non-clickable container) */}
            <div className="persona-header-container">
              <div className="persona-image-box">
                <img 
                  src={`/images/Persona Artwork/${selectedPersona.originGame}/${selectedPersona.id}.png`} 
                  alt={selectedPersona.name} 
                  onError={(e) => handleImageError(e, selectedPersona)}
                  className="persona-artwork"
                />
              </div>

              <div className="persona-header-text">
                <div className="persona-badges">
                  <span className="persona-arcana-badge">{selectedPersona.arcana} Arcana</span>
                  <span className="persona-game-badge">Debut: {selectedPersona.originGame}</span>
                </div>
                <h2>{selectedPersona.name}</h2>
              </div>
            </div>

            {/* Elemental Affinities Table */}
            <div className="compendium-block">
              <h3>Elemental Affinities</h3>
              {activeAffinities.length > 0 ? (
                <div className="affinity-table">
                  {activeAffinities.map(([elem, type]) => (
                    <div key={elem} className={`affinity-cell ${type.toLowerCase()}`}>
                      <span className="affinity-label">{formatElementLabel(elem)}</span>
                      <span className="affinity-value">{type}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-affinities">No special elemental strengths or weaknesses.</p>
              )}
            </div>

            {/* In-Game Bio Section */}
            <div className="compendium-block">
              <h3>Persona Bio</h3>
              <p className="persona-bio-text">{selectedPersona.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}