import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';


describe('AudioPlayer', () => {
	let wrapper;

	beforeEach(() => {
	  wrapper = shallow(<App />);
	});

	// Set State with required values for the child components

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders App component with all elements when reloading page', () => {
  	console.log(wrapper.debug())

    expect(wrapper.find('Navbar').length).toBe(1);
    expect(wrapper.find('Alert').length).toBe(1); //prop should be false
    expect(wrapper.find('MicrophoneAccess').length).toBe(1); 
  })

  test('renders App with Recorder', () => {
    wrapper.setState({ streamAvailable: true, stream: {}});
    console.log(wrapper.debug())

    expect(wrapper.find('Recorder').length).toBe(1); 
  })

  test('renders App with AudioPlayer', () => {
  	wrapper.setState({ audioURL: "abc", fileName: "fileName",  });
    console.log(wrapper.debug())

    expect(wrapper.find('AudioPlayer').length).toBe(1); 
    expect(wrapper.find('DownloadButton').length).toBe(1); 
    expect(wrapper.find('NewRecordingButton').length).toBe(1); 
  })
});
