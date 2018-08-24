## DatePicker 日期选择器
日期选择器。

### 基础用法

:::demo

```js
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }
  render() {
    return (
      <div>
       <DatePicker
          radius
          style={{width: 200}}
          value={this.state.date}
          onChange={(date) => {
            this.setState({date});
          }}
        />
      </div>
    )
  }
```
:::

### DateTimePicker

DateTimePicker时候showTime需要为true且format必传

:::demo

```js
  constructor(props) {
    super(props);
    this.state = {
      date1: '',
      date2: '',
    };
  }
  render() {
    return (
      <div>
       <DatePicker
          format="yyyy/MM/dd hh:mm:ss"
          radius
          showTime
          style={{width: 200}}
          value={this.state.date1}
          placeholder="请选择日期"
          onChange={(date1) => {
            console.log(date1);
            this.setState({date1});
          }}
        />

        <DatePicker
          format="yyyy-MM-dd hh:mm:ss"
          radius
          showTime
          style={{width: 200, marginLeft: 24}}
          value={this.state.date2}
          placeholder="请选择日期"
          onChange={(date2) => {
            console.log(date2);
            this.setState({date2});
          }}
        />
      </div>
    )
  }
```
:::

### 禁用状态

不可用状态。

:::demo 可以使用`disabled`属性来定义是否可用。

```js
  constructor(props) {
    super(props);
    this.state = {
      date1: '',
      date2: ''
    };
  }
  render() {
    return (
      <div>
       <DatePicker
          radius
          disabled
          style={{width: 200}}
          value={this.state.date1}
          placeholder="请选择日期"
          onChange={(date1) => {
            console.log(date1)
            this.setState({date1});
          }}
        />

        <DatePicker
          isDisabled
          format="yyyy-MM-dd hh:mm:ss"
          radius
          showTime
          style={{width: 200, marginLeft: 24}}
          value={this.state.date}
          onChange={(date) => {
            this.setState({date});
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
| value     | 选中日期值   | string |   -   |    -   |
| defaultValue  | 默认值 | string |   -   |    -   |
| showTime | 是否显示时间选择器 | boolean | - | false |
| format  | 回调参数日期格式 | string |   -   |    'yyyy-MM-dd'   |
| min  | 可选的最小日期 | string |   -   |    ''   |
| max  | 可选的最大日期 | string |   -   |    ''   |
| placeholder | 选择框默认文案 | string |   -   |   -  |
| radius | 是否圆角 | boolean |   -   |   false  |
| isDisabled | 是否禁用 | boolean |   -   |   false  |



### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 日期变更回调 |  date |
