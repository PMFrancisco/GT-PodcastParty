import React, { useRef, useState, useEffect } from "react";
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
import "./AudioPlayer.css";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import heart from "../assets/heart.svg";

const AudioPlayer = ({
  url,
  onNextEpisode,
  onBackwardEpisode,
  titleEpisode,
  podcastImage,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [volume, setVolume] = useState(1);
  const { id } = useParams(); 

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 15,
        audioRef.current.duration
      );
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 15,
        0
      );
    }
  };

  const handleLoadData = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  const updateRangeBackground = (progressValue) => {
    return {
      background: `linear-gradient(to right, #fff ${progressValue}%, #c0c0c0 ${progressValue}%)`,
    };
  };

  const updateVolumeBackground = (volumeValue) => {
    return {
      background: `linear-gradient(to top, #fff ${volumeValue * 100}%, #c0c0c0 ${volumeValue * 100}%)`,
    };
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    const volumeSlider = document.querySelector(".volume-slider");
    if (volumeSlider) {
      volumeSlider.style = updateVolumeBackground(newVolume);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const cache = await caches.open("podcast-cache");
      await cache.put(url, new Response(blob));
      console.log(`Episodio descargado y almacenado en caché: ${titleEpisode}`);
    } catch (error) {
      console.error("Error al descargar el episodio:", error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio && url) {
      audio.src = url;
      audio.play(); 
      setIsPlaying(true); 
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [url]);

  const isMobilePage = isMobile && id;

  return (
    <div className={isMobilePage ? "container-mobile" : "container"}>
      {isMobilePage ? (
        <div className="audioplayer-mobile">
          <img src={podcastImage} alt="podcast" className="mobile-img" />
          <div className="mobile-info">
            <p className="mobile-title">{titleEpisode}</p>
            <img src={heart} alt="favorite" className="mobile-fav-icon" />
          </div>
          <div className="mobile-controls">
            <button onClick={onBackwardEpisode} className="mobile-btn">
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button onClick={togglePlayPause} className="mobile-play-btn">
              {isPlaying ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </button>
            <button onClick={onNextEpisode} className="mobile-btn">
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
          </div>
          <div className="mobile-progress">
            <span className="mobile-progess__span">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={isNaN(progress) ? 0 : progress}
              onChange={handleProgressChange}
              className="mobile-progress-bar"
            />
            <span className="mobile-progess__span">{formatTime(duration)}</span>
          </div>
          <div className="mobile-extra">
            <button onClick={handleDownload} className="mobile-download-btn">
              <FontAwesomeIcon icon={faCircleDown} />
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="audioplayer__info">
            <img src={podcastImage} alt="podcast-img" className="audioplayer__info-img" />
            <p>{titleEpisode}</p>
            <img src={heart} alt="" className="audioplayer__info-fav" />
          </div>

          <div className="custom-audio-player">
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            />
            <div className="controls">
              <button onClick={onBackwardEpisode} className="previous-btn">
                <FontAwesomeIcon icon={faBackwardStep} />
              </button>
              <button onClick={() => (audioRef.current.currentTime -= 15)} className="previous-btn">
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button onClick={togglePlayPause} className="play-pause-btn">
                {isPlaying ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </button>
              <button onClick={() => (audioRef.current.currentTime += 15)} className="next-btn">
                <FontAwesomeIcon icon={faForward} />
              </button>
              <button onClick={onNextEpisode} className="next-btn">
                <FontAwesomeIcon icon={faForwardStep} />
              </button>
            </div>

            <div className="progress-container">
              <span className="mobile-progess__span">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={isNaN(progress) ? 0 : progress}
                onChange={handleProgressChange}
                className="audioplayer__progressBar"
              />
              <span className="mobile-progess__span">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="audioplayer__extraicons">
            <button onClick={handleDownload} className="download-btn">
              <FontAwesomeIcon icon={faCircleDown} />
            </button>
            <div className="volume-control">
              <button className="button-audioplayer" onClick={() => setIsVolumeControlVisible(!isVolumeControlVisible)}>
                <FontAwesomeIcon icon={faVolumeLow} />
              </button>
              {isVolumeControlVisible && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;