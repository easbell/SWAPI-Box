import React, { Component } from 'react';
import Card from './../Card/Card';
// import './CardContainer.css';

const CardContainer = () =>{
  const displayCards = () => {
    const { cardsSelected } = this.props
    return cardsSelected.map(card => {
      return <Card key={card.name} cardInfo={{card}}/>
    })
  }

  return (
    <div className='card-container'>
      {displayCards()}
    </div>
  )
}

export default CardContainer
