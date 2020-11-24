import React from 'react';
import { shallow, mount } from 'enzyme';
import Recorder from '../Recorder'


function shallowComponent() {
  const mockGetRecordedAudioURLAndFileName = jest.fn();
  const stream = {}
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

  xtest('renders Recorder component with record and stop button and the timer', () => {
    wrapper = shallowComponent()

  //   let MockAudioContext = (function() {
  //     function AudioContext() {
  //       console.log("inside Mock")
  //       this.destination = new AudioDestinationNode();
  //       this.listener = new AudioListener();
  //     }

  //    AudioContext.prototype.createMediaStreamSource = function() {
  //     return new MediaStreamAudioSourceNode();
  //   };

  //    AudioContext.prototype.createGain = function() {
  //     return new GainNode();
  //   };
  // });

    expect(wrapper.find('.Button.recordButton').length).toBe(1);
    expect(wrapper.find('.Button.stopButton').length).toBe(1);
    expect(wrapper.find('Timer').length).toBe(1);
  })

});