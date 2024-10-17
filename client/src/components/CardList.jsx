import React from 'react'
import Feature from './Feature'
import './HomePage.css'

function CardList() {
  return (
    <div >
      <div className='cardList-Content'>
        <p> FEATURES </p>
        <div className='cardList'>
          <Feature />
          <Feature />
          <Feature />
          <Feature />
          <Feature />
          <Feature />
        </div>
      </div>
    </div>
  )
}

export default CardList