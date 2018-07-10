import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Layout from '../index';

const { Header, Content, Footer, Sider } = Layout;

describe('Layout', () => {
  it('renders basic layout correctly', () => {
    const wrapper = render(
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic layout with sider correctly', () => {
    const wrapper = render(
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders sider layout correctly', () => {
    const wrapper = render(
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
        </Layout>
      </Layout>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders collapsible sider layout correctly', () => {
    const wrapper = render(
      <Layout>
        <Sider collapsible>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
        </Layout>
      </Layout>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behave correctly when toggle collapsed status', () => {
    const onCollapse = jest.fn();
    const wrapper = mount(
      <Layout>
        <Sider collapsible onCollapse={onCollapse}>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
        </Layout>
      </Layout>
    );
    wrapper.find('.ui-layout-sider-trigger').simulate('click');
    expect(onCollapse).toHaveBeenCalledWith(true);
  });
});
