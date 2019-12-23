import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Pagination from '../index';

describe('Pagination', () => {
  it('renders normal Pagination correctly', () => {
    const wrapper = render(<Pagination total={100} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with total info correctly', () => {
    const wrapper = render(<Pagination total={100} showTotal />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with jumper correctly', () => {
    const wrapper = render(<Pagination total={100} showQuickJumper />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with customized props correctly', () => {
    const wrapper = render(<Pagination total={100} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when changing page', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Pagination total={100} onChange={onChange} />);

    wrapper
      .find('.zw-pagination__item')
      .at(2)
      .simulate('click');

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('behaves correctly when click prev button', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Pagination total={100} value={6} onChange={onChange} />
      </div>,
    );

    wrapper.find('.zw-pagination__prev').simulate('click');

    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('behaves correctly when click next button', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Pagination total={100} value={5} onChange={onChange} />,
    );

    wrapper.find('.zw-pagination__next').simulate('click');

    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('behaves correctly when click prev 5 button', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Pagination total={100} value={6} onChange={onChange} />,
    );

    wrapper.find('.zw-pagination__prev').simulate('click');

    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('behaves correctly when click next 5 button', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Pagination total={100} value={1} onChange={onChange} />,
    );

    wrapper.find('.zw-pagination__next').simulate('click');

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('behaves correctly when change page with jumper', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Pagination total={100} showQuickJumper onChange={onChange} />,
    );

    wrapper.find('.zw-pagination__options--jumper input').simulate('keydown', {
      keyCode: 13,
      target: {
        value: 6,
      },
    });
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('behaves correctly when receiving new value', () => {
    const wrapper = mount(<Pagination total={100} value={2} />);

    wrapper.setProps({ value: 1 });
    expect(
      wrapper
        .find('.zw-pagination__item')
        .at(1)
        .hasClass('zw-pagination__item--active'),
    ).toBeTruthy();
  });

  it('renders size correctly', () => {
    const wrapper = render(
      <div>
        <Pagination total={100} size="sm" />
      </div>,
    );
    expect(wrapper.find('.zw-pagination--sm').length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
