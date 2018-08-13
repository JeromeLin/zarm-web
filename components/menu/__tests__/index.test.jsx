import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Menu from '../index';
import { SubMenu } from '../SubMenu';

describe('Menu', () => {
  it('renders horizontal Menu correctly', () => {
    const wrapper = render(
      <Menu mode="horizontal" defaultSelectedKeys={['a']}>
        <Menu.Item key="a">意健险</Menu.Item>
        <Menu.Item key="b">健康险个险</Menu.Item>
        <Menu.Item key="c">雇主责任险</Menu.Item>
        <Menu.Item key="d">运营后台管理</Menu.Item>
        <Menu.Item key="e">公共功能</Menu.Item>
        <Menu.Item key="f">询报价</Menu.Item>
      </Menu>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders inline Menu with SubMenu correctly', () => {
    const wrapper = render(
      <Menu>
        <Menu.SubMenu title="新契约">
          <Menu.Item>投保单复核</Menu.Item>
          <Menu.Item>在线投保单管理</Menu.Item>
          <Menu.Item>投保单录入</Menu.Item>
          <Menu.Item>新增计划</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="核保">
          <Menu.Item>核保权限定义</Menu.Item>
          <Menu.Item>核保权限分配</Menu.Item>
          <Menu.Item>规则配置</Menu.Item>
          <Menu.Item>人工核保</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="批改">
          <Menu.Item>批改新增</Menu.Item>
          <Menu.Item>批改复核</Menu.Item>
          <Menu.Item>批改回退</Menu.Item>
          <Menu.Item>批改共享池</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders nested SubMenus correctly', () => {
    const wrapper = render(
      <Menu>
        <Menu.SubMenu title="理赔">
          <Menu.Item>报案</Menu.Item>
          <Menu.Item>任务分配</Menu.Item>
          <Menu.SubMenu title="理赔工作流">
            <Menu.Item>休假维护</Menu.Item>
            <Menu.Item>时效维护</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.SubMenu title="新契约">
          <Menu.Item>投保单复核</Menu.Item>
          <Menu.Item>在线投保单管理</Menu.Item>
          <Menu.Item>投保单录入</Menu.Item>
          <Menu.Item>新增计划</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="核保">
          <Menu.Item>核保权限定义</Menu.Item>
          <Menu.Item>核保权限分配</Menu.Item>
          <Menu.Item>规则配置</Menu.Item>
          <Menu.Item>人工核保</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders dark Menu correctly', () => {
    const wrapper = render(
      <Menu theme="dark">
        <Menu.SubMenu title="新契约">
          <Menu.Item>投保单复核</Menu.Item>
          <Menu.Item>在线投保单管理</Menu.Item>
          <Menu.Item>投保单录入</Menu.Item>
          <Menu.Item>新增计划</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="核保">
          <Menu.Item>核保权限定义</Menu.Item>
          <Menu.Item>核保权限分配</Menu.Item>
          <Menu.Item>规则配置</Menu.Item>
          <Menu.Item>人工核保</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="批改">
          <Menu.Item>批改新增</Menu.Item>
          <Menu.Item>批改复核</Menu.Item>
          <Menu.Item>批改回退</Menu.Item>
          <Menu.Item>批改共享池</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Menu with Divider correctly', () => {
    const wrapper = render(
      <Menu theme="dark">
        <Menu.Item>投保单复核</Menu.Item>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Divider />
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders collpased Menu correctly', () => {
    const wrapper = render(
      <Menu inlineCollapsed>
        <Menu.Item>投保单复核</Menu.Item>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Divider />
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when toggling collapsed status', () => {
    const wrapper = shallow(
      <Menu>
        <Menu.Item>投保单复核</Menu.Item>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu>
    );

    wrapper.setProps({ inlineCollapsed: true });

    expect(wrapper.find('.ui-menu').hasClass('ui-menu-collapsed')).toBeTruthy();
  });

  it('behaves correctly when toggling subMenu', () => {
    const subMenuKey = 'key';
    const wrapper = shallow(
      <SubMenu openKeys={[]} subMenuKey={subMenuKey}>
        <Menu.Item>投保单复核</Menu.Item>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </SubMenu>
    );

    wrapper.setProps({ openKeys: [subMenuKey] });

    expect(wrapper.find('li').hasClass('open')).toBeTruthy();
  });
});
