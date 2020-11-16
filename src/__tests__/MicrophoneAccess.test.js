import React from 'react';
import { shallow, mount } from 'enzyme';
import MicrophoneAccess from '../MicrophoneAccess'

function shallowComponent() {
  const mockGetStreamData = jest.fn((stream) => {stream: "stream"});
  return shallow(<MicrophoneAccess getStreamData={mockGetStreamData} />);
}

describe('MicrophoneAccess', () => {
  let wrapper;

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders MicrophoneAccess component with all elements', () => {
    wrapper = shallowComponent()
    expect(wrapper.find('Button').length).toBe(1);
  })

  test('renders MicrophoneAccess component with all necessary props', () => {
    wrapper = shallowComponent()
    expect(wrapper.find('Button').props().size).toEqual("lg");
  })

  test('should call getStreamData after button click', async () => {
    const mockGetStreamData = jest.fn();
    wrapper = mount(<MicrophoneAccess getStreamData={mockGetStreamData} />);

    const mockMediaDevices = {
      getUserMedia: jest.fn().mockImplementation(() => {id: "{dd3c9540-10e1-0a42-9f03-732c37661620}"})
    }

    global.navigator.mediaDevices = mockMediaDevices;

    wrapper
      .find('Button')
      .simulate('click');

    await expect(mockMediaDevices.getUserMedia.mock.calls.length).toBe(1);
    expect(mockGetStreamData.mock.calls.length).toBe(1);
  })
});


// MediaStream
// ​
// active: true
// ​
// id: "{dd3c9540-10e1-0a42-9f03-732c37661620}"
// ​
// onaddtrack: null
// ​
// onremovetrack: null
// ​
// <prototype>: MediaStreamPrototype { getAudioTracks: getAudioTracks(), getVideoTracks: getVideoTracks(), getTracks: getTracks(), … }
// MicrophoneAccess.js:18
