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
      </div>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
