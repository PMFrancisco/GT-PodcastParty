import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import PodcastList from './pages/podcastList';
import HomePage from './pages/homePage';
import Header from './components/Header';
import FavoritesPage from './pages/FavoritesPage';
import HistoryPage from './pages/HistoryPage';
import './App.css';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { getTokens, storeTokens, clearTokens } from './utils/indexedDB';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <FavoritesProvider>
      <Router>
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/episodes" element={<PodcastList />} />
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
            path="/history" 
            element={<HistoryPage />} 
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

