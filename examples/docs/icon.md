## Icon 图标

提供了常用的图标。

### 使用方法

基本用法。

:::demo 通过`type`属性设置图标类型，通过`theme`属性设置主题。
```js
render() {
  return (
    <div className="icons">
      <Icon type="right" theme="success" />
      <Icon type="right-round" theme="success" />
      <Icon type="right-round-fill" theme="success" />
      <Icon type="wrong" theme="error" />
      <Icon type="wrong-round" theme="error" />
      <Icon type="wrong-round-fill" theme="error" />
      <Icon type="info-round" theme="info" />
      <Icon type="info-round-fill" theme="info" />
      <Icon type="question-round" />
      <Icon type="question-round-fill" />
      <Icon type="warning-round" theme="warning" />
      <Icon type="warning-round-fill" theme="warning" />
      <Icon type="arrow-left" />
      <Icon type="arrow-right" />
      <Icon type="arrow-top" />
      <Icon type="arrow-bottom" />
      <Icon type="add" />
      <Icon type="add-round" />
      <Icon type="add-round-fill" />
      <Icon type="minus" />
      <Icon type="minus-round" />
      <Icon type="minus-round-fill" />
      <Icon type="date" />
      <Icon type="loading" />
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   right,right-round...           |    —     |
| theme     | 主题   | string    |   info,success,warning,error,default |   default   |
