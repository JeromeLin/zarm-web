# Badge 徽标


## 基本用法
可用于右上角的红色圆点展示，表示有新内容或者待处理的信息。或可独立使用（不包裹任何元素）。

```jsx
import { Badge } from 'zarm-web';
ReactDOM.render(
 <div className="custom-panel">
     <div className="box" >
       <Badge sup shape="dot"><div className="box-item" /></Badge>
     </div>
     <div className="box">
         <Badge shape="round" text="4" />
     </div>
     <div className="box">
         <Badge theme="primary" shape="round" text="免费" />
     </div>
</div>
, mountNode);
```

## 多种形状
有五种形状可供选择（dot、rect、radius、round、circle、leaf）。默认为点状"dot"展示。

```jsx
import { Badge } from 'zarm-web';

ReactDOM.render(
 <div className="custom-panel">
     <div className="box">
       <Badge sup shape="rect" text="免费"><div className="box-item" /></Badge>
     </div>
     <div className="box">
       <Badge sup shape="radius" text="new"><div className="box-item" /></Badge>
     </div>
     <div className="box">
       <Badge sup shape="round" text="999+"><div className="box-item" /></Badge>
     </div>
     <div className="box">
       <Badge sup shape="circle" text="3"><div className="box-item" /></Badge>
     </div>
     <div className="box">
       <Badge sup shape="leaf" text="新品"><div className="box-item" /></Badge>
     </div>
     <div className="box">
       <Badge sup><div className="box-item" /></Badge>
     </div>
</div>
, mountNode);
```

## 多主题
设置主题，有五种主题可供选择(default、primary、success、warning、danger)，默认为'danger''
```jsx
import { Badge } from 'zarm-web';

ReactDOM.render(
  <div className="custom-panel">
      <div className="box">
        <Badge theme="primary" />
      </div>
      <div className="box">
        <Badge theme="success" />
      </div>
      <div className="box">
        <Badge theme="warning" />
      </div>
      <div className="box">
        <Badge theme="danger" />
      </div>
      <div className="box">
        <Badge shape="round" text="999+" theme="primary" />
      </div>
      <div className="box">
        <Badge shape="round" text="999+" theme="success" />
      </div>
      <div className="box">
        <Badge shape="round" text="999+" theme="warning" />
      </div>
      <div className="box">
        <Badge shape="round" text="999+" theme="danger" />
      </div>
    </div>
, mountNode);
```

## 文本示例
```jsx
import { Badge } from 'zarm-web';

ReactDOM.render(
  <div className="text-panel">
      <div className="box">
        <Badge sup shape="dot"><span className="box-text">邀请有奖</span></Badge>
      </div>
      <div className="box">
        <span className="box-text">邀请有奖</span><Badge sup shape="dot"/>
      </div>
    </div>
, mountNode);
```

## 动态展示
```jsx
import { Badge, Button, Icon, Switch } from 'zarm-web';

const ButtonGroup = Button.Group;
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
          <div>
            <Badge sup text={count} shape="round">
              <div className="box-item" />
            </Badge>
            <ButtonGroup>
              <Button theme="primary" onClick={this.minus}>
                <Icon type="minus" />
              </Button>
              <Button theme="primary" onClick={this.add}>
                <Icon type="add" />
              </Button>
            </ButtonGroup>
          </div>
          <div>
           {
               isDotVisible
                 ? (
                   <Badge sup>
                     <div className="box-item" />
                   </Badge>
                 ) : (<div className="box-item" style={{ display: 'inline-block', verticalAlign: 'top' }} />)
           }
            <Switch onChange={this.onToggle} value={isDotVisible} />
          </div>
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
| sup | bool | false | 是否上标位置 |
| text | ReactNode | - | 设置显示的文字 |
