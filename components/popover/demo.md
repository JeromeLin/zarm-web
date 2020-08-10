# Popover 气泡卡片



## 基本用法
最基本的用法。

```jsx
import { Button, Popover } from 'zarm-web';

ReactDOM.render(
  <Popover content="This is the content of the popover.">
    <Button theme="primary" size="xs">Hover me</Button>
  </Popover>
, mountNode);
```



## 触发方式
鼠标移入、聚集、点击。

```jsx
import { Button, Popover } from 'zarm-web';

ReactDOM.render(
  <>
    <Popover content="This is the content of the popover.">
      <Button>Hover me</Button>
    </Popover>
    <Popover trigger="focus" content="This is the content of the popover.">
      <Button>Focus me</Button>
    </Popover>
    <Popover trigger="click" content="This is the content of the popover.">
      <Button>Click me</Button>
    </Popover>
  </>
, mountNode);
```



## 箭头指向
设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心。

```jsx
import { Button, Popover } from 'zarm-web';

ReactDOM.render(
  <>
    <Popover direction="topLeft" content="This is the content of the popover.">
      <Button size="xs">跟随方向边缘对齐</Button>
    </Popover>
    <Popover trigger="click" direction="topLeft" arrowPointAtCenter={true} content="This is the content of the popover.">
      <Button size="xs">箭头指向中心</Button>
    </Popover>
  </>
, mountNode);
```



## 方向
共有十二个方向可供设置。

```jsx
import { useState } from 'react';
import { Button, Popover } from 'zarm-web';

ReactDOM.render(
  <div className="direction-demo">
    <div style={{ marginLeft: 80 }}>
      <Popover direction="topLeft" content="topLeft text">
        <Button size="xs">TL</Button>
      </Popover>

      <Popover direction="top" content="top text">
        <Button size="xs">Top</Button>
      </Popover>

      <Popover direction="topRight" content="topRight text">
        <Button size="xs">TR</Button>
      </Popover>
    </div>

    <div style={{ width: 80, float: 'left', clear: 'both' }}>
      <Popover direction="leftTop" content="leftTop text">
        <Button size="xs">LT</Button>
      </Popover>

      <Popover direction="left" content="left text">
        <Button size="xs">Left</Button>
      </Popover>

      <Popover direction="leftBottom" content="leftBottom text">
        <Button size="xs">LB</Button>
      </Popover>
    </div>

    <div style={{ width: 80, marginLeft: 80 * 4 + 20 }}>
      <Popover direction="rightTop" content="rightTop text">
        <Button size="xs">RT</Button>
      </Popover>

      <Popover direction="right" content="right text">
        <Button size="xs">Right</Button>
      </Popover>

      <Popover direction="rightBottom" content="rightBottom text">
        <Button size="xs">RB</Button>
      </Popover>
    </div>

    <div style={{ marginLeft: 80, clear: 'both' }}>
      <Popover direction="bottomLeft" content="bottomLeft text">
        <Button size="xs">BL</Button>
      </Popover>

      <Popover direction="bottom" content="bottom text">
        <Button size="xs">Bottom</Button>
      </Popover>

      <Popover direction="bottomRight" content="bottomRight text">
        <Button size="xs">BR</Button>
      </Popover>
    </div>
  </div>
, mountNode);
```



## 卡片内关闭
使用 `visible` 属性控制浮层显示。

```jsx
import { useState } from 'react';
import { Button, Popover } from 'zarm-web';

const Demo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      visible={visible}
      trigger="click"
      content={
        <>
          <p>This is the content of the popover. </p>
          <p>You can click <Button size="sm" onClick={() => setVisible(false)}>here</Button> to close this popover.</p>
        </>
      }
      onVisibleChange={setVisible}
    >
      <Button theme="primary">Click me</Button>
    </Popover>
  );
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| content | ReactNode | - | 显示内容 |
| direction | string | 'top' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`rightTop`、`right`、`rightBottom`、`bottomLeft`、`bottom`、`bottomRight`、`leftTop`、`left`、`leftBottom` |
| trigger | string | 'hover' | 触发方式，可选值为：`click` 点击触发状态、`hover` 鼠标经过触发、`focus` 聚焦状态触发、`manual` 受控触发、`contextMenu` 右键触发 |
