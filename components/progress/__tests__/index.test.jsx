import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Progress from '..';

describe('Progress', () => {
  it('renders percent correctly', () => {
    const wrapper = render(<Progress percent={10} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders percent by "text" prop correctly', () => {
    const percentFormatter = (percent) => <span>dsfjasf{percent * 100}wjrmc</span>;
    const wrapper = mount(<Progress percent={10} />);
    wrapper.setProps({ text: percentFormatter });
    expect(wrapper.contains(percentFormatter(10))).toEqual(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    const wrapper = render(<Progress percent={10}>children</Progress>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders percent and children correctly', () => {
    const wrapper = mount(<Progress shape="circle" percent={10}>children</Progress>);
    wrapper.setProps({ percent: 50 });
    expect(wrapper.props().percent).toEqual(50);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  const shapes = ['line', 'circle', 'semi-circle'];

  shapes.forEach((shape) => {
    it(`renders shape of "${shape}" correctly`, () => {
      const wrapper = mount(<Progress shape={shape} percent={10} />);
      wrapper.setProps({ shape });
      expect(wrapper.props().shape).toEqual(shape);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  const themes = ['primary', 'warning', 'danger'];

  themes.forEach((theme) => {
    it(`renders theme of "${theme}" correctly`, () => {
      const wrapper = mount(<Progress shape="line" percent={10} />);
      wrapper.setProps({ theme });
      expect(wrapper.props().theme).toEqual(theme);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it(`renders theme of "${theme}"correctly`, () => {
      const wrapper = mount(<Progress shape="circle" percent={10} />);
      wrapper.setProps({ theme });
      expect(wrapper.props().theme).toEqual(theme);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it(`renders theme of "${theme}" correctly`, () => {
      const wrapper = mount(<Progress shape="semi-circle" percent={10} />);
      wrapper.setProps({ theme });
      expect(wrapper.props().theme).toEqual(theme);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  const sizes = ['lg', 'md', 'sm', 10, '10px', '1rem', '1em', '1pt'];

  sizes.forEach((size) => {
    it(`renders size of "${size}" correctly`, () => {
      const wrapper = mount(<Progress shape="line" percent={10} />);
      wrapper.setProps({ size });
      expect(wrapper.props().size).toEqual(size);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it(`renders size of "${size}" correctly`, () => {
      const wrapper = mount(<Progress shape="circle" percent={10} />);
      wrapper.setProps({ size });
      expect(wrapper.props().size).toEqual(size);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it(`renders size of "${size}" correctly`, () => {
      const wrapper = mount(<Progress shape="semi-circle" percent={10} />);
      wrapper.setProps({ size });
      expect(wrapper.props().size).toEqual(size);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  const strokeShapes = ['round', 'rect'];
  strokeShapes.forEach((strokeShape) => {
    it(`renders strokeShape of "${strokeShape}" correctly`, () => {
      const wrapper = mount(<Progress percent={10} />);
      wrapper.setProps({ strokeShape });
      expect(wrapper.props().strokeShape).toEqual(strokeShape);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('renders strokeWidth correctly', () => {
    const strokeWidth = 2;
    const wrapper = mount(<Progress percent={10} />);
    wrapper.setProps({ strokeWidth });
    expect(wrapper.props().strokeWidth).toEqual(strokeWidth);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
