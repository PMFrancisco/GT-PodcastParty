import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./mobilePlayer.css";
import { formatTime } from "../utils/formatTime";
import favicon from '../assets/favicon.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
  faForward,
  faBackward,
  faVolumeLow,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";

const MobilePlayer = () => {
  const audioRef = useRef(null);
  const location = useLocation();
  const [episode, setEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    if (location.state && location.state.episode) {
      setEpisode(location.state.episode);
    }
  }, [location]);

  if (!episode) {
    return <p>No se encontró el episodio</p>;
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const progress = (audio.currentTime / audio.duration) * 100;
    setProgress(progress);
    setCurrentTime(audio.currentTime);
  };

  const handleProgressChange = (event) => {
    const audio = audioRef.current;
    const newTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(event.target.value);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
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

  return (
    <div className="player-page">
      <div className="mobilePage__main">
        <img src={favicon} alt="favicon" />
        <img src={episode.image} className="mobilePlayer__image" alt="" />
        <p>{episode.title}</p>
        <audio ref={audioRef} src={episode.audioInfo.url} preload="metadata" />
        <div className="mobilePage-controls">
          <button onClick={handlePreviousEpisode} className="mobile-btn">
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          <button onClick={togglePlayPause} className="mobile-play-btn">
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <button onClick={handleNextEpisode} className="mobile-btn">
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>
        <div className="mobile-progress">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={isNaN(progress) ? 0 : progress}
            onChange={handleProgressChange}
            className="mobile-progress-bar"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;