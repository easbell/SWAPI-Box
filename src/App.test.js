import React from 'react';
import App from './App';
// import { fetchPeople } from './App'

describe('App', () => {
  describe('fetchVehicles', () => {
    let mockData;
  
    beforeEach(() => {
      mockData = {
        name: 'Sand Crawler',
        model: 'Digger Crawler',
        class: 'wheeled',
        passengers: '30'
      }

      fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
      }))
    })
  
    it('calls fetchVehicles with the correct url and options', () => {
      const url = 'www.starwars.com'

      fetchVehicles(url)

      expect(fetch).toHaveBeenCalledWith(url);
    });

  })
})