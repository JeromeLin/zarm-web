# Input 输入框

基础表单输入组件。

## 基础用法

基本用法。
通过`type`属性输入类型。
```js
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input type="text" style={{ marginBottom: 20 }} placeholder="请输入" />
        <Input type="text" bordered="underline" style={{ marginBottom: 20 }} placeholder="请输入" />
        <Input type="text" bordered={false} style={{ marginBottom: 20 }} placeholder="请输入" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## textarea

通过type设置。
将`type`属性设置为`textarea`，同时可设置`rows`，`cols`属性。
设置了maxLength之后，会在右下角显示可以输入的字数。
设置了showLength,会在右下角显示当前输入的字数。
```js
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input maxLength={500} showLength type="textarea" placeholder="请输入" rows={10} style={{ height: 200 }}/>

        <Input maxLength={500} showLength type="textarea" bordered={false} placeholder="请输入" rows={10} style={{ height: 200, marginTop: 24 }}/>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 不同尺寸

通过size设置。

除了默认大小外，可以设置`lg`,`md`,`sm`三种不同尺寸。
```js
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input style={{width: 200, marginRight: 8}} size="lg" placeholder="请输入" />
        <Input style={{width: 200, marginRight: 8}} size="md" placeholder="请输入" />
        <Input style={{width: 200, marginRight: 8}} size="sm" placeholder="请输入" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 禁用状态

通过disabled设置设置。

```js
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input style={{marginBottom: 16}} disabled bordered placeholder="禁用状态" />
        <Input style={{marginBottom: 16}} disabled bordered={false} placeholder="禁用状态" />
        <Input style={{marginBottom: 16}} disabled bordered="underline" placeholder="禁用状态" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## 添加前置和后置标签

通过addonBefore和addonAfter设置。

通过`addonBefore`和`addonAfter`属性设置前置和后置标签。

```js
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input size="md" style={{ marginBottom: 16 }} addonBefore="http://" placeholder="请输入" />
        <Input style={{ marginBottom: 16 }} addonAfter=".com" placeholder="请输入" />
        <Input style={{ marginBottom: 16 }} prefix="¥" suffix="RMB" addonBefore="http://" addonAfter=".com" placeholder="请输入" />
        <Input size="md" bordered="underline" style={{ marginBottom: 16 }} prefix="http://" suffix=".com" placeholder="请输入" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 前缀和后缀

通过prefix 和 suffix设置。

通过`通过prefix`和`suffix设置`属性设置前缀和后缀。

```js
import { Input, Icon } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input style={{ marginBottom: 16 }} prefix="¥" suffix="元" placeholder="请输入" />
        <Input size="md" style={{ marginBottom: 16 }} prefix={<Icon type="keyboard" />} suffix={<Icon type="date" />} placeholder="请输入" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 带清除图标

带移除图标的输入框，点击图标删除所有内容

```js
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input disabled clearable placeholder="请输入" onChange={e => console.log(e.target.value)} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 组装InputSearch

使用InputSearch标签设置。

设置InputSearch的属性来处理搜索框。
```js
import { Input, Button, Icon } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input style={{ marginBottom: 16 }} placeholder="please input gender" prefix={<Icon type="search" />} />
        <Input style={{ marginBottom: 16 }} className="input-search-wrapper" placeholder="please input gender" addonAfter={<Button style={{ padding: '0 15px', width: 'auto' }} theme="primary" icon="search" />} />
        <Input style={{ marginBottom: 16 }} className="input-search-wrapper" placeholder="please input gender" addonAfter={<Button style={{ padding: '0 15px', width: 'auto' }} theme="primary">Search</Button>} />
      </div>
    )
  }

}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   text, textarea, number...           |    text     |
| size     | 尺寸   | string  |   xl, lg, sm, xs        |    -     |
| shape    |  圆角形状   | shape rect |   -     |    false   |
| value     | 值   | string  |   -        |    -     |
| defautValue     | 默认值  | string  |   -     |    -     |
| placeholder     | 占位符   | string  |   -      |    -     |
| disabled  | 禁用    | -   | -  | -   |
| addonBefore | Input的前置标签 textarea无效 | ReactNode ()=>ReactNode AddonType |-|-|
| addonAfter | Input的后置标签 textarea无效 | ReactNode ()=>ReactNode AddonType |-|-|
| maxLength | 输入框的输入字符长度限制 在textarea下，会在右下角显示 | ReactNode ()=>ReactNode AddonType |-|-|
| showLength | 是否显示当前的textarea已输入的字符长度 在textarea下，会在右下角显示 | ReactNode ()=>ReactNode AddonType |-|-|

