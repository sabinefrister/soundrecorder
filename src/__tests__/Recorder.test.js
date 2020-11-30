import React from 'react';
import { shallow, mount } from 'enzyme';
import Recorder from '../Recorder'


class MockAudioContext {
  AudioContext() {
    return jest.fn()
  }
  createMediaStreamSource() {
    function connect(gain) {
      return gain
    }
    function disconnect(gain) {
      return gain
    }
    return {connect: connect, disconnect: disconnect}
  }
  createGain() {
    return {gain: {value: 0}}
  }
}

class MockMediaRecorder {
  MediaRecorder() {
    return jest.fn()
  }
}

window.AudioContext = MockAudioContext;
window.MediaRecorder = MockMediaRecorder;

function shallowComponent() {
  const mockGetRecordedAudioURLAndFileName = jest.fn();
  const stream = {stream: "abc"}
  return shallow(<Recorder stream={stream} 
                  getRecordedAudioURLAndFileName={mockGetRecordedAudioURLAndFileName} />);
}

function mountComponent() {
  const mockSetNewRecording = jest.fn();
  return mount(<Recorder stream={stream} 
                getRecordedAudioURLAndFileName={mockGetRecordedAudioURLAndFileName} />);
}


describe('Recorder', () => {
  let wrapper;

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders Recorder component with record and stop button and the timer', () => {
    wrapper = shallowComponent()

    expect(wrapper.find('Button.recordButton').length).toBe(1);
    expect(wrapper.find('Button.stopButton').length).toBe(1);
    expect(wrapper.find('Timer').length).toBe(1);
  })  

  test('renders Recorder component with all necessary props', () => {
    wrapper = shallowComponent()

    expect(wrapper.instance().props.stream).toEqual({stream: "abc"});
    expect(wrapper.instance().props.getRecordedAudioURLAndFileName).toBeDefined();
  })

  xtest('state change, when clicking on recordButton', () => {
    wrapper = shallowComponent()

    expect(wrapper.instance().props.stream).toEqual({stream: "abc"});
    expect(wrapper.instance().props.getRecordedAudioURLAndFileName).toBeDefined();
  })

  xtest('state change, when clicking on stopButton', () => {
    wrapper = shallowComponent()

    expect(wrapper.instance().props.stream).toEqual({stream: "abc"});
    expect(wrapper.instance().props.getRecordedAudioURLAndFileName).toBeDefined();
  })
});