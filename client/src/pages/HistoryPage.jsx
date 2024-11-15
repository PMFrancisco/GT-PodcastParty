import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersData } from "../services/data";
import EpisodeDetail from "../components/EpisodeDetail";
import { formatTime } from "../utils/formatTime";

import "./HistoryPage.css";

const HistoryPage = () => {
  const [historyEpisodes, setHistoryEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userData = await getUsersData();
        console.log('Datos de lastListened: ', userData.lastListened)
        setHistoryEpisodes(userData.lastListened);
      } catch (error) {
        console.error("Error fetching history episodes:", error);
        setError("No se pudieron cargar los episodios vistos recientemente.");
      }
    };
    fetchHistory();
  }, []);

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  };

  return (
    <div className="historyPage__main">
      <div className="historyPage__aside">
        <button onClick={() => navigate("/episodes")} className="historyPage__aside-button">Episodios</button>
        <button onClick={() => navigate("/favorites")} className="historyPage__aside-button">Favoritos</button>
      </div>
      <div className="historyPage_cardGrid">
        {selectedEpisode && (
          <EpisodeDetail
            episode={selectedEpisode}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        <h3 className="historyPage__episode-title">Historial de Episodios</h3>
        {error && <p>{error}</p>}
        {historyEpisodes.length > 0 ? (
          <ul className="historyPage__list">
            {historyEpisodes.map((episode) => (
              <li
                key={episode.id}
                className="historyPage__list-card"
                onClick={() => handleEpisodeClick(episode)}
              >
                <div className="historyPage__infoList">
                  <img src={episode.image} alt="podcast-img" className="historyPage__list-img" />
                  <p className="historyPage__list-titleEpisode">{episode.title}</p>
                </div>
                <div className="historyPage__buttonList">
                  <p className="historyPage__list-duration">{formatTime(episode.duration)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes episodios en tu historial.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
