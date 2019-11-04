# Steps 组件名

## 基本用法

```jsx
import { Steps } from 'zarm-web';

ReactDOM.render(
  <>
    <Steps>
      <Steps.Item title="步骤1" description="步骤1描述文案" />
      <Steps.Item title="步骤2" description="步骤2描述文案" />
      <Steps.Item title="步骤3" description="步骤3描述文案" />
      <Steps.Item title="步骤4" />
    </Steps>
  </>, mountNode);
```

## 竖直方向

```jsx
import { Steps } from 'zarm-web';

ReactDOM.render(
  <>
    <Steps direction="vertical">
      <Steps.Item title="步骤1" description="步骤1描述文案" />
      <Steps.Item title="步骤2" description="步骤2描述文案" />
      <Steps.Item title="步骤3" description="步骤3描述文案" />
      <Steps.Item title="步骤4" />
    </Steps>
  </>, mountNode);
```

## 状态

```jsx
import { Steps } from 'zarm-web';

ReactDOM.render(
  <>
    <Steps current={2} status="error">
      <Steps.Item title="步骤1" description="步骤1描述文案" />
      <Steps.Item title="步骤2" disabled description="步骤2描述文案" />
      <Steps.Item title="步骤3" description="步骤3描述文案" />
      <Steps.Item title="步骤4" />
    </Steps>
  </>, mountNode);
```

## 点击事件

```jsx
import { Steps } from 'zarm-web';

class StepsDemo extends React.Component {
  state = {
    current: 0,
  };

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  render() {
    const { current } = this.state;

    return (
      <>
        <Steps current={current} onChange={this.onChange}>
          <Steps.Item title="步骤1" description="步骤1描述文案" />
          <Steps.Item title="步骤2" disabled description="步骤2描述文案" />
          <Steps.Item title="步骤3" description="步骤3描述文案" />
          <Steps.Item title="步骤4" />
        </Steps>
      </>
    );
  }
}

ReactDOM.render(<StepsDemo />, mountNode);
```

## API

Steps

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
|prefixCls|string|'zw-steps'|类名前缀|
|className|string|-|附加类名|
|style|object|-|样式|
|current|number|0|当前步骤，从0开始|
|direction|string|'horizontal'|步骤条方向，可选值为`horizontal`、`vertical`|
|status|string|'process'|当前节点状态，可选值为`wait`、`process`、`finish`、`error`|
|onChange|(current: number) => void|-|点击切换步骤时触发的回调|

Steps.Item

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
|title|ReactNode|-|标题|
|description|ReactNode|-|描述|
|status|string|'wait'|当前节点状态，当不配置该属性时，会使用`Steps`的`current`来自动指定状态，可选值为`wait`、`process`、`finish`、`error`|
|disabled|boolean|false|是否禁止点击|
