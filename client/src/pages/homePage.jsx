import React from 'react'
import CardList from '../components/CardList'
import HeroSlider from '../components/HeroSlider'
import RecommendedEpisodes from '../components/RecommendedEpisodes'

const homePage = () => {
  return (
    <div>
      <HeroSlider />
      <CardList />
      <section className="episodes-preview">
        <h2>Episodios Recomendados</h2>
        <RecommendedEpisodes/>
      </section>
      <div className="view-all">
          <button href="/episodes" className='btn btn--login'>Ver todos los episodios</button>
        </div>
    </div>
  )
}

export default homePage