import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Avatar from '../index';

describe('Avatar', () => {
  it('renders Avatars of different size correctly', () => {
    const wrapper = render(
      <div>
        <Avatar size={80} icon="user" />
        <Avatar size="xl" icon="user" />
        <Avatar size="lg" icon="user" />
        <Avatar icon="user" />
        <Avatar size="sm" icon="user" />
        <Avatar size="xs" icon="user" />
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Avatars of different shape correctly', () => {
    const wrapper = shallow(
      <div>
        <Avatar size="circle" />
        <Avatar size="square" />
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Avatars of different type correctly', () => {
    const wrapper = render(
      <div>
        <Avatar icon="user" />
        <Avatar>U</Avatar>
        <Avatar>USER</Avatar>
        <Avatar src="http://img95.699pic.com/element/40044/5588.png_860.png" alt="my avatar" onError={() => console.log('load error')} />
        <Avatar style={{ color: '#2db7f5', backgroundColor: 'rgb(249, 232, 8)' }}>U</Avatar>
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Avatars correctly when set src, icon and string', () => {
    const wrapper = render(
      <div>
        <Avatar src="http://img95.699pic.com/element/40044/5588.png_860.png" icon="user">USER</Avatar>
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
