import React, { Component } from 'react';

class Card extends Component {
  constructor() {
    super()
  }

  mapProps = () => {
    return Object.keys(this.props.cardInfo.card).map(key => {
      return (
        <p key={key}>{key}: {this.props.cardInfo.card[key]}</p>
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