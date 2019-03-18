import React from 'react';
import FilterControls from './FilterControls';
import { mount } from 'enzyme';

describe('FilterControls', () => {
  let wrapper;
  let mockHandleSort;

  beforeEach(() => {
    mockHandleSort = jest.fn()
    wrapper = mount(<FilterControls handleSort={mockHandleSort}/>)
  })
  it('should match snapshot with all data passed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke handleSort with proper argument when button is clicked', () => {
    wrapper.find('.people').simulate('click');
    expect(mockHandleSort).toHaveBeenCalledWith('people')
  });

  it('should invoke handleSort with proper argument when button is clicked', () => {
    wrapper.find('.planets').simulate('click');
    expect(mockHandleSort).toHaveBeenCalledWith('planets')
  });

  it('should invoke handleSort with proper argument when button is clicked', () => {
    wrapper.find('.vehicles').simulate('click');
    expect(mockHandleSort).toHaveBeenCalledWith('vehicles')
  });
})
