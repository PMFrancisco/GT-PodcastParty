import React from 'react';
import './HeroSliderIn.css';
import imgHeroIn from '../assets/imagHeroIn.png';
import imgT1log from '../assets/T1-hero-log.png';
import imgT2log from '../assets/T2-hero-log.png';
import imgT3log from '../assets/T3-hero-log.png';
import imgT4log from '../assets/T4-hero-log.png';


const HeroSliderIn = () => {
  return (
    <section className="hero-slider-in">
      <div className="content">
        <h1 className='responsive-text'>Podcast Formación Comunidad Devs</h1>
        <img src={imgT1log} alt="Podcast"  className='responsive-image'/>
        <img src={imgT2log} alt="Formación" className='responsive-image'/>
        <img src={imgT3log} alt="Comunidad" className='responsive-image'/>
        <img src={imgT4log} alt="Developers" className='responsive-image'/>
      </div>
      <div className="user-image">
        <img src={imgHeroIn} alt="Usuario disfrutando de los podcasts" />
      </div>
    </section>
  );
};

export default HeroSliderIn;
