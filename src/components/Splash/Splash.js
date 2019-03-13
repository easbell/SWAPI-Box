import React from 'react'

const Splash = ({ randomFilm }) => {
  return (
    <div>
      <p>{randomFilm.openingCrawl}</p>
      <p>{randomFilm.title}</p>
      <p>{randomFilm.releaseDate}</p>
    </div>
  )
}

export default Splash;