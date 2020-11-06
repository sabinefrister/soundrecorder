import React from 'react';

import { shallow } from 'enzyme';

import AudioPlayer from '../AudioPlayer'


describe('AudioPlayer', () => {
  it('renders AudioPlayer components', () => {
    const wrapper = shallow(<AudioPlayer />);
    console.log(wrapper.debug())
    expect(wrapper.find('div').length).toEqual(1);
  })
});