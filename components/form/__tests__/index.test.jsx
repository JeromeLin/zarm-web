import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Form from '../index';
import Input from '../../input';
import Button from '../../button';

describe('Form', () => {
  it('renders normal Form correctly', () => {
    const wrapper = render(
      <Form>
        <Form.Item label="账号">
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item label="密码">
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item>
          <Button theme="success">登录</Button>
        </Form.Item>
      </Form>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders inline Form with label correctly', () => {
    const wrapper = render(
      <Form type="inline">
        <Form.Item
          className="col-sm-4"
          label="类型"
        >
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item
          className="col-sm-4"
          label="来源"
        >
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item
          className="col-sm-4"
          label=""
        >
          <Button theme="success">查询</Button>
        </Form.Item>
      </Form>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders inline Form with required fields and help correctly', () => {
    const wrapper = render(
      <Form type="inline">
        <Form.Item
          className="col-sm-4"
          label="类型"
          help="什么是类型"
        >
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item
          className="col-sm-4"
          label="来源"
          required
        >
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item
          className="col-sm-4"
          label=""
        >
          <Button theme="success">查询</Button>
        </Form.Item>
      </Form>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
