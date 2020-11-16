import React from 'react';
import { shallow, mount } from 'enzyme';
import Recorder from '../Recorder'


function shallowComponent() {
  const mockSetNewRecording = jest.fn();
  return shallow(<Recorder stream={this.state.stream} 
                    getRecordedAudioURLAndFileName={this.getRecordedAudioURLAndFileName} />);
}

function mountComponent() {
  const mockSetNewRecording = jest.fn();
  return mount(<Recorder setNewRecording={mockSetNewRecording} />);
}


describe('Recorder', () => {
  let wrapper;

	afterEach(() => {
		wrapper.unmount();
	})

  xtest('renders Recorder component with button', () => {
    wrapper = shallowComponent()
    expect(wrapper.find('Button.new-recording').length).toBe(1);
    expect(wrapper.find('Modal.new-recording').props().show).toBe(false);
  })

  xtest('renders Recorder component with all necessary props', () => {
    wrapper = shallowComponent()
    expect(wrapper.instance().props.setNewRecording).toBeDefined()
  })

  xtest('renders Recorder component with modal after button click', () => {
    wrapper = mountComponent()


    expect(wrapper.find('Modal.new-recording').props().show).toBe(true);
  })

  xtest('renders modal and closes it with cancel', () => {
    wrapper = mountComponent()


    expect(wrapper.find('Modal.new-recording').props().show).toBe(true);

    wrapper
      .find('Button.modal-button-cancel')
      .simulate('click');

    expect(wrapper.find('Modal.new-recording').props().show).toBe(false);
  })

  xtest('renders modal and closes it with x-button', () => {
    wrapper = mountComponent()


    wrapper
      .find('CloseButton')
      .simulate('click');

    expect(wrapper.find('Modal.new-recording').props().show).toBe(false);
  })

  xtest('renders modal and closes it with ok-button and call function', () => {
    const mockSetNewRecording = jest.fn();
    wrapper = mount(<Recorder setNewRecording={mockSetNewRecording} />);

    

    wrapper
      .find('Button.modal-button-ok')
      .simulate('click');

    expect(wrapper.find('Modal.new-recording').props().show).toBe(false);
    expect(mockSetNewRecording).toHaveBeenCalled();
  })
});