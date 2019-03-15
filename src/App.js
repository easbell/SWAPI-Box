import React, { Component } from 'react';
import './App.css';
import Splash from './components/Splash/Splash';
import FilterControls from './components/FilterControls/FilterControls';
import CardContainer from './components/CardContainer/CardContainer';
import { FetchCalls } from './FetchCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      randomFilm: {},
      cardsSelected: [],
      error: ''
    }
  }
  
  // break out fetch call (each is the same, fetch then the json response)
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
    if(filter === 'people') {
      this.fetchPeople(url);
    } else if (filter === 'planets') {
      this.fetchPlanets(url)
    } else {
      this.fetchVehicles(url)
    }
  }

  fetchVehicles = async (link) => {
    const fetchedData = await FetchCalls(link)
    const cardsSelected = await this.simplifyVehicles(fetchedData.results)
    this.setState({ cardsSelected })
  }

  simplifyVehicles = (allInfo) => {
    return allInfo.map(info => {
      return ({name: info.name, model: info.model, class: info.vehicle_class, passengers: info.passengers})
    })
  }

  fetchPlanets = (link) => {
    fetch(link)
      .then(response => response.json())
      .then(data => this.fetchAdditionalPlanetInfo(data.results))
      .then(cardsSelected => this.setState( {cardsSelected} ))
      .catch(error => error.message)
  }

  fetchAdditionalPlanetInfo = (allInfo) => {
    return allInfo.map(info => {
      return ({name: info.name, terrain: info.terrain, population: info.population, climate: info.climate})
    })
  }

  fetchPeople = (link) => {
    fetch(link)
      .then(response => response.json())
      .then(fetchMore => this.fetchAdditionalPeopleInfo(fetchMore.results))
      .then(cardsSelected => this.setState({ cardsSelected }))
      .catch(error => error.message)
  }

  combineInfo = (allInfo) => {
    const species = allInfo.splice(10, allInfo.length-1)
    let allPeople = [];
    allInfo.forEach((person, i) => {
      allPeople.push(Object.assign({}, person, species[i]));
    });
    return allPeople;
  }

  fetchAdditionalPeopleInfo = (other) => {
    const homeworlds = this.fetchHomeWorld(other)
    const species = this.fetchSpecies(other)
    const all = homeworlds.concat(species)
    return Promise.all(all)
      .then(values => this.combineInfo(values))
  }
  
  fetchHomeWorld = (homeInfo) => {
    const unresolvedHomeWorlds = homeInfo.map(person => {
      return (
        fetch(person.homeworld)
          .then(response => response.json())
          .then(data => ({name: person.name, homeworld: data.name, population: data.population}))
          .catch(error => error.message)          
      )
    })
    return unresolvedHomeWorlds
  }

  fetchSpecies = (speciesInfo) => {
    const unresolvedSpecies = speciesInfo.map(person => {
      return (
        fetch(person.species)
          .then(response =>  response.json())
          .then(data => ({species: data.name}))
          .catch(error => error.message)
      )
    })
    return unresolvedSpecies
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
