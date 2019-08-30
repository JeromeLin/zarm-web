import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tag from '../index';

describe('Tag', () => {
  it('renders normal Tag correctly', () => {
    const wrapper = render(
      <div className="multi-rows">
        <Tag>default</Tag>
        <Tag theme="primary">primary</Tag>
        <Tag theme="success">success</Tag>
        <Tag theme="warning">warning</Tag>
        <Tag theme="danger">danger</Tag>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders radius Tag correctly', () => {
    const wrapper = render(
      <div>
        <Tag>radius</Tag>
        <Tag shape="rect">rect</Tag>
        <Tag shape="round">round</Tag>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Tag size correctly ', () => {
    const wrapper = render(
      <div className="multi-rows">
        <Tag>default</Tag>
        <Tag size="large" theme="info">large</Tag>
        <Tag theme="warning">middle</Tag>
        <Tag size="small" theme="success">small</Tag>
        <Tag size="xsmall" theme="danger">xsmall</Tag>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when closing tag', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Tag closable onClose={onClose}>可关闭标签</Tag>);

    wrapper.find('.za-icon').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
