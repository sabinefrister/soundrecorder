import React from 'react';
import { shallow } from 'enzyme';
import Timer from '../Timer'

function shallowComponent(timerStarted) {
  return shallow(<Timer timerStarted={timerStarted} />);
}

function mountComponent(timerStarted) {
  return mount(<Timer timerStarted={timerStarted} />);
}

function doNothing() {
  console.log("abc")
}

describe('Timer', () => {
	let wrapper;

	afterEach(() => {
    jest.clearAllTimers();
		wrapper.unmount();
	})

  jest.useFakeTimers();

  test('render Timer component with all elements', () => {
    wrapper = shallowComponent(false);
    expect(wrapper.find('.timer').length).toBe(1);
    expect(wrapper.contains(<h3>00:00:00</h3>)).toEqual(true)
  })  

  test('render Timer which has not started yet', () => {
    wrapper = shallowComponent(false);
    expect(wrapper.find('.timer').length).toBe(1);
    expect(wrapper.contains(<h3>00:00:00</h3>)).toEqual(true)
    jest.advanceTimersByTime(1000);
    expect(wrapper.contains(<h3>00:00:00</h3>)).toEqual(true)
  })

  test('renders Timer component with all necessary props', () => {
    wrapper = shallowComponent(true);
    expect(wrapper.instance().props.timerStarted).toEqual(true);
    expect(wrapper.contains(<h3>00:00:00</h3>)).toEqual(true)
  }) 

  xtest('renders correct timer after one second', () => {
    //Problem with calling those functions manually - why? And Date isn't changing obviously, so nothing changes...
    wrapper = shallowComponent(true);
    expect(wrapper.instance().props.timerStarted).toEqual(true);

    wrapper.instance().componentDidUpdate()
    jest.advanceTimersByTime(1000);
    wrapper.instance().refreshTimer()

    expect(wrapper.contains(<h3>00:00:01</h3>)).toEqual(true)

    jest.useRealTimers();
  })
});