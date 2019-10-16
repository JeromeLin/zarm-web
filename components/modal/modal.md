# Modal 模态框
在当前页面打开一个模态对话框。

## 基础用法

Modal组件的基础用法。

demo 可以通过`Modal.Header`,`Modal.Body`,`Modal.Footer`子组件定义模态框的不同部分。

```jsx
import { Modal, Button } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  toggleModal(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <div class="modal-page">
        <Button theme="info" onClick={() => this.toggleModal('modalVisible')}>展示模态框</Button>
        <Modal
          visible={modalVisible}
          closable
          title="这是一个简单的弹框"
          onCancel={() => {this.toggleModal('modalVisible')}}
          onOk={()=> alert("您点击了确定按钮")}
        >
            我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/> 
            我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/> 
            我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/> 
            我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/>我是模态框 <br/> 
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## 不同的动画

支持多种展示动画。

:::demo 可以通过`animationType`属性设置不同的动画方式，默认`zoom`。

```jsx
import { Modal, Button } from 'zarm-web';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animationType: 'zoom'
    };
  }
  toggleModal(animationType) {
    this.setState({
      modalVisible: !this.state.modalVisible,
      animationType
    });
  }
  render() {
    const { modalVisible, animationType } = this.state;
    return (
      <div className="modal-page buttons">
        <Button onClick={() => this.toggleModal('zoom')}>zoom</Button>
        <Button onClick={() => this.toggleModal('door')}>door</Button>
        <Button onClick={() => this.toggleModal('flip')}>flip</Button>
        <Button onClick={() => this.toggleModal('rotate')}>rotate</Button>
        <Button onClick={() => this.toggleModal('slideUp')}>slideUp</Button>
        <Button onClick={() => this.toggleModal('slideDown')}>slideDown</Button>
        <Button onClick={() => this.toggleModal('slideLeft')}>slideLeft</Button>
        <Button onClick={() => this.toggleModal('slideRight')}>slideRight</Button>
        <Button onClick={() => this.toggleModal('moveUp')}>moveUp</Button>
        <Button onClick={() => this.toggleModal('moveDown')}>moveDown</Button>
        <Button onClick={() => this.toggleModal('moveLeft')}>moveLeft</Button>
        <Button onClick={() => this.toggleModal('moveRight')}>moveRight</Button>
        <Modal 
          visible={modalVisible}
          animationType={animationType} 
          title="标题"
          onCancel={() => this.toggleModal()}
        >
          我是一个模态框
        </Modal>
      </div>
    )
  }
}
ReactDOM.render(<Demo />, mountNode); 
```

## 圆角模态框
可以设置圆角模态框。
Demo 使用`radius`属性设置圆角

```jsx
import { Modal, Button } from 'zarm-web';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <div className="modal-page">
        <Button theme="info" onClick={() => this.toggleModal()}>圆角模态框</Button>
        <Modal 
          visible={modalVisible} 
          radius
          title="标题"
          onCancel={() => this.toggleModal()} 
        >
          我是一个模态框
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode);   
```

## 自定义Footer

Modal默认的设置了一个footer。就是在右边的<Button>确定</Button>和取消两个按钮。
注意：自定义的Button将不会自动调用onOk和onCancel

```jsx
import { Modal, Button } from 'zarm-web';

class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <div className="modal-page">
        <Button theme="info" onClick={() => this.toggleModal()}>显示弹框</Button>
        <Modal 
          visible={modalVisible} 
          radius
          title="标题"
          footer={<Button>我才是真正的footer</Button>}
          onCancel={() => this.toggleModal()} 
        >
          不 你不是
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode);   
```



## 多个Modal的叠加显示

当页面中有Modal组件显示的时候，我们再显示一个Modal组件，两个Modal组件就会层叠在一起，这对界面显示很不友好。
Modal组件使用了内部管理组件实例的方式，做了以下处理。
+ 当显示一个Modal时，如果当前页面已有显示的Modal，则会隐藏已有的Modal
+ 关闭当前Modal时，会显示上一个被隐藏的Modal
+ 当props.hideWhenShowOthers 为false时，改弹框不会被隐藏。

```jsx
import { Modal, Button } from 'zarm-web';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisible4: false,
    };
  }
  toggleModal(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  render() {
    const { modalVisible, modalVisible2, modalVisible3, modalVisible4 } = this.state;
    return (
      <div className="modal-page">
        <Button theme="info" onClick={() => this.toggleModal('modalVisible')}>展示模态框</Button>
        <Modal 
          title="我是弹框1"
          visible={modalVisible} 
          animationType="slideRight" 
          onCancel={() => {this.toggleModal('modalVisible')}}
        >
          我是模态框<br />
          <Button onClick={() => this.toggleModal('modalVisible2')}>显示Modal2</Button>
        </Modal>

        <Modal
          visible={modalVisible2} 
          onCancel={() => this.toggleModal('modalVisible2')} 
          animationType="slideRight" 
          title="我是弹框2" 
        >
            我是模态框2<br />
            <Button onClick={() => this.toggleModal('modalVisible3')}>显示Modal3</Button>
        </Modal>

        <Modal 
          visible={modalVisible3}
          animationType="slideRight"
          onCancel={() => this.toggleModal('modalVisible3')}
          title="弹框3"
        >
          我是模态框3 <br />
          <Button onClick={() => this.toggleModal('modalVisible4')}>显示Modal4</Button>
        </Modal>
        
        <Modal 
          visible={modalVisible4}
          animationType="zoom"
          onCancel={() => this.toggleModal('modalVisible4')}
          title="弹框4"
        >
          我是模态框4
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 静态方法调用

可以使用Alert和Confirm静态方法。它可以直接传一个ReactNode，或者Modal的Props作为属性。我们新增了一个content属性作为Modal的内容。
静态方法的调用可以使用很多方式去承接，比如我们想执行点击之后的回调可以使用以下方法
可以使用onOk和onCancel去处理。但是也可以使用Promise的方式来处理。

```jsx
import { Modal, Button } from 'zarm-web';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  toggleModal(key) {
    this.setState({
      [key]: !this.state[key]
    });
  }

  render() {
    return (
      <div class="modal-page">
        <Button 
          theme="info" 
          onClick={() => Modal.Alert({
            content:"发生了一些事情",
            title:"提示"
          })}
        >
          Alert
        </Button>
        <Button 
          theme="info" 
          onClick={() => Modal.Confirm({
            content:"删除无法恢复哦",
            title:"确认删除吗",
            theme:"warning"
          })}
        >
          Confirm
        </Button>

        <Button 
          theme="info" 
          onClick={() => {
            Modal.Confirm({
              content:"删除无法恢复哦",
              title:"确认删除吗",
              theme:"warning"
            }).then((result)=>{
              console.log(result);
              alert(`您点击了${result?'确定':'取消'}`);
            })
          }}
        >
          Confirm with Promise
        </Button>

        <Button
          theme="info" 
          onClick={() => {
            Modal.Confirm({
              content:"删除无法恢复哦",
              title:"确认删除吗",
              theme:"warning",
              onOk:()=> {
                alert('因为您在onOk里返回了false,所以无法关闭该弹框');
                // 可以return Promise。弹框会在Promise resolve之后关闭。如果Promise是reject的状态 或者是resolve(false),将不会关闭弹框。
                return false;
              }
            })
          }}
        >
          阻止弹框关闭
        </Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);

```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | Modal是否显示 |
| prefixCls | string | zw-modal | |
| okText | ReactNode | 确定 |  确定按钮的文字内容  |
| cancelText | ReactNode | 取消 |  取消按钮的文字内容  |
| closable | boolean | true |  是否显示关闭按钮  |
| title | ReactNode | null |  标题内容  |
| footer | ReactNode \| ()=> ReactNode  | 取消按钮 确定按钮 |  modal的footer的内容，为null时不显示footer |
| centered | boolean  | true |  是否居中显示 |
| onOk | ()=> void  | null | 点击确定按钮的回调函数 |
| onCancel | ()=> void  | null |  点击取消按钮和关闭按钮的回调函数 |
| autoFocus | boolean  | true |  弹框显示后自动聚焦到弹框上 |
| disableEscapeKeyDown | boolean  | false |  禁用按esc键关闭当前弹框 |
| disableEnterKeyDown  | boolean  | false |  禁用按回车键自动触发onOk回调函数 |
| scrollInModal | boolean | false |  是否开启在modal内部滚动 |
| zIndex | number | 2018|设置modal弹框的zIndex值 |
| animationType | AnimationType | zoom | 弹出动画的方式 |
| mask | boolean | true | 是否显示半透明背景层 |
| disableBodyScroll | boolean | true | 显示弹框的时候是否关闭body滚动 |
| destroy | boolean | false | 是否在关闭弹框后删除节点 |
| afterOpen | ()=>void | undefined |  设置打开之后的回调函数 |
| afterClose | ()=>void | undefined |  设置完全关闭之后的回调函数 |
| onMaskClick | ()=>void | undefined |  设置点击背景层时候的回调函数 |
| getContainer | ()=>Element | undefined | 设置Modal的挂载点 默认为Body |




