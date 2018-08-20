import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Progress from '../index';

describe('Progress', () => {
  it('renders normal Progress correctly', () => {
    const wrapper = render(
      <div>
        <Progress percent="30" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders different themes of Progress correctly', () => {
    const wrapper = render(
      <div>
        <Progress percent="30" />
        <Progress percent="30" theme="info" />
        <Progress percent="30" theme="success" />
        <Progress percent="30" theme="warning" />
        <Progress percent="30" theme="error" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Progress with radius & round props correctly', () => {
    const wrapper = render(
      <div>
        <Progress percent="30" size="lg" theme="info" />
        <Progress percent="30" radius size="lg" theme="info" />
        <Progress percent="30" round size="lg" theme="info" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders different sizes of Progress correctly', () => {
    const wrapper = render(
      <div>
        <Progress percent="30" size="xl" theme="info" />
        <Progress percent="30" size="lg" theme="info" />
        <Progress percent="30" theme="info" />
        <Progress percent="30" size="sm" theme="info" />
        <Progress percent="30" size="xs" theme="info" />
      </div>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

