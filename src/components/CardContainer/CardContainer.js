import React, { Component } from 'react';
import Card from './../Card/Card';

export class CardContainer extends Component {

  displayPeople = () => {
    const { cardsSelected } = this.props
    return cardsSelected.map(card => {
      return <Card cardInfo={{card}}/>
    })
  }

  checkFilter = () => {
    const { cardsSelected } = this.props
    if(cardsSelected[0].hasOwnProperty('homeworld')) {
      this.displayPeople()
    }
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
