## Input 输入框

最基础的表单输入组件。

### 基础用法

基本用法。

:::demo 通过`type`属性输入类型。
```js
  render() {
    return (
      <div>
        <Input type="text" placeholder="请输入" />
      </div>
    )
  }
```
:::

### textarea

通过type设置。

:::demo 将`type`属性设置为`textarea`，同时可设置`rows`，`cols`属性。
```js
  render() {
    return (
      <div>
        <Input type="textarea" placeholder="请输入" rows={10} />
      </div>
    )
  }
```
:::

### 不同尺寸

通过size设置。

:::demo 除了默认大小外，可以设置`xl`,`lg`,`sm`,`xs`四种不同尺寸。
```js
  render() {
    return (
      <div>
        <Input style={{width: 150, marginRight: 8}} size="xl" placeholder="请输入" />
        <Input style={{width: 150, marginRight: 8}} size="lg" placeholder="请输入" />
        <Input style={{width: 150, marginRight: 8}} size="sm" placeholder="请输入" />
        <Input style={{width: 150, marginRight: 8}} size="xs" placeholder="请输入" />
      </div>
    )
  }
```
:::

### 圆角输入框

通过radius设置。

:::demo 通过`radius`属性设置输入框是否圆角。
```js
  render() {
    return (
      <div>
        <Input radius type="text" placeholder="请输入" />
      </div>
    )
  }
```
:::

### 禁用状态

通过disabled设置。

:::demo 通过`disabled`属性设置输入框是否禁用。
```js
  render() {
    return (
      <div>
        <Input disabled type="text" value="禁用" />
      </div>
    )
  }
```
:::

### 监听事件

支持onChange,onFocus,onBlur等标准事件

:::demo 设置`onBlur`事件回调，在失去焦点时触发。
```js
  handleBlur(e) {
    alert('输入框的值是：' + e.target.value);
  }

  render() {
    return (
      <div>
        <Input type="text" placeholder="请输入" onBlur={(e) => { this.handleBlur(e); }} />
      </div>
    )
  }
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   text, textarea, number...           |    text     |
| size     | 尺寸   | string  |   xl, lg, sm, xs        |    -     |
| radius     | 是否圆角   | boolean  |   -     |    false   |
| value     | 值   | string  |   -        |    -     |
| defautValue     | 默认值  | string  |   -     |    -     |
| className     | 类名   | string  |   -   |    -     |
| placeholder     | 占位符   | string  |   -      |    -     |
| disabled     | 是否禁用  | boolean  |   -      |    false    |


### Events

和React支持的事件一致。