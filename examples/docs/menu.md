## Menu 导航菜单
为侧边栏或下拉框组件等提供导航菜单列表。

### 水平导航

:::demo
```js
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item>意健险</Menu.Item>
        <Menu.Item>健康险个险</Menu.Item>
        <Menu.Item>雇主责任险</Menu.Item>
        <Menu.Item>运营后台管理</Menu.Item>
        <Menu.Item>公共功能</Menu.Item>
        <Menu.Item>询报价</Menu.Item>
      </Menu>
    )
  }
```
:::


### 子菜单

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

### 深色主题

:::demo
```js
  render() {
    const wrapperStyle = {
      width: 238,
      border: '1px solid #e3e3e3'
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


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| visible   |  是否显示  | boolean |  -     |    false    |
| radius   |  是否圆角  | boolean |  -     |    false    |
