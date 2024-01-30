import { useEffect, useState } from "react";
// import { allCharacters } from "../data/data";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from './components/Navbar';
import CharacterDetail from "./components/characterDetail";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
////////////////////////////////////
function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //////////////////////////////////
  useEffect(() => {
    setIsLoading(true);
    axios.get("https://rickandmortyapi.com/api/character")
      .then((res) => {
        setCharacters(res.data.results.slice(0, 4))
        // setIsLoading(false)
      })
      .catch((err) => {
        // setIsLoading(false);
        toast.error(err.response.data.error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="app">
      <Toaster />
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
///////////////////////////////////////
function Main({ children }) {
  return <div className="main">{children}</div>;
}