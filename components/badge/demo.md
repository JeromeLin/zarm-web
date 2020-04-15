# Badge 徽标



## 基本用法
可用于右上角的红色圆点展示，表示有新内容或者待处理的信息。

```jsx
import { Badge } from 'zarm-web';

ReactDOM.render(
  <Badge shape="dot"><div className="box-item" /></Badge>
, mountNode);
```



## 独立使用
可独立使用，不包裹任何元素。

```jsx
import { Badge } from 'zarm-web';

ReactDOM.render(
  <>
    <Badge shape="round" text="4" />
    <Badge theme="primary" shape="round" text="免费" />
  </>
, mountNode);
```



## 多种形状
有五种形状可供选择（dot、rect、radius、round、circle、leaf），默认为点状 `dot` 展示。

```jsx
import { Badge } from 'zarm-web';

ReactDOM.render(
  <div className="badge-themes">
    <Badge><div className="box-item" /></Badge>
    <Badge shape="rect" text="免费"><div className="box-item" /></Badge>
    <Badge shape="radius" text="new"><div className="box-item" /></Badge>
    <Badge shape="round" text="999+"><div className="box-item" /></Badge>
    <Badge shape="circle" text="3"><div className="box-item" /></Badge>
    <Badge shape="leaf" text="新品"><div className="box-item" /></Badge>
  </div>
, mountNode);
```



## 多主题
设置主题，有五种主题可供选择（default、primary、success、warning、danger），默认为 `danger` 展示。

```jsx
import { Badge } from 'zarm-web';

ReactDOM.render(
  <>
    <Badge shape="round" text="999+" theme="primary"><div className="box-item" /></Badge>
    <Badge shape="round" text="999+" theme="success"><div className="box-item" /></Badge>
    <Badge shape="round" text="999+" theme="warning"><div className="box-item" /></Badge>
    <Badge shape="round" text="999+" theme="danger"><div className="box-item" /></Badge>
  </>
, mountNode);
```



## 文本示例

```jsx
import { Badge } from 'zarm-web';

ReactDOM.render(
  <>
    <Badge shape="dot"><span className="box-text">邀请有奖</span></Badge>
    <span className="box-text">邀请有奖</span><Badge shape="dot" />
  </>
, mountNode);
```



## 动态展示

```jsx
import { Badge, Button, Icon, Switch } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 5,
      isDotVisible: false,
    };
  }
  
  add = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  };

  minus = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  };

  onToggle = (isDotVisible) => {
    console.log(isDotVisible)
      this.setState({ isDotVisible });
  };

  render() {
    const { isDotVisible, count } = this.state;

    return (
      <div className="dot-change-box">
        <Badge text={count} shape="round">
          <div className="box-item" />
        </Badge>
        <Button.Group>
          <Button onClick={this.minus}><Icon type="minus" /></Button>
          <Button onClick={this.add}><Icon type="add" /></Button>
        </Button.Group>
        <br />
        <br />
        {
          isDotVisible
            ? <Badge><div className="box-item" /></Badge>
            : <div className="box-item" style={{ marginRight: 48 }} />
        }
        <Switch onChange={this.onToggle} value={isDotVisible} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'danger' | 设置主题，可选值 `default`、`primary`、`success`、`warning`、`danger` |
| shape | string | 'dot' | 设置形状，可选值为 `dot`、`rect`、`radius`、`round`、`circle`、`leaf` |
| text | ReactNode | - | 设置显示的文字 |
