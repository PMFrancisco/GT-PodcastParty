const API_URL = "http://localhost:3000/episodes";

export const getEpisodes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error; 
  }
};

export const getEpisodeByDate = async (pubDate) => {
  try {
    const response = await fetch(`${API_URL}/${pubDate}`);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching episode with pubDate ${pubDate}:`, error);
    throw error;
  }
};
