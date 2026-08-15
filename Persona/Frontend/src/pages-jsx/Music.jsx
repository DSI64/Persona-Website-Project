import { useState, useMemo, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import "../pages-css/Music.css";
import { TRACK_DATA, CATEGORIES } from '../data/trackData';

// Helper function to find the next valid index securely outside of React closures
const getNextValidIndex = (startIndex, direction) => {
  const len = TRACK_DATA.length;
  let idx = (startIndex % len + len) % len;
  let count = 0;
  while (!TRACK_DATA[idx].embedId && count < len) {
    idx = ((idx + direction) % len + len) % len;
    count++;
  }
  return idx;
};

export default function Music() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const [randomizeOnFinish, setRandomizeOnFinish] = useState(false);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const playerRef = useRef(null);
  const progressBarRef = useRef(null);
  const [initialVideoId] = useState(TRACK_DATA[0].embedId);
  const isFirstRun = useRef(true);
  const currentTrack = TRACK_DATA[currentIndex];

  // Refs to guarantee fresh state values inside the YouTube event handlers
  const randomizeRef = useRef(randomizeOnFinish);
  const autoplayRef = useRef(autoplayNext);
  const isPlayingRef = useRef(isPlaying);

  // Filtering logic for the search box
  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return TRACK_DATA.filter(track => 
      track.title.toLowerCase().includes(lowerQuery) || 
      track.game.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  useEffect(() => { randomizeRef.current = randomizeOnFinish; }, [randomizeOnFinish]);
  useEffect(() => { autoplayRef.current = autoplayNext; }, [autoplayNext]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        const state = playerRef.current.getPlayerState();
        if (state !== 1 && state !== 3) {
          playerRef.current.playVideo();
        }
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          setCurrentTime(playerRef.current.getCurrentTime());
          setDuration(playerRef.current.getDuration() || 0);
        }
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.loadVideoById(currentTrack.embedId);
      } else {
        playerRef.current.cueVideoById(currentTrack.embedId);
      }
    }
  }, [currentTrack.embedId]);

  const handlePlayPause = () => setIsPlaying(prev => !prev);

  const handleNext = () => {
    setIsPlaying(true);
    setCurrentTime(0);
    setCurrentIndex(prev => getNextValidIndex(prev + 1, 1));
  };

  const handlePrev = () => {
    setIsPlaying(true);
    setCurrentTime(0);
    setCurrentIndex(prev => getNextValidIndex(prev - 1, -1));
  };

  const handleRandomize = () => {
    const validIndices = TRACK_DATA
      .map((t, idx) => (t.embedId ? idx : null))
      .filter(idx => idx !== null);

    if (validIndices.length === 0) return;

    const randomIdx = validIndices[Math.floor(Math.random() * validIndices.length)];
    setIsPlaying(true);
    setCurrentTime(0);
    setCurrentIndex(randomIdx);
  };

  const handleTrackSelect = (track) => {
    const index = TRACK_DATA.findIndex(t => t.id === track.id);
    if (index !== -1) {
      setIsPlaying(true);
      setCurrentTime(0);
      setCurrentIndex(index);
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setExpandedCategory(prev => (prev === cat ? null : cat));
  };

  const handleProgressBarClick = (e) => {
    if (!progressBarRef.current || !playerRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const targetTime = clickPosition * duration;

    playerRef.current.seekTo(targetTime, true);
    setCurrentTime(targetTime);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
    setDuration(event.target.getDuration());
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const onPlayerStateChange = (event) => {
    if (event.data === 0) {     
      if (randomizeRef.current) {
        handleRandomize();
      } else if (autoplayRef.current) {
        handleNext();
      } else {
        setIsPlaying(false);
      }
    }
    else if (event.data === 5 || event.data === -1) {
      if (isPlayingRef.current) {
        event.target.playVideo();
      }
    }
  };

  const ytOptions = {
    height: '10',
    width: '10',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1
    },
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`music-page-container ${currentTrack.themeClass}`}>
      <div className="landing-grain"></div>

      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <YouTube
          videoId={initialVideoId}
          opts={ytOptions}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>

      <header className="music-header">
        <div className="eyebrow">Velvet Room Audio Logs</div>
        <h2>Soundtrack Compendium</h2>
      </header>

      <div className="music-layout-grid centered-layout">
        {/* LEFT SIDEBAR */}
        <aside className="music-sidebar">
          <div className="category-section">
            <h3>Discs & Categories</h3>
            <div className="category-list">
              {CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat;
                const isExpanded = expandedCategory === cat;
                const categoryTracks = TRACK_DATA.filter(t => cat === "All" || t.category === cat);

                return (
                  <div key={cat} className="category-item-wrapper">
                    <button
                      className={`category-btn ${isSelected ? 'active-cat' : ''}`}
                      onClick={() => handleCategoryClick(cat)}
                    >
                      <span>{cat === "All" ? "CD - All Records" : `CD - ${cat}`}</span>
                      <span className="dropdown-arrow">{isExpanded ? "▼" : "▶"}</span>
                    </button>

                    {isExpanded && (
                      <ul className="sidebar-dropdown-list">
                        {categoryTracks.map((track, idx) => (
                          <li
                            key={track.id}
                            className={`sidebar-dropdown-track ${currentTrack.id === track.id ? 'active-subtrack' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTrackSelect(track);
                            }}
                          >
                            <div className="subtrack-info">
                              <span className="subtrack-title">
                                {String(idx + 1).padStart(2, '0')} - {track.title}
                              </span>
                              <span className="subtrack-game">
                                {track.game}
                              </span>
                            </div>
                            <span className="subtrack-indicator">♪</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT PANE (CENTERED PLAYER) */}
        <main className="music-main-pane">
          
          {/* SEARCH BAR */}
          <div className="search-container">
            <input 
              type="text" 
              className="p5-sidebar-search" 
              placeholder="Search for a track..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 300)} 
            />
            
            {isSearchFocused && searchQuery.trim() && (
              <div className="search-results-dropdown">
                {filteredTracks.length > 0 ? (
                  filteredTracks.map(track => (
                    <div 
                      key={track.id} 
                      className="search-result-item"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleTrackSelect(track); 
                        setSearchQuery(""); 
                        setSelectedCategory(track.category); 
                        setExpandedCategory(track.category); 
                      }}
                    >
                      <span className="search-result-title">{track.title}</span>
                      <span className="search-result-game">{track.game}</span>
                    </div>
                  ))
                ) : (
                  <div className="search-result-item">
                    <span className="search-result-title" style={{ color: '#666' }}>No records found...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="music-player-card">
            {/* BOX ART AREA */}
            <div className="player-boxart-area">
              <div className="game-box-container">
                <img
                  src={currentTrack.boxArt || '/images/default-placeholder.png'}
                  alt={`${currentTrack.game} Box Art`}
                  className="game-box-image"
                />
              </div>
            </div>

            <div className="player-controls-area">
              <div className="track-meta-header">
                <h3>{currentTrack.title}</h3>
                <p>{currentTrack.game} // {currentTrack.artist}</p>
              </div>

              <div className="progress-section">
                <div className="time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration) || currentTrack.duration}</span>
                </div>

                <div
                  className="progress-bar-bg"
                  ref={progressBarRef}
                  onClick={handleProgressBarClick}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              <div className="playback-buttons-row">
                <button className="control-btn" onClick={handlePrev} title="Previous">⏮</button>
                <button className="control-btn play-pause-main" onClick={handlePlayPause} title={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button className="control-btn" onClick={handleNext} title="Next">⏭</button>
              </div>

              <div className="volume-settings-row">
                <span className="volume-label">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="volume-slider"
                />

                <div className="settings-wrapper">
                  <button
                    className="settings-gear-btn"
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                    title="Audio Options & Randomize"
                  >
                    ⚙
                  </button>

                  {showSettingsMenu && (
                    <div className="settings-dropdown">
                      <div className="settings-slider-row" onClick={handleRandomize} style={{ cursor: 'pointer' }}>
                        <span className="settings-slider-title">Instant Randomize</span>
                        <span style={{ fontSize: '1.2rem', paddingRight: '4px' }}>🔀</span>
                      </div>

                      <div className="settings-slider-row">
                        <span className="settings-slider-title">Randomize on Finish</span>
                        <label className="p5-switch">
                          <input
                            type="checkbox"
                            checked={randomizeOnFinish}
                            onChange={(e) => {
                              setRandomizeOnFinish(e.target.checked);
                              if (e.target.checked) setAutoplayNext(false);
                            }}
                          />
                          <span className="p5-slider-track"></span>
                        </label>
                      </div>

                      <div className="settings-slider-row">
                        <span className="settings-slider-title">Autoplay Next Song</span>
                        <label className="p5-switch">
                          <input
                            type="checkbox"
                            checked={autoplayNext}
                            onChange={(e) => {
                              setAutoplayNext(e.target.checked);
                              if (e.target.checked) setRandomizeOnFinish(false);
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