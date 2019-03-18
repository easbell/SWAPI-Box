import React from 'react'
import './Splash.css'

const Splash = ({ randomFilm }) => {
  return (
    <div className='fade'>
      <div className='star-wars'>
        <div className='crawl'>
          <p>{randomFilm.openingCrawl}</p>
          <p>{randomFilm.title}</p>
          <p>{randomFilm.releaseDate}</p>
        </div>
      </div>
    </div>
  )
}

export default Splash;