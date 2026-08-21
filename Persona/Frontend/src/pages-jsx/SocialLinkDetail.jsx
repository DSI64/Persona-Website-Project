import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import "../pages-css/SocialLinkDetail.css";

export default function SocialLinkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [socialLink, setSocialLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSocialLink() {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch(
          `/api/social-links/${encodeURIComponent(id)}`
        );

        if (!cancelled) {
          setSocialLink(data);
        }
      } catch (err) {
        if (!cancelled) {
          setSocialLink(null);
          setError(
            err.message || "Social link could not be loaded."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSocialLink();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="not-found-page">
        <h2>Loading social link...</h2>
      </div>
    );
  }

  if (!socialLink) {
    return (
      <div className="not-found-page">
        <h2>Social Link not found!</h2>

        {error && <p>{error}</p>}

        <button
          onClick={() => navigate("/social-links")}
        >
          Back to Roster
        </button>
      </div>
    );
  }

  return (
    <div
      className="detail-page"
      data-game={socialLink.game}
    >
      <div className="detail-nav-bar">
        <button
          className="back-btn"
          onClick={() => navigate("/social-links")}
        >
          ← Back to Roster
        </button>
      </div>

      <div className="detail-container">
        <div className="detail-left-column">
          <div className="detail-image-box">
            {socialLink.image?.includes("/") ||
            socialLink.image?.includes(".") ? (
              <img
                src={socialLink.image}
                alt={socialLink.name}
              />
            ) : (
              <span>{socialLink.image}</span>
            )}
          </div>
        </div>

        <div className="detail-right-column">
          <div className="ranks-header-wrap">
            <span className="detail-arcana-tag">
              {socialLink.arcana} Arcana
            </span>

            <h1 className="detail-name">
              {socialLink.name}
            </h1>

            <p className="detail-subtitle">
              {socialLink.title}
            </p>
          </div>

          <div className="detail-bio-box">
            <ul className="detail-meta-list">
              <li>
                <strong>Game:</strong>{" "}
                {socialLink.game}
              </li>

              <li>
                <strong>Availability:</strong>{" "}
                {socialLink.availability}
              </li>

              <li>
                <strong>Requirements:</strong>{" "}
                {socialLink.requirements}
              </li>
            </ul>

            <hr className="detail-divider" />

            <div className="detail-bio-block">
              <h3>Biography</h3>
              <p>{socialLink.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}