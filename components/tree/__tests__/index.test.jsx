import React from 'react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tree from '../index';
import Icon from '../../icon/index';

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
              { keys: '0-1-1', title: '子结点 0-1-1', selectDisabled: true },
              { keys: '0-1-2', title: '子结点 0-1-2', disabled: true },
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
                          { keys: '0-2-1-0-0', title: '子结点 0-2-1-0-0', checkable: false, isLeaf: true },
                          { keys: '0-2-1-0-1', title: '子结点 0-2-1-0-1', icon: <Icon type="broadcast" size="sm" theme="danger" /> },
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
const selectedKeys = ['0-0-0'];

const { TreeNode } = Tree;
describe('Tree', () => {
  it('renders basic Tree correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} defaultExpandAll />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll checkable correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} checkable defaultExpandAll />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} defaultExpandAll />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll, checkable correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} defaultExpandAll checkable />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with defaultExpandAll, checkable, checkedKeys  correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} defaultExpandAll checkable checkedKeys={checkedKeys} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with expandedKeys, autoExpandParent correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} autoExpandParent />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with expandedKeys, checkable correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} checkable />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with expandedKeys, defaultExpandAll, checkable correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} checkable defaultExpandAll />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with expandedKeys, defaultExpandAll, checkable, checkedKeys correctly', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} checkable defaultExpandAll checkedKeys={checkedKeys} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with multiple, selectable', () => {
    const wrapper = render(
      <Tree treeData={treeData} multiple selectable />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with disabled', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} disabled defaultExpandAll />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with showLine, showIcon, icon', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} showLine showIcon icon={<Icon type="broadcast" size="sm" theme="primary" />} defaultExpandAll />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with showLine, switcherIcon', () => {
    const wrapper = render(
      <Tree treeData={treeData} expandedKeys={expandedKeys} showLine switcherIcon={<Icon type="broadcast" size="sm" theme="primary" />} defaultExpandAll />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with TreeNodes children', () => {
    const wrapper = render(
      <Tree expandedKeys={expandedKeys2} checkable defaultExpandAll checkedKeys={checkedKeys2}>
        <TreeNode title="parent 1" keys="0">
          <TreeNode title="parent 1-0" keys="0-0" checkDisabled>
            <TreeNode title="leaf" keys="0-0-0" checkDisabled />
            <TreeNode title="leaf" keys="0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" keys="0-1">
            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} keys="0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders basic Tree with not completely TreeNodes children', () => {
    const wrapper = render(
      <Tree expandedKeys={expandedKeys2} checkable defaultExpandAll checkedKeys={checkedKeys2}>
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
      </Tree>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('behave correctly when change treeNode checked status', () => {
    const onCheck = jest.fn();
    const wrapper = mount(
      <Tree treeData={treeData} expandedKeys={expandedKeys} checkable defaultExpandAll checkedKeys={checkedKeys} onCheck={onCheck} />,
    );
    wrapper.find('li[data-keys="0-0-0-1"] .zw-checkbox__input').at(0).simulate('click');
    expect(onCheck).toBeCalled();

    expect(wrapper.state('checkedKeys')).toEqual(expect.arrayContaining(['0-0-0-0', '0-2-1-1', '0-1-0', '0-0-0-1', '0-0-0', '0-0']));
    expect(wrapper.state('halfCheckedKeys')).toEqual(expect.arrayContaining(['0', '0-2-1', '0-2']));
  });

  it('behave correctly when expand treeNode', () => {
    const onExpand = jest.fn();
    const wrapper = mount(
      <Tree treeData={treeData} expandedKeys={expandedKeys} checkable checkedKeys={checkedKeys} onExpand={onExpand} />,
    );
    expect(wrapper.state('expandedKeys')).toEqual(expect.arrayContaining(['0', '0-0-0', '0-0']));

    wrapper.find('li[data-keys="0-0-0"] .zw-tree-switcher').at(0).simulate('click');
    expect(onExpand).toBeCalled();

    wrapper.find('li[data-keys="0-1"] .zw-tree-switcher').at(0).simulate('click');
    expect(onExpand).toBeCalled();
  });

  it('behave correctly when select treeNode', () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <Tree treeData={treeData} expandedKeys={expandedKeys} selectable selectedKeys={selectedKeys} onSelect={onSelect} />,
    );
    expect(wrapper.state('selectedKeys')).toEqual(expect.arrayContaining(['0-0-0']));

    wrapper.find('li[data-keys="0-0-0"] .zw-tree-node-content-wrapper').at(0).simulate('click');
    expect(onSelect).toBeCalled();
    expect(wrapper.state('selectedKeys')).toEqual(expect.arrayContaining([]));
  });
});
