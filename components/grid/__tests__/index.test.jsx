import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Row, Col } from '../index';

describe('Gird', () => {
  it('renders Row,Col correctly', () => {
    const wrapper = render(
      <Row>
        <Col>col</Col>
      </Row>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Row when typeof gutter is number', () => {
    const wrapper = render(
      <Row gutter={8}>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Row when typeof gutter is array', () => {
    const wrapper = render(
      <Row gutter={[8, 10]}>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
