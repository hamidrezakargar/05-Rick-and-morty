import { allCharacters } from "../data/data";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Navbar from './components/Navbar';
import CharacterDetail from "./components/characterDetail";




function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">

        <CharacterList allCharacters={allCharacters} />
        <CharacterDetail />

      </div>
    </div>
  )
}
export default App;