import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popover from '../index';
import Button from '../../button';

describe('Popover', () => {
  it('renders normal Popover correctly', () => {
    const wrapper = mount(
      <Popover content="确认删除吗" direction="top">
        <Button>Delete</Button>
      </Popover>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
