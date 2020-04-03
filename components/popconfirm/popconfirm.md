# Popconfirm 文字提示

## 基本用法
最简单的用法
```jsx
import { Popconfirm } from 'zarm-web';

function confirm(e) {
  console.log(e);
}

function cancel(e) {
  console.log(e);
}

ReactDOM.render(
  <Popconfirm
    direction="topLeft"
    content="Are you sure delete this task?"
    onOk={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <a href="javacrtip:;">Delete</a>
  </Popconfirm>
, mountNode);
```

## 自定义按钮文字
使用 okText 和 cancelText 自定义按钮文字。
```jsx
import { Popconfirm } from 'zarm-web';


ReactDOM.render(
  <Popconfirm
    direction="topLeft"
    content="Are you sure delete this task?"
    okText="确定"
    cancelText="取消"
  >
    <a href="javacrtip:;">Delete</a>
  </Popconfirm>
, mountNode);
```

## 自定义icon
使用 icon 自定义提示 icon。
```jsx
import { Popconfirm, Icon } from 'zarm-web';

ReactDOM.render(
  <Popconfirm
    icon={<Icon type="wrong-round" theme="danger" />}
    direction="topLeft"
    content="Are you sure delete this task?"
  >
    <a href="javacrtip:;">Delete</a>
  </Popconfirm>
, mountNode);
```


## 触发方式
使用 trigger 来修改触发方式
```jsx
import { Popconfirm, Button } from 'zarm-web';

ReactDOM.render(
  <div>
  <Popconfirm
    trigger='click'
    direction="topLeft"
    content="Are you sure delete this task?"
  >
    <Button>click</Button>
  </Popconfirm>
  <Popconfirm
    trigger='hover'
    direction="topLeft"
    content="Are you sure delete this task?"
  >
    <Button>hover</Button>
  </Popconfirm>
  </div>
  
, mountNode);
```


## 位置
支持各种方位, 使用 direction 来设置显示方向

```jsx
import { Popconfirm, Button } from 'zarm-web';

const Demo = () => (
  <div className="direction-demo">
        <div style={{ marginLeft: 70 }}>
          <Popconfirm direction="topLeft" content="topLeft text">
            <Button>TL</Button>
          </Popconfirm>

          <Popconfirm direction="top" content="top text">
            <Button>Top</Button>
          </Popconfirm>

          <Popconfirm direction="topRight" content="topRight text">
            <Button>TR</Button>
          </Popconfirm>
        </div>

        <div style={{ width: 70, float: "left",  clear: 'both' }}>
          <Popconfirm direction="leftTop" content="leftTop text">
            <Button>LT</Button>
          </Popconfirm>

          <Popconfirm direction="left" content="left text">
            <Button>Left</Button>
          </Popconfirm>

          <Popconfirm direction="leftBottom" content="leftBottom text">
            <Button>LB</Button>
          </Popconfirm>
        </div>

        <div style={{ width: 70, marginLeft: 70 * 4 }}>
          <Popconfirm direction="rightTop" content="rightTop text">
            <Button>RT</Button>
          </Popconfirm>

          <Popconfirm direction="right" content="right text">
            <Button>Right</Button>
          </Popconfirm>

          <Popconfirm direction="rightBottom" content="rightBottom text">
            <Button>RB</Button>
          </Popconfirm>
        </div>

        <div style={{ marginLeft: 70, clear: 'both' }}>
          <Popconfirm direction="bottomLeft" content="bottomLeft text">
            <Button>BL</Button>
          </Popconfirm>

          <Popconfirm direction="bottom" content="bottom text">
            <Button>Bottom</Button>
          </Popconfirm>

          <Popconfirm direction="bottomRight" content="bottomRight text">
            <Button>BR</Button>
          </Popconfirm>
        </div>
      </div>
);

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| content | ReactNode | - | 显示内容 |
| icon | ReactNode | - | 显示icon |
| direction | string | 'top' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`rightTop`、`right`、`rightBottom`、`bottomLeft`、`bottom`、`bottomRight`、`leftTop`、`left`、`leftBottom` |
| trigger | hover/click	 | click | 触发 |
| okText | string	 | 确认	 | 确认文案 |
| cancelText | string	 |  取消	 | 取消文案 |
| onOk | func	 | click | 点击确认时候触发的事件 |
| onCancel | func	 | click | 点击取消时候触发的事件 |



