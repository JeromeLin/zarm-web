## Tree
树形组件

### 基础用法1
可默认展开全部，设置treeData props方式展示节点

:::demo

```js

  constructor(props) {
    super(props);
    this.state = {
      treeData: [
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
                              { keys: '0-1-0', title: '子结点 0-1-0'},
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
                ]
    };
  }
  render() {
    const { treeData } = this.state;
    return (
      <div>
        <Tree treeData={treeData} defaultExpandAll />
      </div>
    )
  }
```
:::

### 基础用法2
可选中，可设置默认展开节点, 可禁用子节点的选中状态

:::demo

```js

  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ['0-0-0'],
      checkedKeys: ['0-0-0'],
      treeData: [
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
                ]
    };
  }
  render() {
    const { expandedKeys, checkedKeys, treeData } = this.state;
    console.log("checkedKeys",checkedKeys)
    return (
      <div>
        <Tree treeData={treeData} expandedKeys={expandedKeys} checkedKeys={checkedKeys} canCheck />
      </div>
    )
  }
```
:::

### 基础用法3
通过手写TreeNode结构来渲染树（会过滤非TreeNode节点）

:::demo
```js
 constructor(props) {
    super(props);
    this.state = {
        expandedKeys: ['0-1'],
        checkedKeys: ['0-0-0', '0-1'],
    }
 }

 render() {
    const { expandedKeys, checkedKeys } = this.state;
    const { TreeNode } = Tree;
    return (
      <Tree expandedKeys={expandedKeys} canCheck defaultExpandAll checkedKeys={checkedKeys}>
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
    )
 }
```
:::

### Tree Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| treeData    | 树节点结构数组  | array |   -  |   []  |
| canCheck    | 节点前添加Checkbox 复选框 | boolean |   true, false  |   false  |
| checkedKeys    | 选中复选框的树节点数组 | array |  -  |   []  |
| expandedKeys    | 展开指定的树节点 | array |  -  |   []  |
| defaultExpandAll    | 默认展开所有树节点 | boolean |   true, false  |   false  |

### TreeNode Attributes
建议使用 treeData 来代替 TreeNode，免去手工构造麻烦

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title    |  标题  | string/ReactNode |   -  |   -  |
| keys    | 被树的 expandedKeys /checkedKeys属性所用。注意：整个树范围内的所有节点的keys值不能重复！（根节点keys为"0"） | string |   -  |   -  |
| checkDisabled    | 禁掉 checkbox | boolean |   true,false  |   false  |
| isLeaf    | 设置为叶子节点 | boolean |   true,false  |   false  |

### Tree Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onCheck | 点击复选框触发 |  (checkedMap，checkedObj）|
| onExpand | 展开/收起节点时触发 |  expandedObj  |