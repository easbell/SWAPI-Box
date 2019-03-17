import React, { Component } from 'react';
import App from './App';
import { shallow } from 'enzyme'
import { mockVehicleData, mockVehicleResult } from './mockData/mockVehicleData'
import { mockSpecies, mockPeopleData, mockAllPeople, mockPeopleResult } from './mockData/mockPeopleData'
import { fetchCalls } from './fetchCalls';

describe('App', () => {
  let wrapper;
  let mockFn;
  let link;

  beforeEach(() => {
    mockFn = jest.fn()
    wrapper = shallow(<App simplifyVehicles={mockFn}/>)

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockVehicleData)
    }));

    link = 'vehicles.com';
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
    it('should return an array of species data when fetchSpecies is called', () => {
    const unresolvedData = wrapper.instance().fetchSpecies(mockPeopleData)

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
    it('should return an array of homeworld data when fetchHomeWorld is called', () => {
    const unresolvedData = wrapper.instance().fetchHomeWorld(mockPeopleData)

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
    it('should return an array cleaned people data when fetchAdditionalPeopleInfo is called', () => {
    const result = wrapper.instance().fetchAdditionalPeopleInfo(mockPeopleData)

    expect(result).toEqual(mockPeopleResult)
    })
  })

})