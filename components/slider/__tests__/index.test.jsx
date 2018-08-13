import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Slider from '../index';

describe('Slider', () => {
  it('renders normal Slider correctly', () => {
    const wrapper = render(
      <div>
        <Slider round min={0} max={300} step={1} defaultValue={80} />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders different themes of Slider correctly', () => {
    const wrapper = render(
      <div>
        <Slider round min={0} max={300} step={1} defaultValue={80} />
        <Slider round min={0} max={300} step={1} defaultValue={80} theme="info" />
        <Slider round min={0} max={300} step={1} defaultValue={80} theme="success" />
        <Slider round min={0} max={300} step={1} defaultValue={80} theme="warning" />
        <Slider round min={0} max={300} step={1} defaultValue={80} theme="error" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Slider with more props correctly', () => {
    const wrapper = render(
      <div>
        <Slider round isRange handleAmount={2} rangeColors={['red', 'yellow']} styleWidth={600} min={0} max={300} step={1} defaultValue={[80, 150]} />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Slider with multiple handles correctly', () => {
    const wrapper = render(
      <div>
        <Slider round min={0} max={300} step={1} defaultValue={80} handleAmount={2} styleWidth={600} />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when moving handle', () => {
    const getValue = jest.fn();
    const wrapper = mount(
      <Slider min={0} max={100} styleWidth={100} getValue={getValue} />
    );

    wrapper.find('.ui-slider-handle')
      .simulate('mousedown', {
        clientX: 0,
      })
      .simulate('mousemove', {
        clientX: 50,
      });

    expect(getValue).toHaveBeenCalledWith(50, 0);
  });

  it('behaves correctly when moving out of max', () => {
    const getValue = jest.fn();
    const wrapper = mount(
      <Slider min={0} max={100} styleWidth={100} getValue={getValue} />
    );

    wrapper.find('.ui-slider-handle')
      .simulate('mousedown', {
        clientX: 0,
      })
      .simulate('mousemove', {
        clientX: 101,
      });

    expect(getValue).toHaveBeenCalledWith(100, 0);
  });

  it('behaves correctly when moving out of min', () => {
    const getValue = jest.fn();
    const wrapper = mount(
      <Slider min={0} max={100} styleWidth={100} getValue={getValue} />
    );

    wrapper.find('.ui-slider-handle')
      .simulate('mousedown', {
        clientX: 0,
      })
      .simulate('mousemove', {
        clientX: -1,
      });

    expect(getValue).toHaveBeenCalledWith(0, 0);
  });

  jest.useFakeTimers();

  it('behaves correctly when moving end', () => {
    const getValue = jest.fn();
    const wrapper = mount(
      <Slider min={0} max={100} styleWidth={100} getValue={getValue} />
    );

    wrapper.find('.ui-slider-handle')
      .simulate('mousedown', {
        clientX: 0,
      })
      .simulate('mousemove', {
        clientX: 50,
      })
      .simulate('mouseup', {
        clientX: 50,
      });

    expect(setTimeout).toHaveBeenCalledTimes(5);
  });

  it('behaves correctly when clicking slider', () => {
    const getValue = jest.fn();
    const wrapper = mount(
      <Slider min={0} max={100} styleWidth={100} getValue={getValue} />
    );

    wrapper.find('.ui-slider-horizontal')
      .simulate('click', {
        pageX: 50,
      });

    expect(getValue).toHaveBeenCalledWith(50, 0);
  });

  it('behaves correctly when initing with defaultValue', () => {
    const wrapper = mount(
      <Slider min={0} max={100} styleWidth={100} defaultValue={50} />
    );

    jest.runAllTimers();

    expect(wrapper.state('currentValue0')).toEqual(50);
  });

  it('behaves correctly when receiving new props', () => {
    const wrapper = mount(
      <Slider min={0} max={100} styleWidth={100} />
    );

    wrapper.setProps({ defaultValue: 50 });
    jest.runAllTimers();

    expect(wrapper.state('currentValue0')).toEqual(50);
  });
});

