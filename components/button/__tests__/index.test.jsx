import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../index';
import Icon from '../../icon'

describe('Button', () => {
  it('renders Buttons of different theme correctly', () => {
    const wrapper = render(
      <div>
        <Button>default</Button>
        <Button theme="info">info</Button>
        <Button theme="success">success</Button>
        <Button theme="warning">warning</Button>
        <Button theme="error">error</Button>
      </div>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders disaled Button correctly', () => {
    const wrapper = render(
      <div>
        <Button disabled>default</Button>
      </div>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Buttons with radius or round props correctly', () => {
    const wrapper = render(
      <div>
        <div>
          <Button radius>default</Button>
          <Button radius theme="info">info</Button>
          <Button radius theme="success">success</Button>
          <Button radius theme="warning">warning</Button>
          <Button radius theme="error">error</Button>
        </div>
        <div>
          <Button round>default</Button>
          <Button round theme="info">info</Button>
          <Button round theme="success">success</Button>
          <Button round theme="warning">warning</Button>
          <Button round theme="error">error</Button>
        </div>
      </div>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Buttons of different size correctly', () => {
    const wrapper = render(
      <div>
        <Button size="xl" theme="info">xl尺寸</Button>
        <Button size="lg" theme="info">lg尺寸</Button>
        <Button theme="info">默认尺寸</Button>
        <Button size="sm" theme="info">sm尺寸</Button>
        <Button size="xs" theme="info">xs尺寸</Button>
      </div>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders loading Button correctly', () => {
    const wrapper = render(
      <div>
        <Button theme="info" loading>加载中</Button>
      </div>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders anchor Button correctly', () => {
    const wrapper = render(
      <Button radius href="https://www.baidu.com" theme="info" target="_blank">百度一下</Button>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders anchor Button with tag a correctly', () => {
    const wrapper = shallow(
      <Button href="https://www.baidu.com">百度一下</Button>
    );
    expect(wrapper.exists('a')).toEqual(true)
  });

  it('triggers onClick callback correctly on nomarl Button', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Button onClick={onClick}>加载中</Button>
    );
    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should not trigger onClick callback on disabled Button', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Button disabled onClick={onClick}>加载中</Button>
    );
    wrapper.find('button').simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });
});
