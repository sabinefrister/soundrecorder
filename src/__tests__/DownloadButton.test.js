import React from 'react';
import { shallow } from 'enzyme';
import DownloadButton from '../DownloadButton'


describe('DownloadButton', () => {
	let wrapper;

	beforeEach(() => {
		const fileName = "Test123.wav";
		const audioURL = "https://audioURL";
	  wrapper = shallow(<DownloadButton fileName={fileName} audioURL={audioURL}/>);
	});

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders DownloadButton component with all elements', () => {
    expect(wrapper.find('Button').length).toBe(1);
  })

  test('renders DownloadButton component with all necessary props', () => {
    expect(wrapper.instance().props.fileName).toEqual("Test123.wav");
    expect(wrapper.instance().props.audioURL).toEqual("https://audioURL");
    expect(wrapper.find('Button').props().href).toEqual("https://audioURL");
    expect(wrapper.find('Button').props().download).toEqual("Test123.wav");
  })
});