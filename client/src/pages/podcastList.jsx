import React, { useEffect, useState } from "react";
import { getEpisodes } from "../services/data";  
import AudioPlayer from "../components/AudioPlayer";
import { formatTime } from "../utils/formatTime";  
import "./podcastList.css"; 

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
    <div className="podcastList__main">
      <div className="podcastList__aside">
        sidebar
      </div>
      <div>
        <div className="podcastList__title"></div>
        <div><ul className="podcast__list">
        {episodes.map((episode, index) => (
          <li 
            key={episode.pubDate} 
            className="podcast__list-card"
            onClick={() => handleEpisodeClick(index)} 
          >
            <img src="https://placehold.co/200x150" alt="" />
            <p className="podcast__list-title">{episode.title}</p> 
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
      </div>
      
    </div>
  );
};

export default PodcastList;

