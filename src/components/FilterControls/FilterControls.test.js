import React from 'react';
import FilterControls from './FilterControls';
import { mount } from 'enzyme';

describe('FilterControls', () => {
  it('should match snapshot with all data passed in', () => {
    const mockHandleSort = jest.fn()
    const wrapper = mount(<FilterControls handleSort={mockHandleSort}/>)
    
    expect(wrapper).toMatchSnapshot();
  })
})
