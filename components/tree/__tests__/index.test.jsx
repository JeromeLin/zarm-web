import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tree from '../index';

const treeData = [
  {
    keys: '0',
    title: '根结点1',
    children:
      [
        {
          keys: '0-0',
          title: '父结点 0-0',
          children:
            [
              {
                keys: '0-0-0',
                title: '父结点 0-0-0',
                children:
                  [
                    { keys: '0-0-0-0', title: '子结点 0-0-0-0', checkDisabled: true },
                    { keys: '0-0-0-1', title: '子结点 0-0-0-1' },
                  ],
              },
            ],
        },
        {
          keys: '0-1',
          title: '父结点 0-1',
          children:
            [
              { keys: '0-1-0', title: '子结点 0-1-0', checkDisabled: true },
              { keys: '0-1-1', title: '子结点 0-1-1' },
              { keys: '0-1-2', title: '子结点 0-1-2' },
            ],
        },
        {
          keys: '0-2',
          title: '父结点 0-2',
          children:
            [
              { keys: '0-2-0', title: '父结点 0-2-0' },
              {
                keys: '0-2-1',
                title: '父结点 0-2-1',
                children:
                  [
                    {
                      keys: '0-2-1-0',
                      title: '子结点 0-2-1-0',
                      children:
                        [
                          { keys: '0-2-1-0-0', title: '子结点 0-2-1-0-0' },
                          { keys: '0-2-1-0-1', title: '子结点 0-2-1-0-1' },
                        ],
                    },
                    { keys: '0-2-1-1', title: '子结点 0-2-1-1' },
                  ],
              },
              { keys: '0-2-2', title: '子结点 0-2-2' },
            ],
        },
      ],
  },
];
const checkedKeys = ['0-0-0-0', '0-2-1-1', '0-1-0'];
const checkedKeys2 = ['0-0-0', '0-1'];
const expandedKeys = ['0-0-0'];
const expandedKeys2 = ['0-1'];

const { TreeNode } = Tree;
describe('Tree', () => {
  it('renders basic Tree correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} defaultExpandAll />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll canCheck correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} canCheck defaultExpandAll />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} defaultExpandAll />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll, canCheck correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} defaultExpandAll canCheck />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll, canCheck, checkedKeys  correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} defaultExpandAll canCheck checkedKeys={checkedKeys} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with expandedKeys correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with expandedKeys, canCheck correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} canCheck />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with expandedKeys, defaultExpandAll, canCheck correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} canCheck defaultExpandAll />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with expandedKeys, defaultExpandAll, canCheck, checkedKeys correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} canCheck defaultExpandAll checkedKeys={checkedKeys} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with TreeNode children', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} canCheck defaultExpandAll checkedKeys={checkedKeys} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with TreeNodes children', () => {
    const wrapper = render(
      <Tree expandedKeys={expandedKeys2} canCheck defaultExpandAll checkedKeys={checkedKeys2}>
        <TreeNode title="parent 1" keys="0">
          <TreeNode title="parent 1-0" keys="0-0" checkDisabled>
            <TreeNode title="leaf" keys="0-0-0" checkDisabled />
            <TreeNode title="leaf" keys="0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" keys="0-1">
            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} keys="0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with not completely TreeNodes children', () => {
    const wrapper = render(
      <Tree expandedKeys={expandedKeys2} canCheck defaultExpandAll checkedKeys={checkedKeys2}>
        <TreeNode title="parent 1" keys="0">
          <div><p>invalid element here invalid element here</p></div>
          <TreeNode title="parent 1-0" keys="0-0" checkDisabled>
            <TreeNode title="leaf" keys="0-0-0" checkDisabled />
            <div>invalid element here invalid element here</div>
            <TreeNode title="leaf" keys="0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" keys="0-1">
            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} keys="0-1-0" />
            <span style={{ color: '#1890ff' }}>invalid element here invalid element here</span>
          </TreeNode>
        </TreeNode>
        <div>invalid element here invalid element here
          <p>invalid element here invalid element here
            <span>
              invalid element here invalid element here
            </span>
          </p>
        </div>
        <i>invalid element here invalid element here</i>
        <span>invalid element here invalid element here</span>
      </Tree>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behave correctly when change treeNode checked status', () => {
    const onCheck = jest.fn();
    const wrapper = mount(
      <Tree treeData={treeData} expandedKeys={expandedKeys} canCheck defaultExpandAll checkedKeys={checkedKeys} onCheck={onCheck} />
    );
    expect(wrapper.state('checkedKeys')).toEqual(expect.arrayContaining(['0-2-1-1', '0-0-0-0', '0-1-0']));
    expect(wrapper.state('halfCheckedKeys')).toEqual(expect.arrayContaining(['0', '0-2-1', '0-2']));

    wrapper.find('li[data-keys="0-0-0-1"] .ui-checkbox-input').at(0).simulate('change');
    expect(onCheck).toBeCalled();

    expect(wrapper.state('checkedKeys')).toEqual(expect.arrayContaining(['0-2-1-1', '0-0-0-0', '0-1-0', '0-0-0-1', '0-0-0', '0-0']));
    expect(wrapper.state('halfCheckedKeys')).toEqual(expect.arrayContaining(['0', '0-2-1', '0-2']));

    wrapper.find('li[data-keys="0-1"] .ui-checkbox-input').at(0).simulate('change');
    expect(onCheck).toBeCalled();
    expect(wrapper.state('checkedKeys')).toEqual(expect.arrayContaining(['0-0-0-0', '0-2-1-1', '0-1-0', '0-1', '0-1-1', '0-1-2']));
    expect(wrapper.state('halfCheckedKeys')).toEqual(expect.arrayContaining(['0', '0-2-1', '0-2']));
  });

  it('behave correctly when expand treeNode', () => {
    const onExpand = jest.fn();
    const wrapper = mount(
      <Tree treeData={treeData} expandedKeys={expandedKeys} canCheck checkedKeys={checkedKeys} onExpand={onExpand} />
    );
    expect(wrapper.state('expandedKeys')).toEqual(expect.arrayContaining(['0', '0-0-0', '0-0']));

    wrapper.find('li[data-keys="0-0-0"] .ui-tree-switcher').at(0).simulate('click');
    expect(onExpand).toBeCalled();

    wrapper.find('li[data-keys="0-1"] .ui-tree-switcher').at(0).simulate('click');
    expect(onExpand).toBeCalled();
  });
});
