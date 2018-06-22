## Switch 开关
开关选择器。

### 基础用法
普通开关

:::demo

```js
  render() {
    return (
      <div>
        <Switch />
      </div>
    )
  }
```
:::

### 带图标
图标开关

:::demo

```js
  render() {
    return (
      <div>
        <Switch isCheckedText={<Icon type="right" />} unCheckedText={<Icon type="wrong" />} />
      </div>
    )
  }
```
:::

### 带默认值
设定默认值为true

:::demo

```js
  render() {
    return (
      <div>
        <Switch isCheckedText="是" unCheckedText="否" defaultValue={true} />
      </div>
    )
  }
```
:::

### 禁用状态

:::demo

```js
  render() {
    return (
      <div>
         <Switch disabled />
      </div>
    )
  }
```
:::

### 事件回调

:::demo

```js
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
    };
  }
  render() {
    return (
      <div>
         <Switch value={this.state.switchValue} onChange={(value) => {
            console.log(value)
            this.setState({
              switchValue: value,
            });
          }} />
      </div>
    )
  }
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string |   'sm'   |    -    |
| value   | 值 | boolean |   -   |    false   |
| disabled   | 是否禁用 | boolean |   -   |    false   |
| defaultValue  | 默认值 | boolean |   -   |    false   |
| isCheckedText  | 选中文案 | element |   -   |    ''   |
| unCheckedText  | 未选中文案 | element |   -   |    ''   |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 状态变化触发的事件 |  value |