import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Mask from '../index';

describe('Mask', () => {
  it('renders different types of Mask correctly', () => {
    const wrapper = render(
      <div>
        <Mask type="transparent" visible />
        <Mask type="light" visible />
        <Mask type="dark" visible />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders hidden Mask correctly', () => {
    const wrapper = render(
      <div>
        <Mask />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when closing', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Mask visible onClose={onClose} />
    );

    wrapper.find('.ui-mask').simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
