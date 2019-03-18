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
      categorySelected: '',
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
    this.setState({categorySelected: filter.toUpperCase()})
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
      return ({Name: info.name, Model: info.model, Class: info.vehicle_class, Passengers: info.passengers})
    })
  }

  fetchPlanets = async (link) => {
    try {
      const fetchedData = await fetchCalls(link)
      const cardsSelected = await this.fetchAdditionalPlanetInfo(fetchedData.results)
      this.setState( {cardsSelected} )
    } catch(error) {
      this.setState({
        errorStatus: error.message,
      })
    }
  }

  fetchAdditionalPlanetInfo = async (allInfo) => {
    try {
      const fetchedPlanetInfo = allInfo.map(async info => {
        let fetchedResidents = await this.fetchResidents(info)
        return ({Name: info.name, Terrain: info.terrain, Population: info.population, Climate: info.climate, Residents: fetchedResidents})
      })
      return Promise.all(fetchedPlanetInfo)
    } catch(error) {
      this.setState({
        errorStatus: error.message,
      })
    }
  }

  fetchResidents = async (planet) => {
    const residents = planet.residents.map(async resident => {
      const residentInfo = await fetchCalls(resident)
      return residentInfo.name
    })
    return Promise.all(residents)
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
    const homeworlds = await this.fetchHomeWorld(other)
    const species = await this.fetchSpecies(other)
    const all = homeworlds.concat(species)
    return this.combineInfo(all)
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
    return Promise.all(homeInfo.map(async person => {
      const fetchedData = await fetchCalls(person.homeworld)
      return ({Name: person.name, Homeworld: fetchedData.name, Population: fetchedData.population})       
    }))
  }

  fetchSpecies = (speciesInfo) => {
    return Promise.all(speciesInfo.map(async person => {
      const fetchedData = await fetchCalls(person.species)
      return ({Species: fetchedData.name})
    }))
  }

  render() {
    const { randomFilm, cardsSelected, categorySelected } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>SWApi Box</h1>
        </header>
        <div>
          <Splash 
            randomFilm={randomFilm}
          />
          <FilterControls 
            handleSort={this.handleSort}
          />
          <h3 className='category'>{categorySelected}</h3>
          <CardContainer 
            cardsSelected={cardsSelected}
            categorySelected={categorySelected}
          />
        </div>
      </div>
    );
  }
}

export default App;
