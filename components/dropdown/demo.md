# Dropdown 下拉框

下拉框组件,API与zarm popper组件一致。

## 基础用法

目前支持三种触发方式 `click hover contextMenus` , 默认值为 `click` 。
通过 `visible` 属性控制显隐。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      dropdown2:false,
      dropdown3:false,
      dropdown4:false
    }
  }

  change = (visible) => {
    this.setState({
      dropdown: visible
    });
  }
  render() {
    const overlay = ("this is content");
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        <Dropdown
          shape="radius"
          visible={this.state.dropdown}
          content={overlay}
          popperProps={{
            style: {
              width:150,
              height:150,
              padding:10,
            }
          }}
          onVisibleChange={(visible)=>{
            this.setState({
              dropdown:visible
            });
          }}
        >
           <Button>toggle</Button>
        </Dropdown>
    
        <Dropdown
          trigger="hover"
          content={overlay}
          visible={this.state.dropdown2}
          popperProps={{
            style: {
              width:150,
              height:150,
              padding:10,
            }
          }}
          onVisibleChange={(visible)=>{
            this.setState({
              dropdown2:visible
            });
          }}
        >
          <Button theme="primary">
            hover me
          </Button>
        </Dropdown>
    
        <Dropdown
          trigger="contextMenu"
          content={overlay}
          visible={this.state.dropdown3}
          popperProps={{
            style: {
              width:150,
              height:150,
              padding:10,
            }
          }}
          onVisibleChange={(visible)=>{
            this.setState({
              dropdown3:visible
            });
          }}
        >
          <Button theme="primary">
            right click me
          </Button>
        </Dropdown>
      </div>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode);
```

## 显示圆角

通过`shape=radius`设置圆角。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
    }
  }

  change = (visible) => {
    this.setState({
      dropdown: visible
    });
  }
  render() {
    const overlay = "this is content";
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        <Dropdown
          trigger="click"
          content={overlay}
          shape="radius"
          visible={this.state.dropdown}
          popperProps={{
            style: {
              width:150,
              height:150,
              padding:10,
            }
          }}
          onVisibleChange={(visible)=>{
            this.setState({
              dropdown:visible
            });
          }}
          >
            <Button theme="primary">
              click me
            </Button>
        </Dropdown>
      </div>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode);
```

## 禁用状态

通过`disable`设置禁用状态。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
    }
  }

  change = (visible) => {
    this.setState({
      dropdown: visible
    });
  }
  render() {
    const overlay = "this is content";
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        <Dropdown
          disabled
          trigger="click"
          content={overlay}
          shape="radius"
          visible={this.state.dropdown}
          triggerProps={{
            className: 'spa',
          }}
          popperProps={{
            style: {
              width:150,
              height:150,
              padding:10,
            }
          }}
          onVisibleChange={(visible)=>{
            this.setState({
              dropdown:visible
            });
          }}
          >
            <Button disabled theme="primary">
              click me
            </Button>
        </Dropdown>
      </div>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode);
```

## 弹窗的定位

定位信息有6种 `bottomLeft, bottomCenter, bottomRight, topLeft, topCenter, topRight` 。通过 `direction` 控制显示位置
demo 通过 `direction` 属性控制弹窗的位置。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      dropdown2:false,
    }
  }
  render() {
    const overlay = "this is content";
    
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        <Dropdown
          visible={this.state.dropdown}
          onVisibleChange={(visible) => {
            this.setState({
              dropdown: visible
            });
          }}
          content={overlay}
          >
            <Button theme="primary">
              点我从下面弹出
            </Button>
        </Dropdown>
    
        <Dropdown
          direction="topLeft"
          visible={this.state.dropdown2}
          onVisibleChange={visible => {
            this.setState({
              dropdown2: visible
            });
          }}
          popperProps={{
            style: {
              width:150,
              height:150,
              padding:10,
            }
          }}
          content={overlay}
          >
            <Button theme="primary">
              点我从上面弹出
            </Button>
        </Dropdown>
      </div>
    )
  }
}

ReactDOM.render(<Demo2 />, mountNode);
```

## 通过triggerProps和popperProps控制触发元素的和弹框元素的属性。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      dropdown2:false,
    }
  }
  render() {
    const overlay = "this is content";
    
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        <Dropdown
          visible={this.state.dropdown}
          onVisibleChange={(visible) => {
            this.setState({
              dropdown: visible
            });
          }}
          triggerProps={{
            style: { padding:10, display:'block',backgroundColor:'#ccc'},
          }}
          popperProps={{
            style: {
              width:150,
              height:150,
              padding:10,
            }
          }}
          content={overlay}
          >
            <Button theme="primary">
              triggerProps
            </Button>
        </Dropdown>
    
        <Dropdown
          visible={this.state.dropdown2}
          onVisibleChange={visible => {
            this.setState({
              dropdown2: visible
            });
          }}
          popperProps={{
            style: {
              width:150,
              height:150,
              padding:10,
              background:'#eee'
            }
          }}
          content={overlay}
          >
            <Button theme="primary">
              backgroundColor is gray
            </Button>
        </Dropdown>
      </div>
    )
  }
}

ReactDOM.render(<Demo2 />, mountNode);
```

## 位于Modal中的Dropdown

Modal中的弹框会根据Modal本身来定位。

```jsx
import { Dropdown, Menu, Checkbox, Button, Modal } from 'zarm-web';

class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      dropdown2:false,
    }
  }

  toggleModalVisible = ()=> {
    this.setState((state)=>{
      return {
        modalVisible: !state.modalVisible
      }
    })
  }

  render() {
    const { modalVisible,dropdown } = this.state;
    const overlay = "content here";
    return (
      <div style={{position: 'relative'}}>
        <Button onClick={this.toggleModalVisible}>显示弹框</Button>
        <Modal visible={modalVisible}>
          <Modal.Header 
            onClose={this.toggleModalVisible}
          />
          <Modal.Body>
            <Dropdown 
              content={overlay}
              visible={dropdown}
              popperProps={{
                style: {
                  width:150,
                  height:150,
                  padding:10,
                }
              }}
              onVisibleChange={(visible)=>{
                this.setState({
                  dropdown:visible
                });
              }}
            >
                <Button theme="primary">
                  显示dropdown
                </Button>
            </Dropdown>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo2 />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| className | string | - | 气泡层类名追加 |
| content | ReactNode | - | 显示内容 |
| disabled | boolean | - | 禁用触发效果 |
| shape | rect,radius  | rect | 形状为直角或圆角 |
| destroy | boolean | true | 气泡层关闭后是否移除节点 |
| getContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 Popper 挂载的 HTML 节点 |
| animationType | string | 'zoom-fade' | 可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| animationDuration | number | 200 | 动画执行时间（单位：毫秒） |
| direction | string | 'top' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`rightTop`、`right`、`rightBottom`、`bottomLeft`、`bottom`、`bottomRight`、`leftTop`、`left`、`leftBottom` |
| trigger | click,hover contextMenu | click | 设置触发方式 |
| visible | boolean | false | 是否显示 |
| onVisibleChange | (visible?: boolean) => void | noop | 显示/隐藏 气泡层触发的事件 |
| triggerProps | HTMLAttributes |  | 设置触发节点的属性 |
| popperProps | HTMLAttributes |  | 设置弹出节点的属性 |
