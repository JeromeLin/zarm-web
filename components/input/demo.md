# Input 输入框

基础表单输入组件。

## 基础用法

三种不同样式输入框
通过`type`属性输入类型、`bordered`设置样式类型
```js
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input type="text" style={{ marginBottom: 20 }} width="200px" placeholder="请输入" />
        <Input type="text" bordered="underline" style={{ marginBottom: 20 }} placeholder="请输入" />
        <Input type="text" bordered={false} style={{ marginBottom: 20 }} placeholder="请输入" />
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
        <Input style={{marginBottom: 12}} size="lg" placeholder="请输入" />
        <Input style={{marginBottom: 12}} size="md" placeholder="请输入" />
        <Input style={{marginBottom: 40}} size="sm" placeholder="请输入" />

        <Input bordered="underline" style={{marginBottom: 12}} size="lg" placeholder="请输入" />
        <Input bordered="underline" style={{marginBottom: 12}} size="md" placeholder="请输入" />
        <Input bordered="underline" style={{marginBottom: 12}} size="sm" placeholder="请输入" />
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

## 只读状态

通过readonly设置。
只显示文案 不显示输入框样式 用于详情页面的展示
```js
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input style={{marginBottom: 16}} defaultValue="我是只读状态" readOnly bordered placeholder="只读状态" />
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
        <Input size="md" bordered="underline" style={{ marginBottom: 16 }} prefix="http://" suffix=".com" placeholder="请输入" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 前缀和后缀

通过prefix和suffix属性设置前缀和后缀。

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
        <Input clearable placeholder="请输入" onChange={e => console.log(e.target.value)} />
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

## 多行文本输入

通过type设置。
将`type`属性设置为`textarea`，同时可设置`rows`，`cols`属性。
设置了maxLength之后，会在右下角显示可以输入的字数。
设置了showLength,会在右下角显示当前输入的字数。
设置autoHeight，会变为自适应高度的textarea, rows属性会失效
```js
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input type="textarea" placeholder="请输入" rows={6} />

        <Input maxLength={500} showLength type="textarea" bordered={false} placeholder="请输入" rows={10} style={{ height: 120, marginTop: 24 }}/>

        <Input style={{ margin: '40px 0' }} type="textarea" placeholder="自适应高度" rows={10} autoHeight />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | 'text' | 类型，可选值 `text`、`textarea`、 |
| value | string | - | 值 |
| defaultValue | string | - | 初始值 |
| width | string/number | - | 宽度 |
| size | string | md | 尺寸 type为text生效 可选值为 `lg`、 `md`、`sm` |
| prefix | ReactNode | - |带有前缀图标的 input |
| suffix | ReactNode | - | 带有后缀图标的 input |
| addonBefore | ReactNode | - | 带标签的 input，设置前置标签 |
| addonAfter | ReactNode | - | 带标签的 input，设置后置标签 |
| disabled | boolean | false | 是否禁用 |
| readOnly | boolean | false | 是否只读 |
| rows | number | string | - | 多行文本时的显示行数 |
| autoHeight | boolean | false | 是否高度自适应 |
| maxLength | number | - | 输入字数上限 |
| showLength | boolean | false | 是否显示输入字数。多行文本时有效。 |
| clearable | boolean | false | 是否显示清除按钮。多行文本时无效。必须为受控组件（属性包含value、onChange）时方可生效。 |
| onChange | (value?: number \| string) => void | - | 值变化时触发的回调函数 |
