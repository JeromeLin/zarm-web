## Tag 标签
用于标记和分类。

### 基础用法

五种主题。

:::demo Button 组件提供5种主题，由`theme`属性来定义，默认为`default`。

```js
  render() {
    return (
      <div>
        <Tag>default</Tag>
        <Tag theme="info">info</Tag>
        <Tag theme="success">success</Tag>
        <Tag theme="warning">warning</Tag>
        <Tag theme="error">error</Tag>
      </div>
    )
  }
```
:::

### 禁用状态

可以设置禁用状态。

:::demo 可以使用`disabled`属性来定义标签是否禁用。

```js
  render() {
    return (
      <div>
        <Tag disabled>default</Tag>
        <Tag disabled theme="info">info</Tag>
        <Tag disabled theme="success">success</Tag>
        <Tag disabled theme="warning">warning</Tag>
        <Tag disabled theme="error">error</Tag>
      </div>
    )
  }
```
:::

### 圆角标签

可以设置圆角或椭圆角的标签

:::demo 使用`radius`，`round`属性设置圆角、椭圆角

```js
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Tag radius>default</Tag>
          <Tag radius theme="info">info</Tag>
          <Tag radius theme="success">success</Tag>
          <Tag radius theme="warning">warning</Tag>
          <Tag radius theme="error">error</Tag>
        </div>
        <div className="multi-rows">
          <Tag round>default</Tag>
          <Tag round theme="info">info</Tag>
          <Tag round theme="success">success</Tag>
          <Tag round theme="warning">warning</Tag>
          <Tag round theme="error">error</Tag>
        </div>
      </div>
    )
  }
```
:::

### 不同尺寸

除了默认尺寸外，可以额外设置四种尺寸。

:::demo 额外的尺寸：`xl`、`lg`、`sm`，`xs`，通过设置`size`属性来配置它们。

```js
  render() {
    return (
      <div>
        <Tag size='xl' theme="info">xl尺寸</Tag>
        <Tag size='lg' theme="info">lg尺寸</Tag>
        <Tag theme="info">默认尺寸</Tag>
        <Tag size='sm' theme="info">sm尺寸</Tag>
        <Tag size='xs' theme="info">xs尺寸</Tag>
      </div>
    )
  }
```
:::

### 可关闭标签

支持标签可关闭。

:::demo 可以通过设置`onClose`添加关闭回调。

```js
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }
  handleClose() {
    this.setState({
      visible: false
    });
  }
  render() {
    const style = {
      display: this.state.visible ? 'block' : 'none'
    }
    return (
      <div style={style}>
        <Tag theme="info" onClose={() => this.handleClose()}>可关闭标签</Tag>
      </div>
    );
  }
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   xl,lg,sm,xs            |    —     |
| theme     | 主题   | string    |   info,success,warning,error,default |     default   |
| radius     | 是否圆角   | boolean    | — | false   |
| round     | 是否椭圆角   | boolean    | — | false   |
| circle     | 是否圆形   | boolean    | — | false   |
| disabled  | 是否禁用    | boolean   | true, false   | false   |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 点击关闭触发的事件 | — |