import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Step from '../index';

describe('Step', () => {
  it('renders normal Step correctly', () => {
    const wrapper = render(
      <div>
        <Step current={3}>
          <Step.Item>投保单基本信息</Step.Item>
          <Step.Item>投保单位录入</Step.Item>
          <Step.Item>产品选择</Step.Item>
          <Step.Item>总单险种定义</Step.Item>
          <Step.Item>计划创建</Step.Item>
          <Step.Item>被保人清单导入</Step.Item>
          <Step.Item>录入完成</Step.Item>
        </Step>
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders StepItem correctly', () => {
    const wrapper = mount(
      <div>
        <Step current={3}>
          <Step.Item>投保单基本信息</Step.Item>
          <Step.Item>投保单位录入</Step.Item>
          <Step.Item>产品选择</Step.Item>
          <Step.Item>总单险种定义</Step.Item>
          <Step.Item>计划创建</Step.Item>
        </Step>
      </div>
    );

    expect(wrapper.find('.ui-step-item')).toHaveLength(5);
    expect(wrapper.find('.ui-step-item').at(2).hasClass('ui-step-item-process')).toBeTruthy();
  });

  it('computes itemWidth correctly', () => {
    const wrapper = mount(
      <Step current={3}>
        <Step.Item>投保单基本信息</Step.Item>
        <Step.Item>投保单位录入</Step.Item>
        <Step.Item>产品选择</Step.Item>
        <Step.Item>总单险种定义</Step.Item>
        <Step.Item>计划创建</Step.Item>
      </Step>
    );

    expect(wrapper.state('itemWidth')).toEqual('20%');
  });
});

