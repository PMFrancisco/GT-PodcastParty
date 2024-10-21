import React from 'react'
import CardList from '../components/CardList'
import HeroSlider from '../components/HeroSlider'
import RecommendedEpisodes from '../components/RecommendedEpisodes'
import '../components/HomePage.css'

const homePage = () => {
  return (
    <div>
      <HeroSlider />
      <CardList />
      <section className="episodes-preview">
        <h2>Episodios Recomendados</h2>
        <RecommendedEpisodes/>
      </section>
    </div>
  )
}

export default homePage