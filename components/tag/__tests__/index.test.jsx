import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tag from '../index';

describe('Tag', () => {
  it('renders normal Tag correctly', () => {
    const wrapper = render(
      <div>
        <Tag>default</Tag>
        <Tag theme="info">info</Tag>
        <Tag theme="success">success</Tag>
        <Tag theme="warning">warning</Tag>
        <Tag theme="error">error</Tag>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders disabled Tag correctly', () => {
    const wrapper = render(
      <div>
        <Tag disabled>default</Tag>
        <Tag disabled theme="info">info</Tag>
        <Tag disabled theme="success">success</Tag>
        <Tag disabled theme="warning">warning</Tag>
        <Tag disabled theme="error">error</Tag>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Tag correctly with more props', () => {
    const wrapper = render(
      <div>
        <Tag radius>default</Tag>
        <Tag radius size="xl" theme="info">info</Tag>
        <Tag radius size="lg"theme="success">success</Tag>
        <Tag radius size="sm" theme="warning">warning</Tag>
        <Tag radius size="xs" theme="error">error</Tag>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when closing tag', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Tag theme="info" onClose={onClose}>可关闭标签</Tag>
    );

    wrapper.find('.ui-icon').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});

