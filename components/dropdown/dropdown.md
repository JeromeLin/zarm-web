# Dropdown 下拉框

下拉框组件。

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
          visible={this.state.dropdown}
          content={overlay}
          >
            <Button theme="primary">
              toggle
            </Button>
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
          >
            <Button theme="primary">
              hover me
            </Button>
        </Dropdown>
    
        <Dropdown
          trigger="contextMenu"
          content={overlay}
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
    const { modalVisible } = this.state;
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
            <Dropdown content={overlay}>
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
| prefixCls | string | zw-dropdown |  |
| direction | Direction | bottomLeft | 设置打开方向，可选值为 bottomLeft bottomCenter bottomRight topLeft topCenter topRight bottomScreen topScreen|
| trigger | Trigger | 'click' | 设置触发方式，可选值为 `click`、`hover`、`contextMenu` |
| content | ReactNode | null | 设置弹出层的内容 |
| hideOnClick | boolean | true | 点击外部的时候是否隐藏弹出层 |
| disabled | boolean | false | 是否禁用 |
| zIndex | number | 2018 | 设置弹出层的zIndex值 |
| width | number \| string  | auto | 设置弹出层的宽度 |
| onVisibleChange | (flag: boolean): void | undefined | 设置弹出层显示或隐藏的回调函数 必填 |
| getPopupContainer | ()=> HTMLElement | undefined  | 设置弹出层的挂载点 |
| triggerBoxProps | HTMLAttributes | {}  | 设置触发层的DOM props |


