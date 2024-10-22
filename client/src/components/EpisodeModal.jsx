import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

const EpisodeModal = ({episode, onClose}) => {
    const navigate = useNavigate();

    const handlePlayEpisode = () => {
        navigate(`/episodes`, {state: { episode }});
    }

  return (
    <div className='modal-container'>
        <div className="modal">
            <button className="close-btn" onClick={onClose}>
                &times;
            </button>
            <div className="modal-content">
                <div className="episode-image">
                    <img src={episode.image} alt={episode.title} />
                </div>
                <div className="episode-info">
                    <h2>{episode.title}</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis adipisci quo accusantium officiis veritatis molestiae soluta dignissimos facilis rem ad perferendis impedit voluptate quisquam aut, pariatur modi porro? Totam, aliquid?</p>
                    <button className="play-btn" onClick={handlePlayEpisode}>
                        Escuchar episodio
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};
export default EpisodeModal