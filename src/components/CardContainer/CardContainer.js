import React, { Component } from 'react';
import Card from './../Card/Card';

export class CardContainer extends Component {

  displayCards = () => {
    const { cardsSelected } = this.props
    return cardsSelected.map(card => {
      console.log(card)
      return <Card cardInfo={{card}}/>
    })
  }
    
  render() {
    return (
      <div>
        {this.displayCards()}
      </div>
    )
  }
}

export default CardContainer
