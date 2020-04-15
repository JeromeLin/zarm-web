import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Menu from '../index';
import { SubMenu } from '../SubMenu';

describe('Menu', () => {
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
      </Menu>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders vertical Menu with SubMenu correctly', () => {
    const wrapper = render(
      <Menu mode="vertical">
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
      </Menu>,
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
      </Menu>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Menu with dark theme correctly', () => {
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
      </Menu>,
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
      </Menu>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Menu with ItemGroup correctly', () => {
    const wrapper = render(
      <Menu mode="vertical">
        <Menu.ItemGroup title="投保">
          <Menu.Item>投保单复核</Menu.Item>
          <Menu.Item>在线投保单管理</Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders SubMenu with ItemGroup correctly', () => {
    const wrapper = render(
      <Menu>
        <Menu.SubMenu title="新契约">
          <Menu.ItemGroup title="投保">
            <Menu.Item>投保单复核</Menu.Item>
            <Menu.Item>在线投保单管理</Menu.Item>
          </Menu.ItemGroup>
          <Menu.Item>投保单录入</Menu.Item>
          <Menu.Item>新增计划</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu>,
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
      </Menu>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when toggle collapsed status', () => {
    const wrapper = mount(
      <Menu openKeys={[]} selectedKeys={[]}>
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
      </Menu>,
    );

    wrapper.setProps({ inlineCollapsed: true });

    expect(wrapper.find('.zw-menu').first().hasClass('zw-menu--collapsed')).toBeTruthy();

    wrapper.setProps({ inlineCollapsed: false });
    expect(wrapper.find('.zw-menu').first().hasClass('zw-menu--collapsed')).toBeFalsy();
  });

  it('behaves correctly when MenuItem selected', () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <Menu onSelect={onSelect}>
        <Menu.Item>投保单复核</Menu.Item>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu>,
    );

    wrapper.find('li').first().simulate('click');
    expect(onSelect).toHaveBeenCalled();
  });

  it('behaves correctly when toggle SubMenu status', () => {
    const onOpenChange = jest.fn();
    const wrapper = mount(
      <Menu onOpenChange={onOpenChange}>
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
      </Menu>,
    );

    wrapper.find('.zw-menu-submenu__title').first().simulate('click');
    expect(onOpenChange).toHaveBeenCalled();
  });

  it('behaves correctly when open SubMenu', () => {
    const subMenuKey = 'key';
    const wrapper = shallow(
      <SubMenu openKeys={[]} subMenuKey={subMenuKey}>
        <Menu.Item>投保单复核</Menu.Item>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </SubMenu>,
    );

    wrapper.setProps({ openKeys: [subMenuKey] });

    expect(wrapper.find('li').hasClass('zw-menu-submenu--open')).toBeTruthy();
  });

  it('behaves correctly when hide SubMenu', () => {
    const subMenuKey = 'key';
    const wrapper = shallow(
      <SubMenu openKeys={[subMenuKey]} subMenuKey={subMenuKey}>
        <Menu.Item>投保单复核</Menu.Item>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </SubMenu>,
    );

    wrapper.setProps({ openKeys: [] });

    expect(wrapper.find('li').hasClass('zw-menu-submenu--open')).toBeFalsy();
  });
});
