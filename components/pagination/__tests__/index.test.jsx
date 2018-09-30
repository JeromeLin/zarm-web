import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Pagination from '../index';

describe('Pagination', () => {
  it('renders normal Pagination correctly', () => {
    const wrapper = render(
      <div>
        <Pagination total={100} />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with total info correctly', () => {
    const wrapper = render(
      <div>
        <Pagination total={100} showTotal />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with jumper correctly', () => {
    const wrapper = render(
      <div>
        <Pagination total={100} showJumper />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with customized props correctly', () => {
    const wrapper = render(
      <div>
        <Pagination
          total={100}
          radius
          bordered
          addonBefore="addonBefore"
          addonAfter="addonAfter"
        />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when changing page', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Pagination total={100} onPageChange={onChange} />
      </div>
    );

    wrapper.find('.ui-pagination-item').at(2).simulate('click');

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('behaves correctly when click prev button', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Pagination total={100} value={6} onPageChange={onChange} />
      </div>
    );

    wrapper.find('.ui-pagination-item-prev').simulate('click');

    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('behaves correctly when click next button', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Pagination total={100} value={5} onPageChange={onChange} />
      </div>
    );

    wrapper.find('.ui-pagination-item-next').simulate('click');

    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('behaves correctly when click prev 5 button', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Pagination total={100} value={6} onPageChange={onChange} />
      </div>
    );

    wrapper.find('.ui-pagination-item-jump-prev').simulate('click');

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('behaves correctly when click next 5 button', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Pagination total={100} value={1} onPageChange={onChange} />
      </div>
    );

    wrapper.find('.ui-pagination-item-jump-next').simulate('click');

    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('behaves correctly when change page with jumper', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Pagination showJumper total={100} value={1} onPageChange={onChange} />
      </div>
    );

    wrapper.find('.ui-pagination-jumper input').simulate('keydown', {
      keyCode: 13,
      target: {
        value: 6,
      },
    });
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('behaves correctly when receiving new value', () => {
    const wrapper = mount(
      <Pagination showJumper total={100} value={2} />
    );

    wrapper.setProps({ value: 1 });
    expect(wrapper.find('.ui-pagination-item').at(1).hasClass('ui-pagination-item-active')).toBeTruthy();
  });
});
