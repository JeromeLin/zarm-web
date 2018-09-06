## Checkbox 多选框
多选框。

### 基础用法

单独使用，表示在两种状态之间切换。

:::demo

```js
  onChange(e) {
    console.log(e.target.checked);
  }
  render() {
    return (
      <div>
        <Checkbox
          onChange={(e) => this.onChange(e)}
        >
          选择
        </Checkbox>
      </div>
    )
  }
```
:::

### 组合使用

一组可选项中进行多项选择。

:::demo 使用`Checkbox.Group`组件。

```js
  constructor(props) {
    super(props);
    this.state = {
      checkboxValue: []
    }
  }
  render() {
    return (
      <div>
        <div style={{marginBottom: 8}}>选择了：{this.state.checkboxValue.join(',')}</div>
        <Checkbox.Group
          value={this.state.checkboxValue}
          onChange={(values) => {
            this.setState({
              checkboxValue: values
            });
          }}
        >
          <Checkbox value="a">A</Checkbox>
          <Checkbox value="b">B</Checkbox>
          <Checkbox value="c">C</Checkbox>
          <Checkbox value="d">D</Checkbox>
        </Checkbox.Group>
      </div>
    )
  }
```
:::

### 禁用状态

不可勾选状态。

:::demo 可以使用`disabled`属性来定义是否可用。

```js
  render() {
    return (
      <div>
        <Checkbox
          disabled
          onChange={(e) => this.onChange(e)}
        >
          选择
        </Checkbox>
      </div>
    )
  }
```
:::

### 部分选中状态

未全部选中，即部分选中状态。

:::demo 可以使用`indeterminate`属性来定义样式是否为部分选中。

```js
  onChange(e) {
    console.log(e.target.checked);
  }
  render() {
    return (
      <div>
        <Checkbox
          indeterminate
          onChange={(e) => this.onChange(e)}
        >
          选择
        </Checkbox>
      </div>
    )
  }
```
:::


### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| checked     | 是否选中  | boolean  |   -           |    false    |
| defaultChecked    | 默认选中  | boolean   |   - |     false   |
| disabled  | 是否禁用    | boolean   | true, false   | false   |
| value  | 选择框对应的值    | string   | -  | -   |
| indeterminate  | 是否是部分选中状态    | boolean | true, false | false |

### Checkbox Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 勾选状态变化触发的事件 | event |

### Checkbox.Group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中的值  | []  |   -           |    false    |
| defaultValue    | 默认选中的值  | []  |   - |     false   |

### Checkbox.Group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 勾选状态变化触发的事件 | values |