import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Breadcrumb from '../index';

describe('Breadcrumb', () => {
  it('renders basic Breadcrumb correctly', () => {
    const wrapper = render(
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>模块</Breadcrumb.Item>
        <Breadcrumb.Item href="https://t.zhongan.com">应用</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Breadcrumb with customized separator correctly', () => {
    const wrapper = render(
      <Breadcrumb separator=">">
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>模块</Breadcrumb.Item>
        <Breadcrumb.Item href="https://t.zhongan.com">应用</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
