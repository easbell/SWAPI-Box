import React, { Component } from 'react';
import Card from './../Card/Card';
// import './CardContainer.css';

export class CardContainer extends Component {
  displayPeople = () => {
    const { cardsSelected } = this.props
    return cardsSelected.map(card => {
      return <Card key={card.name} cardInfo={{card}}/>
    })
  }

  render() {
    return (
      <div className='card-container'>
        {this.displayPeople()}
      </div>
    )
  }
}

export default CardContainer
