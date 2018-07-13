## Dropdown 下拉框
下拉框组件。

### 基础用法

:::demo 通过`visible`属性控制显隐。
```js
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
    }
  }
  render() {
    return (
      <div style={{position: 'relative'}}>
        <Button onClick={() => {
          this.setState({
            dropdown: !this.state.dropdown,
          });
        }}>
          toggle
        </Button>
        <Dropdown
          visible={this.state.dropdown}
          style={{position: 'absolute', left: 0, top: 36, minWidth: 200}}>
          <Menu>
            <Menu.SubMenu title="一级" key="12">
              <Menu.Item itemKey="姓名" key="1"><Checkbox value="name">姓名</Checkbox></Menu.Item>
              <Menu.Item itemKey="年龄" key="2"><Checkbox value="age">年龄</Checkbox></Menu.Item>

              <Menu.SubMenu title="二级" key="34">
                <Menu.Item itemKey="姓名" key="3"><Checkbox value="name">姓名</Checkbox></Menu.Item>
                <Menu.Item itemKey="年龄" key="4"><Checkbox value="age">年龄</Checkbox></Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu title="二级" key="56">
                <Menu.Item itemKey="姓名" key="5"><Checkbox value="name">姓名</Checkbox></Menu.Item>
                <Menu.Item itemKey="年龄" key="6"><Checkbox value="age">年龄</Checkbox></Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.Item>333</Menu.Item>
          </Menu>
        </Dropdown>
      </div>
    )
  }
```
:::


### 测试Menu

:::demo
```js
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item itemKey="姓名" key="1">意健险</Menu.Item>
        <Menu.Item itemKey="年龄" key="2">健康险个险</Menu.Item>
        <Menu.Item itemKey="姓名" key="3">雇主责任险</Menu.Item>
        <Menu.Item itemKey="年龄" key="4">运营后台管理</Menu.Item>
        <Menu.Item itemKey="姓名" key="5">公共功能</Menu.Item>
        <Menu.Item itemKey="年龄" key="6">询报价</Menu.Item>
      </Menu>
    )
  }
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| visible   |  是否显示  | boolean |  -     |    false    |
| radius   |  是否圆角  | boolean |  -     |    false    |
