import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import "../pages-css/SocialLinks.css";

export default function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [filterGame, setFilterGame] = useState("All");
  const [filterArcana, setFilterArcana] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function loadSocialLinks() {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch("/api/social-links");

        if (!cancelled) {
          setSocialLinks(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Failed to load social links."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSocialLinks();

    return () => {
      cancelled = true;
    };
  }, []);

  const allArcanas = useMemo(() => {
    return [
      ...new Set(
        socialLinks
          .map((link) => link.arcana)
          .filter(Boolean)
      ),
    ].sort();
  }, [socialLinks]);

  const filteredLinks = useMemo(() => {
    return socialLinks.filter((link) => {
      const matchGame =
        filterGame === "All" || link.game === filterGame;

      const matchArcana =
        filterArcana === "All" ||
        link.arcana === filterArcana;

      return matchGame && matchArcana;
    });
  }, [socialLinks, filterGame, filterArcana]);

  if (loading) {
    return (
      <div className="roster-page">
        <div className="roster-header">
          <h1>Social Links & Confidants</h1>
          <p>Loading social link records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="roster-page">
        <div className="roster-header">
          <h1>Social Links & Confidants</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="roster-page">
      <div className="roster-header">
        <h1>Social Links & Confidants</h1>

        <div className="filters">
          <div className="filter-group">
            <label>Title:</label>

            <select
              value={filterGame}
              onChange={(e) => setFilterGame(e.target.value)}
            >
              <option value="All">All Games</option>
              <option value="P3">Persona 3 Reload</option>
              <option value="P3P">
                Persona 3 Portable
              </option>
              <option value="P4G">Persona 4 Golden</option>
              <option value="P5">Persona 5 Royal</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Arcana:</label>

            <select
              value={filterArcana}
              onChange={(e) =>
                setFilterArcana(e.target.value)
              }
            >
              <option value="All">All Arcanas</option>

              {allArcanas.map((arcana) => (
                <option key={arcana} value={arcana}>
                  {arcana}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="roster-grid">
        {filteredLinks.length > 0 ? (
          filteredLinks.map((link) => (
            <div
              key={link.id}
              className="roster-card"
              data-game={link.game}
              onClick={() =>
                navigate(`/social-links/${link.id}`)
              }
            >
              <div className="card-image-placeholder">
                {link.image?.includes("/") ||
                link.image?.includes(".") ? (
                  <img
                    src={link.image}
                    alt={link.name}
                  />
                ) : (
                  <span>{link.image}</span>
                )}
              </div>

              <div className="card-info">
                <span className="card-arcana">
                  {link.arcana}
                </span>

                <h3 className="card-name">
                  {link.name}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            No social links match this filter.
          </div>
        )}
      </div>
    </div>
  );
}