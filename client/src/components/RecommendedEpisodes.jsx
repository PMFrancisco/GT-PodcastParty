import React, { useEffect, useState } from 'react';
import { getEpisodes } from '../services/data';
import EpisodeModal from './EpisodeModal';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const RecommendedEpisodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
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
    setSelectedEpisode(episode); 
  };

  return (
    <div>
      <div className="carousel-container">
        <div className="episodes-carousel">
          {episodes.map((episode) => (
            <div
              key={episode.pubDate}
              className="episode-card"
              onClick={() => handleEpisodeClick(episode)}
            >
              <img
                src={episode.image}
                alt={episode.title}
                className="episode-image"
              />
              <h3 className="episode-title">{episode.title}</h3>
            </div>
          ))}
        </div>
      </div>
      {selectedEpisode && (
        <EpisodeModal
          episode={selectedEpisode}
          onClose={() => setSelectedEpisode(null)}
        />
      )}
      <p className='text-aligned'>¿Te gustaría escuchar más?</p>
      <div className="view-all">
          <button onClick={() => navigate('/episodes')} className=''>Episodios</button>
      </div>
    </div>
  );
};

export default RecommendedEpisodes;
