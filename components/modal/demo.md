# Modal 模态框
在当前页面打开一个模态对话框。

## 基础用法

Modal组件的基础用法。

```jsx
import { useState } from 'react';
import { Modal, Button } from 'zarm-web';

function Demo(){
  const [visible, setVisible] = React.useState(false);
  return (
     <div className="modal-page">
        <Button theme="primary" onClick={() => setVisible(true)}>展示模态框</Button>
        <Modal
          style={{width:400}}
          destroy
          visible={visible}
          closable
          title="这是一个简单的弹框"
          onCancel={() => {setVisible(false)}}          
        >
          一系列的描述，告诉用户操作可能会发生什么事情，描述信息字号14px
        </Modal>
      </div>
  )
}

ReactDOM.render(<Demo />, mountNode);
```

## 自定义底栏

Modal默认的设置了一个footer。就是在右边的<Button>确定</Button>和取消两个按钮。
注意：自定义的Button将不会自动调用onOk和onCancel, 需要自己绑定在Button上

```jsx
import { Modal, Button } from 'zarm-web';

function Demo(){
  const [visible, setVisible] = React.useState(false);
  return (
      <div className="modal-page">
        <Button theme="primary" onClick={() => setVisible(true)}>显示弹框</Button>
        <Modal 
          visible={visible} 
          radius
          title="标题"
          footer={<Button>我是自定义的footer</Button>}
          onCancel={() => setVisible(false)} 
        >
          一系列的描述，告诉用户操作可能会发生什么事情，描述信息字号14px
        </Modal>
      </div>
    )
}

ReactDOM.render(<Demo />, mountNode);   
```

## 自定义位置
Modal组件可以使用centered是其位置垂直居中

```jsx
import { Modal, Button } from 'zarm-web';

function Demo(){
  const [ visible, setVisible ] = React.useState(false);
  return (
      <div className="modal-page">
        <Button theme="primary" onClick={() => setVisible(true)}>显示弹框</Button>
        <Modal
          centered
          visible={visible} 
          radius
          title="标题"
          onCancel={() => setVisible(false)} 
        >
          一系列的描述，告诉用户操作可能会发生什么事情，描述信息字号14px
        </Modal>
      </div>
    )
}

ReactDOM.render(<Demo />, mountNode);   
```

## 确认对话框

Modal组件提供了 Modal.confirm Modal.alert 静态方法。
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

function Demo(){
  const showConfirm = ()=> {
    Modal.confirm(options).then((result)=>{
      // result为true 表示点击了确定，为false表示点击了取消
      console.log(result);
    });
  }

  const showAlert = ()=> {
    Modal.alert(options).then(()=>{
      // 点击确定之后做的事情
    });
  }

  return (
    <div className="modal-page">
      <Button theme="primary" onClick={showConfirm}>
        Confirm
      </Button>

      <Button theme="primary" onClick={showAlert}>
        Alert
      </Button>
    </div>
  )
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

function Demo() {
  const showSuccess = ()=> {
    Modal.success(options);
  }

  const showInfo = ()=> {
    Modal.info(options);
  }

  const showWarning = ()=> {
    Modal.warning(options);
  }

  const showError = ()=>{
    Modal.error(options);
  }

  return (
    <div className="modal-page">
      <Button theme="primary" onClick={showSuccess}>
        success
      </Button>

      <Button theme="primary" onClick={showInfo}>
        info
      </Button>

      <Button onClick={showWarning}>
        warning
      </Button>

      <Button theme="danger" onClick={showError}>
        error
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode);

```

## open, close 和 destroy 静态方法

Modal.open 表示开打一个弹框。内容可以自定义。参数以Props作为属性。我们新增了一个content属性作为Modal的内容。
新增了一个key字段作为关闭的对应key。

Modal.destroy 会关闭并销毁当前显示的所有组件。

```jsx
import { Modal, Button, Input } from 'zarm-web';

function Demo() {
  const options = {
    title: 'Modal Title',
    content: <div>
        <Button onClick={()=> close()}>click to close</Button>
    </div>,
    key: 'open_key',
  }

  const open = ()=> {
    Modal.open(options);
  }

  function close(){
    Modal.close('open_key');
  }

  const destroy = ()=> {
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

  return (
    <div className="modal-page">
      <Button theme="primary" onClick={open}>
        open
      </Button>

      <Button theme="primary" onClick={destroy}>
        open destroy
      </Button>
    </div>
  );
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
| bodyStyle | CSSProperties | null | 弹框内容区域的样式 |
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



# 静态方法API

```
// 显示确认框
Modal.confirm(ReactNode|options): Promise<boolean>;

// 显示警示框
Modal.confirm(ReactNode|options): Promise<void>;

// 打开通知
Modal.open(options): { close(): void };

// 打开指定场景主题的弹框
Modal.[success|warning|info|error](options | React.ReactNode): { close(): void };

// 关闭指定弹框
Modal.close(key: string): void;

// 销毁
Modal.destroy(): void;
```
