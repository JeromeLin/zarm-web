## TimePicker时间选择器


### 基础用法
时间选择

:::demo

```js
  constructor (props) {
    super(props)

    this.state = {
      timerpickerValue: ''
    }
  }

  render() {
    let { timerpickerValue } = this.state
    return (
      <Form type="inline">
        <Form.Item className="col-xs-6">
            <TimePicker
              isDisabled={false}
              isRadius
              style={{ width: 160 }}
              value={timerpickerValue}
              onChange={(data) => {
                timerpickerValue = data
                this.setState({ timerpickerValue })
              }}
            />
        </Form.Item>
      </Form>
    )
  }
```
:::

### 禁用状态
禁用状态

:::demo

```js
  constructor (props) {
    super(props)

    this.state = {
      timerpickerValue: '12:32:22'
    }
  }

  render() {
    let { timerpickerValue } = this.state
    return (
      <Form type="inline">
        <Form.Item className="col-xs-6">
            <TimePicker
              isDisabled
              isRadius
              style={{ width: 160 }}
              defaultValue={timerpickerValue}
              value={timerpickerValue}
              onChange={(data) => {
                timerpickerValue = data
                this.setState({ timerpickerValue })
              }}
            />
        </Form.Item>
      </Form>
    )
  }
```
:::



### TimePicker Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| radius    | 是否圆角   | boolean |   -  |    false   |
| value   | 值 | string |   -   |    -   |
| defaultValue  | string | - |   -   |    -   |
| size  | 尺寸 | - |   -   |    -   |
| style  | 样式覆盖 | - |   -   |    -   |
| placeholder  | 占位内容 | string |   -   |    -   |


### TimePicker Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 状态变化触发的事件 |  value |
