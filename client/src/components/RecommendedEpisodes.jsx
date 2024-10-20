import React, { useEffect, useState } from 'react'
import { getEpisodes } from '../services/data'
import { formatTime } from '../utils/formatTime'
import './HomePage.css'
import AudioPlayer from "../components/AudioPlayer";

const RecommendedEpisodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEpisodes();
        setEpisodes(data.slice(0, 5));
        console.log(episodes);
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setError(`Error fetching episodes: ${error.message}`);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

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

  return (
    <div>
      <div className="episodes-grid">
        {episodes.map((episode, index) => (
          <div
            key={episode.pubDate}
            className="episode-card"
            onClick={() => handleEpisodeClick(index)}
          >
            <h3>{episode.title}</h3>
            <p>Duración: {episode.duration ? formatTime(episode.duration) : 'Desconocida'}</p>
          </div>
        ))}
      </div>
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

export default RecommendedEpisodes;
