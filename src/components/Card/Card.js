import React, { Component } from 'react';

class Card extends Component {
  constructor() {
    super()
  }

  mapProps = () => {
    return Object.keys(this.props.cardInfo.card).map(key => {
      return (
        <div>{key}: {this.props.cardInfo.card[key]}</div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.mapProps()}
      </div>
    )
  }
}

export default Card;