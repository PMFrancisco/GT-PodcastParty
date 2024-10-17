import React, { useEffect, useState } from 'react'
import { getEpisodes } from '../services/data'
import { formatTime } from '../utils/formatTime'
import './HomePage.css'

const RecommendedEpisodes = () => {
    const [episodes, setEpisodes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await getEpisodes();
                setEpisodes(data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching episodes:', error); 
                setError(`Error fetching episodes: ${error.message}`);  
            }  
        };
        fetchData();
    }, []);

    if (error){
        return <div>{error}</div>;
    }

  return (
    <div>
        <div className="episodes-grid">
            {episodes.map((episode) => (
            <div key={episode.pubDate} className="episode-card">
                <h3>{episode.title}</h3>
                <p>Duración: {episode.duration ? formatTime(episode.duration) : "Desconocida"}</p>
                <a href={episode.link} target="_blank" rel="noopener noreferrer">Escuchar episodio</a>
            </div>
        ))}
        </div>
    </div>
  )
}

export default RecommendedEpisodes