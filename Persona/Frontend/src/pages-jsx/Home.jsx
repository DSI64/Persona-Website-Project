import { Link } from 'react-router-dom';
import "../pages-css/Home.css";

export default function Home() {
  return (
    <div className="landing-page">
      <div className="landing-grain"></div>

      {/* Hero Section */}
      <main className="hero-stage">
        <p className="eyebrow">Welcome to the Velvet Room</p>
        <h1>Persona Compendium</h1>
        <p className="hero-copy">
          Your ultimate database for Personas, Social Links, and Velvet Room records across the modern universe.
        </p>
        
        <div className="hero-actions">
          <Link to="/compendium" className="primary-action">Open Compendium</Link>
          <Link to="/characters" className="secondary-action">View Characters</Link>
        </div>
      </main>

      {/* EDGE-TO-EDGE DAILY CHARACTER BANNER */}
      <section className="daily-character-banner">
        <div className="daily-char-image">
          {/* Replaced placeholder div with an img tag */}
          <img 
            src="/images/characters/makoto_1.webp" 
            alt="Makoto Yuki" 
            className="daily-char-img"
          />
        </div>
        
        <div className="daily-char-info">
          <span className="eyebrow">Character of the Day</span>
          <h2>Makoto Yuki</h2>
          
          <ul className="char-stats">
            <li><strong>Game:</strong> Persona 3 Reload</li>
            <li><strong>Birthday:</strong> Unknown (c. 1992)</li>
            <li><strong>Arcana:</strong> The Fool</li>
            <li><strong>Initial Persona:</strong> Orpheus</li>
          </ul>
          
          <p className="char-desc">
            The transfer student who awakens to the power of the Wild Card. He leads S.E.E.S. in their mission to eliminate the Shadows and explore Tartarus during the Dark Hour.
          </p>
          
          <Link to="/characters/300" className="primary-action char-btn">View Full Profile</Link>
        </div>
      </section>

      {/* Spotlight Grid */}
      <section className="spotlight-section">
        <div className="spotlight-grid">
          <Link to="/compendium" className="spotlight-card spotlight-link">
            <span className="spotlight-tag">Database</span>
            <h2>Personas & Skills</h2>
            <p>Explore elemental affinities, level-up skills, and debut origins in the Compendium.</p>
          </Link>
          <Link to="/social-links" className="spotlight-card spotlight-link">
            <span className="spotlight-tag">Bonds</span>
            <h2>Social Links</h2>
            <p>Track confidant progression, availability, and optimal dialogue choices.</p>
          </Link>
          <Link to="/quiz" className="spotlight-card spotlight-link">
            <span className="spotlight-tag">Mini-Game</span>
            <h2>Midnight Quiz Show</h2>
            <p>Test your knowledge across Persona titles with Teddie's timed trivia challenge!</p>
          </Link>
        </div>
      </section>
    </div>
  );
}