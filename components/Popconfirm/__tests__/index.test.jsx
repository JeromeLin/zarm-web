import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popconfirm from '../index';
import Button from '../../button';

describe('PopConfirm', () => {
  it('renders PopConfirm correctly', () => {
    const wrapper = render(
      <div>
        <Popconfirm content="确认删除吗" direction="top">
          <Button>Delete</Button>
        </Popconfirm>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when clicking onOk', () => {
    const onOk = jest.fn();
    const wrapper = mount(
      <div>
        <Popconfirm content="确认删除吗" direction="top" onOk={onOk}>
          Delete
        </Popconfirm>
      </div>
    );

    wrapper.find('.ui-button').at(1).simulate('click');

    expect(onOk).toHaveBeenCalled();
  });

  it('behaves correctly when clicking onCancel', () => {
    const onCancel = jest.fn();
    const wrapper = mount(
      <div>
        <Popconfirm content="确认删除吗" direction="top" onCancel={onCancel}>
          Delete
        </Popconfirm>
      </div>
    );

    wrapper.find('.ui-button').at(0).simulate('click');

    expect(onCancel).toHaveBeenCalled();
  });

  it('behaves correctly when toggling from hidden to visible', () => {
    const wrapper = mount(
      <Popconfirm content="确认删除吗" direction="top">
        Delete
      </Popconfirm>
    );

    expect(wrapper.find('.ui-popover-content').hasClass('ui-popover-content-show')).toBeFalsy();
    wrapper.setProps({ visible: true });
    expect(wrapper.find('.ui-popover-content').hasClass('ui-popover-content-show')).toBeTruthy();
  });
});
