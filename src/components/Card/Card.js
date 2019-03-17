import React from 'react';

const Card = ( {cardInfo}) => {
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
    </div>
  )
}

export default Card;