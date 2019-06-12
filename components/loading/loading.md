## Loading 加载
加载中组件。

### 基础用法

:::demo 通过`visible`属性控制显隐。
```js
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  toggleLoading() {
    this.setState({
      loading: !this.state.loading
    });
  }
  render() {
    return (
      <div>
        <Loading visible={this.state.loading}>
          这里是内容
        </Loading>
        <br />
        <Button theme="info" onClick={() => this.toggleLoading()}>
          显示/隐藏
        </Button>
      </div>
    )
  }
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| visible   |  是否显示  | boolean |  -     |    false    |
