import React from 'react';

const Card = ( { cardInfo } ) => {
  
  return (
    <div>
      <p>{cardInfo.card.name}</p>
    </div>
  )
}

// Name
// Homeworld
// Species
// Population of Homeworld

export default Card;