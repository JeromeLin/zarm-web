## Calendar 日历
日历。

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
        <Calendar
          style={{display: 'inline-block'}}
          min={'2018/5/5'}
          max={'2022/3/12'}
          value={this.state.date}
          onChange={(date) => {
            console.log(date)
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
| format  | 回调参数日期格式 | string |   -   |    'yyyy-MM-dd'   |
| min  | 可选的最小日期 | string |   -   |    ''   |
| max  | 可选的最大日期 | string |   -   |    ''   |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 日期变更回调 |  date |