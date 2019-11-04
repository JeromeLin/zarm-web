
import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Steps from '../index';

describe('Steps', () => {
  it('renders normal steps correctly', () => {
    const wrapper = render(
      <div>
        <Steps current={2}>
          <Steps.Item title="Finished" />
          <Steps.Item title="In Progress" />
          <Steps.Item title="Waiting" />
        </Steps>
      </div>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('click steps', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <div>
        <Steps onChange={onChange}>
          <Steps.Item title="Finished" />
          <Steps.Item title="In Progress" disabled />
          <Steps.Item title="Waiting" />
        </Steps>
      </div>,
    );
    wrapper.find('.zw-steps-item').at(0).simulate('click');
    wrapper.find('.zw-steps-item').at(1).simulate('click');
    wrapper.find('.zw-steps-item').at(2).simulate('click');

    expect(onChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledWith(2);
  });

  it('steps: direction and description', () => {
    const wrapper = mount(
      <div>
        <Steps current={1} direction="vertical" status="error">
          <Steps.Item title="Finished" description="description" />
          <Steps.Item title="In Progress" />
          <Steps.Item title="Waiting" />
        </Steps>
      </div>,
    );

    expect(wrapper.find('.zw-steps').hasClass('zw-steps--vertical')).toBeTruthy();
    expect(wrapper.find('.zw-steps-item').at(1).hasClass('zw-steps-item--error')).toBeTruthy();
  });
});
