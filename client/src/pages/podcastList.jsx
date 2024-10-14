import React, { useEffect, useState } from "react";
import { getEpisodes } from "../services/data";  

const PodcastList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await getEpisodes();
        console.log(data);  
        
        setEpisodes(data);
      } catch (error) {
        console.error('Error fetching episodes:', error); 
        setError(`Error fetching episodes: ${error.message}`);  
      }
    };
  
    fetchEpisodes();
  }, []);
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Últimos 20 episodios</h1>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.pubDate}>
            {episode.title} - Duración: {episode.duration ? episode.duration : "Desconocida"} - <audio src={episodes.enclosure.url} controls></audio>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default PodcastList;

