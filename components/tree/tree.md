# Tree
树形组件

## 基本用法
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
    showSwitcherIcon: false,
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

  setSwitcherIcon = (showSwitcherIcon) => {
    this.setState({
      showSwitcherIcon,
    });
  };

  render() {
    const { treeData, showLine, showSwitcherIcon } = this.state;
    const otherProps = showSwitcherIcon ? { switcherIcon: <MyIcon type="iconsmile" size="sm" style={{ color: 'orange' }} />} : {};
    return (
      <div className="tree-wrapper">
        <div style={{ padding: 16 }}>
          showLine:  <Switch checked={showLine} onChange={this.setShowLine} />
        </div>
        <div style={{ padding: 16 }}>
          change switcherIcon to icon smile: 
          <Switch checked={showSwitcherIcon} onChange={this.setSwitcherIcon} />
        </div>
        
        <Tree
          showLine={showLine}
          treeData={treeData}
          {...otherProps}
          defaultExpandAll
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo3 />, mountNode);

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



## API

<h3>Tree</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| treeData      | array / <{keys, title, children, [disabled, selectDisabled, checkDisabled, checkable, isLeaf, icon]}> |   []  | treeNodes数据，如设置则不需要手动构造TreeNode节点（keys 在整个树内唯一）|
| checkable    |  true, false  |   false  | 节点前添加Checkbox 复选框 |
| checkedKeys    | array |  []  | 选中复选框的树节点数组 |
| expandedKeys    | array | []  | 展开指定的树节点 |
| selectedKeys    | array |  []  | 设置选中的树节点 |
| defaultExpandAll    | boolean |   false  | 默认展开所有树节点 |
| autoExpandParent    | boolean |   true  | 是否自动展开父节点 |
| showLine    | boolean |   false  |   是否展示连接线 |
| showIcon    | boolean |   false  |   是否节点title前的图标，如设置为true，需要icon属性自行定义图标相关样式 |
| icon    | ReactNode |  -  | 自定义节点title前面的图标 |
| switcherIcon    | ReactNode |  -  |   自定义树节点的展开/折叠图标 |
| disabled    | boolean |   false  |   是否禁掉树 |
| multiple    | boolean |   false  |   支持选择多个节点 |
| selectable    | boolean  |   true  |   是否可选中 |
| onCheck    | (checkedMap，checkedObj）=> void  |   -  |   点击复选框触发 |
| onExpand    | (expandedKeys，expandedObj）=> void  |   -  |   展开/收起节点时触发 |
| onSelect    | (selectedKeys，selectedObj）=> void  |   -  |   点击节点触发 |

<h3>TreeNode </h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title    | string/ReactNode |   -  |  标题  |
| keys    | string |   -  | 被树的 expandedKeys /checkedKeys属性所用。注意：整个树范围内的所有节点的keys值不能重复！（根节点keys为"0"） |
| checkDisabled    | boolean |   false  | 禁掉checkbox |
| selectDisabled    | boolean |   false  | 禁掉节点选中 |
| disabled    | boolean |   false  | 禁掉响应 |
| checkable    | boolean |   -  | 当树为checkable时，当前节点前是否添加Checkbox |
| isLeaf    | boolean |   false  | 设置为叶子节点 |
| icon    | ReactNode |   -  | 自定义节点title前面的图标 |