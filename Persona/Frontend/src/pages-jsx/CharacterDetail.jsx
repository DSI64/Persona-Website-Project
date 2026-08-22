import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import "../pages-css/CharacterDetail.css";

export default function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCharacter() {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch(
          `/api/characters/${encodeURIComponent(id)}`,
        );

        if (!cancelled) {
          setCharacter(data);
          setCurrentImageIndex(0);
        }
      } catch (err) {
        if (!cancelled) {
          setCharacter(null);
          setError(err.message || "Character could not be loaded.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCharacter();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="not-found-page">
        <h2>Loading character file...</h2>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="not-found-page">
        <h2>Character file not found in the database.</h2>

        {error && <p>{error}</p>}

        <button className="back-btn" onClick={() => navigate("/characters")}>
          Back to Operatives
        </button>
      </div>
    );
  }

  const images =
    character.images?.length > 0
      ? character.images
      : character.image
        ? [character.image]
        : [];

  const nextImage = () => {
    if (images.length === 0) return;

    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;

    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const personaNames = character.personas
    ? character.personas
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="detail-page" data-game={character.game}>
      <div className="detail-nav-bar">
        <button className="back-btn" onClick={() => navigate("/characters")}>
          ← Back to Operatives
        </button>
      </div>

      <div className="detail-container">
        <div className="detail-left-column">
          <div className="detail-image-carousel-box">
            {images.length > 1 && (
              <button className="carousel-arrow left" onClick={prevImage}>
                ❮
              </button>
            )}

            <div className="carousel-image-display">
              {images.length > 0 ? (
                <img
                  src={images[currentImageIndex]}
                  alt={`${character.name} view ${currentImageIndex + 1}`}
                  className="carousel-img-element"
                />
              ) : (
                <div>No image available.</div>
              )}
            </div>

            {images.length > 1 && (
              <button className="carousel-arrow right" onClick={nextImage}>
                ❯
              </button>
            )}
          </div>

          {images.length > 0 && (
            <div className="carousel-counter" style={{ textAlign: "center" }}>
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        <div className="detail-right-column">
          <div className="ranks-header-wrap">
            <span className="detail-arcana-tag">{character.arcana} Arcana</span>

            <h1 className="detail-name">{character.name}</h1>

            <p className="detail-subtitle">{character.title}</p>
          </div>

          <div className="detail-bio-box">
            <ul className="detail-meta-list">
              <li>
                <strong>Arcana:</strong> {character.arcana}
              </li>

              <li>
                <strong>Birthday:</strong> {character.birthday || "N/A"}
              </li>

              <li>
                <strong>Persona(s):</strong>{" "}
                {personaNames.length > 0
                  ? personaNames.map((personaName, index) => (
                      <span key={`${personaName}-${index}`}>
                        <button
                          className="persona-link-tag"
                          onClick={() =>
                            navigate(
                              `/compendium?search=${encodeURIComponent(
                                personaName,
                              )}`,
                            )
                          }
                        >
                          {personaName}
                        </button>

                        {index < personaNames.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "N/A"}
              </li>

              <li>
                <strong>Appearances:</strong> {character.appearances || "N/A"}
              </li>

              <li>
                <strong>Voice Actors:</strong> {character.voiceActors || "N/A"}
              </li>

              {character.likes && (
                <li>
                  <strong>Likes:</strong> {character.likes}
                </li>
              )}

              {character.dislikes && (
                <li>
                  <strong>Dislikes:</strong> {character.dislikes}
                </li>
              )}
            </ul>

            <hr className="detail-divider" />

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