## Radio 单选框
单选框。

### 基础用法

单独使用，表示在两种状态之间切换。

:::demo

```js
import { Radio } from 'dragon-ui';

class Demo extends React.Component {
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
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 组合使用

一组可选项中选择一项。

:::demo 使用`Radio.Group`组件。

```js
import { Radio } from 'dragon-ui';

class Demo extends React.Component {
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
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 按钮样式单选、不同尺寸

:::demo 使用`Radio.Group`组件。

```js
import { Radio } from 'dragon-ui';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: ''
    }
  }
  render() {
    return (
      <div>
        <div style={{marginBottom: 8}}>选择了：{this.state.radioValue}</div>
        <div className="multi-rows">
          <Radio.Group
            size="lg"
            value={this.state.radioValue}
            onChange={(e) => {
              this.setState({
                radioValue: e.target.value
              });
            }}
          >
            <Radio.Button value="上网">上网</Radio.Button>
            <Radio.Button value="篮球">篮球</Radio.Button>
            <Radio.Button value="足球">足球</Radio.Button>
            <Radio.Button value="羽毛球">羽毛球</Radio.Button>
          </Radio.Group>
        </div>
        <div className="multi-rows">
          <Radio.Group
            value={this.state.radioValue}
            onChange={(e) => {
              this.setState({
                radioValue: e.target.value
              });
            }}
          >
            <Radio.Button value="上网1">上网1</Radio.Button>
            <Radio.Button value="篮球1">篮球1</Radio.Button>
            <Radio.Button value="足球1">足球1</Radio.Button>
            <Radio.Button value="羽毛球1">羽毛球1</Radio.Button>
          </Radio.Group>
        </div>
        <div className="multi-rows">
          <Radio.Group
            size="sm"
            value={this.state.radioValue}
            onChange={(e) => {
              this.setState({
                radioValue: e.target.value
              });
            }}
          >
            <Radio.Button disabled value="上网2">上网2</Radio.Button>
            <Radio.Button value="篮球2">篮球2</Radio.Button>
            <Radio.Button value="足球2">足球2</Radio.Button>
            <Radio.Button value="羽毛球2">羽毛球2</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 禁用状态

不可勾选状态。

:::demo 可以使用`disabled`属性来定义是否可用。

```js
import { Radio } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Radio disabled onChange={(e) => this.onChange(e)}>选择</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
        <Radio disabled checked onChange={(e) => this.onChange(e)}>选择</Radio>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::


### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| checked     | 是否选中  | boolean  |   -           |    false    |
| defaultChecked    | 默认选中  | boolean   |   - |     false   |
| disabled  | 禁用    | -   | -  | -   |
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
