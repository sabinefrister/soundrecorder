import React from 'react';
import { shallow } from 'enzyme';
import AudioPlayer from '../AudioPlayer'


describe('AudioPlayer', () => {
	let wrapper;

	beforeEach(() => {
		const fileName = "Test123.wav";
		const audioURL = "https://audioURL";
	  wrapper = shallow(<AudioPlayer fileName={fileName} audioURL={audioURL}/>);
	});

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders AudioPlayer component with all elements', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('audio').length).toBe(1);
  })

  test('renders AudioPlayer component with all necessary props', () => {
    expect(wrapper.instance().props.fileName).toEqual("Test123.wav");
    expect(wrapper.instance().props.audioURL).toEqual("https://audioURL");
    expect(wrapper.find('audio').props().src).toEqual("https://audioURL");
    expect(wrapper.find('audio').props().controls).toEqual(true);
  })
});