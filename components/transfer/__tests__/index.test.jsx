import React from 'react';
import { render, mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Transfer from '../index';

describe('Transfer', () => {
  const initialValue = [
    {
      id: '1',
      name: '张三',
      dept: '直营部',
      age: 46,
      iphone: '15617283931',
      android: '15617283930',
      tel: '23412341231',
      address: {
        home: '上海市杨浦区四平路324号',
        comp: '1xxx公司',
      },
      state: true,
    },
    {
      id: '2',
      name: '李四',
      dept: '健康险事业部',
      age: 32,
      iphone: '15617283931',
      android: '15617283930',
      tel: '23412341231',
      address: {
        home: 'aaaa',
        comp: '2xxx公司',
      },
      state: true,
    },
    {
      id: '3',
      name: '王五',
      dept: '金融信保部',
      age: 20,
      iphone: '15617283931',
      android: '15617283930',
      tel: '23412341231',
      address: {
        home: '上海市浦东区张杨路1400号',
        comp: '3xxx公司',
      },
      state: false,
    },
    {
      id: '4',
      name: '奥巴马',
      dept: '健康险事业部',
      age: 45,
      iphone: '15617283931',
      android: '15617283930',
      tel: '23412341231',
      address: {
        home: '美国洛杉矶',
        comp: '2xxx公司',
      },
      state: false,
    },
  ];
  const selectedValue = [];

  it('renders Transfer correctly', () => {
    const wrapper = render(
      <div>
        <Transfer
          initialPanelTitle="初始值"
          selectedPanelTitle="已选值"
          radius
          initialValue={initialValue}
          selectedValue={selectedValue}
          keyOfItem="id"
          displayNameOfItem="name"
          width={500}
          onAdd={(value) => { this.setState({ selectedValue: value }); }}
        />
      </div>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behaves correctly when click li ', () => {
    const component = (
      <Transfer
        initialPanelTitle="初始值"
        selectedPanelTitle="已选值"
        radius
        initialValue={initialValue}
        selectedValue={selectedValue}
        keyOfItem="id"
        displayNameOfItem="name"
        width={500}
        onAdd={value => selectedValue.push(value)}
      />);
    const wrapper = mount(component);
    wrapper.find('.ui-option-list').at(0).simulate('click');
    expect((wrapper.state().selectedLeft)[0]).toBe('1');
  });

  it('behaves correctly when click add btn ', () => {
    const component = (
      <Transfer
        initialPanelTitle="初始值"
        selectedPanelTitle="已选值"
        radius
        initialValue={initialValue}
        selectedValue={selectedValue}
        keyOfItem="id"
        displayNameOfItem="name"
        width={500}
        onAdd={value => selectedValue.push(value)}
      />);
    const wrapper = mount(component);
    wrapper.setState({ selectedLeft: ['1'] });
    wrapper.find('.ui-button').at(0).simulate('click');
    expect((wrapper.state().selectedValue)[0].id).toBe('1');
  });

  it('behaves correctly when click minus btn ', () => {
    const component = (
      <Transfer
        initialPanelTitle="初始值"
        selectedPanelTitle="已选值"
        radius
        initialValue={initialValue}
        selectedValue={selectedValue}
        keyOfItem="id"
        displayNameOfItem="name"
        width={500}
        onAdd={value => selectedValue.push(value)}
      />);
    const wrapper = mount(component);
    wrapper.setState({ selectedValue: [{
      id: '1',
      name: '张三',
      dept: '直营部',
      age: 46,
      iphone: '15617283931',
      android: '15617283930',
      tel: '23412341231',
      address: {
        home: '上海市杨浦区四平路324号',
        comp: '1xxx公司',
      },
      state: true,
    }] });
    wrapper.setState({ selectedRight: ['1'] });
    wrapper.find('.ui-button').at(1).simulate('click');
    expect((wrapper.state().selectedValue).length).toBe(0);
  });

  it('behaves correctly when double click li in initial panel ', () => {
    const component = (
      <Transfer
        initialPanelTitle="初始值"
        selectedPanelTitle="已选值"
        radius
        initialValue={initialValue}
        selectedValue={selectedValue}
        keyOfItem="id"
        displayNameOfItem="name"
        width={500}
        onAdd={value => selectedValue.push(value)}
      />);
    const wrapper = mount(component);
    wrapper.setState({ selectedValue: [] });
    wrapper.find('.ui-option-list').at(0).simulate('doubleclick');
    expect((wrapper.state().selectedValue).length).toBe(1);
  });

  it('behaves correctly when double click li in selected panel ', () => {
    const component = (
      <Transfer
        initialPanelTitle="初始值"
        selectedPanelTitle="已选值"
        radius
        initialValue={initialValue}
        selectedValue={selectedValue}
        keyOfItem="id"
        displayNameOfItem="name"
        width={500}
        onAdd={value => selectedValue.push(value)}
      />);
    const wrapper = mount(component);
    wrapper.setState({
      selectedValue:
      [
        {
          id: '1',
          name: '张三',
          dept: '直营部',
          age: 46,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市杨浦区四平路324号',
            comp: '1xxx公司',
          },
          state: true,
        },
      ],
    });
    wrapper.find('.ui-menu').at(1).find('.ui-option-list').at(0)
      .simulate('doubleclick');
    expect((wrapper.state().selectedValue).length).toBe(0);
  });
});
