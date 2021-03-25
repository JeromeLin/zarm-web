import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Message from '../Message';
import Loading from '../../loading';

describe('Message', () => {
  const content = 'This is a test messgae';
  const { prefixCls } = Message.defaultProps;

  it('renders basic Message correctly', () => {
    const wrapper = shallow(<Message content={content} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text().indexOf(content)).not.toBe(-1);
  });

  it('trigger event correctly', () => {
    const mouseEnter = jest.fn();
    const mouseLeave = jest.fn();
    const click = jest.fn();
    const wrapper = mount(
      <Message
        content={content}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={click}
      />,
    );
    wrapper.find('div').at(0).simulate('mouseenter').simulate('mouseleave');
    wrapper.find(`.${prefixCls}__content`).simulate('click');
    expect(mouseEnter).toHaveBeenCalledTimes(1);
    expect(mouseLeave).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('render loading correctly', () => {
    const wrapper = mount(<Message content={content} icon="loading" />);
    expect(wrapper.find(`.${Loading.defaultProps.prefixCls}`)).toHaveLength(1);
  });

  it('render unknow icon correctly', () => {
    const wrapper = mount(<Message content={content} icon="unknown-icon" />);
    expect(wrapper.find(`.${prefixCls}__icon`)).toHaveLength(0);
  });
});
