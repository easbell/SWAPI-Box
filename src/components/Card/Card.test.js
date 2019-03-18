import React from 'react';
import Card from './Card';
import { mount } from 'enzyme';

describe('Card', () => {
  let mockCard = {name: "Luke Skywalker", homeworld: "Tatooine", population: "200000", species: "Human"}
  
  it.skip('should match snapshot with all data passed in', () => {
    let wrapper = mount(<Card key={mockCard.Name} cardInfo={{mockCard}}/>)

    expect(wrapper).toMatchSnapshot();
  })
})