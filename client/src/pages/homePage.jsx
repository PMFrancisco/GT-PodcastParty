import React from 'react'
import CardList from '../components/CardList'
import HeroSlider from '../components/HeroSlider'
import RecommendedEpisodes from '../components/RecommendedEpisodes'
import Footer from '../components/Footer'
import './HomePage.css'

const homePage = () => {
  return (
    <div>
      <HeroSlider />
      <CardList />
        <RecommendedEpisodes/>
        <Footer></Footer>
    </div>
  )
}

export default homePage