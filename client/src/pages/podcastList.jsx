import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getEpisodes } from "../services/data";

import AudioPlayer from "../components/AudioPlayer";
import EpisodeDetail from "../components/EpisodeDetail";

import heart from "../assets/heart-purple.svg";
import heartFilled from "../assets/heart-fill.svg";
import download from "../assets/circle-down-regular.svg";
import next from "../assets/next.svg";
import mobileSection from "../assets/xcel2.png";

import useMediaSession from "../utils/mediaSession";
import { formatTime } from "../utils/formatTime";
import { formatText } from "../utils/formatText";
import { useFavorites } from "../context/FavoritesContext";

import "./podcastList.css";

const PodcastList = ({ isAuthenticated, onLogout }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = 15;
  const location = useLocation();

  const { favorites, toggleFavorite } = useFavorites();

  const fetchEpisodes = async (page) => {
    setIsLoading(true);
    try {
      const data = await getEpisodes(page);
      setEpisodes(data);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      setError(`Error fetching episodes: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage, location.state]);

  const handleEpisodeClick = (index) => {
    setSelectedEpisode(episodes[index]);
    setIsModalOpen(true);
  };

  const handlePlay = () => {
    setCurrentEpisodeIndex(
      episodes.findIndex((ep) => ep.pubDate === selectedEpisode.pubDate)
    );
    setIsPlayerVisible(true);
    setIsModalOpen(false);
  };

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

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getFirstNWords = (text, n) => {
    const words = text.split(" ");
    return words.slice(0, n).join(" ") + (words.length > n ? "..." : "");
  };

  if (error) {
    return <div>{error}</div>;
  }

  const renderPageNumbers = () => {
    const pages = [];
    const pageRange = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 2 ||
        i > totalPages - 2 ||
        (i >= currentPage - pageRange && i <= currentPage + pageRange)
      ) {
        pages.push(
          <a
            key={i}
            onClick={() => goToPage(i)}
            className={
              i === currentPage
                ? "active podcastlist__pagination-active"
                : "podcastlist__pagination-button"
            }
          >
            {i}
          </a>
        );
      } else if (
        (i === 4 && currentPage > 5) ||
        (i === totalPages - 2 && currentPage < totalPages - 4)
      ) {
        pages.push(
          <span key={`dots-${i}`} className="pagination-dots">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  const currentEpisode =
    currentEpisodeIndex !== null ? episodes[currentEpisodeIndex] : null;

  useMediaSession({
    title: currentEpisode ? currentEpisode.title : "",
    artist: "Web Reactiva",
    artwork: currentEpisode
      ? [{ src: currentEpisode.image, sizes: "96x96", type: "image/png" }]
      : [],
    onNext: handleNextEpisode,
    onPrevious: handlePreviousEpisode,
  });

  return (
    <div className="podcastList__main">
      {isAuthenticated ? (
        <div className="podcastList__asideLogin">
          <div className="podcastList__aside-titleLogin"></div>
          <div className="podcastList__aside-bannerLogin">
          <Link to='/episodios' className="podcastList__aside-list">Episodios</Link>
          <Link to='/favourites' className="podcastList__aside-list">Favoritos</Link>
          <Link onClick={() => { onLogout()}} className="podcastList__aside-list">Cerrar Sesión</Link>
          </div>
        </div>
      ) : (
        <div className="podcastList__aside">
          <Link to="/login" className="podcastList__aside-button">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="podcastList__aside-button">
            Registrarte
          </Link>
        </div>
      )}
      <div className="podcastList_cardGrid">
        {selectedEpisode && (
          <EpisodeDetail
            episode={selectedEpisode}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onPlay={handlePlay}
          />
        )}
        <div className="podcastList__title">
          <div className="podcast__section">
            <h2 className="title__sectionTitle">
              Audios para aprender donde quieras
            </h2>
            <h3 className="title__sectionDescription">
              Desde la web o en tu podcatcher podrás acceder a la base de
              conocimiento sobre programación, desarrollo web y carrera
              profesional con cientos de horas de contenido.
            </h3>
          </div>
          <img src={mobileSection} alt="" className="podcastList__ImgSlide" />
        </div>

        <div className="podcastList__episode">
          <h3 className="podcastList__episode-title">Lista de episodios</h3>
          {isLoading ? (
            <div className="spinner">
              <div className="spinner-whitespace"></div>
            </div>
          ) : (
            <ul className="podcast__list">
              {episodes.map((episode, index) => {
                const content = formatText(episode.content);
                const isFavorite = favorites.includes(episode.id);
                return (
                  <li
                    key={episode.pubDate}
                    className={`podcast__list-card ${
                      currentEpisodeIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleEpisodeClick(index)}
                  >
                    <div className="podcast__infoList">
                      <img
                        src={episode.image}
                        alt="podcast-img"
                        className="podcast__list-img"
                      />
                      <div>
                        <p className="podcast__list-titleEpisode">
                          {episode.title}
                        </p>
                      </div>
                    </div>
                    <div className="podcast_extra">
                      <div className="podcast__buttonList">
                        <button>
                          <img
                            src={download}
                            alt="download-icon"
                            className="download_icon"
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(episode.id);
                          }}
                        >
                          <img
                            src={isFavorite ? heartFilled : heart}
                            alt="fav-icon"
                            className="fav_icon"
                          />
                        </button>
                      </div>
                      <p>{formatTime(episode.duration)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="pagination">
            <img
              src={next}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination__previous-icon"
            />
            {renderPageNumbers()}
            <img
              src={next}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination__next-icon"
            />
          </div>

          {isPlayerVisible && currentEpisodeIndex !== null && (
            <div className="player-popup">
              <AudioPlayer
                podcastId={episodes[currentEpisodeIndex].id}
                titleEpisode={episodes[currentEpisodeIndex].title}
                url={episodes[currentEpisodeIndex].audioInfo.url}
                onNextEpisode={handleNextEpisode}
                onBackwardEpisode={handlePreviousEpisode}
                podcastImage={episodes[currentEpisodeIndex].image}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastList;
