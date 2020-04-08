import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Notification } from '../Notification';

describe('Notification', () => {
  const content = 'This is a test messgae';
  const { prefixCls } = Notification.defaultProps;

  it('renders basic Notification correctly', () => {
    const title = 'Test Title';
    const wrapper = shallow(
      <Notification title={title} content={content} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text().indexOf(title)).not.toBe(-1);
    expect(wrapper.text().indexOf(content)).not.toBe(-1);
  });

  it('trigger event correctly', () => {
    const mouseEnter = jest.fn();
    const mouseLeave = jest.fn();
    const click = jest.fn();
    const wrapper = mount(
      <Notification
        content={content}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={click}
      />,
    );
    wrapper
      .find('div')
      .at(0)
      .simulate('mouseenter')
      .simulate('mouseleave');
    wrapper.find(`.${prefixCls}__content`).simulate('click');
    expect(mouseEnter).toHaveBeenCalledTimes(1);
    expect(mouseLeave).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('render custom icon correctly', () => {
    const wrapper = mount(
      <Notification content={content} icon={<i>?</i>} />,
    );
    expect(
      wrapper
        .find(`.${prefixCls}__icon`)
        .find('i')
        .text(),
    ).toBe('?');
  });

  it('render unknow icon correctly', () => {
    const wrapper = mount(
      <Notification content={content} icon="unknown-icon" />,
    );
    expect(wrapper.find(`.${prefixCls}__icon`)).toHaveLength(0);
  });

  it('render custom footer correctly', () => {
    const text = 'this is a custom footer';
    const wrapper = mount(
      <Notification content={content} footer={<div>{text}</div>} />,
    );
    expect(wrapper.find(`.${prefixCls}__foot`).text()).toBe(text);
  });
});
