import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEpisodes } from "../services/data";
import AudioPlayer from "../components/AudioPlayer";
import heart from "../assets/heart-purple.svg";
import download from "../assets/circle-down-regular.svg";
import { formatTime } from "../utils/formatTime";
import { formatText } from "../utils/formatText";
import mobileSection from "../assets/xcel2.png";
import "./podcastList.css";

const PodcastList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 15;
  const location = useLocation();

  const fetchEpisodes = async (page) => {
    try {
      const data = await getEpisodes(page);
      console.log("Data de la API:", data);

      setEpisodes(data);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      setError(`Error fetching episodes: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage, location.state]);

  const handleEpisodeClick = (index) => {
    setCurrentEpisodeIndex(index);
    setIsPlayerVisible(true);
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

  return (
    <div className="podcastList__main">
      <div className="podcastList__aside">
        <button className="podcastList__aside-button">Iniciar sesión</button>
        <button className="podcastList__aside-button">Registrarte</button>
      </div>
      <div className="podcastList_cardGrid">
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
          <img src={mobileSection} alt="" />
        </div>
        
        <div className="podcastList__episode">
          <h3>Lista de episodios</h3>
          <ul className="podcast__list">
            {episodes.map((episode, index) => { 
              const content = formatText(episode.content);
              const previewContent = getFirstNWords(content, 20);

              return (
                <li
                  key={episode.pubDate}
                  className="podcast__list-card"
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
                      <p>{previewContent}</p>
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
                      <button>
                        <img src={heart} alt="fav-icon" className="fav_icon" />
                      </button>
                    </div>
                    <p>{formatTime(episode.duration)}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="pagination">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={pageNum === currentPage ? "active" : ""}
                >
                  {pageNum}
                </button>
              );
            })}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>

          {isPlayerVisible && currentEpisodeIndex !== null && (
            <div className="player-popup">
              <AudioPlayer
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
