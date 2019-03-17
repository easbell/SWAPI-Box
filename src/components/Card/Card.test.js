import React from 'react';
import Card from './Card';
import { shallow } from 'enzyme';
import { mockPeopleResult } from './../../mockData/mockPeopleData'

describe('Card', () => {
  let mockCard = {name: "Luke Skywalker", homeworld: "Tatooine", population: "200000", species: "Human"}
  
  it('should match snapshot with all data passed in', () => {
    let wrapper = shallow(<Card key={mockCard.name} cardInfo={{mockCard}}/>)

    expect(wrapper).toMatchSnapshot();
  })
})