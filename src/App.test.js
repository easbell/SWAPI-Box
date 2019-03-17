import React from 'react';
import App from './App';
import { shallow } from 'enzyme'
import { mockVehicleData, mockVehicleResult } from './mockData/mockVehicleData';
import { mockSpecies, mockPeopleData, mockAllPeople, mockPeopleResult, fetchAdditionalPeople } from './mockData/mockPeopleData'
import { rawPlanetData, mockPlanetResult } from './mockData/mockPlanetData';
import { fetchCalls } from './fetchCalls';

describe('App', () => {
  let wrapper;
  let mockFn;
  let link;

  beforeEach(() => {
    mockFn = jest.fn()
    wrapper = shallow(<App simplifyVehicles={mockFn} fetchAdditionalPlanetInfo={mockFn}/>)

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockVehicleData)
    }));

    link = 'www.website.com';
  })
    
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('fetchVehicles', () => {
    it('calls fetch with the correct url', async () => {

      await wrapper.instance().fetchVehicles(link)

      expect(window.fetch).toHaveBeenCalledWith(link)
    });

    it.skip('should call simplifyVehicles', async () => {

      await wrapper.instance().fetchVehicles(link)

      expect(mockFn).toHaveBeenCalledWith(mockVehicleData)
    });

    it('should set state upon a successful fetch', async () => {

      await wrapper.instance().fetchVehicles(link)

      expect(wrapper.state('cardsSelected')).toEqual(mockVehicleResult)
    });

    it('should set state upon a failed fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({message: 'failed to fetch'}));
    
      await wrapper.instance().fetchVehicles(link)
      expect(wrapper.state('errorStatus')).toEqual('failed to fetch')
    });
  })

  describe('fetchSpecies', () => {
    it('should return an array of species data when fetchSpecies is called', async () => {
    const unresolvedData = await wrapper.instance().fetchSpecies(mockPeopleData)

    const singleSpecies = {
      homeworld: null,
      language: "n/a",
      name: "Droid"
      }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(singleSpecies)
    }));

    expect(unresolvedData).toHaveLength(10)
    })
  })

  describe('fetchHomeWorld', () => {
    it('should return an array of homeworld data when fetchHomeWorld is called', async () => {
    const unresolvedData = await wrapper.instance().fetchHomeWorld(mockPeopleData)

    const singleHomeworld = 
      {"name": "Tatooine", 
      "climate": "arid", 
      "terrain": "desert", 
      "population": "200000"
    }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(singleHomeworld)
    }));

    expect(unresolvedData).toHaveLength(10)
    })
  })

  describe('combineInfo', () => {
    it('should return an array cleaned people data when combineInfo is called', () => {
    const result = wrapper.instance().combineInfo(mockAllPeople)

    expect(result).toEqual(mockPeopleResult)
    })
  })

  describe('fetchAdditionalPeopleInfo', () => {
    it('should return an array of cleaned people data when fetchAdditionalPeopleInfo is called', async () => {
    wrapper.instance().fetchHomeWorld = await jest.fn().mockImplementation(() => (
        [
          {
          homeworld: "Tatooine",
          name: "Luke Skywalker",
          population: "200000"
        },
        {
          homeworld: "Tatooine",
          name: "C-3PO",
          population: "200000"
        },
        {
          homeworld: "Naboo",
          name: "R2-D2",
          population: "4500000000"
        },
        {
          homeworld: "Tatooine",
          name: "Darth Vader",
          population: "200000"
        },
        {
          homeworld: "Alderaan",
          name: "Leia Organa",
          population: "2000000000"
        },
        {
          homeworld: "Tatooine",
          name: "Owen Lars",
          population: "200000"
        },
        {
          homeworld: "Tatooine",
          name: "Beru Whitesun lars",
          population: "200000"
        },
        {
          homeworld: "Tatooine",
          name: "R5-D4",
          population: "200000"
        },
        {
          homeworld: "Tatooine",
          name: "Biggs Darklighter",
          population: "200000"
        },
        {
          homeworld: "Stewjon",
          name: "Obi-Wan Kenobi",
          population: "unknown"
        }
      ]
    ))

    wrapper.instance().fetchSpecies = await jest.fn().mockImplementation(() => (
      [{species: "Human"},
      {species: "Droid"},
      {species: "Droid"},
      {species: "Human"},
      {species: "Human"},
      {species: "Human"},
      {species: "Human"},
      {species: "Droid"},
      {species: "Human"},
      {species: "Human"}]
    ))

    const result = await wrapper.instance().fetchAdditionalPeopleInfo(fetchAdditionalPeople)
    expect(result).toEqual(mockPeopleResult)
    })
  })  

  describe('fetchPeople', () => {
    it('calls fetch with the correct url', async () => {

      await wrapper.instance().fetchPeople(link)

      expect(window.fetch).toHaveBeenCalledWith(link)
    });

    it.skip('should call fetchAdditionalPeopleInfo', async () => {

      await wrapper.instance().fetchPeople(link)

      expect(mockFn).toHaveBeenCalledWith(fetchAdditionalPeople)
    });

    it('should set state upon a successful fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(fetchAdditionalPeople)
      }));

      wrapper.instance().fetchAdditionalPeopleInfo = await jest.fn().mockImplementation(() => mockPeopleResult)

      await wrapper.instance().fetchPeople(link)

      expect(wrapper.state('cardsSelected')).toEqual(mockPeopleResult)
    });

    it('should set state upon a failed fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({message: 'failed to fetch'}));
    
      await wrapper.instance().fetchPeople(link)
      expect(wrapper.state('errorStatus')).toEqual('failed to fetch')
    });
  })

  describe('fetchPlanets', () => {
    it('calls fetch with the correct url', async () => {

      await wrapper.instance().fetchPlanets(link)

      expect(window.fetch).toHaveBeenCalledWith(link)
    });

    it.skip('should call fetchAdditionalPlanetInfo', async () => {

      await wrapper.instance().fetchPlanets(link)

      expect(mockFn).toHaveBeenCalledWith(rawPlanetData)
    });

    it('should set state upon a successful fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(rawPlanetData)
      }));

      wrapper.instance().fetchAdditionalPeopleInfo = await jest.fn().mockImplementation(() => mockPlanetResult)

      await wrapper.instance().fetchPlanets(link)

      expect(wrapper.state('cardsSelected')).toEqual(mockPlanetResult)
    });

    it('should set state upon a failed fetch', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({message: 'failed to fetch'}));
    
      await wrapper.instance().fetchPlanets(link)
      expect(wrapper.state('errorStatus')).toEqual('failed to fetch')
    });
  })

})