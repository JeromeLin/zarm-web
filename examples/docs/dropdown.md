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
            <Menu.Item key="1">意健险</Menu.Item>
            <Menu.Item key="2">健康险个险</Menu.Item>
            <Menu.Item key="3">雇主责任险</Menu.Item>
            <Menu.Item key="4">运营后台管理</Menu.Item>
            <Menu.Item key="5">公共功能</Menu.Item>
            <Menu.Item key="6">询报价</Menu.Item>
          </Menu>
        </Dropdown>
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
