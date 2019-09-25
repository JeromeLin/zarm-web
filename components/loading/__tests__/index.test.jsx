import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from '../index';

describe('Loading', () => {
  it('renders hidden Loading correctly', () => {
    const wrapper = render(
      <Loading>
        这里是内容
      </Loading>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Loading of different size correctly', () => {
    const wrapper = render(
      <Loading size='lg' visible>
        这里是内容
      </Loading>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
