## Radio 单选框
单选框。

### 基础用法

单独使用，表示在两种状态之间切换。

:::demo

```js
  onChange(e) {
    console.log(e.target.value);
  }
  render() {
    return (
      <div>
        <Radio
          value="a"
          onChange={(e) => this.onChange(e)}
        >
          选择
        </Radio>
      </div>
    )
  }
```
:::

### 组合使用

一组可选项中选择一项。

:::demo 使用`Radio.Group`组件。

```js
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'a'
    }
  }
  render() {
    return (
      <div>
        <div style={{marginBottom: 8}}>选择了：{this.state.radioValue}</div>
        <Radio.Group
          value={this.state.radioValue}
          onChange={(e) => {
            this.setState({
              radioValue: e.target.value
            });
          }}
        >
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
          <Radio value="c">C</Radio>
          <Radio value="d">D</Radio>
        </Radio.Group>
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
        <Radio
          disabled
          onChange={(e) => this.onChange(e)}
        >
          选择
        </Radio>
      </div>
    )
  }
```
:::


### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| checked     | 是否选中  | boolean  |   -           |    false    |
| defaultChecked    | 默认选中  | boolean   |   - |     false   |
| disabled  | 是否禁用    | boolean   | true, false   | false   |
| value  | 选择框对应的值    | string   | -  | -   |

### Radio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 勾选状态变化触发的事件 | event |

### Radio.Group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中的值  | string  |   -           |    false    |
| defaultValue    | 默认选中的值  | string  |   - |     false   |

### Radio.Group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 勾选状态变化触发的事件 | event |