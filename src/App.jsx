import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from './components/Navbar';
import CharacterDetail from "./components/characterDetail";




function App() {
  const [characters, setCharacters] = useState([]);


  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results.slice(0, 4)));
  }, []);

  return (
    <div className="app">

      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>

      <Main>
        <CharacterList characters={characters} />
        <CharacterDetail />

      </Main>

    </div>
  );
}
export default App;

function Main({ children }) {
  return (
    <div className="main">
      {children}
    </div>
  );
}