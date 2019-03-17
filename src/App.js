import React, { Component } from 'react';
import './App.css';
import Splash from './components/Splash/Splash';
import FilterControls from './components/FilterControls/FilterControls';
import CardContainer from './components/CardContainer/CardContainer';
import { fetchCalls } from './fetchCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      randomFilm: {},
      cardsSelected: [],
      errorStatus: ''
    }
  }
  
  async componentDidMount() {
    const random = this.getRandomNum()
    try {
      const fetchedData = await fetchCalls(`https://swapi.co/api/films/${random}`)
      const randomFilm = ({openingCrawl: fetchedData.opening_crawl, title: fetchedData.title, releaseDate: fetchedData.release_date})
      this.setState({randomFilm: randomFilm})
    } catch(error) {
      this.setState({
        errorStatus: error.message,
      })
    }
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
    try {
      const fetchedData = await fetchCalls(link)
      const cardsSelected = await this.simplifyVehicles(fetchedData.results)
      this.setState({ cardsSelected })
    } catch(error) {
      this.setState({
        errorStatus: error.message,
      })
    }
  }

  simplifyVehicles = (allInfo) => {
    return allInfo.map(info => {
      return ({name: info.name, model: info.model, class: info.vehicle_class, passengers: info.passengers})
    })
  }

  fetchPlanets = async (link) => {
    try {
      const fetchedData = await fetchCalls(link)
      const cardsSelected = this.fetchAdditionalPlanetInfo(fetchedData.results)
      this.setState( {cardsSelected} )
    } catch(error) {
      this.setState({
        errorStatus: error.message,
      })
    }
  }

  fetchAdditionalPlanetInfo = (allInfo) => {
    return allInfo.map(info => {
      return ({name: info.name, terrain: info.terrain, population: info.population, climate: info.climate})
    })
  }

  fetchPeople = async (link) => {
    try {
      const fetchedData = await fetchCalls(link)
      const cardsSelected = await this.fetchAdditionalPeopleInfo(fetchedData.results)
      this.setState({ cardsSelected })
    } catch(error) {
      this.setState({
        errorStatus: error.message,
      })
    }
  }

  fetchAdditionalPeopleInfo = async (other) => {
    console.log(other)
    const homeworlds = await this.fetchHomeWorld(other)
    const species = await this.fetchSpecies(other)
    const all = homeworlds.concat(species)
    const resolvedPeople = await Promise.all(all)
    return this.combineInfo(resolvedPeople)
  }
  
  combineInfo = (allInfo) => {
    const species = allInfo.splice(10, allInfo.length-1)
    let allPeople = [];
    allInfo.forEach((person, i) => {
      allPeople.push(Object.assign({}, person, species[i]));
    });
    return allPeople;
  }
  
  fetchHomeWorld = (homeInfo) => {
    return homeInfo.map(async person => {
      const fetchedData = await fetchCalls(person.homeworld)
      return ({name: person.name, homeworld: fetchedData.name, population: fetchedData.population})       
    })
  }

  fetchSpecies = (speciesInfo) => {
    return speciesInfo.map(async person => {
      const fetchedData = await fetchCalls(person.species)
      return ({species: fetchedData.name})
    })
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
