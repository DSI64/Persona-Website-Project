import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { characterDB } from '../data/characterDB';
import "../pages-css/Home.css";

export default function Home() {
  const [dailyCharacter, setDailyCharacter] = useState(null);

  useEffect(() => {
    const today = new Date(); // Get the current date

    // Calculates the total number of full days since Jan 1, 1970
    // (getTime() returns milliseconds, so we divide by milliseconds in a day)
    const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));

    // Uses modulo to find a valid index within your array bounds
    // This loops back to the start of the array when it reaches the end
    const dailyIndex = daysSinceEpoch % characterDB.length;

    // Sets the character
    setDailyCharacter(characterDB[dailyIndex]);
  }, []);

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
          <Link to="/music" className="primary-action">Listen to Music</Link>
          <Link to="/characters" className="secondary-action">View Characters</Link>
        </div>
      </main>

      {/* EDGE-TO-EDGE DAILY CHARACTER BANNER */}
      {dailyCharacter && (
        <section className="daily-character-banner">
          <div className="daily-char-image">
            <img
              src={dailyCharacter.images[0]}
              alt={dailyCharacter.name}
              className="daily-char-img"
            />
          </div>

          <div className="daily-char-info">
            <span className="eyebrow">Character of the Day</span>
            <h2>{dailyCharacter.name}</h2>

            <ul className="char-stats">
              <li><strong>Game:</strong> {dailyCharacter.appearances}</li>
              <li><strong>Birthday:</strong> {dailyCharacter.birthday}</li>
              <li><strong>Arcana:</strong> {dailyCharacter.arcana}</li>
              <li><strong>Personas:</strong> {dailyCharacter.personas}</li>
            </ul>

            <p className="char-desc">
              {dailyCharacter.profile}
            </p>

            <Link to={`/characters/${dailyCharacter.id}`} className="primary-action char-btn">
              View Full Profile
            </Link>
          </div>
        </section>
      )}

      {/* Spotlight Grid */}
      <section className="spotlight-section">
        <div className="spotlight-grid">
          <Link
            to="/compendium"
            className="spotlight-card spotlight-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className="spotlight-tag">Database</span>
            <h2>Personas & Skills</h2>
            <p>Explore and learn elemental affinities as well as their debut origins in the Compendium.</p>
          </Link>

          <Link
            to="/social-links"
            className="spotlight-card spotlight-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className="spotlight-tag">Bonds</span>
            <h2>Social Links</h2>
            <p>Learn more about your favorite Protagonist's confidants across the Persona series.</p>
          </Link>

          <Link
            to="/quiz"
            className="spotlight-card spotlight-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className="spotlight-tag">Mini-Game</span>
            <h2>Midnight Quiz Show</h2>
            <p>Test your knowledge across Persona titles with Teddie's timed trivia challenge!</p>
          </Link>
        </div>
      </section>
    </div>
  );
}