## NumberInput 数值输入框

数字输入组件，仅允许数值输入

### 基本用法

数字输入框

::: demo 设置输入框的值
```js
constructor (props) {
    super(props)
    this.state = {
      value: 33
    }
}

onChange (e) {
  this.setState({ value: e.target.value })
}

render() {
  return (
    <div>
      <NumberInput onChange={this.onChange.bind(this)} value={this.state.value} />
    </div>
  )
}
```
:::

### 设置数值精度(保留小数位数)

decimal设置数值精度

::: demo decimal设置数值精度
```js
render() {
  return (
    <div>
      <NumberInput value={4} decimal={2} />
    </div>
  )
}
```
:::

### 设置输入的最大或最小值

最大或最小值

::: demo 设置输入的最大或最小值
```js
render() {
  return (
    <div>
      <NumberInput min={5} max={10} value={7} decimal={3} />
    </div>
  )
}
```
:::

### 设置输入是否显示加减按钮

showStepper设置是否显示加减按钮, step设置步长

::: demo showStepper设置是否显示加减按钮, step设置步长
```js
onChange (e) {
  console.log(e.target.value)
}

render() {
  return (
    <div>
      <NumberInput
        showStepper
        value={3}
        step={1}
        max={20}
        min={2}
        onChange={this.onChange.bind(this)}
      />
    </div>
  )
}
```
:::

### 禁用状态

isDisable设置禁用状态

::: demo 设置禁用状态
```js
onChange (e) {
  console.log(e.target.value)
}

render() {
  return (
    <div>
      <NumberInput
        isDisabled
        showStepper
        value={3}
        step={1}
        max={20}
        min={2}
        onChange={this.onChange.bind(this)}
      />
    </div>
  )
}
```
:::



### 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 输入值 | number | — | — |
| onChange | change事件 | func(e:Event) | — | — |
| onBlur | blur事件 | func(e:Event) | — | — |
| className | 自定义类名 | string | - | - |
| showStepper | 是否开启记步器 | bool | - | false |
| decimal | 数值精度 | number | — | - |
| min | 数值范围最小值 | number | — | — |
| max | 数值范围最大值 | number | — | — |
| placeholder | 原生placeholder文案	 | string | — | ' |
| isDisabled | 是否禁用状态	 | bool | — | false |
| step | 设置加减步长	 | number | number | 1 |




