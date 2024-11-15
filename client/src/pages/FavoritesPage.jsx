import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEpisodes } from "../services/data";
import { useFavorites } from "../context/FavoritesContext"; 
import EpisodeDetail from "../components/EpisodeDetail";
import heartFilled from "../assets/heart-fill.svg";
import { formatTime } from "../utils/formatTime";

import "./FavoritesPage.css";

const FavoritesPage = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
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
      }
    };
    fetchFavorites();
  }, [favorites]);

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  };

  return (
    <div className="favoritesPage__main">
      <div className="favoritesPage__aside">
        <button onClick={() => navigate("/episodes")} className="favoritesPage__aside-button">Episodios</button>
        <button onClick={() => navigate("/favorites")} className="favoritesPage__aside-button">Favoritos</button>
      </div>
      <div className="favoritesPage_cardGrid">
        {selectedEpisode && (
          <EpisodeDetail
            episode={selectedEpisode}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        <h3 className="favoritesPage__episode-title">Episodios Favoritos</h3>
        {error && <p>{error}</p>}
        {favoriteEpisodes.length > 0 ? (
          <ul className="favoritesPage__list">
            {favoriteEpisodes.map((episode) => (
              <li
                key={episode.id}
                className="favoritesPage__list-card"
                onClick={() => handleEpisodeClick(episode)}
              >
                <div className="favoritesPage__infoList">
                  <img src={episode.image} alt="podcast-img" className="favoritesPage__list-img" />
                  <p className="favoritesPage__list-titleEpisode">{episode.title}</p>
                </div>
                <div className="favoritesPage__buttonList">
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(episode.id); }}>
                    <img 
                      src={heartFilled}
                      alt="fav-icon" 
                      className="favoritesPage__fav-icon" />
                  </button>
                  <p className="favoritesPage__list-duration">{formatTime(episode.duration)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes episodios favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
