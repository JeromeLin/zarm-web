## Slider 滑动输入条
滑动型输入器。

### 基础用法

最简单的用法。

:::demo

```js
  render() {
    return (
      <div>
        <Slider round min={0} max={300} step={1} defaultValue={80} />
      </div>
    )
  }
```
:::

### 不同主题
五种主题。

:::demo Slider 组件提供5种主题，由`theme`属性来定义，支持`default`,`info`,`success`,`warning`,`error`。

```js
  render() {
    return (
      <div>
        <Slider round min={0} max={300} step={1} defaultValue={80} />
        <Slider round min={0} max={300} step={1} defaultValue={80} theme="info"/>
        <Slider round min={0} max={300} step={1} defaultValue={80} theme="success"/>
        <Slider round min={0} max={300} step={1} defaultValue={80} theme="warning"/>
        <Slider round min={0} max={300} step={1} defaultValue={80} theme="error"/>
      </div>
    )
  }
```
:::

### 多个滑动手柄

可以设置多个滑动手柄。

:::demo 通过`HanleAmount`设置。

```js
  render() {
    return (
      <div>
        <Slider round min={0} max={300} step={1} defaultValue={80} handleAmount={2} styleWidth={600} />
      </div>
    )
  }
```
:::

### 取值回调

可以实时获取值。

:::demo 通过`getValue`添加回调函数。

```js
  render() {
    return (
      <div>
        <Slider
          min={0} 
          max={300}
          styleWidth={600}
          getValue={(value, i) => {
            console.log(value, i);
          }}  
        />
      </div>
    );
  }
```
:::

### 更多自定义设置

通过`range`, `rangeColors`属性自定义样式。

:::demo

```js
  render() {
    return (
      <div>
        <Slider round isRange handleAmount={2} rangeColors={['red', 'yellow']} styleWidth={600} min={0} max={300} step={1} defaultValue={[80, 150]} />
      </div>
    )
  }
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| min     | 最小范围   | number  |   -            |    0    |
| max     | 最大范围   | number    |   - |     -   |
| step     | 步长   | number    |   - |     1   |
| defaultValue     | 默认值   | number/number[]    | — | 0   |
| showTip     | 是否显示Tip   | boolean   | — | true |
| handleAmount     | 滑动手柄数量   |  number | — | 1 |
| round     | 端点是否圆角   | boolean    | — | false   |
| isRange     | 是否双滑块模式   | boolean    | — | false   |
| rangeColors     | 双滑块颜色  |  []   | — | -   |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| getValue | 滑动手柄时候触发的事件 | (value, index) |