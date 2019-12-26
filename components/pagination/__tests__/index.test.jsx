import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Pagination from '../index';

describe('Pagination', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Pagination />);
  });

  afterEach(() => {
    wrapper && wrapper.unmount();
    wrapper = null;
  });

  it('should receive className prop', () => {
    wrapper.setProps({
      className: 'custom',
    });
    expect(wrapper.find('.zw-pagination').hasClass('custom'));
  });

  it('should receive style prop', () => {
    wrapper.setProps({
      style: {
        color: 'red',
      },
    });
    expect(wrapper.find('.zw-pagination').prop('style').color === 'red');
  });

  it('renders size correctly', () => {
    wrapper.setProps({
      size: 'sm',
    });

    expect(wrapper.find('.zw-pagination--sm').length).toEqual(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render page total number', () => {
    wrapper.setProps({
      total: 500,
    });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render by total', () => {
    wrapper.setProps({
      total: 0,
    });
    expect(wrapper.find('.zw-pagination__item').hostNodes().length === 0);

    wrapper.setProps({
      total: 10,
    });
    expect(wrapper.find('.zw-pagination__item zw-pagination__item--prev').hostNodes().length === 0);
    expect(wrapper.find('.zw-pagination__item zw-pagination__item--next').hostNodes().length === 0);

    wrapper.setProps({
      total: 100,
    });
    expect(wrapper.find('.zw-pagination__item').hostNodes().length === 9);
  });

  it('should disable the previous button when current is the first page ', () => {
    wrapper.setProps({
      current: 1,
    });
    expect(wrapper.find('.zw-pagination__item zw-pagination__item--prev zw-pagination__item--disabled'));
  });

  it('should disable the next button when current is the last page', () => {
    wrapper.setProps({
      current: 10,
      total: 100,
    });
    expect(
      wrapper.find('.zw-pagination__item zw-pagination__item--next zw-pagination__item--disabled'),
    );
  });

  it('should not trigger onChange callback when input some text that can not conver to positive integer or current page', () => {
    const onChange = jest.fn();
    wrapper.setProps({
      total: 100,
      onChange,
    });

    wrapper.find('.zw-pagination__item--prev').simulate('click');
  });

  it('should disable the previous button when current is the first page ', () => {
    wrapper.setProps({ current: 1 });
    expect(wrapper.find('.zw-pagination__item--prev'));
  });

  it('should not trigger onChange callback when click current page button', () => {
    const onChange = jest.fn();
    wrapper.setProps({
      total: 100,
      onChange,
    });

    wrapper
      .find('.zw-pagination__item')
      .hostNodes()
      .at(0)
      .simulate('click');
  });

  it('renders Pagination with jumper correctly', () => {
    wrapper.setProps({
      total: 100,
      showQuickJumper: true,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when change page with jumper', () => {
    const onChange = jest.fn();
    wrapper.setProps({
      total: 100,
      showQuickJumper: true,
      onChange,
    });

    wrapper.find('.zw-pagination__options--jumper input').simulate('keydown', {
      keyCode: 13,
      target: {
        value: 6,
      },
    });
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('renders Pagination with pageSize info correctly', () => {
    wrapper.setProps({
      total: 100,
      pageSize: 10,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with simple info correctly', () => {
    wrapper.setProps({
      total: 100,
      simple: true,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with pageSizeOptions info correctly', () => {
    wrapper.setProps({
      total: 100,
      pageSizeOptions: [10, 20, 30, 40, 50],
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with showTotal info correctly', () => {
    wrapper.setProps({
      total: 100,
      showTotal: true,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with showPageSizeChanger info correctly', () => {
    wrapper.setProps({
      total: 100,
      showPageSizeChanger: true,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Pagination with onPageSizeChange info correctly', () => {
    wrapper.setProps({
      total: 100,
      onPageSizeChange: jest.fn(),
    });

    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
