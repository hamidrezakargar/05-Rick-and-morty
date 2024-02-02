import { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from './components/Navbar';
import CharacterDetail from "./components/characterDetail";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
////////////////////////////////////
function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);
  //////////////////////////////////
  useEffect(() => {
    setIsLoading(true);
    axios.get(
      `https://rickandmortyapi.com/api/character?name=${query}`
    )
      .then((res) => {
        setCharacters(res.data.results.slice(0, 4))
        // setIsLoading(false)
      })
      .catch((err) => {
        setCharacters([]);
        toast.error(err.response.data.error);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  const handleSelectCharacter = (id) => {
    setSelectedId(preveId => preveId == id ? null : id);
  };
  const handleAddFavourite = (char) => {
    setFavourites((preFav) => [...preFav, char]);
  };
  const isAddToFavourites = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites numOfFavourites={favourites.length} />
      </Navbar>

      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
          selectedId={selectedId} />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddToFavourites={isAddToFavourites}
        />
      </Main>
    </div>
  );
}
export default App;
///////////////////////////////////////
function Main({ children }) {
  return <div className="main">{children}</div>;
}