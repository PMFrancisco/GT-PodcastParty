import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getEpisodes } from "../services/data";
import { useFavorites } from "../context/FavoritesContext";

import AudioPlayer from "../components/AudioPlayer";
import EpisodeDetail from "../components/EpisodeDetail";
import Spinner from "../components/Spinner";
import MainSidebar from "../components/MainSidebar";

import heartFilled from "../assets/heart-fill.svg";
import { formatTime } from "../utils/formatTime";
import mobileSection from "../assets/xcel2.png";

import "./FavoritesPage.css";

const FavoritesPage = ({ isAuthenticated, onLogout }) => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const allEpisodes = await getEpisodes();
        const filteredFavorites = allEpisodes.filter((episode) =>
          favorites.includes(episode.id)
        );
        setFavoriteEpisodes(filteredFavorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("No se pudieron cargar los episodios favoritos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavorites();
  }, [favorites]);

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  };

  const handlePlay = () => {
    setCurrentEpisodeIndex(
      episodes.findIndex((ep) => ep.pubDate === selectedEpisode.pubDate)
    );
    setIsPlayerVisible(true);
    setIsModalOpen(false);
  };

  const currentEpisode =
    currentEpisodeIndex !== null ? episodes[currentEpisodeIndex] : null;

  return (
    <div className="favoritesPage__main">
      <MainSidebar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <div className="favoritesPage_cardGrid">
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
        <h3 className="favoritesPage__episode-title">Favoritos</h3>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>{error}</p>
        ) : favoriteEpisodes.length > 0 ? (
          <ul className="favoritesPage__list">
            {favoriteEpisodes.map((episode) => (
              <li
                key={episode.id}
                className="favoritesPage__list-card"
                onClick={() => handleEpisodeClick(episode)}
              >
                <div className="favoritesPage__infoList">
                  <img
                    src={episode.image}
                    alt="podcast-img"
                    className="favoritesPage__list-img"
                  />
                  <p className="favoritesPage__list-titleEpisode">
                    {episode.title}
                  </p>
                </div>
                <div className="favoritesPage__buttonList">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(episode.id);
                    }}
                  >
                    <img
                      src={heartFilled}
                      alt="fav-icon"
                      className="favoritesPage__fav-icon"
                    />
                  </button>
                  <p className="favoritesPage__list-duration">
                    {formatTime(episode.duration)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes episodios favoritos.</p>
        )}

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
  );
};

export default FavoritesPage;
