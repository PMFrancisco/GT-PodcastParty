import { getTokens } from "../utils/indexedDB";

const API_URL = "https://gt-podcastparty-so1e.onrender.com";

export const getEpisodes = async (page = 1) => {
  const API_URL = `https://gt-podcastparty-so1e.onrender.com/episodes?page=${page}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw error;
  }
};

export const getAllEpisodes = async () => {
  let allEpisodes = [];
  let currentPage = 1;
  const totalPages = 15; 

  try {
    while (currentPage <= totalPages) {
      const API_URL = `https://gt-podcastparty-so1e.onrender.com/episodes?page=${currentPage}`;
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      allEpisodes = [...allEpisodes, ...data];
      currentPage++;
    }
    
    return allEpisodes;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw error;
  }
};



export const getEpisodeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/episodes/${id}`);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching episode with id ${id}:`, error);
    throw error;
  }
};

export const getUsersData = async () => {
  try {
    const tokens = await getTokens();
    if (!tokens || !tokens.accessToken) throw new Error("No token found");

    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const data = await response.json();
    return {
      favorites: data.favorites,
      lastListened: data.lastListened,
    };
    
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const addFavorite = async (podcastId) => {
  try {
    const tokens = await getTokens();
    if (!tokens || !tokens.accessToken) throw new Error("No token found");

    const response = await fetch(`${API_URL}/fav/${podcastId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (podcastId) => {
  try {
    const tokens = await getTokens();
    if (!tokens || !tokens.accessToken) throw new Error("No token found");

    const response = await fetch(`${API_URL}/fav/${podcastId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};