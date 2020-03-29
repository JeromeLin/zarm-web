import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import StackItem from '../StackItem';

function TempComponent(props) {
  const { onClose, test } = props;
  return <div onClick={onClose}>{test}</div>;
}

describe('StackItem', () => {
  it('renders basic StackItem correctly', () => {
    const wrapper = mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={4500}
        test="1"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toBe('1');
  });

  it('triggers onClose callback correctly', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={4500}
        onClose={onClose}
        test="1"
      />,
    );
    wrapper.find('div').simulate('click');
    expect(onClose).toBeCalled();
  });

  it('start timer correctly', () => {
    jest.useFakeTimers();
    mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={1234}
      />,
    );
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1234);
  });

  it('do not start timer', () => {
    jest.useFakeTimers();
    mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={0}
      />,
    );
    // 除了 transition 调了一次，不会有第二次
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  it('end timer correctly', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={1234}
        onClose={onClose}
      />,
    );
    jest.runAllTimers();
    expect(onClose).toBeCalled();
  });

  it('unount Component correctly', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <StackItem
        Component={TempComponent}
        name="testname"
        stayTime={1234}
      />,
    );
    wrapper.unmount();
    expect(clearTimeout).toBeCalled();
  });
});
