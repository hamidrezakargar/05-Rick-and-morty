import { useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Navbar from './components/Navbar';
import CharacterDetail from "./components/characterDetail";




function App() {
  const [characters, setCharacters] = useState(allCharacters);
  return (
    <div className="app">

      <Navbar numOfResult={characters.length} />


      <div className="main">

        <CharacterList characters={characters} />
        <CharacterDetail />

      </div>
    </div>
  );
}
export default App;