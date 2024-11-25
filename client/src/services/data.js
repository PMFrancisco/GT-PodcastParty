import { getTokens, storeTokens } from "../utils/indexedDB";

const API_URL = import.meta.env.VITE_API_URL

const refreshAccessToken = async () => {
  const tokens = await getTokens();
  if (!tokens || !tokens.refreshToken)
    throw new Error("No refresh token found");

  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: tokens.refreshToken }),
  });

  if (!response.ok) throw new Error("Failed to refresh access token");

  const newTokens = await response.json();
  await storeTokens(newTokens.accessToken, newTokens.refreshToken);
  return newTokens.accessToken;
};

const fetchWithToken = async (url, options) => {
  let tokens = await getTokens();
  if (!tokens || !tokens.accessToken) throw new Error("No token found");

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();
    tokens = await getTokens();

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  if (!response.ok) throw new Error(`Server error: ${response.status}`);
  return response;
};

export const getEpisodes = async (page = 1) => {
  const url = `${API_URL}/episodes?page=${page}`;
  try {
    const response = await fetch(url);
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

export const getEpisodesIds = async () => {
  try {
    const response = await fetchWithToken(`${API_URL}/episodes/ids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ids:", error);
    throw error;
  }
};

export const getAllEpisodes = async () => {
  let allEpisodes = [];
  let currentPage = 1;
  const totalPages = 15;

  try {
    while (currentPage <= totalPages) {
      const url = `${API_URL}/episodes?page=${currentPage}`;
      const response = await fetch(url);
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

export const getUsersData = async () => {
  try {
    const response = await fetchWithToken(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    const response = await fetchWithToken(`${API_URL}/fav/${podcastId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (podcastId) => {
  try {
    const response = await fetchWithToken(`${API_URL}/fav/${podcastId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

export const updateLastListened = async (podcastId) => {
  try {
    await fetchWithToken(`${API_URL}/users/lastListened/${podcastId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating last listened:", error);
  }
};
