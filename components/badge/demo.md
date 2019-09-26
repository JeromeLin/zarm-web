# Badge 徽标


## 基本用法
```jsx
import { Badge } from 'zarm-web';

ReactDOM.render(
 <div className="custom-panel">
     <div className="box">
       <Badge sup shape="dot"><div className="box-item" /></Badge>
     </div>
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
</div>
, mountNode);
```
## 多主题
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

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'danger' | 设置主题，可选值 `default`、`primary`、`success`、`warning`、`danger` |
| shape | string | 'dot' | 设置形状，可选值为 `dot`、`rect`、`radius`、`round`、`circle`、`leaf` |
| sup | bool | false | 是否上标位置 |
| text | ReactNode | - | 设置显示的文字 |
