import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUsersData, addFavorite, removeFavorite } from '../services/data';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const data = await getUsersData(); 
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (episodeId) => {
    try {
      if (favorites.includes(episodeId)) {
        await removeFavorite(episodeId);
        setFavorites(favorites.filter(fav => fav !== episodeId));
      } else {
        await addFavorite(episodeId);
        setFavorites([...favorites, episodeId]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
