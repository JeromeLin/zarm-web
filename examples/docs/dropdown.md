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
            <Menu.Item><Checkbox value="name">姓名</Checkbox></Menu.Item>
            <Menu.Item><Checkbox value="age">年龄</Checkbox></Menu.Item>
            <Menu.Item>333</Menu.Item>
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
