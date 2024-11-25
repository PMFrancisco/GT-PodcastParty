import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"; 
import { useFavorites } from "../context/FavoritesContext";
import useMediaSession from "../utils/mediaSession";
import "./mobilePlayer.css";
import { formatTime } from "../utils/formatTime";
import favicon from "../assets/favicon.png";
import heart from "../assets/heart-purple.svg";
import heartFilled from "../assets/heart-fill.svg";
import fiveplus from "../assets/five-plus.png";
import fiveminus from "../assets/five-minus.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { getEpisodeById, updateLastListened } from "../services/data";

const MobilePlayer = ({ episodeIds }) => {
  const { id: initialEpisodeId } = useParams(); 
  const audioRef = useRef(null);
  const [episode, setEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (initialEpisodeId && episodeIds && episodeIds.length > 0) {
      const index = episodeIds.findIndex((id) => id === initialEpisodeId);
      if (index !== -1) {
        setCurrentIndex(index);
        fetchEpisodeById(initialEpisodeId);
      } else {
        
      }
    }
  }, [initialEpisodeId, episodeIds]);
  

  const fetchEpisodeById = async (id) => {
    try {
      const fetchedEpisode = await getEpisodeById(id);
      setEpisode(fetchedEpisode);
    } catch (error) {
      console.error("Error fetching episode:", error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioDuration = () => setDuration(audio.duration);
      audio.addEventListener("loadedmetadata", setAudioDuration);
      return () => audio.removeEventListener("loadedmetadata", setAudioDuration);
    }
  }, [episode]);

  const updateProgressBarColor = () => {
    const progressPercent = isNaN(progress) ? 0 : progress;
    const progressBar = document.querySelector(".mobile__progress-bar");

    if (progressBar) {
      progressBar.style.background = `linear-gradient(to right, #9747ff ${progressPercent}%, black ${progressPercent}%)`;
    }
  };

  useEffect(() => {
    updateProgressBarColor();
  }, [progress]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const newProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(newProgress);
      setCurrentTime(audio.currentTime);
    }
  };

  const handleProgressChange = (event) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const newTime = (event.target.value / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgress(event.target.value);
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
        updateLastListened(episode.id);

      }
      setIsPlaying(!isPlaying);
    }
  };

  const fetchAdjacentEpisode = async (direction) => {
    if (currentIndex === null || !episodeIds || episodeIds.length === 0) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % episodeIds.length; 
    } else if (direction === "previous") {
      newIndex = (currentIndex - 1 + episodeIds.length) % episodeIds.length; 
    }

    const nextEpisodeId = episodeIds[newIndex];
    try {
      const newEpisode = await getEpisodeById(nextEpisodeId);
      setEpisode(newEpisode);
      setCurrentIndex(newIndex); 
      setIsPlaying(false); 
      setProgress(0); 
      setCurrentTime(0);
    } catch (error) {
      console.error("Error fetching adjacent episode:", error);
    }
  };

  useMediaSession({
    title: episode?.title || "Cargando...",
    artist: episode?.author || "Desconocido", 
    album: "Podcast",
    artwork: [
      {
        src: episode?.image || favicon,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    onPlay: togglePlayPause,
    onPause: togglePlayPause,
    onNext: () => fetchAdjacentEpisode("next"),
    onPrevious: () => fetchAdjacentEpisode("previous"),
  });

  if (!episode) {
    return <p>Cargando episodio...</p>;
  }

  const isFavorite = episode && favorites.includes(episode.id);

  return (
    <div className="player-page">
      <div className="mobilePage__main">
        <img src={favicon} alt="favicon" />
        <img
          src={episode.image}
          className="mobilePlayer__image"
          alt="Episodio" />
        <div className="mobilePage__main-title">
          <span>{episode.title}</span>
          <button
            onClick={() => toggleFavorite(episode.id)}
            className="modal-icon-button"
          >
            <img
              src={isFavorite ? heartFilled : heart}
              alt="Favorito"
              className="fav_icon" />
          </button>
        </div>
        <audio
          ref={audioRef}
          src={episode.audioInfo.url}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate} />

        <div className="mobile__progress">
          <input
            type="range"
            min="0"
            max="100"
            value={isNaN(progress) ? 0 : progress}
            onChange={handleProgressChange}
            className="mobile__progress-bar" />
          <div className="mobile__progress-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="mobilePage-controls">
          <button
            onClick={() => (audioRef.current.currentTime -= 5)}
            className="previous-btn"
          >
            <img src={fiveminus} alt="five-minus-time" />
          </button>
          <div className="mobilePage__principalControls">
            <button
              onClick={() => fetchAdjacentEpisode("previous")}
              className="mobile-btn"
            >
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button onClick={togglePlayPause} className="mobile-play-btn">
              {isPlaying ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </button>
            <button
              onClick={() => fetchAdjacentEpisode("next")}
              className="mobile-btn"
            >
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
          </div>
          <button
            onClick={() => (audioRef.current.currentTime += 5)}
            className="next-btn"
          >
            <img src={fiveplus} alt="five-plus-time" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
