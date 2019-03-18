import React from 'react'
import './Splash.css'

const Splash = ({ randomFilm }) => {
  return (
    <div className='splash'>
      <p>{randomFilm.openingCrawl}</p>
      <p>{randomFilm.title}</p>
      <p>{randomFilm.releaseDate}</p>
    </div>
  )
}

export default Splash;