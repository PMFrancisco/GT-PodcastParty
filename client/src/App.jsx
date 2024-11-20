import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PodcastList from './pages/podcastList';
import HomePage from './pages/homePage';
import Header from './components/Header';
import FavoritesPage from './pages/FavoritesPage';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import MobilePlayer from './pages/mobilePlayer';
import { FavoritesProvider } from './context/FavoritesContext';
import { getTokens, storeTokens, clearTokens } from './utils/indexedDB';
import { getAllEpisodes } from './services/data'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [episodes, setEpisodes] = useState([]); 
  const [episodeIds, setEpisodeIds] = useState([]); 

  useEffect(() => {
    const checkTokens = async () => {
      const tokens = await getTokens();
      if (tokens) {
        const currentTime = new Date().getTime();
        const createdAt = tokens.createdAt;
        const tokenLifetime = 30 * 24 * 60 * 60 * 1000;

        if (currentTime - createdAt < tokenLifetime) {
          setIsAuthenticated(true);
        } else {
          await clearTokens();
        }
      }
    };

    checkTokens();
  }, []);

  const handleAuthentication = async (accessToken, refreshToken) => {
    await storeTokens(accessToken, refreshToken);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await clearTokens();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const allEpisodes = await getAllEpisodes();
        setEpisodes(allEpisodes);
        setEpisodeIds(allEpisodes.map(episode => episode.id));
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <FavoritesProvider>
      <Router>
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage isAuthenticated={isAuthenticated}/>} />
          <Route path="/episodes" element={<PodcastList isAuthenticated={isAuthenticated} onLogout={handleLogout}/>} />
          <Route 
            path="/register" 
            element={<RegisterPage onAuthenticate={handleAuthentication} />} 
          />
          <Route 
            path="/login" 
            element={<LoginPage onAuthenticate={handleAuthentication} />} 
          />
          <Route 
            path="/favorites" 
            element={<FavoritesPage />} 
          />
          <Route 
            path="/player/:id" 
            element={<MobilePlayer episodeIds={episodeIds} />} 
          />
          <Route 
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
          />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;


