import React from 'react';
import CardContainer from './CardContainer';
import { shallow } from 'enzyme';
import { mockPeopleResult } from './../../mockData/mockPeopleData'

describe('CardContainer', () => {
  let mockCardsSelected = mockPeopleResult
  it('should match snapshot with all data passed in', () => {
    let wrapper = shallow(<CardContainer 
      cardsSelected={mockCardsSelected}
    />)

    expect(wrapper).toMatchSnapshot();
  })
})