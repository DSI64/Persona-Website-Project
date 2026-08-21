import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/api";
import "../pages-css/Characters.css";

// ============================================================
// GAME GROUPS
// ============================================================
// The database keeps the specific game names, while the UI
// groups related games together.
//
// Persona 2:
// - Persona 2: Innocent Sin
// - Persona 2: Eternal Punishment
//
// Both appear under one "Persona 2" filter.
// ============================================================

const GAME_GROUPS = {
  "Persona 1": ["P1"],
  "Persona 2": [
    "P2IS",
    "P2EP",
  ],
  "Persona 3": ["P3", "P3P"],
  "Persona 4": ["P4", "P4G"],
  "Persona 5": ["P5", "P5R"],
};

export default function Characters() {
  // ============================================================
  // STATE
  // ============================================================

  const [characters, setCharacters] = useState([]);

  const [filterGame, setFilterGame] = useState("All");

  const [filterArcana, setFilterArcana] =
    useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ============================================================
  // LOAD CHARACTERS FROM BACKEND
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    async function loadCharacters() {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch(
          "/api/characters"
        );

        if (cancelled) {
          return;
        }

        if (!Array.isArray(data)) {
          throw new Error(
            "The character API returned invalid data."
          );
        }

        setCharacters(data);
      } catch (err) {
        if (!cancelled) {
          console.error(
            "Failed to load characters:",
            err
          );

          setError(
            err.message ||
              "Failed to load characters."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCharacters();

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================================
  // ARCANA FILTER OPTIONS
  // ============================================================

  const allArcanas = useMemo(() => {
    return [
      ...new Set(
        characters
          .map((character) => character.arcana)
          .filter(Boolean)
      ),
    ].sort();
  }, [characters]);

  // ============================================================
  // GAME MATCHING
  // ============================================================
  //
  // This converts the UI selection:
  //
  // "Persona 2"
  //
  // into:
  //
  // [
  //   "Persona 2: Innocent Sin",
  //   "Persona 2: Eternal Punishment"
  // ]
  //
  // So either version will match the filter.
  // ============================================================

  const selectedGames = useMemo(() => {
    if (filterGame === "All") {
      return null;
    }

    return GAME_GROUPS[filterGame] || [];
  }, [filterGame]);

  // ============================================================
  // FILTER CHARACTERS
  // ============================================================

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      // --------------------------------------------------------
      // Game filter
      // --------------------------------------------------------

      const matchGame =
        selectedGames === null ||
        selectedGames.includes(character.game);

      // --------------------------------------------------------
      // Arcana filter
      // --------------------------------------------------------

      const matchArcana =
        filterArcana === "All" ||
        character.arcana === filterArcana;

      return matchGame && matchArcana;
    });
  }, [
    characters,
    selectedGames,
    filterArcana,
  ]);

  // ============================================================
  // LOADING SCREEN
  // ============================================================

  if (loading) {
    return (
      <div className="roster-page">
        <div className="roster-header">
          <h1>Operatives</h1>

          <p>
            Loading character records...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR SCREEN
  // ============================================================

  if (error) {
    return (
      <div className="roster-page">
        <div className="roster-header">
          <h1>Operatives</h1>

          <p>
            Unable to load the character database.
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
    <div className="roster-page">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="roster-header">
        <h1>Operatives</h1>

        {/* ======================================================
            FILTERS
        ====================================================== */}

        <div className="filters">

          {/* ====================================================
              GAME FILTER
          ==================================================== */}

          <div className="filter-group">
            <label htmlFor="game-filter">
              Title:
            </label>

            <select
              id="game-filter"
              value={filterGame}
              onChange={(event) =>
                setFilterGame(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Games
              </option>

              {Object.keys(GAME_GROUPS).map(
                (gameName) => (
                  <option
                    key={gameName}
                    value={gameName}
                  >
                    {gameName}
                  </option>
                )
              )}
            </select>
          </div>

          {/* ====================================================
              ARCANA FILTER
          ==================================================== */}

          <div className="filter-group">
            <label htmlFor="arcana-filter">
              Arcana:
            </label>

            <select
              id="arcana-filter"
              value={filterArcana}
              onChange={(event) =>
                setFilterArcana(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Arcanas
              </option>

              {allArcanas.map((arcana) => (
                <option
                  key={arcana}
                  value={arcana}
                >
                  {arcana}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================
          CHARACTER GRID
      ======================================================== */}

      <div className="roster-grid">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map(
            (character) => {
              // --------------------------------------------------
              // Prefer the first item in images.
              // Fall back to the original image field.
              // --------------------------------------------------

              const characterImage =
                character.images?.length > 0
                  ? character.images[0]
                  : character.image;

              return (
                <div
                  key={character.id}
                  className="roster-card"
                  data-game={character.game}
                  onClick={() =>
                    navigate(
                      `/characters/${character.id}`
                    )
                  }
                >

                  {/* ============================================
                      CHARACTER IMAGE
                  ============================================ */}

                  <div className="card-image-placeholder">
                    {characterImage ? (
                      <img
                        src={characterImage}
                        alt={character.name}
                        className="roster-card-img"
                      />
                    ) : (
                      <div className="no-character-image">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* ============================================
                      CHARACTER INFO
                  ============================================ */}

                  <div className="card-info">

                    <span className="card-arcana">
                      {character.arcana}
                    </span>

                    <h3 className="card-name">
                      {character.name}
                    </h3>

                  </div>
                </div>
              );
            }
          )
        ) : (
          <div className="no-results">
            No characters match this filter.
          </div>
        )}
      </div>
    </div>
  );
}