# Dropdown 下拉框
向下弹出的容器。



## 基础用法
下拉菜单最基本的使用方式。

```jsx
import { Dropdown, Button } from 'zarm-web';

ReactDOM.render(
  <Dropdown
    content={
      <div style={{ width: 200, height: 100, padding: '8px 12px' }}>Dropdown Content</div>
    }
  >
    <Button theme="primary">Click me</Button>
  </Dropdown>,
  mountNode
);
```



## 受控的下拉框
外部控制下拉框的显示与隐藏。

```jsx
import { Dropdown, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {
    visible: false,
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  onVisibleChange = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { visible } = this.state;

    const overlay = (
      <div style={{ width: 300, height: 100, padding: '8px 12px' }}>
        <Button onClick={this.onClose}>Click me will close the dropdown</Button>
      </div>
    );

    return (
        <Dropdown
          visible={visible}
          onVisibleChange={this.onVisibleChange}
          content={overlay}
        >
          <Button theme="primary">Click me</Button>
        </Dropdown>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 弹窗的定位
使用 direction 属性设置弹窗的位置，支持 6 个弹出位置。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

const directionMap = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight'];
const overlay = <div style={{ width: 200, height: 100, padding: '8px 12px' }}>Dropdown Content</div>;

ReactDOM.render(
  <>
    {
      directionMap.map((item, index) => (
        <Dropdown
          key={+index}
          direction={item}
          content={overlay}
        >
          <Button>{item}</Button>
        </Dropdown>
      ))
    }
  </>,
  mountNode,
);
```



## 三种触发方式
通过 trigger 属性设置触发方式。
有 click, hover, contextMenu 三种可选方式。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

const triggerMap = ['click','hover','contextMenu'];
const overlay = <div style={{ width: 200, height: 100, padding: '8px 12px' }}>Dropdown Content</div>;

ReactDOM.render(
  <>
    {
      triggerMap.map((item, index) => (
        <Dropdown
          key={+index}
          trigger={item}
          content={overlay}
        >
          <Button>{item}</Button>
        </Dropdown>
      ))
    }
  </>,
  mountNode,
);
```



## 显示直角
通过 `shape` 设置容器的边缘形状。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

ReactDOM.render(
  <Dropdown
    shape="rect"
    content={
      <div style={{ width: 200, height: 100, padding: '8px 12px' }}>
        Dropdown Content
      </div>
    }
  >
    <Button theme="primary">Click me</Button>
  </Dropdown>,
  mountNode,
);
```



## 禁用状态
通过 `disable` 设置禁用状态。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

ReactDOM.render(
  <Dropdown
    disabled
    content={
      <div style={{ width: 200, height: 100, padding: '8px 12px' }}>
        Dropdown Content
      </div>
    }
  >
    <Button disabled theme="primary">Click me</Button>
  </Dropdown>,
  mountNode,
);
```



## 位于模态框中的下拉框
模态框中的下拉框层级会置于模态框之上。

```jsx
import { Dropdown, Menu, Checkbox, Button, Modal } from 'zarm-web';

const overlay = (
  <div style={{ width: 300, height: 100, padding: '8px 12px' }}>
    Dropdown Content
  </div>
);

class Demo extends React.Component {
  state = {
    modalVisible: false,
  };

  toggleModalVisible = () => {
    this.setState((state) => {
      return {
        modalVisible: !state.modalVisible
      }
    });
  };

  render() {
    const { modalVisible } = this.state;

    return (
      <>
        <Button theme="primary" onClick={this.toggleModalVisible}>Open</Button>
        <Modal visible={modalVisible}>
          <Modal.Header onClose={this.toggleModalVisible} />
          <Modal.Body>
            <Dropdown
              content={
                <div style={{ width: 300, height: 100, padding: '8px 12px' }}>
                  Dropdown Content1
                </div>
              }
            >
              <Button>Button1</Button>
            </Dropdown>
            <Dropdown
              content={
                <div style={{ width: 300, height: 100, padding: '8px 12px' }}>
                  Dropdown Content2
                </div>
              }
            >
              <Button>Button2</Button>
            </Dropdown>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| content | ReactNode | - | 显示内容 |
| disabled | boolean | - | 禁用触发效果 |
| shape | string | 'radius' | 容器形状，可选值为 `rect`、`radius` |
| destroy | boolean | true | 气泡层关闭后是否移除节点 |
| getContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 Popper 挂载的 HTML 节点 |
| animationType | string | 'zoom-fade' | 可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| animationDuration | number | 200 | 动画执行时间（单位：毫秒） |
| direction | string | 'bottomLeft' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`bottomLeft`、`bottom`、`bottomRight` |
| trigger | string | 'click' | 设置触发方式，可选值为 `click`、`hover`、`contextMenu` |
| visible | boolean | false | 是否显示 |
| onVisibleChange | (visible?: boolean) => void | - | 显示/隐藏 气泡层触发的事件 |
