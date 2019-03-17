import React, { Component } from 'react';

class Card extends Component {

  mapProps = () => {
    return Object.keys(this.props.cardInfo.card).map(key => {
      return (
        <p key={key}>{key}: {this.props.cardInfo.card[key]}</p>
      )
    })
  }

  render() {
    return (
      <div className='card'>
        {this.mapProps()}
      </div>
    )
  }
}

export default Card;