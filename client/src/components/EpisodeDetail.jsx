import React, { useState, useEffect } from 'react';
import { useFavorites } from "../context/FavoritesContext";
import heart from "../assets/heart.svg";
import heartFilled from "../assets/heart-fill.svg";
import download from "../assets/circle-down-regular.svg";
import episodeBackground from "../assets/ModalBackground.png";
import { formatText } from '../utils/formatText';
import { formatTime } from '../utils/formatTime';
import './EpisodeDetail.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const ContenidoRenderizado = ({ texto }) => {
  return (
    <div
      className="modal-episode-description modal-episode-description-overflow"
      dangerouslySetInnerHTML={{ __html: texto }}
    />
  );
};

const EpisodeDetail = ({ episode, onClose, onPlay, isOpen }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(episode.id);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {isMobile ? (
        <div className="modal-content modal-content-mobile">
          <div className="modal-top" style={{ backgroundImage: `url(${episodeBackground})` }}>
            <div className="modal-header">
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>
            <div>
              <h2 className="modal-episode-title">{episode.title}</h2>
              <div className="modal-title-container">
                <button className="modal-play-button" onClick={onPlay}>
                  <FontAwesomeIcon icon={faPlay} /> Escuchar Ahora
                </button>
                <button className="modal-icon-button">
                  <img src={download} alt="download" className="fav_icon" />
                </button>
                <button onClick={() => toggleFavorite(episode.id)} className="modal-icon-button">
                  <img
                    src={isFavorite ? heartFilled : heart}
                    alt="favorito"
                    className="fav_icon"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="modal-episode-content">
            <div>
              <p className="modal-episode-titles">Escrito por: Daniel Primo</p>
              <p className="modal-episode-titles">Duración total: {formatTime(episode.duration)} min</p>
              <ContenidoRenderizado texto={episode.content} />
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-content">
          <div className="modal-top" style={{ backgroundImage: `url(${episodeBackground})` }}>
            <div className="modal-header">
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>
            <div>
              <h2 className="modal-episode-title">{episode.title}</h2>
              <div className="modal-title-container">
                <button className="modal-play-button" onClick={onPlay}>
                  <FontAwesomeIcon icon={faPlay} /> Escuchar Ahora
                </button>
                <button className="modal-icon-button">
                  <img src={download} alt="download" className="fav_icon" />
                </button>
                <button onClick={() => toggleFavorite(episode.id)} className="modal-icon-button">
                  <img
                    src={isFavorite ? heartFilled : heart}
                    alt="favorito"
                    className="fav_icon"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="modal-episode-content">
            <div>
              <p className="modal-episode-titles">Escrito por: Daniel Primo</p>
              <p className="modal-episode-titles">Duración total: {formatTime(episode.duration)} min</p>
              <ContenidoRenderizado texto={episode.content} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EpisodeDetail;
