import React, { Component } from 'react';
import Splash from './Splash';
import { shallow } from 'enzyme';

describe(Splash, () => {
  it('should match snapshot with all correct data passed through', () => {
    let mockRandomFilm = {
      openingCrawl: "It is a dark time for the Rebellion. Although the Death Star has been destroyed, Imperial troops have driven the Rebel forces from their hidden",
      releaseDate: "1980-05-17",
      title: "The Empire Strikes Back"}
      
    const wrapper = shallow(<Splash randomFilm={mockRandomFilm}/>)
    expect(wrapper).toMatchSnapshot();
  })
})