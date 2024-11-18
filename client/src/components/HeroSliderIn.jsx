import React, { useState, useEffect } from "react";
import './HeroSliderIn.css';
import './HeroSlider.css';
import imgHeroIn from '../assets/imagHeroIn.png';
import imgT1log from '../assets/T1-hero-log.png';
import imgT2log from '../assets/T2-hero-log.png';
import imgT3log from '../assets/T3-hero-log.png';
import imgT4log from '../assets/T4-hero-log.png';
import HeroImage from '../assets/imageHero.png';

const HeroSliderIn = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 475);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 475);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {isMobile ? (
        <section className="hero-slider-in">
          <div className="content">
            <h1 className="responsive-text">Podcast Formación Comunidad Devs</h1>
            <img src={imgT1log} alt="Podcast" className="responsive-image" />
            <img src={imgT2log} alt="Formación" className="responsive-image" />
            <img src={imgT3log} alt="Comunidad" className="responsive-image" />
            <img src={imgT4log} alt="Developers" className="responsive-image" />
          </div>
          <div className="user-image">
            <img src={imgHeroIn} alt="Usuario disfrutando de los podcasts" />
          </div>
        </section>
      ) : (
        <section className="hero">
          <div className="hero__image">
            <img src={HeroImage} alt="Chico con laptop" />
          </div>
          <div className="hero__content">
            <h1>Únete y haz crecer tu carrera profesional junto a developers inquietos</h1>
            <p>
              Saca del cajón lo que YA estás aprendiendo y ponte en acción con buenas
              prácticas y nuevos colegas.
            </p>
            <button className="btn__hero">Regístrate</button>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSliderIn;
