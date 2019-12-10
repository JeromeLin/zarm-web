import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from '../index';

describe('Loading', () => {
  it('renders Loading of different size correctly', () => {
    const wrapper = render(
      <>
        <Loading size="lg" visible />
        <Loading size="md" visible />
        <Loading size="sm" visible />
        <Loading size="xs" visible />
        <Loading size="lg" visible>lg尺寸</Loading>
        <Loading size="md" visible>md尺寸</Loading>
        <Loading size="sm" visible>sm尺寸</Loading>
        <Loading size="xs" visible>xs尺寸</Loading>
      </>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders hidden Loading correctly', async () => {
    const wrapper = mount(
      <Loading visible={false} />,
    );

    expect(wrapper.exists('.zw-loading')).toEqual(false);
    wrapper.setProps({ children: 'hidden loading' });
    expect(wrapper.exists('.zw-loading')).toEqual(true);
  });

  it('renders text Loading correctly', () => {
    const wrapper = mount(
      <Loading visible text="这里是text文案..." />,
    );

    expect(wrapper.find('.zw-loading__text').text()).toEqual('这里是text文案...');
  });

  it('renders Loading useing custom indicator', () => {
    const customIndicator = <div className="custom-indicator" />;
    const wrapper = mount(
      <Loading visible indicator={customIndicator} />,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders delay Loading correctly', async () => {
    const wrapper = mount(
      <Loading delay={300} visible text="这里是text文案..." />,
    );

    expect(wrapper.exists('.zw-loading')).toEqual(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
    wrapper.update();
    expect(wrapper.exists('.zw-loading')).toEqual(true);
    wrapper.unmount();
  });

  it('renders fullscreen Loading correctly', () => {
    const wrapper = mount(
      <Loading fullscreen visible>全屏显示</Loading>,
    );

    expect(wrapper.exists('.zw-loading--fullscreen')).toBe(true);
    wrapper.setProps({ text: '全屏text提示' });
    expect(wrapper.find('.zw-loading__text').text()).toEqual('全屏text提示');
  });
});
