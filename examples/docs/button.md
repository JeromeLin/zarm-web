## Button 按钮
常用的操作按钮。

### 基础用法

五种主题。

:::demo Button 组件提供5种主题，由`theme`属性来定义，默认为`default`。

```js
  render() {
    return (
      <div>
        <Button>default</Button>
        <Button theme="info">info</Button>
        <Button theme="success">success</Button>
        <Button theme="warning">warning</Button>
        <Button theme="error">error</Button>
      </div>
    )
  }
```
:::

### 禁用状态

按钮不可用状态。

:::demo 可以使用`disabled`属性来定义按钮是否可用。

```js
  render() {
    return (
      <div>
        <Button disabled>默认按钮</Button>
        <Button theme="info" disabled>info</Button>
        <Button theme="success" disabled>success</Button>
        <Button theme="warning" disabled>warning</Button>
        <Button theme="error" disabled>error</Button>
      </div>
    )
  }
```
:::

### 圆角按钮

可以设置圆角或椭圆角的按钮

:::demo 使用`radius`，`round`属性设置圆角、椭圆角

```js
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Button radius>default</Button>
          <Button radius theme="info">info</Button>
          <Button radius theme="success">success</Button>
          <Button radius theme="warning">warning</Button>
          <Button radius theme="error">error</Button>
        </div>
        <div className="multi-rows">
          <Button round>default</Button>
          <Button round theme="info">info</Button>
          <Button round theme="success">success</Button>
          <Button round theme="warning">warning</Button>
          <Button round theme="error">error</Button>
        </div>
      </div>
    )
  }
```
:::

### 不同尺寸

除了默认尺寸外，可以额外设置四种尺寸。

:::demo 额外的尺寸：`xl`、`lg`、`sm`，`xs`，通过设置`size`属性来配置它们。

```js
  render() {
    return (
      <div>
        <Button size='xl' theme="info">xl尺寸</Button>
        <Button size='lg' theme="info">lg尺寸</Button>
        <Button theme="info">默认尺寸</Button>
        <Button size='sm' theme="info">sm尺寸</Button>
        <Button size='xs' theme="info">xs尺寸</Button>
      </div>
    )
  }
```
:::

### 图标按钮

使用Icon组件添加图标

:::demo 可以在组件中通过Icon的方式添加图标

```js
  render() {
    return (
      <div>
        <Button theme="info"><Icon type="right" />完成上传</Button>
        <Button theme="error"><Icon type="wrong" />上传出错了</Button>
      </div>
    )
  }
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 只要设置`loading`属性为`true`。

```js
  render() {
    return <Button theme="info" loading={true}>加载中</Button>
  }
```
:::

### 链接按钮

使用a标签代替button, 可设置href, target属性

:::demo

```js
  render() {
    return <Button radius href="https://www.baidu.com/" theme="info" target="_blank">百度一下</Button>
  }
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   xl,lg,sm,xs            |    —     |
| theme     | 主题   | string    |   info,success,warning,error,default |     default   |
| radius     | 是否圆角   | boolean    | — | false   |
| round     | 是否椭圆角   | boolean    | — | false   |
| circle     | 是否圆形   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用    | boolean   | true, false   | false   |
| href      | href属性   | string | - | - |
| blank     | blank属性, href存在时生效 | string | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClick | 点击按钮触发的事件 | — |
