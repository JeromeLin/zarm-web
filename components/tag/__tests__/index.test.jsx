import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tag from '../index';

describe('Tag', () => {
  it('renders normal Tag correctly', () => {
    const wrapper = render(
      <div className="multi-rows">
        <Tag>normal</Tag>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Tag shape correctly', () => {
    const wrapper = render(
      <div>
        <Tag>radius</Tag>
        <Tag shape="rect">rect</Tag>
        <Tag shape="round">round</Tag>
      </div>,
    );
    expect(wrapper.find('.zw-tag--rect').length).toEqual(1);
    expect(wrapper.find('.zw-tag--round').length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Tag color correctly', () => {
    const wrapper = render(
      <div className="multi-rows">
        <Tag color="red">normal</Tag>
      </div>,
    );
    expect(wrapper.find('.zw-tag--red').length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Tag size correctly ', () => {
    const wrapper = render(
      <div className="multi-rows">
        <Tag>default</Tag>
        <Tag size="large">large</Tag>
        <Tag size="middle">middle</Tag>
        <Tag size="small">small</Tag>
        <Tag size="xsmall">xsmall</Tag>
      </div>,
    );
    expect(wrapper.find('.zw-tag').length).toEqual(5);
    expect(wrapper.find('.zw-tag--large').length).toEqual(1);
    expect(wrapper.find('.zw-tag--middle').length).toEqual(1);
    expect(wrapper.find('.zw-tag--small').length).toEqual(1);
    expect(wrapper.find('.zw-tag--xsmall').length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when closing tag', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Tag closable onClose={onClose}>可关闭标签</Tag>);
    expect(wrapper.find('.za-icon').length).toEqual(1);
    wrapper.find('.za-icon').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('render CheckableTag correctly', () => {
    const checked = true;
    const wrapper = mount(<Tag.CheckableTag checked={checked}>default</Tag.CheckableTag>);

    expect(wrapper.find('.zw-tag--checked').length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('render CheckableTag size correctly', () => {
    const wrapper = render(
      <div className="multi-rows">
        <Tag.CheckableTag size="large">large</Tag.CheckableTag>
        <Tag.CheckableTag>middle</Tag.CheckableTag>
        <Tag.CheckableTag size="small">large</Tag.CheckableTag>
        <Tag.CheckableTag size="xsmall">large</Tag.CheckableTag>
      </div>,
    );
    expect(wrapper.find('.zw-tag').length).toEqual(4);
    expect(wrapper.find('.zw-tag--large').length).toEqual(1);
    expect(wrapper.find('.zw-tag--small').length).toEqual(1);
    expect(wrapper.find('.zw-tag--xsmall').length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('behaves correctly when click CheckableTag', () => {
    const onChange = jest.fn();
    const checked = true;
    const wrapper = mount(<Tag.CheckableTag checked={checked} onChange={onChange}>default</Tag.CheckableTag>);

    expect(wrapper.find('.zw-tag--checked').length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.zw-tag--checked').simulate('click', !checked);
    expect(onChange).toHaveBeenCalled();
  });

  it('behaves correctly when disabled CheckableTag clicked uncalled onChange', () => {
    const onChange = jest.fn();
    const disabled = true;
    const wrapper = mount(<Tag.CheckableTag disabled={disabled} onChange={onChange}>default</Tag.CheckableTag>);

    expect(wrapper.find('.zw-tag--checked').length).toEqual(0);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.zw-tag').simulate('click', !disabled);
    expect(onChange).not.toHaveBeenCalled();
  });
});
