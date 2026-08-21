import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { apiFetch } from "../api/api";
import { PERSONA_IMAGES } from "../data/personaImages";
import "../pages-css/Compendium.css";

// ============================================================
// PERSONA IMAGE
// ============================================================

function PersonaImage({ persona }) {
  const imagePath =
    persona?.id
      ? PERSONA_IMAGES[persona.id]
      : null;

  return (
    <img
      src={
        imagePath ||
        "/images/default-placeholder.png"
      }
      alt={
        persona?.name || "Persona"
      }
      className="persona-artwork"
      onError={(event) => {
        // Prevent an infinite loop if the placeholder itself
        // cannot be loaded.
        if (
          event.currentTarget.src.endsWith(
            "/images/default-placeholder.png"
          )
        ) {
          return;
        }

        event.currentTarget.src =
          "/images/default-placeholder.png";
      }}
    />
  );
}

// ============================================================
// MAIN COMPENDIUM
// ============================================================

export default function Compendium() {
  // ============================================================
  // URL PARAMETERS
  // ============================================================

  const [searchParams] =
    useSearchParams();

  // ============================================================
  // STATE
  // ============================================================

  const [personas, setPersonas] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedGame, setSelectedGame] =
    useState("All");

  const [selectedPersona, setSelectedPersona] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ============================================================
  // LOAD PERSONAS FROM BACKEND
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    async function loadPersonas() {
      try {
        setLoading(true);
        setError("");

        const data =
          await apiFetch(
            "/api/personas"
          );

        if (cancelled) {
          return;
        }

        if (!Array.isArray(data)) {
          throw new Error(
            "The Persona API returned invalid data."
          );
        }

        setPersonas(data);
      } catch (err) {
        if (!cancelled) {
          console.error(
            "Failed to load Personas:",
            err
          );

          setError(
            err.message ||
              "Failed to load Persona database."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPersonas();

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================================
  // HANDLE URL SEARCH
  // ============================================================

  useEffect(() => {
    if (personas.length === 0) {
      setSelectedPersona(null);
      return;
    }

    const query =
      searchParams.get("search");

    if (query) {
      setSearchTerm(query);

      // Exact name match
      const exactMatch =
        personas.find(
          (persona) =>
            String(
              persona.name || ""
            ).toLowerCase() ===
            query.toLowerCase()
        );

      if (exactMatch) {
        setSelectedPersona(
          exactMatch
        );

        return;
      }

      // Partial name match
      const partialMatch =
        personas.find(
          (persona) =>
            String(
              persona.name || ""
            )
              .toLowerCase()
              .includes(
                query.toLowerCase()
              )
        );

      setSelectedPersona(
        partialMatch ||
          personas[0]
      );

      return;
    }

    // Preserve the current Persona if it still exists.
    setSelectedPersona(
      (current) => {
        if (
          current &&
          personas.some(
            (persona) =>
              persona.id ===
              current.id
          )
        ) {
          return current;
        }

        return personas[0];
      }
    );
  }, [
    personas,
    searchParams,
  ]);

  // ============================================================
  // FILTER PERSONAS
  // ============================================================

  const filteredPersonas =
    useMemo(() => {
      const lowerSearch =
        searchTerm
          .toLowerCase()
          .trim();

      return personas.filter(
        (persona) => {
          const name =
            String(
              persona.name || ""
            ).toLowerCase();

          const matchesSearch =
            !lowerSearch ||
            name.includes(
              lowerSearch
            );

          const matchesGame =
            selectedGame ===
              "All" ||
            persona.originGame ===
              selectedGame;

          return (
            matchesSearch &&
            matchesGame
          );
        }
      );
    }, [
      personas,
      searchTerm,
      selectedGame,
    ]);

  // ============================================================
  // GAME OPTIONS
  // ============================================================

  const gameOptions =
    useMemo(() => {
      const games = new Set();

      personas.forEach(
        (persona) => {
          if (
            persona.originGame
          ) {
            games.add(
              persona.originGame
            );
          }
        }
      );

      return Array.from(
        games
      ).sort();
    }, [personas]);

  // ============================================================
  // ELEMENT LABEL
  // ============================================================

  const formatElementLabel =
    (element) => {
      const key =
        String(element)
          .toLowerCase()
          .trim();

      if (
        key === "curse" ||
        key === "dark"
      ) {
        return "CURSE / DARK";
      }

      if (
        key === "bless" ||
        key === "light"
      ) {
        return "BLESS / LIGHT";
      }

      return String(
        element
      ).toUpperCase();
    };

  // ============================================================
  // AFFINITIES
  // ============================================================

  const activeAffinities =
    selectedPersona
      ? Object.entries(
          selectedPersona.affinities ||
            {}
        ).filter(
          ([, type]) =>
            type !== "-" &&
            type !== null &&
            type !== undefined &&
            String(type).trim() !== ""
        )
      : [];

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="compendium-page">
        <h1 className="compendium-title">
          Velvet Room Compendium
        </h1>

        <div className="compendium-loading">
          Loading Persona records...
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="compendium-page">
        <h1 className="compendium-title">
          Velvet Room Compendium
        </h1>

        <div className="compendium-error">
          <p>
            Unable to load the Persona database.
          </p>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (
    <div className="compendium-page">

      {/* ========================================================
          TITLE
          ======================================================== */}

      <h1 className="compendium-title">
        Velvet Room Compendium
      </h1>

      {/* ========================================================
          MAIN LAYOUT
          ======================================================== */}

      <div className="compendium-layout">

        {/* ======================================================
            SIDEBAR
            ====================================================== */}

        <div className="compendium-sidebar">

          {/* ====================================================
              FILTERS
              ==================================================== */}

          <div className="filter-controls">

            <input
              id="persona-search"
              name="persona-search"
              type="text"
              placeholder="Search Persona..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              className="compendium-search"
            />

            <select
              id="persona-game-filter"
              name="persona-game-filter"
              value={selectedGame}
              onChange={(event) =>
                setSelectedGame(
                  event.target.value
                )
              }
              className="compendium-select"
            >
              <option value="All">
                All Games
              </option>

              {gameOptions.map(
                (game) => (
                  <option
                    key={game}
                    value={game}
                  >
                    {game}
                  </option>
                )
              )}
            </select>

          </div>

          {/* ====================================================
              PERSONA LIST
              ==================================================== */}

          <div className="persona-list">

            {filteredPersonas.length >
            0 ? (
              filteredPersonas.map(
                (persona) => (
                  <button
                    key={
                      persona.id
                    }
                    type="button"
                    className={`persona-list-item ${
                      selectedPersona?.id ===
                      persona.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedPersona(
                        persona
                      )
                    }
                    data-game={
                      persona.originGame
                    }
                  >
                    <span className="persona-list-name">
                      {
                        persona.name
                      }
                    </span>

                    <span className="persona-list-arcana">
                      {
                        persona.arcana
                      }
                    </span>
                  </button>
                )
              )
            ) : (
              <div className="no-personas-found">
                No Personas found.
              </div>
            )}

          </div>
        </div>

        {/* ======================================================
            DETAIL PANEL
            ====================================================== */}

        {selectedPersona && (
          <div
            className="compendium-detail"
            data-game={
              selectedPersona.originGame
            }
          >

            {/* ==================================================
                PERSONA HEADER
                ================================================== */}

            <div className="persona-header-container">

              {/* =================================================
                  IMAGE
                  ================================================= */}

              <div className="persona-image-box">
                <PersonaImage
                  persona={
                    selectedPersona
                  }
                />
              </div>

              {/* =================================================
                  HEADER TEXT
                  ================================================= */}

              <div className="persona-header-text">

                <div className="persona-badges">

                  <span className="persona-arcana-badge">
                    {
                      selectedPersona.arcana
                    }{" "}
                    Arcana
                  </span>

                  <span className="persona-game-badge">
                    Debut:{" "}
                    {
                      selectedPersona.originGame
                    }
                  </span>

                </div>

                <h2>
                  {
                    selectedPersona.name
                  }
                </h2>

              </div>
            </div>

            {/* ==================================================
                AFFINITIES
                ================================================== */}

            <div className="compendium-block">

              <h3>
                Elemental Affinities
              </h3>

              {activeAffinities.length >
              0 ? (
                <div className="affinity-table">

                  {activeAffinities.map(
                    ([
                      element,
                      type,
                    ]) => (
                      <div
                        key={
                          element
                        }
                        className={`affinity-cell ${String(
                          type
                        ).toLowerCase()}`}
                      >

                        <span className="affinity-label">
                          {formatElementLabel(
                            element
                          )}
                        </span>

                        <span className="affinity-value">
                          {
                            type
                          }
                        </span>

                      </div>
                    )
                  )}

                </div>
              ) : (
                <p className="no-affinities">
                  No special elemental strengths or weaknesses.
                </p>
              )}

            </div>

            {/* ==================================================
                DESCRIPTION
                ================================================== */}

            <div className="compendium-block">

              <h3>
                Persona Bio
              </h3>

              <p className="persona-bio-text">
                {
                  selectedPersona.description ||
                  "No compendium description available."
                }
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}