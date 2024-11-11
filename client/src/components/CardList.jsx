import React from 'react'
import './CardList.css'
import heartIcon from '../assets/heart.png';
import historyIcon from '../assets/history.png';
import recomendationIcon from '../assets/recomendation.png';
import downloadIcon from '../assets/download.png';

const CardList = () => {

  const items = [
    { id: 1, icon: heartIcon, label: 'Favoritos' },
    { id: 2, icon: historyIcon, label: 'Historial' },
    { id: 3, icon: recomendationIcon, label: 'Recomendados' },
    { id: 4, icon: downloadIcon, label: 'Descarga' },
  ];

  return (
  <div className="card-list">
      {items.map(item => (
        <div className="card" key={item.id}>
          <img src={item.icon} alt={item.label} className="icon" />
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CardList;