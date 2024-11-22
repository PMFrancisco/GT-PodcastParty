import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEpisodes, getUsersData } from "../services/data";
import EpisodeDetail from "../components/EpisodeDetail";
import { formatTime } from "../utils/formatTime";

import "./LastListenedPage.css";

const LastListenedPage = () => {
  const [lastListenedEpisodes, setLastListenedEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [lastListened, setLastListened] = useState([]);

  useEffect(() => {
    const fetchLastListened = async () => {
      try {
        const userData = await getUsersData();
        setLastListened(userData.lastListened || []);
        const allEpisodes = await getEpisodes();
        const filteredLastListened = allEpisodes.filter((episode) =>
          userData.lastListened.includes(episode.id)
        );
        const sortedEpisodes = userData.lastListened.map(id => 
          filteredLastListened.find(episode => episode.id === id)
        );
        setLastListenedEpisodes(sortedEpisodes);
      } catch (error) {
        console.error("Error fetching last listened episodes:", error);
        setError("No se pudieron cargar los episodios escuchados recientemente.");
      }
    };
    fetchLastListened();
  }, []);

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  };

  return (
    <div className="lastListenedPage__main">
      <div className="lastListenedPage__aside">
        <button onClick={() => navigate("/episodes")} className="lastListenedPage__aside-button">Episodios</button>
        <button onClick={() => navigate("/favorites")} className="lastListenedPage__aside-button">Favoritos</button>
        <button onClick={() => navigate("/lastListened")} className="lastListenedPage__aside-button">Escuchados Recientemente</button>
      </div>
      <div className="lastListenedPage_cardGrid">
        {selectedEpisode && (
          <EpisodeDetail
            episode={selectedEpisode}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        <h3 className="lastListenedPage__episode-title">Episodios Escuchados Recientemente</h3>
        {error && <p>{error}</p>}
        {lastListenedEpisodes.length > 0 ? (
          <ul className="lastListenedPage__list">
            {lastListenedEpisodes.map((episode) => (
              <li
                key={episode.id}
                className="lastListenedPage__list-card"
                onClick={() => handleEpisodeClick(episode)}
              >
                <div className="lastListenedPage__infoList">
                  <img src={episode.image} alt="podcast-img" className="lastListenedPage__list-img" />
                  <p className="lastListenedPage__list-titleEpisode">{episode.title}</p>
                </div>
                <div className="lastListenedPage__buttonList">
                  <p className="lastListenedPage__list-duration">{formatTime(episode.duration)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes episodios escuchados recientemente.</p>
        )}
      </div>
    </div>
  );
};

export default LastListenedPage;