import React, { Component } from 'react'

class FilterControls extends Component {
  constructor() {
    super()
    this.state = {
      selectedFilter: ''
    }
  }

  handleSelection = (e) => {
    this.props.handleSort(e.target.className)
  }
  // Good place to refactor? Probably don't need another func here

  render() {
    return (
      <div>
        <button onClick={this.handleSelection} className='people'>People</button>
        <button onClick={this.handleSelection} className='planets'>Planets</button>
        <button onClick={this.handleSelection} className='vehicles'>Vehicles</button>
      </div>
    )
  }
}

export default FilterControls
