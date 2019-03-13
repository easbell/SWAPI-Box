import React, { Component } from 'react';
import './App.css';
import Splash from './components/Splash/Splash';
import FilterControls from './components/FilterControls/FilterControls';
import CardContainer from './components/CardContainer/CardContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      randomFilm: {},
      cardsSelected: [],
      error: ''
    }
  }
  
  componentDidMount() {
    const random = this.getRandomNum()
    const url = `https://swapi.co/api/films/${random}`
    fetch(url)
      .then(response => response.json())
      .then(movie => ({openingCrawl: movie.opening_crawl, title: movie.title, releaseDate: movie.release_date}))
      .then(info => this.setState({randomFilm: info}))
      .catch(error => error.message)
  }

  getRandomNum = () => {
    return Math.floor(Math.random() * (7 - 1) + 1); 
  }
  
  handleSort = (filter) => {
    const url = `https://swapi.co/api/${filter}`
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ cardsSelected: data.results }))
      .catch(error => error.message)
  }

  render() {
    const { randomFilm, cardsSelected } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Swapi Box</h1>
        </header>
        <div>
          <Splash 
            randomFilm={randomFilm}
          />
          <FilterControls 
            handleSort={this.handleSort}
          />
          <CardContainer 
            cardsSelected={cardsSelected}
          />
        </div>
      </div>
    );
  }
}

export default App;
