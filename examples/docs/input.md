## Input 输入框

最基础的表单输入组件。

### 基础用法

基本用法。

:::demo 通过`type`属性输入类型。
```js
  render() {
    return (
      <div>
        <Input type="text" placeholder="请输入" />
      </div>
    )
  }
```
:::

### textarea

通过type设置。

:::demo 将`type`属性设置为`textarea`，同时可设置`rows`，`cols`属性。 
设置了maxLength之后，会在右下角显示可以输入的字数。
设置了showLength,会在右下角显示当前输入的字数。
```js
  render() {
    return (
      <div>
        <Input type="textarea" placeholder="请输入" rows={10} style={{ height: 200 }}/>
      </div>
    )
  }
```
:::

### 不同尺寸

通过size设置。

:::demo 除了默认大小外，可以设置`xl`,`lg`,`sm`,`xs`四种不同尺寸。
```js
  render() {
    return (
      <div>
        <Input style={{width: 150, marginRight: 8}} size="xl" placeholder="请输入" />
        <br />
        <Input style={{width: 150, marginRight: 8}} size="lg" placeholder="请输入" />
        <br />
        <Input style={{width: 150, marginRight: 8}} size="sm" placeholder="请输入" />
        <br />
        <Input style={{width: 150, marginRight: 8}} size="xs" placeholder="请输入" />
      </div>
    )
  }
```
:::

### 直角输入框

通过radius设置，默认为圆角。

:::demo 通过`shape`属性设置输入框是否直角。 shape?: 'rect' | 'radius';
```js
  render() {
    return (
      <div>
        <Input shape="rect" type="text" placeholder="请输入" />
      </div>
    )
  }
```
:::


### 添加前置和后置标签

通过addonBefore和addonAfter设置。

:::demo 通过`addonBefore`和`addonAfter`属性设置前置和后置标签。
addon支持的类型请参考 `Attributes`

```js
  render() {
    return (
      <div>
        <Input addonBefore="http://" type="text" placeholder="请输入" />
        <br />
        <Input addonAfter=".com" type="text" placeholder="请输入" />
      </div>
    )
  }
```
:::


### 禁用状态

通过disabled设置。

:::demo 通过`disabled`属性设置输入框是否禁用, 禁用状态下不可输入。
```js
  render() {
    return (
      <div>
        <Input disabled type="text" value="禁用" />
      </div>
    )
  }
```
:::


### 设置InputGroup

使用InputGroup标签设置。

:::demo 使用InputGroup标签设置。
```js
  render() {
    return (
      <div>
        <Input.Group>
          <Input type="text" placeholder="please input gender" />
          <Input type="text" placeholder="please input name" />
        </Input.Group>
      </div>
    )
  }
```
:::

### 设置InputSearch

使用InputSearch标签设置。

:::demo 设置InputSearch的属性来处理搜索框。
```js
  render() {
    return (
      <div>
        <Input.Search placeholder="please input gender" />
      </div>
    )
  }
```
:::

### 监听事件

支持onChange,onFocus,onBlur等标准事件

:::demo 设置`onBlur`事件回调，在失去焦点时触发。
```js
  handleBlur(e) {
    alert('输入框的值是：' + e.target.value);
  }

  render() {
    return (
      <div>
        <Input type="text" placeholder="请输入" onBlur={(e) => { this.handleBlur(e); }} />
      </div>
    )
  }
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   text, textarea, number...           |    text     |
| size     | 尺寸   | string  |   xl, lg, sm, xs        |    -     |
| radius   *已废弃  |  是否圆角   | boolean  |   -     |    false   |
| shape    |  圆角形状   | shape rect |   -     |    false   |
| value     | 值   | string  |   -        |    -     |
| defautValue     | 默认值  | string  |   -     |    -     |
| placeholder     | 占位符   | string  |   -      |    -     |
| disabled  | 禁用    | -   | -  | -   |
| isDisabled * 已废弃 | 废弃 | boolean   | true, false   | false   |
| addonBefore | Input的前置标签 textarea无效 | ReactNode ()=>ReactNode AddonType |-|-|
| addonAfter | Input的后置标签 textarea无效 | ReactNode ()=>ReactNode AddonType |-|-|
| maxLength | 输入框的输入字符长度限制 在textarea下，会在右下角显示 | ReactNode ()=>ReactNode AddonType |-|-|
| showLength | 是否显示当前的textarea已输入的字符长度 在textarea下，会在右下角显示 | ReactNode ()=>ReactNode AddonType |-|-|


### AddonType
```
{
  fillType: string;                    // 填充的背景颜色值
  addon: ReactNode | () => ReactNode   // 标签的内容
}
```


### Input.Group
`Input.Group` 是用来拼合Input标签的一个容器。其中children 必须为 Input,且type不为`textarea`;

## Input.Search
`Input.Search`是一个Input的一个组合搜索框，支持以下参数
```
{
  showIcon?:boolean;         // 默认为`true`  是否显示输入框内部的搜索icon
  showButton?:boolean;       // 默认为`true`  是否显示输入框尾部的搜索按钮
  onSearch?:()=>void;        // 当执行搜索的时候出发的回调函数
  button?: ReactNode;        // 尾部搜索按钮的内容 默认为 ‘搜索’
  ...InputProps;             // 其他所有Input支持的参数
}
```

当点击尾部搜索按钮，或者在Input组件处于focus状态的时候按回车键，都会触发 搜索行为。

### Events

和React支持的事件一致。