import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tooltip from '../index';
import Button from '../../button';

describe('Tooltip', () => {
  it('renders normal Tooltip correctly', () => {
    const wrapper = render(
      <Tooltip title="这是一个left定位的Tooltip" direction="left">
        <Button>left</Button>
      </Tooltip>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

