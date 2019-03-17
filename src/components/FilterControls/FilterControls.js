import React, { Component } from 'react'

const FilterControls = ( {handleSort} ) => {
  const handleSelection = (e) => {
    handleSort(e.target.className)
  }

  return (
    <div>
      <button onClick={handleSelection} className='people'>People</button>
      <button onClick={handleSelection} className='planets'>Planets</button>
      <button onClick={handleSelection} className='vehicles'>Vehicles</button>
    </div>
  )
}

export default FilterControls
