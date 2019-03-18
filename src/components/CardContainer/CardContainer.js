import React from 'react';
import Card from './../Card/Card';
import './CardContainer.css';

const CardContainer = ( {cardsSelected} ) =>{
  const displayCards = () => {
    return cardsSelected.map(card => {
      return <Card key={card.Name} cardInfo={{card}}/>
    })
  }

  return (
    <div className='card-container'>
      {displayCards()}
    </div>
  )
}

export default CardContainer
