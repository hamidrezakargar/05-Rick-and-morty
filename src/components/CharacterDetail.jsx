import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

function CharacterDetail({ selectedId, onAddFavourite, isAddToFavourites }) {

  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));

        const { data: episodeData } = await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}`);

        setEpisodes([episodeData].flat().slice(0, 4));

      } catch (error) {
        toast.error(error.response.data.error)
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div style={{ flex: 1 }} >
        <Loader />
      </div>
    );



  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "yellow" }} >
        Please Select a Character.
      </div>
    );


  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        isAddToFavourites={isAddToFavourites}
        onAddFavourite={onAddFavourite}
      />
      <Episodes
        episodes={episodes}
      />


    </div>
  )
}

export default CharacterDetail;


function CharacterSubInfo({ character, isAddToFavourites, onAddFavourite }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name} className='character-detail__img'
      />
      <div className="character-detail__info">
        <h3 className="name" >
          <span>{character.gender == "Male" ? ";; " : "; "}</span>
          <span>{character.name}</span>
        </h3>
        <div className="info">
          <span className={`status ${character.status == "Dead" ? "red" : ""}`} ></span>
          <span>&nbsp;{character.status}</span>
          <span> - &nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last known location :</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddToFavourites ? (
            <p>Aleady Added To Favourites</p>
          ) : (
            <button
              onClick={() => onAddFavourite(character)}
              className="btn btn--primary">
              Add to Favourit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Episodes({ episodes }) {

  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort((a, b) => new Date(a.created) - new Date(b.created))
  } else {
    sortedEpisodes = [...episodes].sort((a, b) => new Date(b.created) - new Date(a.created))
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>
          List of Episodes :
        </h2>
        <button onClick={() => setSortBy((is) => !is)} >
          <ArrowUpCircleIcon className="icon" style={{ rotate: sortBy ? "0deg" : "180deg" }} />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id} >
            <div>
              {String(index + 1).padStart(2, "0")}- {item.episode} : <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">
              {item.air_date}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

}