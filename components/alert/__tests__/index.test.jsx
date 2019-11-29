import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Alert from '../index';

describe('Alert', () => {
  it('renders basic normal Alert correctly', () => {
    const wrapper = mount(
      <Alert
        type="info"
        title="测试经典无描述，无icon，无关闭提示框"
      />,
      <Alert
        type="error"
        title="测试经典无描述，无icon，无关闭提示框"
      />,
      <Alert
        type="success"
        title="测试经典无描述，无icon，无关闭提示框"
      />,
      <Alert
        type="warning"
        title="测试经典无描述，无icon，无关闭提示框"
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic normal Alert correctly', () => {
    const wrapper = mount(
      <Alert showIcon title="显示icon-信息提示" type="info"/>,
      <Alert showIcon title="显示icon-成功" type="success" />,
      <Alert showIcon title="显示icon-警告" type="warning" />,
      <Alert showIcon title="显示icon-错误" type="error" />,
      <Alert showIcon title="显示icon-信息提示" description="显示大图标" type="info"/>,
      <Alert showIcon title="显示icon-成功" description="显示大图标" type="success" />,
      <Alert showIcon title="显示icon-警告" description="显示大图标"  type="warning" />,
      <Alert showIcon title="显示icon-错误" description="显示大图标" type="error" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic normal Alert correctly', () => {
    const wrapper = mount(
      <Alert closable title="基础用法-信息提示" description="可关闭提示框" type="info"/>,
      <Alert
        closable
        title="基础用法-警告"
        type="warning"
        description="可关闭提示框"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic normal Alert correctly', () => {
    function CustomText () {
      return (
        <span
          style={{
            fontSize: 12,
            color: '#909090',
            position: 'absolute',
            top: 8,
            right: 16,
            lineHeight: '22px',
            cursor: 'pointer'
          }}>不再提示</span>
      )
    }
    const wrapper = mount(
      <Alert
        closable
        title="自定义关闭按钮"
        type="info"
        closeText="查看详情"
      />,
      <Alert
        closable
        closeText={<CustomText />}
        title="自定义关闭按钮"
        type="warning"
        description="自定义文字"
      />,
      <Alert
        closable
        closeText={<Icon className="ui-alert-custom-close-btn" type="wrong-round-fill"/>}
        title="基础用法-错误"
        type="error"
        description="自定义关闭icon"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
