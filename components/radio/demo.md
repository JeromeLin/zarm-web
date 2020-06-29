# Radio 单选框


## 基本用法
```jsx
import { Radio } from 'zarm-web';

ReactDOM.render(<Radio>Radio</Radio>, mountNode);
```



## 禁用状态
```jsx
import { useState } from 'react';
import { Radio, Button } from 'zarm-web';

const Demo = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <div className="rows">
        <Radio disabled={disabled}>禁用的状态</Radio>
      </div>
      <div className="rows">
        <Radio checked disabled={disabled}>选中并禁用的状态</Radio>
      </div>
      <div className="rows">
        <Button theme="primary" onClick={() => setDisabled(!disabled)}>toggleDisabled</Button>
      </div>
    </>
  );
}

ReactDOM.render(<Demo />, mountNode);
```



## 组合使用
```jsx
import { Radio } from 'zarm-web';

class Demo extends React.Component {
  state = {
    value: 1,
  };

  onChange = (value) => {
    console.log('radio checked', value);
    this.setState({ value });
  };

  render() {
    return (
      <>
        <div className="rows">
          <Radio.Group value={this.state.value} onChange={this.onChange}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </div>
        <div className="rows">
          <Radio.Group disabled defaultValue={2}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 按钮样式
```jsx

import { Radio } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Radio.Group type="button">
        <Radio checked value="选项一">选项一</Radio>
        <Radio value="选项二">选项二</Radio>
        <Radio value="选项三">选项三</Radio>
      </Radio.Group>
    </div>
    <div className="rows">
      <Radio.Group type="button">
        <Radio value="选项一">选项一</Radio>
        <Radio disabled value="选项二">选项二</Radio>
        <Radio value="选项三">选项三</Radio>
      </Radio.Group>
    </div>
    <div className="rows">
      <Radio.Group type="button" disabled>
        <Radio value="选项一">选项一</Radio>
        <Radio value="选项二">选项二</Radio>
        <Radio value="选项三" checked>选项三</Radio>
      </Radio.Group>
    </div>
  </>,
  mountNode,
);
```



## 幽灵按钮
```jsx

import { Radio } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Radio.Group ghost type="button">
        <Radio checked value="选项一">选项一</Radio>
        <Radio value="选项二">选项二</Radio>
        <Radio value="选项三">选项三</Radio>
      </Radio.Group>
    </div>
    <div className="rows">
      <Radio.Group ghost type="button">
        <Radio value="选项一">选项一</Radio>
        <Radio disabled value="选项二">选项二</Radio>
        <Radio value="选项三">选项三</Radio>
      </Radio.Group>
    </div>
    <div className="rows">
      <Radio.Group ghost disabled type="button">
        <Radio value="选项一">选项一</Radio>
        <Radio value="选项二">选项二</Radio>
        <Radio value="选项三" checked>选项三</Radio>
      </Radio.Group>
    </div>
  </>,
  mountNode,
);
```



## 三种大小

```jsx
import { Radio } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Radio.Group type="button" size="lg">
        <Radio value="选项一">选项一</Radio>
        <Radio value="选项二">选项二</Radio>
        <Radio value="选项三">选项三</Radio>
      </Radio.Group>
    </div>
    <div className="rows">
      <Radio.Group type="button" size="md">
        <Radio value="选项一">选项一</Radio>
        <Radio value="选项二">选项二</Radio>
        <Radio value="选项三">选项三</Radio>
      </Radio.Group>
    </div>
    <div className="rows">
      <Radio.Group type="button" size="sm">
        <Radio value="选项一">选项一</Radio>
        <Radio value="选项二">选项二</Radio>
        <Radio value="选项三">选项三</Radio>
      </Radio.Group>
    </div>
  </>,
  mountNode,
);
```



## API

<h3>Radio</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string \| number | - | 值 |
| checked | boolean | - | 当前是否选中 |
| defaultChecked | boolean | - | 初始是否选中 |
| disabled | boolean | false | 是否禁用 |
| onChange | (e: ChangeEvent<HTMLInputElement>) => void | - | 值变化时触发的回调函数 |

<h3>Radio.Group</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| type | string | - | 显示类型，可选值 `button` |
| value | string \| number | - | 选中值 |
| defaultValue | string \| number | - | 初始选中值 |
| disabled | boolean | false | 是否禁用 |
| block | boolean | false | 子项是否为块级元素 |
| onChange | (value?: string \| number) => void | - | 值变化时触发的回调函数 |
| size | string | 'md' | 按钮类型时的大小，可选值为 `lg`、`md`、`sm` |
| shape | string | 'radius' | 按钮类型时的形状，可选值 `rect`, `radius`, `round` | 
