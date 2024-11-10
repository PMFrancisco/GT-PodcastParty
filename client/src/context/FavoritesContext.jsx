import React, { createContext, useState, useContext, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../services/data';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Obtener los favs del usuario
  const fetchFavorites = async () => {
    try {
      const data = await getFavorites(); // Llamada a la api para los favs
      setFavorites(data.favorites || []); // Actualiza el estado con los favs
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (episodeId) => {
    try {
      if (favorites.includes(episodeId)) {
        // Si esta en favs lo eliminamos
        await removeFavorite(episodeId);
        setFavorites(favorites.filter(fav => fav !== episodeId));
      } else {
        // Si no esta, lo añadimos
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
