import React from 'react';
import { useFavorites } from "../context/FavoritesContext";
import heart from "../assets/heart.svg";
import heartFilled from "../assets/heart-fill.svg";
import download from "../assets/circle-down-regular.svg";
import episodeBackground from "../assets/ModalBackground.png";
import { formatText } from '../utils/formatText';
import { formatTime } from '../utils/formatTime';
import './EpisodeDetail.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import { addToLastListened } from '../services/data';

const EpisodeDetail = ({ episode, onClose, onPlay, isOpen }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(episode.id);

  const handlePlayClick = async () => {
    try {
      onPlay();
      await addToLastListened(episode.id);
    }catch (error){
      console.error ('Error al agregar el episodio en lastListened', error);
    }
  }

  if (!isOpen) return null;
  return (
    <>
      <div className="modal-content">
        <div className='modal-top' style={{ backgroundImage: `url(${episodeBackground})` }}>
          <div className="modal-header">
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
          <div>
            <h2 className="modal-episode-title">{episode.title}</h2>
            <div className='modal-title-container'>
              <button className="modal-play-button" onClick={handlePlayClick}>
              <FontAwesomeIcon icon={faPlay} /> Escuchar Ahora
              </button>
              <button className="modal-icon-button">
                <img src={download} alt="download" className="fav_icon" />
              </button>
              <button onClick={() => toggleFavorite(episode.id)} className="modal-icon-button">
                <img 
                  src={isFavorite ? heartFilled : heart}
                  alt="favorito" 
                  className="fav_icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="modal-episode-content">
          <div>
            <p className="modal-epispde-titles">Escrito por: Daniel Primo</p>
            <p className="modal-epispde-titles">Duración total: {formatTime(episode.duration)} min</p>
            <p className="modal-episode-description modal-episode-description-overflow">{formatText(episode.content)}</p>
          </div>
        </div>
      </div>
    </>


  );
};

export default EpisodeDetail;
