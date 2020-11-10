import React from 'react';
import { shallow } from 'enzyme';
import Timer from '../Timer'

function shallowComponent(timerStarted) {
  return shallow(<Timer timerStarted={timerStarted} />);
}

function mountComponent(timerStarted) {
  return mount(<Timer timerStarted={timerStarted} />);
}

describe('Timer', () => {
	let wrapper;

	afterEach(() => {
		wrapper.unmount();
	})

  test('render Timer component with all elements', () => {
    wrapper = shallowComponent(true);
    expect(wrapper.find('.timer').length).toBe(1);
  })

  test('renders Timer component with all necessary props', () => {
    wrapper = shallowComponent(true);
    expect(wrapper.instance().props.timerStarted).toEqual(true);
  })
});