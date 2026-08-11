import { useState, useMemo } from 'react';
import "../pages-css/Music.css";

const TRACK_DATA = [
  { id: 1, title: "A Lone Prayer", game: "Persona 1", category: "Persona 1", artist: "Hideaki Kuroda", duration: "2:54", themeClass: "p1-theme" },
  { id: 2, title: "Unbreakable Face", game: "Persona 2", category: "Persona 2", artist: "Shoji Meguro", duration: "3:15", themeClass: "p2-theme" },
  { id: 3, title: "Mass Destruction", game: "Persona 3", category: "Persona 3", artist: "Lotus Juice / Yumi Kawamura", duration: "3:30", themeClass: "p3-theme" },
  { id: 4, title: "Burn My Dread", game: "Persona 3", category: "Persona 3", artist: "Yumi Kawamura", duration: "4:35", themeClass: "p3-theme" },
  { id: 5, title: "Reach Out To The Truth", game: "Persona 4", category: "Persona 4", artist: "Shihoko Hirata", duration: "4:32", themeClass: "p4-theme" },
  { id: 6, title: "Time To Make History", game: "Persona 4", category: "Persona 4", artist: "Shihoko Hirata", duration: "5:18", themeClass: "p4-theme" },
  { id: 7, title: "Last Surprise", game: "Persona 5", category: "Persona 5", artist: "Lyn Inaizumi", duration: "4:01", themeClass: "p5-theme" },
  { id: 8, title: "Life Will Change", game: "Persona 5", category: "Persona 5", artist: "Lyn Inaizumi", duration: "4:24", themeClass: "p5-theme" },
  { id: 9, title: "Mass Destruction (Q Mix)", game: "Persona Q", category: "Spinoffs", artist: "Lotus Juice / Yumi Kawamura", duration: "3:45", themeClass: "p3-theme" },
  { id: 10, title: "Velvet Room Anthem", game: "Series Mix", category: "Other", artist: "Shoji Meguro", duration: "2:10", themeClass: "p5-theme" }
];

const CATEGORIES = ["All", "Persona 1", "Persona 2", "Persona 3", "Persona 4", "Persona 5", "Spinoffs", "Other"];

export default function Music() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const currentTrack = TRACK_DATA[currentIndex];

  // Filter tracks based on search query and category sidebar selection
  const filteredTracks = useMemo(() => {
    return TRACK_DATA.filter(track => {
      const matchesSearch = 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || track.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TRACK_DATA.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TRACK_DATA.length) % TRACK_DATA.length);
    setIsPlaying(true);
  };

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * TRACK_DATA.length);
    setCurrentIndex(randomIndex);
    setIsPlaying(true);
    setShowSettingsMenu(false);
  };

  const handleTrackSelect = (track) => {
    const index = TRACK_DATA.findIndex(t => t.id === track.id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className={`music-page-container ${currentTrack.themeClass}`}>
      <div className="landing-grain"></div>

      <header className="music-header">
        <div className="eyebrow">Velvet Room Audio Logs</div>
        <h2>Soundtrack Compendium</h2>
      </header>

      {/* Main Grid Layout: Left Sidebar + Right Player & Tracklist */}
      <div className="music-layout-grid">
        
        {/* LEFT SIDEBAR: Search & Categories */}
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
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  className={`category-btn ${selectedCategory === cat ? 'active-cat' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === "All" ? "CD0 - All Records" : `CD - ${cat}`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT PANE: Player Card & Active Tracklist */}
        <main className="music-main-pane">
          
          {/* Main Player Card */}
          <div className="music-player-card">
            {/* Spinning CD Vinyl Disc replacing the game picture box */}
            <div className="player-disc-area">
              <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
                <div className="vinyl-grooves"></div>
                <div className={`vinyl-center-label ${currentTrack.themeClass}-label`}>
                  <span className="label-game-text">{currentTrack.game}</span>
                  <div className="vinyl-center-hole"></div>
                </div>
              </div>
            </div>

            {/* Controls & Metadata */}
            <div className="player-controls-area">
              <div className="track-meta-header">
                <h3>{currentTrack.title}</h3>
                <p>{currentTrack.game} // {currentTrack.artist}</p>
              </div>

              <div className="progress-section">
                <div className="time-display">
                  <span>0:00</span>
                  <span>{currentTrack.duration}</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: isPlaying ? '40%' : '0%' }}></div>
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

                  {/* Settings Dropdown Menu */}
                  {showSettingsMenu && (
                    <div className="settings-dropdown">
                      <button onClick={handleRandomize}>🔀 Randomize Track</button>
                      <button onClick={() => { alert("Audio Engine: High Quality Velvet Stream"); setShowSettingsMenu(false); }}>🔊 Audio Settings</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filtered Tracklist Table */}
          <div className="active-tracklist-box">
            <h3>Tracklist ({selectedCategory})</h3>
            <ul className="p5-track-list">
              {filteredTracks.length > 0 ? (
                filteredTracks.map(track => (
                  <li 
                    key={track.id} 
                    className={`p5-track-row ${currentTrack.id === track.id ? 'active' : ''}`}
                    onClick={() => handleTrackSelect(track)}
                  >
                    <div className="row-info">
                      <strong>{track.title}</strong>
                      <span>{track.game} • {track.artist}</span>
                    </div>
                    <div className="row-meta">
                      <span className="duration-tag">{track.duration}</span>
                      {currentTrack.id === track.id && isPlaying && <span className="playing-indicator">♪</span>}
                    </div>
                  </li>
                ))
              ) : (
                <p className="no-tracks">NO TRACKS FOUND IN THIS CATEGORY.</p>
              )}
            </ul>
          </div>

        </main>
      </div>
    </div>
  );
}