# Input 输入框
基础表单输入组件。



## 基础用法

```jsx
import { Input } from 'zarm-web';

ReactDOM.render(<Input placeholder="请输入" />, mountNode);
```



## 边框样式
通过设置 `bordered` 实现两种不同边框样式的输入框

```jsx
import { Input } from 'zarm-web';

ReactDOM.render(
  <>
    <Input bordered placeholder="请输入" />
    <Input bordered={false} placeholder="请输入" />
  </>,
  mountNode,
);
```



## 不同尺寸
除了默认大小外，可以通过 `size` 设置 `lg`,`md`,`sm` 三种不同尺寸。

```jsx
import { Input } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Input size="lg" placeholder="请输入" />
      <Input size="md" placeholder="请输入" />
      <Input size="sm" placeholder="请输入" />
    </div>
    <div className="rows">
      <Input bordered size="lg" placeholder="请输入" />
      <Input bordered size="md" placeholder="请输入" />
      <Input bordered size="sm" placeholder="请输入" />
    </div>
    <div className="rows">
      <Input bordered={false} size="lg" placeholder="请输入" />
      <Input bordered={false} size="md" placeholder="请输入" />
      <Input bordered={false} size="sm" placeholder="请输入" />
    </div>
  </>,
  mountNode,
);
```



## 禁用状态
通过设置 `disabled` 来禁用输入框。

```jsx
import { Input } from 'zarm-web';

ReactDOM.render(
  <>
    <Input disabled placeholder="禁用状态" />
    <Input disabled bordered placeholder="禁用状态" />
    <Input disabled bordered={false} placeholder="禁用状态" />
  </>,
  mountNode,
);
```



## 只读状态
通过设置 `readonly` 属性，让输入框处于只读状态。
只显示文案，不显示输入框样式，用于详情页面的展示。

```jsx
import { Input } from 'zarm-web';

ReactDOM.render(<Input readOnly defaultValue="我是只读状态" placeholder="只读状态" />, mountNode);
```



## 添加前置和后置标签
`bordered` 属性为 true 时，能够通过 `addonBefore` 和 `addonAfter` 属性设置前置和后置标签。

```jsx
import { Input } from 'zarm-web';

ReactDOM.render(
  <>
    <Input bordered addonBefore="http://" placeholder="请输入" />
    <Input bordered addonAfter=".com" placeholder="请输入" />
  </>,
  mountNode,
);
```



## 前缀和后缀
通过prefix和suffix属性设置前缀和后缀。

```jsx
import { Input, Icon } from 'zarm-web';

ReactDOM.render(
  <>
    <Input prefix="http://" suffix=".com" placeholder="请输入" />
    <Input bordered prefix="¥" suffix="元" placeholder="请输入" />
    <Input bordered={false} prefix={<Icon type="keyboard" />} suffix={<Icon type="date" />} placeholder="请输入" />
  </>,
  mountNode,
);
```



## 带清除图标
带移除图标的输入框，点击图标删除所有内容

```jsx
import { Input } from 'zarm-web';

ReactDOM.render(<Input clearable placeholder="请输入" />, mountNode);
```



## 输入框组合
输入框的组合展现, 默认为compact模式。
```jsx
import { Input, Select } from 'zarm-web';

ReactDOM.render(
  <>
    <Input.Group>
      <Input style={{ width: '10%' }} defaultValue="021" />
      <Input style={{ width: '90%' }} defaultValue="10109955" />
    </Input.Group>
    <Input.Group>
      <Input style={{ width: '10%' }} bordered defaultValue="021" />
      <Input style={{ width: '90%' }} bordered defaultValue="10109955" />
    </Input.Group>
    <Input.Group compact={false}>
      <Input style={{ width: '30%', marginRight: 20 }} bordered defaultValue="021" />
      <Input style={{ width: '30%', marginRight: 20 }} bordered defaultValue="10109955" />
      <Input style={{ width: '40%' }} bordered defaultValue="10109955" />
    </Input.Group>
  </>,
  mountNode
);
```



## 搜索场景的组合
通过设置前缀图标和后置标签来组合成搜索框

```jsx
import { Input, Button, Icon } from 'zarm-web';

ReactDOM.render(
  <>
    <Input placeholder="please input gender" prefix={<Icon type="search" />} />
    <Input bordered={false} placeholder="please input gender" prefix={<Icon type="search" />} />
    <Input bordered placeholder="please input gender" prefix={<Icon type="search" />} />
    <Input bordered className="input-search-wrapper" placeholder="please input gender" addonAfter={<Button style={{ padding: '0 15px', width: 'auto' }} theme="primary" icon="search" />} />
    <Input bordered className="input-search-wrapper" placeholder="please input gender" addonAfter={<Button style={{ padding: '0 15px', width: 'auto' }} theme="primary">Search</Button>} />
  </>,
  mountNode,
);
```



## 多行文本
将 `type` 属性设置为 `textarea`，同时可设置 `rows`，`cols` 属性。
设置了 `maxLength` 之后，会在右下角显示可以输入的字数。
设置了 `showLength` 会在右下角显示当前输入的字数。

```jsx
import { Input } from 'zarm-web';

ReactDOM.render(
  <>
    <Input type="textarea" rows={3} placeholder="请输入" />
    <Input type="textarea" showLength bordered={false} rows={3} maxLength={120} placeholder="请输入" />
  </>,
  mountNode,
);
```



## 高度自适应
设置 `autoHeight` 会变为自适应高度的 `textarea`。

```jsx
import { Input } from 'zarm-web';

ReactDOM.render(
  <>
    <Input type="textarea" autoHeight placeholder="自适应高度" />
    <Input type="textarea" autoHeight={{ minRows: 3, maxRows: 6 }} placeholder="自适应高度, 并且限制最小行数和最大行数" />
  </>,
  mountNode,
);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | 'text' | 类型，可选值 `text`、`number`、`password`、`textarea` |
| shape | string | 'radius' | 类型，可选值 `rect`、`radius` |
| value | string | - | 值 |
| defaultValue | string | - | 初始值 |
| disabled | boolean | false | 是否禁用 |
| readOnly | boolean | false | 是否只读 |
| maxLength | number | - | 输入字数上限 |

<h3>Input 单行文本</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| bordered | 'underline' \| boolean | 'underline' | 边框样式 |
| size | string | 'md' | 设置尺寸，可选值为 `lg`、 `md`、`sm` |
| clearable | boolean | false | 是否显示清除按钮，必须为受控组件（属性包含value、onChange）时方可生效。 |
| prefix | ReactNode | - | 设置前缀内容 |
| suffix | ReactNode | - | 设置后缀内容 |
| addonBefore | ReactNode | - | 设置前置标签 |
| addonAfter | ReactNode | - | 设置后置标签 |
| onChange | (e?: React.ChangeEvent&lt;HTMLInputElement&gt;) => void | - | 值变化时触发的回调函数 |

<h3>Textarea 多行文本</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| bordered | boolean  | true | 边框样式 |
| rows | number | - | 显示行数 |
| autoHeight | boolean/object | false | 是否高度自适应, 可设置成true/false/{ minRows: 2, maxRows: 5 } |
| showLength | boolean | false | 是否显示输入字数 |
| onChange | (e?: React.ChangeEvent&lt;HTMLTextAreaElement&gt;) => void | - | 值变化时触发的回调函数 |
