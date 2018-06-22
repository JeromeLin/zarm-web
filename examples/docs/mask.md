## Mask 蒙层
蒙层组件。

### 基础用法

:::demo

```js
  constructor(props) {
    super(props);
    this.state = {
      maskVisible: false,
    };
  }
  render() {
    const { maskVisible } = this.state;
    return (
      <div>
        <Button theme="info" onClick={() => {
          this.setState({
            maskVisible: true
          });
        }}>显示蒙层</Button>
        <Mask
          visible={maskVisible}
          onClose={() => {
            this.setState({
              maskVisible: false
            });
          }}
        />
      </div>
    )
  }
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| visible    | 是否可见  | boolean |   -  |   false  |
| type    | 蒙层样式 | string |   normal,light,dark, transparent  |   normal  |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 点击蒙层触发的事件 |  value |