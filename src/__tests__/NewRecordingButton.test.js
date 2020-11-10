import React from 'react';
import { shallow, mount } from 'enzyme';
import NewRecordingButton from '../NewRecordingButton'


function shallowComponent() {
  const mockSetNewRecording = jest.fn();
  return shallow(<NewRecordingButton setNewRecording={mockSetNewRecording} />);
}

function mountComponent() {
  const mockSetNewRecording = jest.fn();
  return mount(<NewRecordingButton setNewRecording={mockSetNewRecording} />);
}

function clickNewRecordingButton(wrapper) {
  wrapper
    .find('Button.new-recording')
    .simulate('click');
}

describe('NewRecordingButton', () => {
  let wrapper;

	afterEach(() => {
		wrapper.unmount();
	})

  test('renders NewRecordingButton component with button', () => {
    wrapper = shallowComponent()
    expect(wrapper.find('Button.new-recording').length).toBe(1);
    expect(wrapper.find('Modal.new-recording').props().show).toBe(false);
  })

  test('renders NewRecordingButton component with all necessary props', () => {
    wrapper = shallowComponent()
    expect(wrapper.instance().props.setNewRecording).toBeDefined()
  })

  test('renders NewRecordingButton component with modal after button click', () => {
    wrapper = mountComponent()

    clickNewRecordingButton(wrapper)

    expect(wrapper.find('Modal.new-recording').props().show).toBe(true);
  })

  test('renders modal and closes it with cancel', () => {
    wrapper = mountComponent()

    clickNewRecordingButton(wrapper)

    expect(wrapper.find('Modal.new-recording').props().show).toBe(true);

    wrapper
      .find('Button.modal-button-cancel')
      .simulate('click');

    expect(wrapper.find('Modal.new-recording').props().show).toBe(false);
  })

  test('renders modal and closes it with x-button', () => {
    wrapper = mountComponent()

    clickNewRecordingButton(wrapper)

    wrapper
      .find('CloseButton')
      .simulate('click');

    expect(wrapper.find('Modal.new-recording').props().show).toBe(false);
  })

  test('renders modal and closes it with ok-button and call function', () => {
    const mockSetNewRecording = jest.fn();
    wrapper = mount(<NewRecordingButton setNewRecording={mockSetNewRecording} />);

    clickNewRecordingButton(wrapper)

    wrapper
      .find('Button.modal-button-ok')
      .simulate('click');

    expect(wrapper.find('Modal.new-recording').props().show).toBe(false);
    expect(mockSetNewRecording).toHaveBeenCalled();
  })
});