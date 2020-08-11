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

  it('check Col flex attribute', () => {
    const wrapper = render(
      <>
        <Row gutter={[0, 10]}>
          <Col flex={2}>
            <div>2 / 5</div>
          </Col>
          <Col flex={3}>
            <div>3 / 5</div>
          </Col>
        </Row>
        <Row gutter={[0, 10]}>
          <Col flex="100px">
            <div>100px</div>
          </Col>
          <Col flex="auto">
            <div>Fill Rest</div>
          </Col>
        </Row>
        <Row gutter={[0, 10]}>
          <Col flex="1 1 200px">
            <div>1 1 200px</div>
          </Col>
          <Col flex="0 1 300px">
            <div>0 1 300px</div>
          </Col>
        </Row>
      </>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
