import React, { useEffect, useState } from 'react';
import { getEpisodes } from '../services/data';
import './RecommendedEpisodes.css';
import { useNavigate } from 'react-router-dom';
import { IoIosPlay, IoIosClose } from "react-icons/io";
import { formatText } from '../utils/formatText';

const RecommendedEpisodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEpisodes();
        setEpisodes(data.slice(0, 10));
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

  const handleEpisodeClick = (episode) => {
    if (!isExpanded) {
      setSelectedEpisode(episode);
      setIsExpanded(true);
    }
  };

  const handleCloseClick = () => {
    setSelectedEpisode(null);
    setIsExpanded(false);
  };

  const handlePlayEpisode = () => {
    navigate(`/episodes`, {state: { episode: selectedEpisode } });
  } 

  return (
    <div className="recommended-container">
      <div className="carousel-container">
        <div className="episodes-carousel">
          {episodes.map((episode) => (
            <div
              key={episode.pubDate}
              className={`episode-card ${isExpanded && selectedEpisode === episode ? 'expanded' : ''}`}
              onClick={() => handleEpisodeClick(episode)}
            >
              <img
                src={episode.image}
                alt={episode.title}
                className={`episode-image ${isExpanded && selectedEpisode === episode ? 'expanded-image' : ''}`}
              />
              <div className={`episode-content ${isExpanded && selectedEpisode === episode ? 'expanded-content' : ''}`}>
                <div className="episode-header">
                  <h3 className={`episode-title ${isExpanded && selectedEpisode === episode ? 'expanded-title' : ''}`}>
                    {episode.title}
                  </h3>
                  {isExpanded && selectedEpisode === episode && (
                    <button className="close-details" onClick={handleCloseClick}><IoIosClose /></button>
                  )}
                </div>
                {isExpanded && selectedEpisode === episode && (
                  <>
                    <p className="episode-description">
                    {formatText(episode.content)}
                    </p>
                    <button className="listen-now" onClick={handlePlayEpisode}><IoIosPlay/>Escuchar ahora</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-aligned">¿Te gustaría escuchar más?</p>
        <div className="view-all">
          <button onClick={() => navigate('/episodes')}>Episodios</button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedEpisodes;
