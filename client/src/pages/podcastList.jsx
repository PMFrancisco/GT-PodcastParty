import { getPodcast } from "../services/data";
import React, { useEffect, useState } from "react";

function PodcastList() {
  const [podcastList, setPodcastList] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

  useEffect(() => {
    getPodcast().then((response) => {
      setPodcastList(response);
      setFilteredPodcasts(response);
    });
  }, []);

  const filterPodcasts = (searchTerm) => {
    const filtered = podcastList.filter((podcast) => {
      const podcastName = podcast.name.toLowerCase();
      const artistName = podcast.author.toLowerCase();
      return (
        podcastName.includes(searchTerm.toLowerCase()) ||
        artistName.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredPodcasts(filtered);
  };

  return podcastList.length ? (
    <>
      <header>¡Hola!</header>
      <main>
        {filteredPodcasts.length ? (
          filteredPodcasts.map((eachPodcast) => (
            <>
              <img src={eachPodcast.img} alt="podcast-img" />
              <h4>{eachPodcast.name}</h4>
              <p>{eachPodcast.author}</p>
              <audio controls>
                <source src="https://api.spreaker.com/download/episode/61641297/web_reactiva_295.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <p>{eachPodcast.link}</p>
            </>
          ))
        ) : (
          <div>We have not found any matches for your search</div>
        )}
      </main>
    </>
  ) : (
    <div>Nada que mostrar</div>
  );
}
export default PodcastList;
