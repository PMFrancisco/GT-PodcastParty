import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import heart from "../assets/heart.svg";
import heartFilled from "../assets/heart-fill.svg";
import download from "../assets/circle-down-regular.png";
import episodeBackground from "../assets/ModalBackground.png";
import { formatTime } from "../utils/formatTime";
import "./EpisodeDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { updateLastListened } from "../services/data"

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const navigate = useNavigate();
 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePlay = async () => {
    try {
      await updateLastListened(episode.id);
      navigate(`/player/${episode.id}`, { state: { episode } });
    } catch (error) {
      console.error("Error while starting playback:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {isMobile ? (
        <div className="modal-content modal-content-mobile">
          <div
            className="modal-top"
            style={{ backgroundImage: `url(${episodeBackground})` }}
          >
            <div className="modal-header">
              <button className="modal-close" onClick={onClose}>
                ✕
              </button>
            </div>
            <div>
              <h2 className="modal-episode-title">{episode.title}</h2>
              <div className="modal-title-container">
                <button className="modal-play-button" onClick={handlePlay}>
                  <FontAwesomeIcon icon={faPlay} /> Escuchar Ahora
                </button>
                <button className="modal-icon-button">
                  <img src={download} alt="download" className="fav_icon" />
                </button>
                <button
                  onClick={() => toggleFavorite(episode.id)}
                  className="modal-icon-button"
                >
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
              <div className="modal__info">
                <p className="modal-episode-titles">
                  Escrito por: Daniel Primo
                </p>
                <p className="modal-episode-titles">
                  Duración total: {formatTime(episode.duration)} min
                </p>
              </div>

              <ContenidoRenderizado texto={episode.content} />
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-content">
          <div
            className="modal-top"
            style={{ backgroundImage: `url(${episodeBackground})` }}
          >
            <div className="modal-header">
              <button className="modal-close" onClick={onClose}>
                ✕
              </button>
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
                <button
                  onClick={() => toggleFavorite(episode.id)}
                  className="modal-icon-button"
                >
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
            <div className="modal__info">
              <p className="modal-episode-titles">Escrito por: Daniel Primo</p>
              <p className="modal-episode-titles">
                Duración total: {formatTime(episode.duration)} min
              </p>
              <ContenidoRenderizado texto={episode.content} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EpisodeDetail;
