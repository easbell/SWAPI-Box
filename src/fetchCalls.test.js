import React from 'react';
import { fetchCalls } from './fetchCalls';

describe('fetchCalls', () => {
  let mockData;

  beforeEach(() => {
    mockData = {
      name: "Tatooine"
    }

    fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    }));
  })
  
  it('takes in the expected URL', () => {
    const url = 'www.starwars.com';
    fetchCalls(url)
    expect(fetch).toBeCalledWith(url)
  })

  it('fetch call returns expected data', async () => {
    const url = 'www.starwars.com';
    const result = await fetchCalls(url)
    expect(result).toEqual(mockData)
  })

  it('if response not ok, show error', async() => {
    const url = 'www.starwars.com';

    fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }));

    try {
      await fetchCalls(url)
    } catch(error) {
      expect(error.message).toBe('Response not ok')
    }
  })
})