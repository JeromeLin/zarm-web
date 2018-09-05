import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popover from '../index';
import Button from '../../button';

describe('Popover', () => {
  it('renders normal Popover correctly', () => {
    const wrapper = render(
      <div>
        <Popover content="确认删除吗" direction="top">
          <Button>Delete</Button>
        </Popover>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Popover correctly with customized props', () => {
    const wrapper = render(
      <div>
        <Popover content="确认删除吗" direction="top" radius className="customized">
          <Button>Delete</Button>
        </Popover>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Popover correctly with render props', () => {
    const wrapper = render(
      <div>
        <Popover content={() => '确认删除吗?'} direction="top">
          <Button>Delete</Button>
        </Popover>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Popover correctly with mask', () => {
    const wrapper = render(
      <div>
        <Popover mask content={() => '确认删除吗?'} direction="top">
          <Button>Delete</Button>
        </Popover>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when clicking on mask', () => {
    const onMaskClick = jest.fn();
    const wrapper = render(
      <div>
        <Popover
          mask
          onMaskClick={onMaskClick}
          content={() => '确认删除吗?'}
          direction="top"
        >
          <Button>Delete</Button>
        </Popover>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when toggling visible status', () => {
    const wrapper = mount(
      <Popover
        mask
        content={() => '确认删除吗?'}
        direction="top"
      >
        <Button>Delete</Button>
      </Popover>
    );

    expect(wrapper.find('.ui-popover-content').hasClass('ui-popover-content-show')).toBeFalsy();
    wrapper.setProps({ visible: true });
    expect(wrapper.find('.ui-popover-content').hasClass('ui-popover-content-show')).toBeTruthy();
  });
});

