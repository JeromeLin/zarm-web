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
        <Dropdown
          placement="bottomLeft"
          trigger="click"
          visible={this.state.dropdown}
          style={{position: 'absolute', left: 0, top: 36, minWidth: 200}}
          onVisibleChange={flag => {
            this.setState({
              dropdown: flag
            });
          }}
          overlay={
              <Menu>
                <Menu.Item><Checkbox value="name">姓名</Checkbox></Menu.Item>
                <Menu.Item><Checkbox value="age">年龄</Checkbox></Menu.Item>
                <Menu.Item onClick={()=>{
                  this.setState({
                    dropdown: false
                  });
                }}>333</Menu.Item>
              </Menu>
          }
          >
            <Button theme="info">
              toggle
            </Button>
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
