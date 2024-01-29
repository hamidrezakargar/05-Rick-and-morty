import { useEffect, useState } from "react";
// import { allCharacters } from "../data/data";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from './components/Navbar';
import CharacterDetail from "./components/characterDetail";




function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results.slice(0, 4)));
      setIsLoading(false);
  }, []);

  return (
    <div className="app">

      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>

      <Main>
        <CharacterList characters={characters} isLoading={isLoading} />
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