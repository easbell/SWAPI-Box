import React, { Component } from 'react';
import App from './App';
import { shallow } from 'enzyme'
import { mockVehicleData, mockVehicleResult } from './mockData/mockVehicleData'
import { fetchCalls } from './fetchCalls';

describe('App', () => {
  let wrapper;
  let mockFn

  beforeEach(() => {
    mockFn = jest.fn()
    wrapper = shallow(<App simplifyVehicles={mockFn}/>)

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockVehicleData)
    }));

  })
    
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('fetchVehicles', () => {
    it('calls fetch with the correct url', async () => {
      const link = 'vehicles.com'

      await wrapper.instance().fetchVehicles(link)

      expect(window.fetch).toHaveBeenCalledWith(link)
    });

    it.only('should set state upon a successful fetch', async () => {
      const link = 'vehicles.com'

      await wrapper.instance().fetchVehicles(link)

      expect(wrapper.state('cardsSelected')).toEqual(mockVehicleResult)
    })

    it('state upon a successful request', () => {
      const expectedState = mockData;
    })
  })

})