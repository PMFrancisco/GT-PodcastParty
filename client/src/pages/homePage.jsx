import React from 'react'
import CardList from '../components/CardList'
import HeroSlider from '../components/HeroSlider'
import RecommendedEpisodes from '../components/RecommendedEpisodes'

const homePage = () => {
  return (
    <div>
      <HeroSlider />
      <CardList />
        <h2>Episodios Recomendados</h2>
        <RecommendedEpisodes/>
    </div>
  )
}

export default homePage