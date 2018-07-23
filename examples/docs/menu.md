## Menu 导航菜单
为侧边栏或下拉框等组件提供导航菜单列表。

### 水平导航

设置mode属性为horizontal

:::demo 可以给每一个Menu.Item设置key，并通过defaultSelectedKeys设置默认值
```js
  render() {
    return (
      <Menu mode="horizontal" defaultSelectedKeys={['a']}>
        <Menu.Item key="a">意健险</Menu.Item>
        <Menu.Item key="b">健康险个险</Menu.Item>
        <Menu.Item key="c">雇主责任险</Menu.Item>
        <Menu.Item key="d">运营后台管理</Menu.Item>
        <Menu.Item key="e">公共功能</Menu.Item>
        <Menu.Item key="f">询报价</Menu.Item>
      </Menu>
    )
  }
```
:::

### 侧边导航

默认的inline菜单模式

:::demo
```js
  render() {
    const wrapperStyle = {
      width: 238,
      border: '1px solid #e3e3e3'
    }
    return (
      <div style={wrapperStyle}>
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
      </div>
    )
  }
```
:::

### 多层嵌套

SubMenu内可以继续嵌套SubMenu

:::demo 理赔子菜单下有理赔工作流子菜单
```js
  render() {
    const wrapperStyle = {
      width: 238,
      border: '1px solid #e3e3e3'
    }
    return (
      <div style={wrapperStyle}>
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
          <Menu.SubMenu title="批改">
            <Menu.Item>批改新增</Menu.Item>
            <Menu.Item>批改复核</Menu.Item>
            <Menu.Item>批改回退</Menu.Item>
            <Menu.Item>批改共享池</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    )
  }
```
:::

### 深色主题

通过theme属性设置菜单颜色主题

:::demo
```js
  render() {
    const wrapperStyle = {
      width: 238,
      border: '1px solid #e3e3e3',
      backgroundColor: '#001529'
    }
    return (
      <div style={wrapperStyle}>
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
      </div>
    )
  }
```
:::

### 只展开一个子菜单

可以通过openKeys属性控制展开项

:::demo 可通过defaultOpenKeys设置默认展开项，通过onOpenChange回调设置openKeys
```js
  constructor(props) {
    super(props);
    this.state = {
      openKeys: ['a']
    }
  }
  onOpenChange(openKeys) {
    const lastKey = openKeys.pop();
    this.setState({
      openKeys: [lastKey]
    });
  }
  render() {
    const wrapperStyle = {
      width: 238,
      border: '1px solid #e3e3e3',
      backgroundColor: '#001529'
    }
    const { openKeys } = this.state;
    return (
      <div style={wrapperStyle}>
        <Menu
          theme="dark"
          openKeys={openKeys}
          defaultOpenKeys={['a']}
          onOpenChange={(keys) => this.onOpenChange(keys)}
        >
          <Menu.SubMenu title="新契约" key="a">
            <Menu.Item>投保单复核</Menu.Item>
            <Menu.Item>在线投保单管理</Menu.Item>
            <Menu.Item>投保单录入</Menu.Item>
            <Menu.Item>新增计划</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="核保" key="b">
            <Menu.Item>核保权限定义</Menu.Item>
            <Menu.Item>核保权限分配</Menu.Item>
            <Menu.Item>规则配置</Menu.Item>
            <Menu.Item>人工核保</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="批改" key="c">
            <Menu.Item>批改新增</Menu.Item>
            <Menu.Item>批改复核</Menu.Item>
            <Menu.Item>批改回退</Menu.Item>
            <Menu.Item>批改共享池</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    )
  }
```
:::


### Menu Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| mode   |  菜单模式  | string |  horizontal / inline     |    inline   |
| theme   |  颜色主题 | string |  light / dark    |    dark   |
| defaultOpenKeys   |  默认打开的子菜单keys | string[] |  -    |    []   |
| defaultSelectedKeys   |  默认选中的菜单项keys | string[] |  -    |    []   |
| openKeys   |  打开的子菜单keys | string[] |  -    |    -   |
| selectedKeys   |  选中的菜单项keys | string[] |  -    |    -   |
| inlineIndent   | inline模式菜单每一级子菜单的缩进距离 | number |  -    |    24   |


### Menu Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onOpenChange | 子菜单展开收缩时候触发的事件 | openKeys |


### Menu.SubMenu Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title   |  子菜单标题  | string |  -     |    -   |
| key   |  子菜单的key值 | string |  -   |    -  |


### Menu.Item Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled   |  是否禁用  | boolean |  -   |   false   |
| key   |  菜单项的key值 | string |  -   |    -  |


### Menu.Item Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClick | 点击菜单项的时候触发的事件 | itemKey |
| onDoubleClick | 双击菜单项的时候触发的事件 | - |
