import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
// Can run site doing npm run dev
// Import page components
import Home from './pages-jsx/Home';
import Characters from './pages-jsx/Characters';
import Compendium from './pages-jsx/Compendium';
import SocialLinks from './pages-jsx/SocialLinks';
import Music from './pages-jsx/Music';
import SocialLinkDetail from './pages-jsx/SocialLinkDetail';
import CharacterDetail from './pages-jsx/CharacterDetail';
import TeddieQuiz from './pages-jsx/TeddieQuiz';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header Navigation */}
        <header className="app-header">
          <div className="header-content">
            <h1>Persona Series Database</h1>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/characters">Characters</Link>
              <Link to="/compendium">Compendium</Link>
              <Link to="/social-links">Social Links</Link>
              <Link to="/music">Music</Link>
              <Link to="/quiz">Quiz Show</Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
            <Route path="/compendium" element={<Compendium />} />
            <Route path="/social-links" element={<SocialLinks />} />
            <Route path="/social-links/:id" element={<SocialLinkDetail />} />
            <Route path="/music" element={<Music />} />
            <Route path="/quiz" element={<TeddieQuiz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;