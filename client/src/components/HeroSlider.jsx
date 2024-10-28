import React from 'react'
import './HomePage.css'
import HeroImage from '../assets/imageHero.png'

function HeroSlider() {
  return (
    <section className="hero">
      <div className="hero__image">
        <img src={HeroImage} alt="Chico con laptop" />
      </div>
      <div className="hero__content">
        <h1>Únete y haz crecer tu carrera profesional junto a developers inquietos</h1>
        <p>Saca del cajón lo que YA estás aprendiendo y ponte en acción con buenas 
          prácticas y nuevos colegas.</p>
        <button className="btn__hero">Regístrate</button>
      </div>

      
    </section>
  )
}

export default HeroSlider