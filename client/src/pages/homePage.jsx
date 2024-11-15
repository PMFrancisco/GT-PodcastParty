import React from 'react'
import CardList from '../components/CardList'
import HeroSlider from '../components/HeroSlider'
import HeroSliderIn from '../components/HeroSliderIn'
import RecommendedEpisodes from '../components/RecommendedEpisodes'
import Footer from '../components/Footer'

const homePage = ({isAuthenticated}) => {
  return (
    <div>
      {isAuthenticated ? <HeroSliderIn/> : <HeroSlider/>}
      <CardList />
        <RecommendedEpisodes/>
        <Footer></Footer>
    </div>
  )
}

export default homePage