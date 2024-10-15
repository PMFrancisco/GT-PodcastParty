import React, { useEffect, useState } from "react";
import { getEpisodes } from "../services/data";  
import AudioPlayer from "../components/AudioPlayer";
import { formatTime } from "../utils/formatTime";  
import "../index.css"; 

const PodcastList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null); 
  const [isPlayerVisible, setIsPlayerVisible] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await getEpisodes();
        setEpisodes(data);
      } catch (error) {
        console.error('Error fetching episodes:', error); 
        setError(`Error fetching episodes: ${error.message}`);  
      }
    };
    fetchEpisodes();
  }, []);

  const handleEpisodeClick = (index) => {
    console.log('click', index);
    setCurrentEpisodeIndex(index);
    setIsPlayerVisible(true); 
  };

  useEffect(() => {
    if (currentEpisodeIndex !== null) {
      console.log('current', currentEpisodeIndex); 
    }
  }, [currentEpisodeIndex]);

  const handleNextEpisode = () => {
    setCurrentEpisodeIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= episodes.length ? 0 : nextIndex; 
    });
  };

  const handlePreviousEpisode = () => {
    setCurrentEpisodeIndex((prevIndex) => {
      const previousIndex = prevIndex - 1;
      return previousIndex < 0 ? episodes.length - 1 : previousIndex; 
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Últimos 20 episodios</h1>
      <ul className="podcast__list">
        {episodes.map((episode, index) => (
          <li 
            key={episode.pubDate} 
            className="podcast__list-card"
            onClick={() => handleEpisodeClick(index)} 
          >
            <p>{episode.title}</p> 
            <p>Duración: {episode.duration ? formatTime(episode.duration) : "Desconocida"}</p>
          </li>
        ))}
      </ul>

      {isPlayerVisible && currentEpisodeIndex !== null && (
        <div className="player-popup">
          <AudioPlayer 
            titleEpisode={episodes[currentEpisodeIndex].title}
            url={episodes[currentEpisodeIndex].audioInfo.url} 
            onNextEpisode={handleNextEpisode}
            onBackwardEpisode={handlePreviousEpisode}
          />
        </div>
      )}
    </div>
  );
};

export default PodcastList;

