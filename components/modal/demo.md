# Modal 模态框
在当前页面打开一个模态对话框。

## 基础用法

Modal组件的基础用法。

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
      <div className="modal-page">
        <Button theme="primary" onClick={() => this.toggleModal('modalVisible')}>展示模态框</Button>
        <Modal
          disableBodyScroll
          visible={modalVisible}
          closable
          title="这是一个简单的弹框"
          onCancel={() => {this.toggleModal('modalVisible')}}
        >
            我是模态框
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## 不同的动画

支持多种展示动画。
可以通过`animationType`属性设置不同的动画方式，默认`zoom`。

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
      animationType: animationType || this.state.animationType,
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

## 直角模态框
可以设置直角模态框。
使用shape="rect"属性设置直角

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
        <Button theme="primary" onClick={() => this.toggleModal()}>圆角模态框</Button>
        <Modal 
          shape="rect"
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
注意：自定义的Button将不会自动调用onOk和onCancel, 需要自己绑定在Button上

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
        <Button theme="primary" onClick={() => this.toggleModal()}>显示弹框</Button>
        <Modal 
          visible={modalVisible} 
          radius
          title="标题"
          footer={<Button>我是自定义的footer</Button>}
          onCancel={() => this.toggleModal()} 
        >
          一系列的描述，告诉用户操作可能会发生什么事情，描述信息字号14px
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode);   
```

## 无footer的模态框
footer属性为null的时候，不显示footer。
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
        <Button theme="primary" onClick={() => this.toggleModal()}>显示弹框</Button>
        <Modal
          className="title-background"
          visible={modalVisible} 
          radius
          title="激活"
          footer={null}
          onCancel={() => this.toggleModal()} 
        >
          该账号已激活
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode);   
```



## 在modal内部滚动

当我们需要做到在Modal的body内部滚动的时候，需要自己受到添加一些css属性。基础如下
```
.scroll-in-modal {
  height: '100%';

  .za-popup {
    height: 100%;
    max-height: 80%;
  }
}
```

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
        <Button theme="primary" onClick={() => this.toggleModal('modalVisible')}>展示模态框</Button>
        <Modal
          className="scroll-in-modal"
          title="我是弹框1"
          visible={modalVisible} 
          animationType="slideRight" 
          onCancel={() => {this.toggleModal('modalVisible')}}
        >
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
          我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />我是模态框<br />
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
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
        <Button theme="primary" onClick={() => this.toggleModal('modalVisible')}>展示模态框</Button>
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

可以使用 success info  warning error 静态方法。它可以直接传一个ReactNode，或者Modal的Props作为属性。
我们新增了一个content属性作为Modal的内容。

```jsx
import { Modal, Button, Input } from 'zarm-web';

const options = {
  title: 'Modal Title',
  content: 'This is the content of the modal. This is the content of the modal. This is the content of the modal. ',
};

class Demo extends React.Component {
  showSuccess = ()=> {
    Modal.success(options);
  }

  showInfo = ()=> {
    Modal.info(options);
  }

  showWarning = ()=> {
    Modal.warning(options);
  }

  showError = ()=>{
    Modal.error(options);
  }

  render() {
    return (
      <div className="modal-page">
        <Button theme="primary" onClick={this.showSuccess}>
          success
        </Button>

        <Button theme="primary" onClick={this.showInfo}>
          info
        </Button>

        <Button onClick={this.showWarning}>
          warning
        </Button>

        <Button theme="danger" onClick={this.showError}>
          error
        </Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);

```

## confirm 和 alert 静态方法

可以使用 Modal.confirm Modal.alert  静态方法。
它可以直接传一个ReactNode，或者Modal的Props作为属性。
我们新增了一个content属性作为Modal的内容。

confirm 的模态框内置了两个按钮，取消 和 确定。
alert 的模态框内置了一个按钮，确定。

```jsx
import { Modal, Button, Input } from 'zarm-web';

const options = {
  title: 'Modal Title',
  content: 'This is the content of the modal. This is the content of the modal. This is the content of the modal. ',
};

class Demo extends React.Component {
  showConfirm = ()=> {
    Modal.confirm(options).then((result)=>{
      // result为true 表示点击了确定，为false表示点击了取消
      console.log(result);
    });
  }

  showAlert = ()=> {
    Modal.alert(options).then(()=>{
      // 点击确定之后做的事情
    });
  }

  render() {
    return (
      <div className="modal-page">
        <Button theme="primary" onClick={this.showConfirm}>
          Confirm
        </Button>

        <Button theme="primary" onClick={this.showAlert}>
          Alert
        </Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);

```

## open, close 和 destroy 静态方法

Modal.open 表示开打一个弹框。内容可以自定义。参数以Props作为属性。我们新增了一个content属性作为Modal的内容。
新增了一个key字段作为关闭的对应key。

Modal.destroy 会关闭并销毁当前显示的所有组件。

```jsx
import { Modal, Button, Input } from 'zarm-web';

class Demo extends React.Component {
  options = {
    title: 'Modal Title',
    content: <div>
        <Button onClick={()=> this.close()}>click to close</Button>
    </div>,
    key: 'open_key',
  }

  open = ()=> {
    Modal.open(this.options);
  }

  close = ()=> {
    Modal.close('open_key');
  }

  destroy = ()=> {
    Modal.open({
      content: '待销毁1',
    });
    
    setTimeout(()=>{
      Modal.open({
        content: '待销毁2',
      });

      setTimeout(()=>{
        Modal.open({
          content: (
            <div>
              <Button onClick={()=>Modal.destroy()}>
                点我销毁全部的弹框
              </Button>
            </div>
          ),
        });
      }, 500);
    },500);
  }

  render() {
    return (
      <div className="modal-page">
        <Button theme="primary" onClick={this.open}>
          open
        </Button>

        <Button theme="primary" onClick={this.destroy}>
          open destroy
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);

```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :---            | :--- | :--- | :--- |
| visible         | boolean | false | Modal是否显示 |
| prefixCls       | string | 'zw-modal' | |
| okText          | ReactNode | '确定' |  确定按钮的文字内容  |
| cancelText      | ReactNode | '取消' |  取消按钮的文字内容  |
| closable | boolean | true |  是否显示关闭按钮  |
| title | ReactNode | null |  标题内容  |
| shape | 'rect' \| 'radius' | 'radius' |  设置弹框角形状，'rect'为直角, 'radius'为圆角  |
| footer | ReactNode \| ()=> ReactNode  | 取消按钮 确定按钮 |  modal的footer的内容，为null时不显示footer |
| centered | boolean  | true |  是否居中显示 |
| onOk | ()=> void  | null | 点击确定按钮的回调函数 |
| onCancel | ()=> void  | null |  点击取消按钮和关闭按钮的回调函数 |
| autoFocus | boolean  | true |  弹框显示后自动聚焦到弹框上 |
| disableEscapeKeyDown | boolean  | false |  禁用按esc键关闭当前弹框 |
| disableEnterKeyDown  | boolean  | false |  禁用按回车键自动触发onOk回调函数 |
| animationType | AnimationType | zoom | 动画效果，可选值 fade, door, flip, rotate, zoom,moveUp, moveDown, moveLeft, moveRight,slideUp, slideDown, slideLeft, slideRight |
| mask | boolean | true | 是否显示半透明背景层 |
| disableBodyScroll | boolean | true | 显示弹框的时候是否关闭body滚动 |
| destroy | boolean | false | 是否在关闭弹框后删除节点 |
| afterOpen | ()=>void | - |  设置打开之后的回调函数 |
| afterClose | ()=>void | - |  设置完全关闭之后的回调函数 |
| onMaskClick | ()=>void | - |  设置点击背景层时候的回调函数 |
| getContainer | ()=>Element | - | 设置Modal的挂载点 默认为Body |




