import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Avatar from '../index';

describe('Avatar', () => {
  it('renders Avatars of different size correctly', () => {
    const wrapper = render(
      <div>
        <Avatar size="xl">XL</Avatar>
        <Avatar size="lg">LG</Avatar>
        <Avatar>MD</Avatar>
        <Avatar size="sm">SM</Avatar>
        <Avatar size="xs">XS</Avatar>
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Avatars of different shape correctly', () => {
    const wrapper = shallow(
      <div>
        <Avatar />
        <Avatar shape="circle" />
        <Avatar shape="square" />
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Avatars of different type correctly', () => {
    const wrapper = render(
      <div>
        <Avatar size="sm" style={{ fontSize: '12px' }}>USER</Avatar>
        <Avatar size="sm" style={{ color: 'red', backgroundColor: 'rgb(249, 232, 8)' }}>USER</Avatar>
        <Avatar
          size="sm"
          src="site/images/avatar/avatar.png"
          alt="my avatar"
        />
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Avatars correctly when set src, icon and string', () => {
    const wrapper = render(
      <div>
        <Avatar
          size="sm"
          src="site/images/avatar/avatar.png"
          alt="my avatar"
        />
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Avatars correctly that Automatically adjust the character size', () => {
    const wrapper = mount(
      <Avatar size="lg">Zhong</Avatar>,
    );
    expect(wrapper.state().childrenScale).toBe(1);


    wrapper.setProps({ children: null });
    expect(wrapper.state().childrenScale).toBe(1);

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get() {
        if (this.className === 'zw-avatar--string') {
          return 160;
        }
        return 48;
      },
    });
    wrapper.setProps({ children: 'Component' });
    expect(wrapper.state().childrenScale).toBe(0.25);

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get() {
        if (this.className === 'zw-avatar--string') {
          return 50;
        }
        return 108;
      },
    });
    wrapper.setProps({ children: 'ZA' });
    expect(wrapper.state().childrenScale).toBe(1);
  });
});
