## Switch 开关
开关选择器。

### 基础用法
普通开关, 提供可选值'sm'尺寸

:::demo

```js
  render() {
    return (
      <div>
        <Switch />
        <br/>
        <Switch size="sm" />
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
        <Switch checkedChildren={<Icon type="right" />} unCheckedChildren={<Icon type="wrong" />} />
        <br/>
        <Switch checkedChildren={<Icon type="right" />} unCheckedChildren={<Icon type="wrong" />} size="sm" />
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
        <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={true} />
        <br/>
        <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={true} size="sm" />
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
         <Switch disabled checkedChildren="是" unCheckedChildren="否"  />
         <br/>
         <Switch disabled size="sm" checkedChildren="是" unCheckedChildren="否" />
      </div>
    )
  }
```
:::

### 加载中状态

:::demo

```js
  render() {
    return (
      <div>
         <Switch checkedChildren="是" unCheckedChildren="否" style={{ width: 100 }} disabled loading checked/>
         <br/>
         <Switch checkedChildren="是" unCheckedChildren="否" size='sm' loading />
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
         <Switch checked={this.state.switchValue} onChange={(e, checked) => {
            console.log(e, checked)
            this.setState({
              switchValue: checked,
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
| checked   | 值 | boolean |   -   |    false   |
| defaultChecked  | 默认值 | boolean |   -   |    false   |
| disabled  | 是否禁用    | -   | -  | -   |
| loading   | 是否在加载中 | boolean |   -   |    false   |
| checkedChildren  | 选中的内容 | element |   -   |    ''   |
| unCheckedChildren  | 未选中的内容 | element |   -   |    ''   |
| className  | Switch器类名 | string |   -   |    -   |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 状态变化触发的事件 |  （event, checked） |