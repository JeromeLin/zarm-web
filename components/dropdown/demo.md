# Dropdown 下拉框

下拉框组件,API与zarm popper组件一致。

## 基础用法

最简单的下拉菜单。

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
    const overlay = (
      <ul class="dropdown-ul-list">
        <li>小明</li>
        <li>小红</li>
        <li>小白</li>
        <li>小黄</li>
      </ul>
    );
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        <Dropdown
          shape="radius"
          visible={this.state.dropdown}
          content={overlay}
          trigger="click"
          onVisibleChange={(visible)=>{
            this.setState({
              dropdown:visible
            });
          }}
        >
           <Button>toggle</Button>
        </Dropdown>
      </div>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode);
```


## 弹窗的定位

定位信息有 topLeft、top、topRight、rightTop、right、rightBottom、bottomLeft、bottom、bottomRight、leftTop、left、leftBottom 
使用 direction 属性控制弹窗的位置。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown0: false,
      dropdown1:false,
      dropdown2:false,
      dropdown3:false,
      dropdown4:false,
      dropdown5:false,
      dropdown6:false,
    }
  }
  render() {
     const overlay = (
      <ul class="dropdown-ul-list">
        <li>小明</li>
        <li>小红</li>
        <li>小白</li>
        <li>小黄</li>
      </ul>
    );
    const c = [
      'topLeft','top','topRight','rightTop','right','rightBottom','bottomLeft','bottom','bottomRight','leftTop','left','leftBottom'
    ];
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        {
          c.map((item, index)=>{
            return (
              <Dropdown
                key={item}
                direction={item}
                visible={this.state[`dropdown${index}`]}
                onVisibleChange={(visible) => {
                  this.setState({
                    [`dropdown${index}`]: visible
                  });
                }}
                content={overlay}
              >
                <Button theme="primary">
                  {item}
                </Button>
              </Dropdown>
            );
          })
        }
      </div>
    )
  }
}

ReactDOM.render(<Demo2 />, mountNode);
```

## 三种触发方式

通过 trigger设置触发方式。
有三种可选方式 click, hover, contextMenu

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown0: false,
      dropdown1: false,
      dropdown2: false,
    }
  }

  render() {
     const overlay = (
      <ul class="dropdown-ul-list">
        <li>小明</li>
        <li>小红</li>
        <li>小白</li>
        <li>小黄</li>
      </ul>
    );
    const triggerList = ['click','hover','contextMenu'];
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        {
          triggerList.map((item,index)=>{
            return (
              <Dropdown
                key={item}
                trigger={item}
                content={overlay}
                shape="radius"
                visible={this.state[`dropdown${index}`]}
                onVisibleChange={(visible)=>{
                  this.setState({
                    [`dropdown${index}`]: visible,
                  });                
                }}
              >
                <Button theme="primary">
                  {item}
                </Button>
              </Dropdown>
            )
          })
        }
      </div>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode);
```


## 显示圆角

通过 shape=radius 设置圆角。

```jsx
import { Dropdown, Menu, Checkbox, Button } from 'zarm-web';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
    }
  }

  onChange = (visible) => {
    this.setState({
      dropdown: visible
    });
  }
  render() {
     const overlay = (
      <ul class="dropdown-ul-list">
        <li>小明</li>
        <li>小红</li>
        <li>小白</li>
        <li>小黄</li>
      </ul>
    );
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
          onVisibleChange={this.onChange}
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

## 组件通过onVisibleChange通知弹框的显示信息。
点击触发元素后，组件需要通过onVisibleChange来告知弹框的显示状态

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
    const overlay = (
      <ul class="dropdown-ul-list">
        <li>小明</li>
        <li>小红</li>
        <li>小白</li>
        <li>小黄</li>
      </ul>
    );
    
    return (
      <div className="dropdown-trigger-box" style={{position: 'relative'}}>
        <Dropdown
          visible={this.state.dropdown}
          onVisibleChange={(visible) => {
            this.setState({
              dropdown: visible
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
              click me
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
    const { modalVisible, dropdown, dropdown2 } = this.state;
    const overlay = (
      <ul class="dropdown-ul-list">
        <li>小明</li>
        <li>小红</li>
        <li>小白</li>
        <li>小黄</li>
      </ul>
    );
    return (
      <div style={{position: 'relative'}}>
        <Button onClick={this.toggleModalVisible}>显示弹框</Button>
        <Modal visible={modalVisible}>
          <Modal.Header 
            onClose={this.toggleModalVisible}
          />
          <Modal.Body className="dropdown-trigger-box">
            <Dropdown
              name="zujianA"
              content={overlay}
              visible={dropdown}
              onVisibleChange={(visible)=>{
                this.setState({
                  dropdown:visible
                });
              }}
            >
                <Button className="modal-inner-btn" theme="primary">
                  显示dropdown
                </Button>
            </Dropdown>

            <Dropdown
              name="zujianB"
              content={overlay}
              visible={dropdown2}
              onVisibleChange={(visible)=>{
                this.setState({
                  dropdown2:visible
                });
              }}
            >
                <Button className="modal-inner-btn" theme="primary">
                  显示dropdown2
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
