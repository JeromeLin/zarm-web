# Popconfirm 气泡确认框
点击元素，弹出气泡式的确认框。



## 基本用法
最简单的用法。

```jsx
import { Popconfirm } from 'zarm-web';

const Demo = () => (
  <Popconfirm content="Are you sure delete this task?">
    <a href="javacrtip:;">Delete</a>
  </Popconfirm>
);

ReactDOM.render(<Demo />, mountNode);
```



## 自定义图标
使用 `icon` 属性指定自定义的图标。

```jsx
import { Popconfirm, Icon } from 'zarm-web';

const Demo = () => (
  <Popconfirm
    icon={<Icon type="wrong-round-fill" theme="danger" />}
    direction="topLeft"
    content="Are you sure delete this task?"
  >
    <a href="javacrtip:;">Delete</a>
  </Popconfirm>
);

ReactDOM.render(<Demo />, mountNode);
```



## 箭头指向
设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心。

```jsx
import { Button, Popconfirm } from 'zarm-web';

ReactDOM.render(
  <>
    <Popconfirm direction="topLeft" content="This is the content of the popconfirm.">
      <Button>跟随方向边缘对齐</Button>
    </Popconfirm>
    <Popconfirm arrowPointAtCenter direction="topLeft" content="This is the content of the popconfirm.">
      <Button>箭头指向中心</Button>
    </Popconfirm>
  </>
, mountNode);
```



## 方向
共有十二个方向可供设置。

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

    <div style={{ marginLeft: 70, clear: "both" }}>
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
| icon | ReactNode | &lt;Icon type="warning-round-fill" theme="warning" /&gt; | 图标 |
| direction | string | 'top' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`rightTop`、`right`、`rightBottom`、`bottomLeft`、`bottom`、`bottomRight`、`leftTop`、`left`、`leftBottom` |
| arrowPointAtCenter | boolean | false | 箭头是否指向目标元素中心 |
| okText | string | '确认' | 确认按钮文字 |
| cancelText | string | '取消' | 取消按钮文字 |
| onOk | () => void | - | 点击确认触发的事件 |
| onCancel | () => void | - | 点击取消触发的事件 |
