import React, { useEffect, useState } from "react";
import { getEpisodes } from "../services/data";  
import AudioPlayer from "../components/AudioPlayer";
import { formatTime } from "../utils/formatTime";  // Importar la función formatTime
import "../index.css"; 

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
      <ul className="podcast__list">
        {episodes.map((episode) => (
          <li key={episode.pubDate} className="podcast__list-card">
            <p>{episode.title}</p> 
            <p>Duración: {episode.duration ? formatTime(episode.duration) : "Desconocida"}</p>
            <AudioPlayer url={episode.audioInfo.url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodcastList;
