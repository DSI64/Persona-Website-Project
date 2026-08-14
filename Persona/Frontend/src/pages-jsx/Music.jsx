import { useState, useMemo, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import "../pages-css/Music.css";

const TRACK_DATA = [
  // ============================================================
  // PERSONA 1 — PS1 / PSP
  // ============================================================
  { id: 1, title: "Opening", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Hidehito Aoki", duration: "2:23", themeClass: "p1-theme", embedId: "J0jTrYUXNn4" },
  { id: 2, title: "Battle Theme", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Kenichi Tsuchiya", duration: "2:19", themeClass: "p1-theme", embedId: "7CR3yfusRQs" },
  { id: 3, title: "Kandori's Theme ~ Silence", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Misaki Okibe / Kenichi Tsuchiya", duration: "3:26", themeClass: "p1-theme", embedId: "X_r2vlQYy3U" },
  { id: 4, title: "Maki's Theme ~ Bright", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Kenichi Tsuchiya", duration: "1:38", themeClass: "p1-theme", embedId: "WfBO281aZgs" },
  { id: 5, title: "Poem for Everyone's Souls", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Megumi Mizushima", duration: "4:07", themeClass: "p1-theme", embedId: "mGqoPQZyUsk" },
  { id: 6, title: "Dream of Butterfly", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Yumi Kawamura", duration: "2:06", themeClass: "p1-theme", embedId: "guDM_SqdbkM" },
  { id: 7, title: "School Days", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Yumi Kawamura", duration: "2:20", themeClass: "p1-theme", embedId: "aumQxbQSFEk" },
  { id: 8, title: "A Lone Prayer", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Yumi Kawamura", duration: "1:55", themeClass: "p1-theme", embedId: "Xb4PX3rPg6o" },
  { id: 9, title: "Let butterflies spread until the dawn", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Yumi Kawamura / Junichi Nozawa", duration: "", themeClass: "p1-theme", embedId: "" },
  { id: 10, title: "Battle ~ Tesso", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Shoji Meguro", duration: "", themeClass: "p1-theme", embedId: "" },
  { id: 11, title: "Confrontation", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Shoji Meguro", duration: "2:05", themeClass: "p1-theme", embedId: "" },
  { id: 12, title: "Bloody Destiny", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Yumi Kawamura", duration: "2:05", themeClass: "p1-theme", embedId: "" },
  { id: 13, title: "Battle ~ Night Queen", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Kenichi Tsuchiya / Shoji Meguro", duration: "", themeClass: "p1-theme", embedId: "" },
  { id: 14, title: "Voice", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Yumi Kawamura", duration: "3:38", themeClass: "p1-theme", embedId: "" },
  { id: 15, title: "Satomi Tadashi Pharmacy's Theme 2009", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Junichi Nozawa", duration: "", themeClass: "p1-theme", embedId: "" },
  { id: 16, title: "Dream of Butterfly (Instrumental)", game: "Persona 1 (PS1)", category: "Persona 1", artist: "Yumi Kawamura", duration: "2:07", themeClass: "p1-theme", embedId: "" },

  // ============================================================
  // PERSONA 2 — INNOCENT SIN & ETERNAL PUNISHMENT PSP
  // ============================================================
  { id: 79, title: "Unbreakable Tie", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Shoji Meguro", duration: "3:55", themeClass: "p2-theme", embedId: "eAarVmqJwNw" },
  { id: 80, title: "unbreakable tie", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Asami Izawa / Lotus Juice", duration: "4:02", themeClass: "p2-theme", embedId: "" },
  { id: 81, title: "Hero's Theme", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Toshiki Konishi", duration: "1:54", themeClass: "p2-theme", embedId: "" },
  { id: 82, title: "Seven Sisters High School A", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Ryota Kozuka", duration: "3:30", themeClass: "p2-theme", embedId: "" },
  { id: 83, title: "Tension", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Atsushi Kitajoh", duration: "1:31", themeClass: "p2-theme", embedId: "" },
  { id: 84, title: "Philemon's Theme", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Ryota Kozuka", duration: "3:43", themeClass: "p2-theme", embedId: "" },
  { id: 85, title: "Maya's Theme", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Ryota Kozuka", duration: "2:36", themeClass: "p2-theme", embedId: "" },
  { id: 86, title: "Joker's Theme", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Ryota Kozuka", duration: "4:43", themeClass: "p2-theme", embedId: "" },
  { id: 87, title: "Boss Battle", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Kenichi Tsuchiya", duration: "4:17", themeClass: "p2-theme", embedId: "" },
  { id: 88, title: "Mad Dance", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Kenichi Tsuchiya", duration: "3:04", themeClass: "p2-theme", embedId: "" },
  { id: 89, title: "Battle", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Kenichi Tsuchiya", duration: "2:30", themeClass: "p2-theme", embedId: "" },
  { id: 90, title: "Velvet Room", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Shoji Meguro / ATLUS Sound Team", duration: "5:38", themeClass: "p2-theme", embedId: "" },
  { id: 91, title: "Time Castle", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Masaki Kurokawa", duration: "2:38", themeClass: "p2-theme", embedId: "" },
  { id: 92, title: "Giga Macho", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Toshiko Tasaki", duration: "3:35", themeClass: "p2-theme", embedId: "" },
  { id: 93, title: "JOKER", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "ATLUS Sound Team", duration: "2:19", themeClass: "p2-theme", embedId: "" },
  { id: 94, title: "Persona Dance", game: "Persona 2: Innocent Sin (PSP)", category: "Persona 2", artist: "Takehito Koyasu", duration: "3:01", themeClass: "p2-theme", embedId: "" },
  { id: 95, title: "Opening", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Kenichi Tsuchiya", duration: "1:31", themeClass: "p2-theme", embedId: "" },
  { id: 96, title: "Maya's Theme", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Kenichi Tsuchiya", duration: "3:54", themeClass: "p2-theme", embedId: "" },
  { id: 97, title: "Seven Sisters High School", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Toshiko Tasaki", duration: "3:22", themeClass: "p2-theme", embedId: "" },
  { id: 98, title: "Battle", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Kenichi Tsuchiya", duration: "3:00", themeClass: "p2-theme", embedId: "" },
  { id: 99, title: "Boss Battle", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Kenichi Tsuchiya", duration: "2:42", themeClass: "p2-theme", embedId: "" },
  { id: 100, title: "Velvet Room ~ Nameless Arrange", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Toshiki Konishi", duration: "2:09", themeClass: "p2-theme", embedId: "" },
  { id: 101, title: "Velvet Room ~ Gymnopedie", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Toshiki Konishi", duration: "3:40", themeClass: "p2-theme", embedId: "" },
  { id: 102, title: "Philemon's Theme", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Toshiki Konishi", duration: "3:41", themeClass: "p2-theme", embedId: "" },
  { id: 103, title: "Public Facility", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Toshiki Konishi", duration: "1:35", themeClass: "p2-theme", embedId: "" },
  { id: 104, title: "Mt. Katatsumuri", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Toshiki Konishi", duration: "2:36", themeClass: "p2-theme", embedId: "" },
  { id: 105, title: "Maya's Theme ~ Sad", game: "Persona 2: Eternal Punishment (PSP)", category: "Persona 2", artist: "Toshiki Konishi", duration: "1:48", themeClass: "p2-theme", embedId: "" },

  // ============================================================
  // PERSONA 3
  // ============================================================
  { id: 106, title: "Mass Destruction", game: "Persona 3", category: "Persona 3", artist: "Lotus Juice / Yumi Kawamura", duration: "3:30", themeClass: "p3-theme", embedId: "z5Kui2zh3eQ" },
  { id: 107, title: "Burn My Dread", game: "Persona 3", category: "Persona 3", artist: "Yumi Kawamura", duration: "4:35", themeClass: "p3-theme", embedId: "z5Kui2zh3eQ" },

  // ============================================================
  // PERSONA 4
  // ============================================================
  { id: 108, title: "Reach Out To The Truth", game: "Persona 4", category: "Persona 4", artist: "Shihoko Hirata", duration: "4:32", themeClass: "p4-theme", embedId: "z5Kui2zh3eQ" },
  { id: 109, title: "Time To Make History", game: "Persona 4", category: "Persona 4", artist: "Shihoko Hirata", duration: "5:18", themeClass: "p4-theme", embedId: "z5Kui2zh3eQ" },

  // ============================================================
  // PERSONA 5
  // ============================================================
  { id: 110, title: "Last Surprise", game: "Persona 5", category: "Persona 5", artist: "Lyn Inaizumi", duration: "4:01", themeClass: "p5-theme", embedId: "z5Kui2zh3eQ" },
  { id: 111, title: "Life Will Change", game: "Persona 5", category: "Persona 5", artist: "Lyn Inaizumi", duration: "4:22", themeClass: "p5-theme", embedId: "dsuJZx24V_A" },

  // ============================================================
  // SPINOFFS / OTHER
  // ============================================================
  { id: 112, title: "Mass Destruction (Q Mix)", game: "Persona Q", category: "Spinoffs", artist: "Lotus Juice / Yumi Kawamura", duration: "3:45", themeClass: "p3-theme", embedId: "z5Kui2zh3eQ" },
  { id: 113, title: "Velvet Room Anthem", game: "Series Mix", category: "Other", artist: "Shoji Meguro", duration: "2:10", themeClass: "p5-theme", embedId: "z5Kui2zh3eQ" }
];

const CATEGORIES = ["All", "Persona 1", "Persona 2", "Persona 3", "Persona 4", "Persona 5", "Spinoffs", "Other"];

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
  const [searchQuery, setSearchQuery] = useState("");
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

  const playerRef = useRef(null);
  const progressBarRef = useRef(null);
  const currentTrack = TRACK_DATA[currentIndex];

  // Refs to guarantee fresh state values inside the YouTube event handlers
  const randomizeRef = useRef(randomizeOnFinish);
  const autoplayRef = useRef(autoplayNext);
  const isPlayingRef = useRef(isPlaying);

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

  const handlePlayPause = () => setIsPlaying(prev => !prev);

  // Instead of manual loadVideoById calls, we just update the React state.
  // The <YouTube> component will automatically load the new videoId prop.
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
    // 0 = Track Ended
    if (event.data === 0) {
      if (randomizeRef.current) {
        handleRandomize();
      } else if (autoplayRef.current) {
        handleNext();
      } else {
        setIsPlaying(false);
      }
    } 
    // 5 = Video Cued, -1 = Unstarted (Happens automatically when videoId prop changes)
    else if (event.data === 5 || event.data === -1) {
      // If our React state says we should be playing, force the newly loaded video to play
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
          videoId={currentTrack.embedId}
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
          <div className="sidebar-search-box">
            <input 
              type="text" 
              className="p5-sidebar-search" 
              placeholder="SEARCH TRACKS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

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
                      <span>{cat === "All" ? "CD0 - All Records" : `CD - ${cat}`}</span>
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
                            <span className="subtrack-title">
                              {String(idx + 1).padStart(2, '0')} - {track.title}
                            </span>
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
          <div className="music-player-card">
            
            {/* DISC AREA */}
            <div className="player-disc-area">
              <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
                <div className="vinyl-grooves"></div>
                <div className={`vinyl-center-label ${currentTrack.themeClass}-label`}>
                  <span className="label-game-text">{currentTrack.game}</span>
                  <div className="vinyl-center-hole"></div>
                </div>
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
                      <button onClick={handleRandomize}>🔀 Instant Randomize</button>
                      
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