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
  start() {
    return jest.fn()
  }  
  stop() {
    return jest.fn()
  }
  onStop() {
    return jest.fn()
  }
  onDataAvailable() {
    return jest.fn()
  }
  onError() {
    return jest.fn()
  }
}

window.AudioContext = MockAudioContext;
window.MediaRecorder = MockMediaRecorder;

function shallowComponent() {
  const mockGetRecordedAudioURLAndFileName = jest.fn();
  const mockGetErrorFromRecorder = jest.fn();
  const stream = {stream: "abc"}
  return shallow(<Recorder stream={stream} 
                  getRecordedAudioURLAndFileName={mockGetRecordedAudioURLAndFileName}
                  mockGetErrorFromRecorder={mockGetErrorFromRecorder} />);
}

function mountComponent() {
  const mockGetRecordedAudioURLAndFileName = jest.fn();
  const mockGetErrorFromRecorder = jest.fn();
  const stream = {stream: "abc"}
  return mount(<Recorder stream={stream} 
                getRecordedAudioURLAndFileName={mockGetRecordedAudioURLAndFileName}
                mockGetErrorFromRecorder={mockGetErrorFromRecorder} />);
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

  test('renders expected state when mounting component', () => {
    wrapper = shallowComponent()

    expect(wrapper.instance().state).toEqual({
      timerStarted: false,
      idRecordButton: "",
      enableRecordButton: true,
      enableStopButton: true
    });    
  })

  test('state change, when clicking on recordButton', () => {
    wrapper = mountComponent()

    wrapper
    .find('Button.recordButton')
    .simulate('click');    

    expect(wrapper.instance().state).toEqual({
      timerStarted: true, 
      idRecordButton: "record", 
      enableStopButton: true, 
      enableRecordButton: false
    });

    expect(wrapper.find('Button.recordButton').props().disabled).toEqual(true);
    expect(wrapper.find('Button.stopButton').props().disabled).toEqual(false);
    // expect(window.MediaRecorder.start.mock.calls.length).toBe(1);
  })

  test('state change, when clicking on stopButton', () => {
    wrapper = mountComponent()

    wrapper
    .find('Button.stopButton')
    .simulate('click');
    
    expect(wrapper.instance().state).toEqual({
      timerStarted: false, 
      idRecordButton: "",
      enableStopButton: false, 
      enableRecordButton: true
    });

    expect(wrapper.find('Button.recordButton').props().disabled).toEqual(false);
    expect(wrapper.find('Button.stopButton').props().disabled).toEqual(true);
    // expect(window.MediaRecorder.stop.mock.calls.length).toBe(1);
  })
});