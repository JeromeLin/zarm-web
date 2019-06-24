import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Icon from '../index';
import StarOn from '../component/StarOn';

describe('Icon', () => {
  it('renders Icons of different theme correctly', () => {
    const wrapper = render(
      <div>
        <Icon type="star-on">default</Icon>
        <Icon theme="primary" type="star-on">info</Icon>
        <Icon theme="success" type="star-on">success</Icon>
        <Icon theme="warning" type="star-on">warning</Icon>
        <Icon theme="danger" type="star-on">danger</Icon>
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Icons of different size correctly', () => {
    const wrapper = render(
      <div>
        <Icon size="xl" theme="primary" type="star-on">xl尺寸</Icon>
        <Icon size="lg" theme="primary" type="star-on">lg尺寸</Icon>
        <Icon theme="primary" type="star-on">默认尺寸</Icon>
        <Icon size="sm" theme="primary" type="star-on">sm尺寸</Icon>
        <Icon size="xs" theme="primary" type="star-on">xs尺寸</Icon>
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('triggers onClick callback correctly on nomarl Icon', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Icon type='star-on' onClick={onClick}>star-on</Icon>,
    );
    wrapper.find('icon').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
