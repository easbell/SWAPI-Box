import React from 'react';
import './Card.css'

const Card = ( {cardInfo} ) => {
  const mapProps = () => {
    return Object.keys(cardInfo.card).map(key => {
      return (
        <p key={key}>{key}: {cardInfo.card[key]}</p>
      )
    })
  }

  return (
    <div className='card'>
      {mapProps()}
      <button>Favorite</button>
    </div>
  )
}

export default Card;