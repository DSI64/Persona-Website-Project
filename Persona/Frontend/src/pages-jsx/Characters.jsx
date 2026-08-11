import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages-css/Characters.css";

export const characterDB = [
  // Persona 1
  { 
    id: 101, name: "Naoya Todo", game: "P1", arcana: "Emperor", image: "Boy with Earring",
    title: "The Pierced Boy", birthday: "Unknown", appearances: "Persona 1",
    personas: "Seimen Kongou, Amen Ra",
    voiceActors: "Eiji Takemoto (JP)",
    likes: "Piercings, listening to music", dislikes: "SEBEC, chaos",
    profile: "A student at St. Hermelin High School who becomes caught up in a demonic invasion of Mikage-cho. He leads his classmates to uncover the truth behind the SEBEC corporation.",
    images: [
      "/images/characters/naoya_1.jpg", 
      "/images/characters/naoya_2.jpg", 
      "/images/characters/naoya_3.jpg"
    ]
  },
  { 
    id: 102, name: "Maki Sonomura", game: "P1", arcana: "Priestess", image: "Maki",
    title: "Sickly Girl", birthday: "Unknown", appearances: "Persona 1, Persona 2: Innocent Sin",
    personas: "Masiaho, Varz",
    voiceActors: "Junko Houki (JP)",
    likes: "Painting, quiet places", dislikes: "Hospitals, sickness",
    profile: "A frail girl who spends most of her time in the hospital. Her inner turmoil and alternate realities play a central role in the events of Mikage-cho.",
    images: [
      "/images/characters/maki_1.jpg", 
      "/images/characters/maki_2.jpg", 
      "/images/characters/maki_3.jpg"
    ]
  },
  { 
    id: 103, name: "Kei Nanjo", game: "P1", arcana: "Hierophant", image: "Nanjo",
    title: "The Heir", birthday: "October 2", appearances: "Persona 1, Persona 2: Eternal Punishment",
    personas: "Aizen Myoo, Yamaoka",
    voiceActors: "Tomokazu Sugita (JP)",
    likes: "Earl Grey tea, high status", dislikes: "Frivolous behavior, disorder",
    profile: "The rational and confident heir to the Nanjo conglomerate. He often clashes with others but possesses a strong sense of duty and loyalty to his friends.",
    images: [
      "/images/characters/nanjo_1.jpg", 
      "/images/characters/nanjo_2.jpg", 
      "/images/characters/nanjo_3.jpg"
    ]
  },
  { 
    id: 104, name: "Masao Inaba", game: "P1", arcana: "Chariot", image: "Mark",
    title: "Mark", birthday: "July 11", appearances: "Persona 1",
    personas: "Ogun, Susano-o",
    voiceActors: "Kappei Yamaguchi (JP)",
    likes: "Graffiti art, breakdancing, Maki", dislikes: "Studying, rigid authority",
    profile: "A hot-blooded and mischievous student who loves dancing and graffiti art. He is extremely protective of Maki and quick to jump into action.",
    images: [
      "/images/characters/mark_1.jpg", 
      "/images/characters/mark_2.jpg", 
      "/images/characters/mark_3.jpg"
    ]
  },

  // Persona 2
  { 
    id: 201, name: "Tatsuya Suou", game: "P2", arcana: "Sun", image: "Tatsuya",
    title: "The Silent Loner", birthday: "August 21", appearances: "Persona 2: Innocent Sin, Persona 2: Eternal Punishment",
    personas: "Vulcanus, Apollo",
    voiceActors: "Takehito Koyasu (JP)",
    likes: "Motorcycles, tinkering with Zippo lighters", dislikes: "His father, corrupt authority",
    profile: "A popular but aloof student at Seven Sisters High School. He becomes the leader of the group trying to stop rumors from becoming reality in Sumaru City.",
    images: [
      "/images/characters/tatsuya_1.jpg", 
      "/images/characters/tatsuya_2.jpg", 
      "/images/characters/tatsuya_3.jpg"
    ]
  },
  { 
    id: 202, name: "Maya Amano", game: "P2", arcana: "Moon", image: "Maya",
    title: "Positive Thinker", birthday: "July 4", appearances: "Persona 2: Innocent Sin, Persona 2: Eternal Punishment",
    personas: "Maia, Artemis",
    voiceActors: "Michiko Neya (JP)",
    likes: "Journalism, driving, optimistic thinking", dislikes: "Negativity, fire",
    profile: "A cheerful and optimistic reporter for Kismet Publishing. Her motto 'Let's positive thinking!' keeps the team grounded during dark times.",
    images: [
      "/images/characters/maya_1.jpg", 
      "/images/characters/maya_2.jpg", 
      "/images/characters/maya_3.jpg"
    ]
  },
  { 
    id: 203, name: "Eikichi Mishina", game: "P2", arcana: "Death", image: "Eikichi",
    title: "Michel", birthday: "November 15", appearances: "Persona 2: Innocent Sin",
    personas: "Rhadamanthus, Hades",
    voiceActors: "Kousuke Toriumi (JP)",
    likes: "Visual kei rock, hair gel, Miyabi", dislikes: "Being mocked, plain appearances",
    profile: "The flamboyant leader of the Cuss High gang and a passionate visual kei rock vocalist. Despite his tough exterior, he is deeply caring.",
    images: [
      "/images/characters/eikichi_1.jpg", 
      "/images/characters/eikichi_2.jpg"
    ]
  },
  { 
    id: 204, name: "Lisa Silverman", game: "P2", arcana: "Lovers", image: "Ginko",
    title: "Ginko", birthday: "May 4", appearances: "Persona 2: Innocent Sin",
    personas: "Eros, Venus",
    voiceActors: "Hikari Tachibana (JP)",
    likes: "Tatsuya, Kung Fu, Cantonese music", dislikes: "Stereotypes, fake friends",
    profile: "A Caucasian girl born and raised in Japan, heavily interested in martial arts and Cantonese culture. She holds strong feelings for Tatsuya.",
    images: [
      "/images/characters/lisa_1.jpg", 
      "/images/characters/lisa_2.jpg", 
      "/images/characters/lisa_3.jpg"
    ]
  },

  // Persona 3
  { 
    id: 301, name: "Makoto Yuki", game: "P3", arcana: "Fool", image: "P3 Protagonist",
    title: "S.E.E.S. Field Leader", birthday: "Unknown (1992)", appearances: "Persona 3, Persona Q, Persona 3 Dancing",
    personas: "Orpheus, Thanatos, Messiah",
    voiceActors: "Yuri Lowenthal (EN) / Akira Ishida (JP)",
    likes: "Music, solitude, ramen", dislikes: "Dark Hour, unnecessary conflict",
    profile: "An orphaned transfer student who awakens to the Wild Card. He leads the Specialized Extracurricular Execution Squad to eliminate Shadows and explore Tartarus.",
    images: [
      "/images/characters/makoto_1.jpg", 
      "/images/characters/makoto_2.jpg", 
      "/images/characters/makoto_3.jpg"
    ]
  },
  { 
    id: 302, name: "Yukari Takeba", game: "P3", arcana: "Lovers", image: "Yukari",
    title: "Pink Sniper", birthday: "October 19", appearances: "Persona 3, Persona 4 Arena Ultimax, Persona Q",
    personas: "Io, Isis",
    voiceActors: "Michelle Ruff / Heather Gonzalez (EN) / Megumi Toyoguchi (JP)",
    likes: "Cute fashion, gerbera flowers", dislikes: "Ghosts, bullying, Shadows",
    profile: "A popular sophomore at Gekkoukan High School with a strong sense of responsibility. She uses a bow to strike at Shadows from a distance while seeking answers about her father.",
    images: [
      "/images/characters/yukari_1.jpg", 
      "/images/characters/yukari_2.jpg", 
      "/images/characters/yukari_3.jpg"
    ]
  },
  { 
    id: 303, name: "Aigis", game: "P3", arcana: "Aeon", image: "Aigis",
    title: "Anti-Shadow Weapon", birthday: "September 10 (Manufactured)", appearances: "Persona 3, Persona 4 Arena, Persona Q",
    personas: "Palladion, Athena",
    voiceActors: "Karen Strassman (EN) / Maaya Sakamoto (JP)",
    likes: "Makoto Yuki, dogs, weaponry", dislikes: "Shadows, system errors",
    profile: "A 7th Generation Anti-Shadow Suppression Weapon. She initially acts strictly on logic but gradually learns what it means to be human.",
    images: [
      "/images/characters/aigis_1.jpg", 
      "/images/characters/aigis_2.jpg", 
      "/images/characters/aigis_3.jpg"
    ]
  },
  
  // Persona 4
  { 
    id: 401, name: "Yu Narukami", game: "P4", arcana: "Fool", image: "P4 Protagonist",
    title: "Investigation Team Leader", birthday: "Unknown", appearances: "Persona 4, Persona 4 Arena, Persona Q",
    personas: "Izanagi, Izanagi-no-Okami",
    voiceActors: "Johnny Yong Bosch (EN) / Daisuke Namikawa (JP)",
    likes: "Cooking, hanging out with friends, Nanako", dislikes: "Midnight Channel fog, unsolved cases",
    profile: "A city boy who moves to the rural town of Inaba. He leads his friends into the TV World to solve a string of bizarre serial murders.",
    images: [
      "/images/characters/yu_1.jpg", 
      "/images/characters/yu_2.jpg", 
      "/images/characters/yu_3.jpg"
    ]
  },
  { 
    id: 402, name: "Yosuke Hanamura", game: "P4", arcana: "Magician", image: "Yosuke",
    title: "Captain Resentment", birthday: "June 22", appearances: "Persona 4, Persona 4 Arena, Persona Q",
    personas: "Jiraiya, Susano-o, Takehaya Susano-o",
    voiceActors: "Yuri Lowenthal (EN) / Shoutarou Morikubo (JP)",
    likes: "Music, motorcycles, working at Junes", dislikes: "Boredom, bad luck, getting stepped on",
    profile: "The clumsy but well-meaning son of the local Junes branch manager. He acts as the Investigation Team's primary tactician and Yu's right-hand man.",
    images: [
      "/images/characters/yosuke_1.jpg", 
      "/images/characters/yosuke_2.jpg", 
      "/images/characters/yosuke_3.jpg"
    ]
  },
  { 
    id: 403, name: "Chie Satonaka", game: "P4", arcana: "Chariot", image: "Chie",
    title: "Carnivore Who's Discarded Womanhood", birthday: "July 30", appearances: "Persona 4, Persona 4 Arena, Persona Q",
    personas: "Tomoe, Suzuka Gongen, Haraedo-no-Okami",
    voiceActors: "Erin Fitzgerald / Tracey Rooney (EN) / Yui Horie (JP)",
    likes: "Steak, martial arts movies, Yukiko", dislikes: "Bugs, ghosts, studying math",
    profile: "An energetic, meat-loving girl obsessed with martial arts movies. She uses powerful kicks and Ice magic to take down enemies in the TV world.",
    images: [
      "/images/characters/chie_1.jpg", 
      "/images/characters/chie_2.jpg", 
      "/images/characters/chie_3.jpg"
    ]
  },
  
  // Persona 5
  { 
    id: 501, name: "Ren Amamiya", game: "P5", arcana: "Fool", image: "Joker",
    title: "Joker", birthday: "Unknown", appearances: "Persona 5, Persona 5 Royal, Persona 5 Strikers",
    personas: "Arsene, Satanael, Raoul",
    voiceActors: "Xander Mobus (EN) / Jun Fukuyama (JP)",
    likes: "Brewing coffee, Leblanc curry, Morgana", dislikes: "Injustice, corrupt adults",
    profile: "A high school student falsely accused of assault who transfers to Tokyo on probation. He leads the Phantom Thieves of Hearts to reform society.",
    images: [
      "/images/characters/ren_1.jpg", 
      "/images/characters/ren_2.jpg", 
      "/images/characters/ren_3.jpg"
    ]
  },
  { 
    id: 502, name: "Ryuji Sakamoto", game: "P5", arcana: "Chariot", image: "Skull",
    title: "Skull", birthday: "July 3", appearances: "Persona 5, Persona 5 Royal, Persona 5 Strikers",
    personas: "Captain Kidd, Seitenten, William",
    voiceActors: "Max Mittelman (EN) / Mamoru Miyano (JP)",
    likes: "Ramen, track running, Phantom Thieves", dislikes: "Corrupt teachers, arrogance, abusive figures",
    profile: "A former track star labeled a delinquent due to the abuses of a corrupt teacher. He is boisterous and hot-tempered, but fiercely loyal.",
    images: [
      "/images/characters/ryuji_1.jpg", 
      "/images/characters/ryuji_2.jpg", 
      "/images/characters/ryuji_3.jpg"
    ]
  },
  { 
    id: 503, name: "Ann Takamaki", game: "P5", arcana: "Lovers", image: "Panther",
    title: "Panther", birthday: "November 12", appearances: "Persona 5, Persona 5 Royal, Persona 5 Strikers",
    personas: "Carmen, Hecate, Celestine",
    voiceActors: "Erika Harlacher (EN) / Nana Mizuki (JP)",
    likes: "Sweets, fashion modeling, Shiho", dislikes: "Perverts, malicious rumors",
    profile: "A quarter-American model who feels isolated from her peers. She joins the Phantom Thieves to avenge her best friend and stop abusers in power.",
    images: [
      "/images/characters/ann_1.jpg", 
      "/images/characters/ann_2.jpg", 
      "/images/characters/ann_3.jpg"
    ]
  }
];

const allArcanas = [...new Set(characterDB.map(c => c.arcana))].sort();

export default function Characters() {
  const [filterGame, setFilterGame] = useState("All");
  const [filterArcana, setFilterArcana] = useState("All");
  const navigate = useNavigate();

  const filteredCharacters = useMemo(() => {
    return characterDB.filter(char => {
      const matchGame = filterGame === "All" || char.game === filterGame;
      const matchArcana = filterArcana === "All" || char.arcana === filterArcana;
      return matchGame && matchArcana;
    });
  }, [filterGame, filterArcana]);

  return (
    <div className="roster-page">
      <div className="roster-header">
        <h1>Operatives & Confidants</h1>
        
        <div className="filters">
          <div className="filter-group">
            <label>Title:</label>
            <select value={filterGame} onChange={(e) => setFilterGame(e.target.value)}>
              <option value="All">All Games</option>
              <option value="P1">Persona</option>
              <option value="P2">Persona 2</option>
              <option value="P3">Persona 3</option>
              <option value="P4">Persona 4</option>
              <option value="P5">Persona 5</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Arcana:</label>
            <select value={filterArcana} onChange={(e) => setFilterArcana(e.target.value)}>
              <option value="All">All Arcanas</option>
              {allArcanas.map(arcana => (
                <option key={arcana} value={arcana}>{arcana}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="roster-grid">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map(char => (
            <div 
              key={char.id} 
              className="roster-card" 
              data-game={char.game}
              onClick={() => navigate(`/characters/${char.id}`)}
            >
              <div className="card-image-placeholder">
                <img 
                  src={char.images[0]} 
                  alt={char.name} 
                  className="roster-card-img" 
                />
              </div>
              <div className="card-info">
                <span className="card-arcana">{char.arcana}</span>
                <h3 className="card-name">{char.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No characters match this filter.</div>
        )}
      </div>
    </div>
  );
}