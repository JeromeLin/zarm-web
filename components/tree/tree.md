# Tree
树形组件

## 基本用法1
展示可勾选，可选中节点或多选节点，禁用单个节点或其checkbox，默认展开等功能。

```jsx
import { Tree } from 'zarm-web';

class Demo1 extends React.Component {
  state = {
    treeData: [
      {
        keys: '0',
        title: '根结点1',
        children:
          [
            {
              keys: '0-0',
              title: '父结点 0-0',
              disabled: true,
              children:
                [
                  {
                    keys: '0-0-0',
                    title: '父结点 0-0-0',
                    checkDisabled: true,
                    children:
                      [
                        { keys: '0-0-0-0', title: '子结点 0-0-0-0' },
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
                  { keys: '0-1-0', title: '子结点 0-1-0' },
                  { keys: '0-1-1', title: '子结点 0-1-1' },
                  { keys: '0-1-2', title: '子结点 0-1-2' },
                ],
            },
          ],
      },
    ],
  };


  onSelect = (selectedKeys, selectedInfo) => {
    console.log('onSelect', selectedKeys, selectedInfo);
  };

  onCheck = (checkedMap, checkedInfo) => {
    console.log('onCheck', checkedMap, checkedInfo);
  };

  render() {
    const { treeData, checkedKeys } = this.state;
    return (
      <div className="tree-wrapper">
        <Tree 
          treeData={treeData}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          checkable
          multiple
          defaultExpandAll
        />
      </div>
    );
  }
}
ReactDOM.render(<Demo1 />, mountNode);
```

## 受控示例
通过selectedKeys，checkedKeys， expandedKeys属性受控操作示例

```jsx
import { Tree } from 'zarm-web';

class Demo2 extends React.Component {
  state = {
    checkedKeys: ['0-1-0', '0-1-1'],
    selectedKeys: ['0-1-0'],
    expandedKeys: ['0-1'],
    autoExpandParent: true,
    treeData: [
      {
        keys: '0',
        title: '根结点1',
        children:
          [
            {
              keys: '0-0',
              title: '父结点 0-0',
              disabled: true,
              children:
                [
                  {
                    keys: '0-0-0',
                    title: '父结点 0-0-0',
                    checkDisabled: true,
                    children:
                      [
                        { keys: '0-0-0-0', title: '子结点 0-0-0-0' },
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
                  { keys: '0-1-0', title: '子结点 0-1-0' },
                  { keys: '0-1-1', title: '子结点 0-1-1' },
                  { keys: '0-1-2', title: '子结点 0-1-2' },
                ],
            },
          ],
      },
    ],
  };

  onCheck = (checkedMap, checkedInfo) => {
    this.setState({
      checkedKeys: checkedMap.checkedKeys,
    });
    console.log('onCheck', checkedMap, checkedInfo);
  };

  onSelect = (selectedKeys, selectedInfo) => {
    this.setState({
      selectedKeys,
    });
    console.log('onSelect', selectedKeys, selectedInfo);
  };

  onExpand = (expandedKeys, expandedObj) => {
    this.setState({
      autoExpandParent: false,
      expandedKeys,
    });
    console.log('onExpand', expandedKeys, expandedObj);
  };

  render() {
    const { treeData, checkedKeys, selectedKeys, expandedKeys, autoExpandParent } = this.state;
    return (
      <div className="tree-wrapper">
        <Tree
          treeData={treeData}
          autoExpandParent={autoExpandParent}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          checkedKeys={checkedKeys}
          onSelect={this.onSelect}
          onExpand={this.onExpand}
          onCheck={this.onCheck}
          multiple
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo2 />, mountNode);

```

## 连接线形式的树
子节点之间带连接线的树，常用于文件目录结构展示。并且showLine为true的模式下，可以用switcherIcon修改默认图标（即父节点的展开图标）。

```jsx

import { Tree, Switch, Icon } from 'zarm-web';

const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1733827_4scbzsuv5v2.js');

class Demo3 extends React.Component {
  state = {
    showLine: false,
    treeData: [
      {
        keys: '0',
        title: '根结点1',
        children:
          [
            {
              keys: '0-0',
              title: '父结点 0-0',
              disabled: true,
              children:
                [
                  {
                    keys: '0-0-0',
                    title: '父结点 0-0-0',
                    checkDisabled: true,
                    children:
                      [
                        { keys: '0-0-0-0', title: '子结点 0-0-0-0' },
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
                  { keys: '0-1-0', title: '子结点 0-1-0' },
                  { keys: '0-1-1', title: '子结点 0-1-1' },
                  { keys: '0-1-2', title: '子结点 0-1-2' },
                ],
            },
          ],
      },
    ],
  };

  setShowLine = (showLine) => {
    this.setState({
      showLine,
    });
  };
  
  render() {
    const { treeData, showLine } = this.state;
    return (
      <div className="tree-wrapper">
        <div style={{ padding: 16 }}>
          showLine && change switcherIcon: <Switch checked={showLine} onChange={this.setShowLine} />
        </div>
        <Tree
          showLine={showLine}
          expandedKeys={['0-1']}
          treeData={treeData}
          switcherIcon={<MyIcon type="iconsmile" size="sm" />}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo3 />, mountNode);

```

## 可搜索
可搜索的树。

```jsx

import { Tree, Input, Icon } from 'zarm-web';

const TData = [
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
class SearchTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoExpandParent: true,
      expandedKeys: ['0-0-0'],
      checkedKeys: ['0-0-0'],
      treeData: TData,
    };
    this.filterSearchExpandedKeysMap = {};
  }

  filterTreeDataWithHighlight = (TreeArray, searchValue, parentNode) => {
    // 过滤出来非叶子结点以及匹配到关键字的结点
    return (TreeArray || []).map((item) => {
      const { children, title, keys, ...others } = item;
      const isLeafNode = (children || []).length === 0;
      const searchedIndex = title.indexOf(searchValue);
      let titleNew = title;
      if (searchedIndex > -1) {
        const beforeStr = title.substr(0, searchedIndex);
        const afterStr = title.substr(searchedIndex + searchValue.length);
        titleNew = (
          <span>
            {beforeStr}
            <span style={{ color: 'red' }}>{searchValue}</span>
            {afterStr}
          </span>
        );
        if (parentNode) {
          this.filterSearchExpandedKeysMap[parentNode.keys] = true;
        }
      }
      if (!isLeafNode) {
        return { title: titleNew, keys, children: this.filterTreeDataWithHighlight(children, searchValue, item), ...others };
      }
      return { title: titleNew, keys, ...others };
    });
  };

  onChangeSearchText = (e) => {
    const { value: searchValue } = e.target;
    this.filterSearchExpandedKeysMap = {};
    const treeDataWithHighlight = this.filterTreeDataWithHighlight(TData, searchValue);
    this.setState({
      treeData: treeDataWithHighlight,
      expandedKeys: Object.keys(this.filterSearchExpandedKeysMap),
      autoExpandParent: true,
    });
  };

  render() {
    const { expandedKeys, checkedKeys, treeData, autoExpandParent } = this.state;
    return (
      <div>
        <Input bordered placeholder="请输入搜索内容" prefix={<Icon type="search" />} onChange={this.onChangeSearchText} />
        <Tree treeData={treeData} expandedKeys={expandedKeys} checkedKeys={checkedKeys} canCheck showLine autoExpandParent={autoExpandParent} onExpand={this.onExpand} />
      </div>
    );
  }
}

ReactDOM.render(<SearchTree />, mountNode);

```


## 自定义图标
可以通过icon设置树的节点图标，也可以针对单个不同的节点定制图标。

```jsx

import { Tree, Icon } from 'zarm-web';

const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1733827_4scbzsuv5v2.js');

class Demo5 extends React.Component {
  state = {
    treeData: [
      {
        keys: '0',
        title: '根结点1',
        children:
          [
            {
              keys: '0-0',
              title: '父结点 0-0',
              disabled: true,
              children:
                [
                  {
                    keys: '0-0-0',
                    title: '父结点 0-0-0',
                    checkDisabled: true,
                    children:
                      [
                        { keys: '0-0-0-0', title: '子结点 0-0-0-0', icon: <MyIcon type="iconshortcut-fill" theme="danger" size="sm" /> },
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
                  { keys: '0-1-0', title: '子结点 0-1-0' },
                  { keys: '0-1-1', title: '子结点 0-1-1' },
                  { keys: '0-1-2', title: '子结点 0-1-2' },
                ],
            },
          ],
      },
    ],
  };

  render() {
    const { treeData } = this.state;
    return (
      <div className="tree-wrapper">
        <Tree 
          showIcon
          icon={<MyIcon type="iconsmile" size="sm" theme="primary" />}
          treeData={treeData}
          defaultExpandAll
          checkable
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo5 />, mountNode);

```

## Tree Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| treeData    | 树节点结构数组  | array |   -  |   []  |
| checkable    | 节点前添加Checkbox 复选框 | boolean |   true, false  |   false  |
| checkedKeys    | 选中复选框的树节点数组 | array |  -  |   []  |
| expandedKeys    | 展开指定的树节点 | array |  -  |   []  |
| selectedKeys    | 设置选中的树节点 | array |  -  |   []  |
| defaultExpandAll    | 默认展开所有树节点 | boolean |   true, false  |   false  |
| autoExpandParent    | 是否自动展开父节点 | boolean |   true, false  |   true  |
| showLine    | 	是否展示连接线 | boolean |   true, false  |   false  |
| showIcon    | 	是否节点title前的图标，如设置为true，需要icon属性自行定义图标相关样式 | boolean |   true, false  |   false  |
| icon    | 自定义节点title前面的图标 | ReactNode |  -  |   -  |
| switcherIcon    | 	自定义树节点的展开/折叠图标 | ReactNode |  -  |   -  |
| disabled    | 	是否禁掉树 | boolean |   true, false  |   false  |
| multiple    | 	支持选择多个节点 | boolean |   true, false  |   false  |
| selectable    | 	是否可选中 | boolean |   true, false  |   true  |

## TreeNode Attributes
建议使用 treeData 来代替 TreeNode，免去手工构造麻烦

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title    |  标题  | string/ReactNode |   -  |   -  |
| keys    | 被树的 expandedKeys /checkedKeys属性所用。注意：整个树范围内的所有节点的keys值不能重复！（根节点keys为"0"） | string |   -  |   -  |
| checkDisabled    | 禁掉checkbox | boolean |   true,false  |   false  |
| selectDisabled    | 禁掉节点选中 | boolean |   true,false  |   false  |
| disabled    | 禁掉响应 | boolean |   true,false  |   false  |
| checkable    | 当树为checkable时，当前节点前是否添加Checkbox | boolean |   true, false  |   -  |
| isLeaf    | 设置为叶子节点 | boolean |   true,false  |   false  |
| icon    | 自定义节点title前面的图标 | ReactNode |  -  |   -  |

## Tree Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onCheck | 点击复选框触发 |  (checkedMap，checkedObj）|
| onExpand | 展开/收起节点时触发 |  (expandedKeys，expandedObj）  |
| onSelect | 点击节点触发 |  (selectedKeys，selectedObj）  |