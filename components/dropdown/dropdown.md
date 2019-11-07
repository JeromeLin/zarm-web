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
    const overlay = <Menu>
                <Menu.Item><Checkbox value="name">姓名</Checkbox></Menu.Item>
                <Menu.Item><Checkbox value="age">年龄</Checkbox></Menu.Item>
              </Menu>;
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        <Dropdown
          shape="radius"
          visible={this.state.dropdown}
          content={overlay}
          visible={this.state.dropdown2}
          onVisibleChange={(visible)=>{
            this.setState({
              dropdown2:visible
            });
          }}
          >
           <Button>toggle</Button>
        </Dropdown>
    
        <Dropdown
          disabled
          content={overlay}
          >
            <Button disabled theme="primary">
              disabled
            </Button>
        </Dropdown>
    
        <Dropdown
          trigger="hover"
          content={overlay}
          visible={this.state.dropdown3}
          onVisibleChange={(visible)=>{
            this.setState({
              dropdown3:visible
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
          visible={this.state.dropdown4}
          onVisibleChange={(visible)=>{
            this.setState({
              dropdown4:visible
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
    const overlay = <Menu>
                <Menu.Item><Checkbox value="name">姓名</Checkbox></Menu.Item>
                <Menu.Item><Checkbox value="age">年龄</Checkbox></Menu.Item>
              </Menu>;
    
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
    const overlay = <Menu>
                <Menu.Item><Checkbox value="name">姓名</Checkbox></Menu.Item>
                <Menu.Item><Checkbox value="age">年龄</Checkbox></Menu.Item>
                <Menu.Item><Checkbox value="12">性别</Checkbox></Menu.Item>
                <Menu.Item><Checkbox value="12">属性</Checkbox></Menu.Item>
                <Menu.Item><Checkbox value="12">其他</Checkbox></Menu.Item>
              </Menu>;
    
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
| hasArrow | boolean | false | 是否显示箭头节点<font color="red">（注：需要自行定义箭头样式）</font> |
| destroy | boolean | true | 气泡层关闭后是否移除节点 |
| getContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 Popper 挂载的 HTML 节点 |
| animationType | string | 'zoom-fade' | 可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| animationDuration | number | 200 | 动画执行时间（单位：毫秒） |
| arrowPointAtCenter | boolean | false | 箭头是否指向目标元素中心 |
| direction | string | 'top' | 显示方向，可选值 `topLeft`、`top`、`topRight`、`rightTop`、`right`、`rightBottom`、`bottomLeft`、`bottom`、`bottomRight`、`leftTop`、`left`、`leftBottom` |
| trigger | click,hover contextMenu | click | 设置触发方式 |
| visible | boolean | false | 是否显示 |
| onVisibleChange | (visible?: boolean) => void | noop | 显示/隐藏 气泡层触发的事件 |
| triggerProps | HTMLAttributes |  | 设置触发节点的属性 |


