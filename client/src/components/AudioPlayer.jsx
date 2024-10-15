import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faForwardStep, faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import "./AudioPlayer.css";
import { formatTime } from "../utils/formatTime";

const AudioPlayer = ({ url, onNextEpisode, onBackwardEpisode, titleEpisode }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

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

  const hanldeLoadData = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  const updateRangeBackground = (progressValue) => {
    return {
      background: `linear-gradient(to right, #fff ${progressValue}%, #c0c0c0 ${progressValue}%)`,
    };
  };

  return (
    <div className="custom-audio-player">
      <img src="" alt="" />
      <p>{titleEpisode}</p>
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={hanldeLoadData}
      />
      <div className="controls">
      <button onClick={onBackwardEpisode} className="previous-btn">
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>
        <button onClick={togglePlayPause} className="play-pause-btn">
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>

        <button onClick={onNextEpisode} className="next-btn">
          <FontAwesomeIcon icon={faForwardStep} />
        </button>
      </div>

      <div className="progress-container">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={isNaN(progress) ? 0 : progress} 
          onChange={handleProgressChange}
          style={updateRangeBackground(progress)}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
