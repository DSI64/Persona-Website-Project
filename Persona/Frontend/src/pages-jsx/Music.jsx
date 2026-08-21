import {
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import YouTube from "react-youtube";
import "../pages-css/Music.css";
import { apiFetch } from "../api/api";

// ============================================================
// Helper: find the next playable track
// ============================================================

const getNextValidIndex = (
  tracks,
  startIndex,
  direction
) => {
  const len = tracks.length;

  if (len === 0) {
    return 0;
  }

  let idx =
    ((startIndex % len) + len) % len;

  let count = 0;

  while (
    !tracks[idx]?.embedId &&
    count < len
  ) {
    idx =
      ((idx + direction) % len + len) %
      len;

    count++;
  }

  return idx;
};

export default function Music() {
  // ============================================================
  // DATABASE DATA
  // ============================================================

  const [tracks, setTracks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ============================================================
  // ORIGINAL PLAYER STATE
  // ============================================================

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    expandedCategory,
    setExpandedCategory,
  ] = useState(null);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    volume,
    setVolume,
  ] = useState(80);

  const [
    showSettingsMenu,
    setShowSettingsMenu,
  ] = useState(false);

  const [
    randomizeOnFinish,
    setRandomizeOnFinish,
  ] = useState(false);

  const [
    autoplayNext,
    setAutoplayNext,
  ] = useState(true);

  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);

  const [
    duration,
    setDuration,
  ] = useState(0);

  // ============================================================
  // SEARCH
  // ============================================================

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    isSearchFocused,
    setIsSearchFocused,
  ] = useState(false);

  // ============================================================
  // PLAYER REFS
  // ============================================================

  const playerRef =
    useRef(null);

  const progressBarRef =
    useRef(null);

  const currentIndexRef =
    useRef(0);

  const randomizeRef =
    useRef(randomizeOnFinish);

  const autoplayRef =
    useRef(autoplayNext);

  const isPlayingRef =
    useRef(isPlaying);

  // ============================================================
  // LOAD MUSIC FROM BACKEND
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    async function loadMusic() {
      try {
        setLoading(true);
        setError("");

        const data =
          await apiFetch("/api/music");

        if (cancelled) {
          return;
        }

        if (!Array.isArray(data)) {
          throw new Error(
            "Music API returned invalid data."
          );
        }

        /*
         * Keep the original track behavior, but use the
         * database ID as the master ordering.
         */
        const playableTracks =
          [...data]
            .filter(
              (track) =>
                track &&
                track.embedId &&
                String(
                  track.embedId
                ).trim() !== ""
            )
            .sort((a, b) => {
              const aId =
                Number(a.id);

              const bId =
                Number(b.id);

              if (
                Number.isFinite(aId) &&
                Number.isFinite(bId)
              ) {
                return (
                  aId - bId
                );
              }

              return String(
                a.id
              ).localeCompare(
                String(b.id),
                undefined,
                {
                  numeric: true,
                }
              );
            });

        setTracks(
          playableTracks
        );

        currentIndexRef.current =
          0;
      } catch (err) {
        if (!cancelled) {
          console.error(
            "Failed to load music:",
            err
          );

          setError(
            err.message ||
              "Failed to load music."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMusic();

    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================================
  // KEEP CURRENT INDEX REF SYNCHRONIZED
  // ============================================================

  useEffect(() => {
    currentIndexRef.current =
      currentIndex;
  }, [currentIndex]);

  // ============================================================
  // CURRENT TRACK
  // ============================================================

  const currentTrack =
    tracks[currentIndex];

  // ============================================================
  // CATEGORIES
  // ============================================================

  const categories = useMemo(() => {
    const unique =
      new Set();

    tracks.forEach((track) => {
      if (track.category) {
        unique.add(
          track.category
        );
      }
    });

    return [
      "All",
      ...Array.from(unique),
    ];
  }, [tracks]);

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredTracks =
    useMemo(() => {
      if (!searchQuery.trim()) {
        return [];
      }

      const lowerQuery =
        searchQuery.toLowerCase();

      const matched =
        tracks.filter(
          (track) =>
            (
              track.title &&
              track.title
                .toLowerCase()
                .includes(
                  lowerQuery
                )
            ) ||
            (
              track.game &&
              track.game
                .toLowerCase()
                .includes(
                  lowerQuery
                )
            )
        );

      /*
       * Same deduplication behavior as original.
       */
      const uniqueMap =
        new Map();

      matched.forEach(
        (track) => {
          const uniqueKey =
            track.id !==
              undefined &&
            track.id !== null
              ? track.id
              : `${track.title}-${track.game}-${track.embedId}`;

          if (
            !uniqueMap.has(
              uniqueKey
            )
          ) {
            uniqueMap.set(
              uniqueKey,
              track
            );
          }
        }
      );

      return Array.from(
        uniqueMap.values()
      );
    }, [
      searchQuery,
      tracks,
    ]);

  // ============================================================
  // KEEP EVENT-HANDLER REFS FRESH
  // ============================================================

  useEffect(() => {
    randomizeRef.current =
      randomizeOnFinish;
  }, [
    randomizeOnFinish,
  ]);

  useEffect(() => {
    autoplayRef.current =
      autoplayNext;
  }, [
    autoplayNext,
  ]);

  useEffect(() => {
    isPlayingRef.current =
      isPlaying;
  }, [
    isPlaying,
  ]);

  // ============================================================
  // PLAY / PAUSE
  // ============================================================

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }

    try {
      if (isPlaying) {
        const state =
          playerRef.current.getPlayerState();

        /*
         * 1 = playing
         * 3 = buffering
         *
         * Do not call playVideo if YouTube is already playing
         * or buffering.
         */
        if (
          state !== 1 &&
          state !== 3
        ) {
          playerRef.current.playVideo();
        }
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (err) {
      console.error(
        "Play/pause error:",
        err
      );
    }
  }, [isPlaying]);

  // ============================================================
  // VOLUME
  // ============================================================

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }

    try {
      playerRef.current.setVolume(
        Number(volume)
      );
    } catch (err) {
      console.error(
        "Volume error:",
        err
      );
    }
  }, [volume]);

  // ============================================================
  // PROGRESS UPDATER
  // ============================================================

  useEffect(() => {
    let interval =
      null;

    if (isPlaying) {
      interval =
        setInterval(() => {
          if (
            playerRef.current &&
            typeof playerRef.current
              .getCurrentTime ===
              "function"
          ) {
            try {
              setCurrentTime(
                playerRef.current.getCurrentTime()
              );

              setDuration(
                playerRef.current.getDuration() ||
                  0
              );
            } catch {
              // Ignore temporary YouTube timing errors.
            }
          }
        }, 500);
    }

    return () => {
      if (interval) {
        clearInterval(
          interval
        );
      }
    };
  }, [isPlaying]);

  // ============================================================
  // LOAD SONG WHEN CURRENT TRACK CHANGES
  // ============================================================

  useEffect(() => {
    if (!currentTrack?.embedId) {
      return;
    }

    if (!playerRef.current) {
      return;
    }

    /*
     * Load the new song.
     *
     * We intentionally do not depend on isPlaying here.
     * That means pause/unpause does NOT reload the song.
     */
    try {
      if (isPlayingRef.current) {
        playerRef.current.loadVideoById(
          String(
            currentTrack.embedId
          )
        );
      } else {
        playerRef.current.cueVideoById(
          String(
            currentTrack.embedId
          )
        );
      }
    } catch (err) {
      console.error(
        "Failed to load track:",
        err
      );
    }
  }, [
    currentTrack?.embedId,
  ]);

  // ============================================================
  // PLAY / PAUSE BUTTON
  // ============================================================

  const handlePlayPause =
    () => {
      setIsPlaying(
        (previous) =>
          !previous
      );
    };

  // ============================================================
  // NEXT
  // ============================================================

  const handleNext =
    () => {
      if (tracks.length === 0) {
        return;
      }

      setIsPlaying(true);

      setCurrentTime(0);

      setCurrentIndex(
        (previous) =>
          getNextValidIndex(
            tracks,
            previous + 1,
            1
          )
      );
    };

  // ============================================================
  // PREVIOUS
  // ============================================================

  const handlePrev =
    () => {
      if (tracks.length === 0) {
        return;
      }

      setIsPlaying(true);

      setCurrentTime(0);

      setCurrentIndex(
        (previous) =>
          getNextValidIndex(
            tracks,
            previous - 1,
            -1
          )
      );
    };

  // ============================================================
  // INSTANT RANDOMIZE
  // ============================================================

  const handleRandomize =
    () => {
      const validIndices =
        tracks
          .map(
            (
              track,
              index
            ) =>
              track.embedId
                ? index
                : null
          )
          .filter(
            (index) =>
              index !== null
          );

      if (
        validIndices.length ===
        0
      ) {
        return;
      }

      const randomIdx =
        validIndices[
          Math.floor(
            Math.random() *
              validIndices.length
          )
        ];

      setIsPlaying(true);

      setCurrentTime(0);

      setCurrentIndex(
        randomIdx
      );
    };

  // ============================================================
  // TRACK SELECT
  // ============================================================

  const handleTrackSelect =
    (track) => {
      const index =
        tracks.findIndex(
          (item) =>
            item.id ===
              track.id ||
            (
              item.title ===
                track.title &&
              item.game ===
                track.game
            )
        );

      if (index !== -1) {
        setIsPlaying(true);

        setCurrentTime(0);

        setCurrentIndex(
          index
        );
      }
    };

  // ============================================================
  // CATEGORY
  // ============================================================

  const handleCategoryClick =
    (category) => {
      setSelectedCategory(
        category
      );

      setExpandedCategory(
        (previous) =>
          previous ===
          category
            ? null
            : category
      );
    };

  // ============================================================
  // PROGRESS BAR
  // ============================================================

  const handleProgressBarClick =
    (event) => {
      if (
        !progressBarRef.current ||
        !playerRef.current
      ) {
        return;
      }

      const rect =
        progressBarRef.current.getBoundingClientRect();

      const clickPosition =
        (event.clientX -
          rect.left) /
        rect.width;

      const targetTime =
        clickPosition *
        duration;

      try {
        playerRef.current.seekTo(
          targetTime,
          true
        );

        setCurrentTime(
          targetTime
        );
      } catch (err) {
        console.error(
          "Seek error:",
          err
        );
      }
    };

  // ============================================================
  // FORMAT TIME
  // ============================================================

  const formatTime =
    (seconds) => {
      if (
        Number.isNaN(
          Number(seconds)
        )
      ) {
        return "0:00";
      }

      const minutes =
        Math.floor(
          seconds / 60
        );

      const remainingSeconds =
        Math.floor(
          seconds % 60
        );

      return `${minutes}:${
        remainingSeconds <
        10
          ? "0"
          : ""
      }${remainingSeconds}`;
    };

  // ============================================================
  // PLAYER READY
  // ============================================================

  const onPlayerReady =
    (event) => {
      playerRef.current =
        event.target;

      try {
        event.target.setVolume(
          Number(volume)
        );

        setDuration(
          event.target.getDuration() ||
            0
        );

        /*
         * If playback was already requested,
         * start the video.
         */
        if (
          isPlayingRef.current
        ) {
          event.target.playVideo();
        }
      } catch (err) {
        console.error(
          "YouTube ready error:",
          err
        );
      }
    };

  // ============================================================
  // YOUTUBE STATE CHANGE
  // ============================================================

  const onPlayerStateChange =
    (event) => {
      /*
       * 0 = ended
       */
      if (event.data === 0) {
        if (
          randomizeRef.current
        ) {
          /*
           * EXACT ORIGINAL BEHAVIOR:
           * choose a random track and start it.
           */
          handleRandomize();
        } else if (
          autoplayRef.current
        ) {
          /*
           * EXACT ORIGINAL BEHAVIOR:
           * move to the next ID in order.
           */
          handleNext();
        } else {
          setIsPlaying(false);
        }

        return;
      }

      /*
       * 5 = cued
       * -1 = unstarted
       *
       * Original behavior was to tell YouTube to start
       * whenever React still believed playback should be active.
       */
      if (
        event.data === 5 ||
        event.data === -1
      ) {
        if (
          isPlayingRef.current
        ) {
          try {
            event.target.playVideo();
          } catch (err) {
            console.error(
              "Failed to resume playback:",
              err
            );
          }
        }
      }
    };

  // ============================================================
  // YOUTUBE OPTIONS
  // ============================================================

  const ytOptions = {
    height: "10",
    width: "10",

    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
    },
  };

  // ============================================================
  // PROGRESS
  // ============================================================

  const progressPercent =
    duration > 0
      ? (currentTime /
          duration) *
        100
      : 0;

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <div className="music-page-container">
        <div className="landing-grain"></div>

        <header className="music-header">
          <div className="eyebrow">
            Velvet Room Audio Logs
          </div>

          <h2>
            Soundtrack Compendium
          </h2>

          <p>
            Loading soundtrack records...
          </p>
        </header>
      </div>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error) {
    return (
      <div className="music-page-container">
        <div className="landing-grain"></div>

        <header className="music-header">
          <div className="eyebrow">
            Velvet Room Audio Logs
          </div>

          <h2>
            Soundtrack Compendium
          </h2>

          <p>
            {error}
          </p>
        </header>
      </div>
    );
  }

  // ============================================================
  // EMPTY STATE
  // ============================================================

  if (!currentTrack) {
    return (
      <div className="music-page-container">
        <div className="landing-grain"></div>

        <header className="music-header">
          <div className="eyebrow">
            Velvet Room Audio Logs
          </div>

          <h2>
            Soundtrack Compendium
          </h2>

          <p>
            No playable tracks were found.
          </p>
        </header>
      </div>
    );
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div
      className={`music-page-container ${
        currentTrack.themeClass ||
        ""
      }`}
    >
      <div className="landing-grain"></div>

      {/* ========================================================
          HIDDEN YOUTUBE PLAYER
          ======================================================== */}

      <div
        style={{
          position:
            "absolute",
          top: "-9999px",
          left: "-9999px",
        }}
      >
        <YouTube
          /*
           * Keep a single persistent player.
           *
           * The original implementation uses the first
           * track as the initial video and then swaps the
           * video with loadVideoById/cueVideoById.
           */
          videoId={
            tracks[0]?.embedId
          }
          opts={ytOptions}
          onReady={
            onPlayerReady
          }
          onStateChange={
            onPlayerStateChange
          }
        />
      </div>

      {/* ========================================================
          HEADER
          ======================================================== */}

      <header className="music-header">
        <div className="eyebrow">
          Velvet Room Audio Logs
        </div>

        <h2>
          Soundtrack Compendium
        </h2>
      </header>

      <div className="music-layout-grid centered-layout">

        {/* ======================================================
            LEFT SIDEBAR
            ====================================================== */}

        <aside className="music-sidebar">
          <div className="category-section">

            <h3>
              Discs & Categories
            </h3>

            <div className="category-list">

              {categories.map(
                (category) => {
                  const isSelected =
                    selectedCategory ===
                    category;

                  const isExpanded =
                    expandedCategory ===
                    category;

                  const categoryTracks =
                    tracks.filter(
                      (track) =>
                        category ===
                          "All" ||
                        track.category ===
                          category
                    );

                  return (
                    <div
                      key={
                        category
                      }
                      className="category-item-wrapper"
                    >

                      <button
                        className={`category-btn ${
                          isSelected
                            ? "active-cat"
                            : ""
                        }`}
                        onClick={() =>
                          handleCategoryClick(
                            category
                          )
                        }
                      >
                        <span>
                          {category ===
                          "All"
                            ? "CD - All Records"
                            : `CD - ${category}`}
                        </span>

                        <span className="dropdown-arrow">
                          {isExpanded
                            ? "▼"
                            : "▶"}
                        </span>
                      </button>

                      {isExpanded && (
                        <ul className="sidebar-dropdown-list">

                          {categoryTracks.map(
                            (
                              track,
                              index
                            ) => (
                              <li
                                key={
                                  track.id ||
                                  index
                                }
                                className={`sidebar-dropdown-track ${
                                  currentTrack.id ===
                                  track.id
                                    ? "active-subtrack"
                                    : ""
                                }`}
                                onClick={(
                                  event
                                ) => {
                                  event.stopPropagation();

                                  handleTrackSelect(
                                    track
                                  );
                                }}
                              >

                                <div className="subtrack-info">

                                  <span className="subtrack-title">
                                    {String(
                                      index +
                                        1
                                    ).padStart(
                                      2,
                                      "0"
                                    )}{" "}
                                    -{" "}
                                    {
                                      track.title
                                    }
                                  </span>

                                  <span className="subtrack-game">
                                    {
                                      track.game
                                    }
                                  </span>

                                </div>

                                <span className="subtrack-indicator">
                                  ♪
                                </span>

                              </li>
                            )
                          )}

                        </ul>
                      )}

                    </div>
                  );
                }
              )}

            </div>
          </div>
        </aside>

        {/* ======================================================
            MAIN PLAYER
            ====================================================== */}

        <main className="music-main-pane">

          {/* ====================================================
              SEARCH
              ==================================================== */}

          <div className="search-container">

            <input
              type="text"
              className="p5-sidebar-search"
              placeholder="Search for a track or game..."
              value={
                searchQuery
              }
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              onFocus={() =>
                setIsSearchFocused(
                  true
                )
              }
              onBlur={() =>
                setTimeout(
                  () =>
                    setIsSearchFocused(
                      false
                    ),
                  300
                )
              }
            />

            {isSearchFocused &&
              searchQuery.trim() && (
                <div className="search-results-dropdown">

                  {filteredTracks.length >
                  0 ? (

                    filteredTracks.map(
                      (
                        track,
                        index
                      ) => (
                        <div
                          key={
                            track.id ||
                            index
                          }
                          className="search-result-item"
                          onMouseDown={(
                            event
                          ) => {
                            event.preventDefault();

                            handleTrackSelect(
                              track
                            );

                            setSearchQuery(
                              ""
                            );

                            setSelectedCategory(
                              track.category
                            );

                            setExpandedCategory(
                              track.category
                            );
                          }}
                        >

                          <span className="search-result-title">
                            {
                              track.title
                            }
                          </span>

                          <span className="search-result-game">
                            {
                              track.game
                            }
                          </span>

                        </div>
                      )
                    )

                  ) : (

                    <div className="search-result-item">
                      <span
                        className="search-result-title"
                        style={{
                          color:
                            "#666",
                        }}
                      >
                        No records found...
                      </span>
                    </div>

                  )}

                </div>
              )}

          </div>

          {/* ====================================================
              PLAYER CARD
              ==================================================== */}

          <div className="music-player-card">

            {/* ==================================================
                BOX ART
                ================================================== */}

            <div className="player-boxart-area">

              <div className="game-box-container">

                <img
                  src={
                    currentTrack.boxArt ||
                    "/images/default-placeholder.png"
                  }
                  alt={`${currentTrack.game} Box Art`}
                  className="game-box-image"
                />

              </div>

            </div>

            {/* ==================================================
                CONTROLS
                ================================================== */}

            <div className="player-controls-area">

              {/* TRACK INFO */}

              <div className="track-meta-header">

                <h3>
                  {String(
                    currentTrack.title
                  ).replace(
                    /(\(|-)/,
                    "\n$1"
                  )}
                </h3>

                <p>
                  {
                    currentTrack.game
                  }{" "}
                  //{" "}
                  {
                    currentTrack.artist
                  }
                </p>

              </div>

              {/* ==================================================
                  PROGRESS BAR
                  ================================================== */}

              <div className="progress-section">

                <div className="time-display">

                  <span>
                    {formatTime(
                      currentTime
                    )}
                  </span>

                  <span>
                    {duration > 0
                      ? formatTime(
                          duration
                        )
                      : currentTrack.duration ||
                        "0:00"}
                  </span>

                </div>

                <div
                  className="progress-bar-bg"
                  ref={
                    progressBarRef
                  }
                  onClick={
                    handleProgressBarClick
                  }
                  style={{
                    cursor:
                      "pointer",
                  }}
                >

                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${progressPercent}%`,
                    }}
                  />

                </div>

              </div>

              {/* ==================================================
                  BUTTONS
                  ================================================== */}

              <div className="playback-buttons-row">

                <button
                  className="control-btn"
                  onClick={
                    handlePrev
                  }
                  title="Previous"
                >
                  ⏮
                </button>

                <button
                  className="control-btn play-pause-main"
                  onClick={
                    handlePlayPause
                  }
                  title={
                    isPlaying
                      ? "Pause"
                      : "Play"
                  }
                >
                  {isPlaying
                    ? "⏸"
                    : "▶"}
                </button>

                <button
                  className="control-btn"
                  onClick={
                    handleNext
                  }
                  title="Next"
                >
                  ⏭
                </button>

              </div>

              {/* ==================================================
                  VOLUME / SETTINGS
                  ================================================== */}

              <div className="volume-settings-row">

                <span className="volume-label">
                  Volume
                </span>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={
                    volume
                  }
                  onChange={(event) =>
                    setVolume(
                      Number(
                        event.target
                          .value
                      )
                    )
                  }
                  className="volume-slider"
                />

                <div className="settings-wrapper">

                  <button
                    className="settings-gear-btn"
                    onClick={() =>
                      setShowSettingsMenu(
                        (
                          previous
                        ) =>
                          !previous
                      )
                    }
                    title="Audio Options & Randomize"
                  >
                    ⚙
                  </button>

                  {showSettingsMenu && (
                    <div className="settings-dropdown">

                      {/* ==================================================
                          INSTANT RANDOMIZE
                          ================================================== */}

                      <div
                        className="settings-slider-row"
                        onClick={
                          handleRandomize
                        }
                        style={{
                          cursor:
                            "pointer",
                        }}
                      >

                        <span className="settings-slider-title">
                          Instant Randomize
                        </span>

                        <span
                          style={{
                            fontSize:
                              "1.2rem",
                            paddingRight:
                              "4px",
                          }}
                        >
                          🔀
                        </span>

                      </div>

                      {/* ==================================================
                          RANDOMIZE ON FINISH
                          ================================================== */}

                      <div className="settings-slider-row">

                        <span className="settings-slider-title">
                          Randomize on Finish
                        </span>

                        <label className="p5-switch">

                          <input
                            type="checkbox"
                            checked={
                              randomizeOnFinish
                            }
                            onChange={(
                              event
                            ) => {
                              const checked =
                                event
                                  .target
                                  .checked;

                              setRandomizeOnFinish(
                                checked
                              );

                              if (
                                checked
                              ) {
                                setAutoplayNext(
                                  false
                                );
                              }
                            }}
                          />

                          <span className="p5-slider-track"></span>

                        </label>

                      </div>

                      {/* ==================================================
                          AUTOPLAY NEXT
                          ================================================== */}

                      <div className="settings-slider-row">

                        <span className="settings-slider-title">
                          Autoplay Next Song
                        </span>

                        <label className="p5-switch">

                          <input
                            type="checkbox"
                            checked={
                              autoplayNext
                            }
                            onChange={(
                              event
                            ) => {
                              const checked =
                                event
                                  .target
                                  .checked;

                              setAutoplayNext(
                                checked
                              );

                              if (
                                checked
                              ) {
                                setRandomizeOnFinish(
                                  false
                                );
                              }
                            }}
                          />

                          <span className="p5-slider-track"></span>

                        </label>

                      </div>

                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}