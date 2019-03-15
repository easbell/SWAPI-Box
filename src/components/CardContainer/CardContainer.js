import React, { Component } from 'react';
import Card from './../Card/Card';

export class CardContainer extends Component {
  displayPeople = () => {
    const { cardsSelected } = this.props
    console.log(cardsSelected)
    return cardsSelected.map(card => {
      return <Card key={card.name} cardInfo={{card}}/>
    })
  }

  render() {
    return (
      <div>
        {this.displayPeople()}
      </div>
    )
  }
}

export default CardContainer
