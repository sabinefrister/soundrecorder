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
    expect(wrapper.instance().props.getStreamData).toBeDefined();
  })

  test('should call getStreamData after button click', async () => {
    const mockGetStreamData = jest.fn();
    wrapper = mount(<MicrophoneAccess getStreamData={mockGetStreamData} />);

    const mockMediaDevices = {
      getUserMedia: jest.fn()
    }

    global.navigator.mediaDevices = mockMediaDevices;

    wrapper
      .find('Button')
      .simulate('click');

    await expect(mockMediaDevices.getUserMedia.mock.calls.length).toBe(1);
    expect(mockGetStreamData.mock.calls.length).toBe(1);
  })
});
