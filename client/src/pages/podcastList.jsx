import React, { useEffect, useState } from "react";
import { getEpisodes } from "../services/data";
import AudioPlayer from "../components/AudioPlayer";
import heart from "../assets/heart-purple.svg";
import download from "../assets/circle-down-regular.svg";
import { formatTime } from "../utils/formatTime";
import sample from "../assets/sample-img.png";
import "./podcastList.css";

const PodcastList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await getEpisodes();
        console.log(data);

        setEpisodes(data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setError(`Error fetching episodes: ${error.message}`);
      }
    };
    fetchEpisodes();
  }, []);

  const handleEpisodeClick = (index) => {
    setCurrentEpisodeIndex(index);
    setIsPlayerVisible(true);
  };

  useEffect(() => {
    if (currentEpisodeIndex !== null) {
      console.log("current", currentEpisodeIndex);
    }
  }, [currentEpisodeIndex]);

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="podcastList__main">
      <div className="podcastList__aside">
        <img src={sample} alt="logo" className="podcastList_img-aside"/>
        <button>Sign in</button>
        <button>Register</button>
      </div>
      <div className="podcastList_cardGrid">
        <div className="podcastList__title">
          <h2 className="title__sectionTitle">Title</h2>
          <h3 className="title__sectionDescription">Description</h3>
        </div>
        <div className="podcastList__episode">
          <h3>Lista de episodios</h3>
          <ul className="podcast__list">
            {episodes.map((episode, index) => (
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
                    <p className="podcast__list-titleEpisode">
                      {episode.pubDate}
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
                    <button>
                      <img src={heart} alt="fav-icon" className="fav_icon" />
                    </button>
                  </div>
                  <p>{formatTime(episode.duration)}</p>
                </div>
              </li>
            ))}
          </ul>

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
