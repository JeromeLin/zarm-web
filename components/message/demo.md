# Message 全局提示

全局展示操作反馈信息。

## 基本用法

Message.open( options: object )

```js
import { Message, Button } from 'zarm-web';

class Demo extends React.Component {
  showMessage() {
    Message.open({
      message:
        '这是一条消息提示，出现在网站顶部8s后消失这是一条消息提示，出现在网站顶部8s后消失这是一条消息提示，出现在网站顶部8s后消失这是一条消息提示，出现在网站顶部8s后消失这是一条消息提示，出现在网站顶部8s后消失',
      stayTime: 8000
    });
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.showMessage()}>弹出</Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 带有图标

常用来显示「成功、警告、消息、错误」类的系统消息
Message.[ success | warning | info | error ] ( options: object | string )

```js
import { Message, Button } from 'zarm-web';

class Demo extends React.Component {
  showSuccess() {
    Message.success('这是一条成功的消息，出现在网站顶部3s后消失');
  }
  showError() {
    Message.error('这是一条错误的消息，出现在网站顶部3s后消失');
  }
  showWarning() {
    Message.warning('这是一条警告的消息，出现在网站顶部3s后消失');
  }
  showInfo() {
    Message.info('这是一条普通的消息，出现在网站顶部3s后消失');
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.showWarning()}>警告消息</Button>
        <Button onClick={() => this.showSuccess()}>成功消息</Button>
        <Button onClick={() => this.showError()}>错误消息</Button>
        <Button onClick={() => this.showInfo()}>普通消息</Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 带关闭回调

{ onClose: Function }

```js
import { Message, Button } from 'zarm-web';

class Demo extends React.Component {
  showMessage() {
    Message.success({
      message: '这是一条带关闭回调的的消息',
      onClose() {
        alert('消息关闭了');
      }
    });
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.showMessage()}>弹出</Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 主动关闭

instance.close()

```js
import { Message, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {
    visible: false
  };
  showMessage() {
    this.instance = Message.success({
      message: '主动关闭示例',
      stayTime: 80000
    });
    this.setState({ visible: true });
  }
  closeMsg() {
    this.setState({ visible: false });
    this.instance.close();
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.showMessage()}>弹出</Button>
        <Button disabled={!this.state.visible} onClick={() => this.closeMsg()}>
          关闭
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 参数     | 说明             | 类型            | 可选值                        | 默认值 |
| -------- | ---------------- | --------------- | ----------------------------- | ------ |
| type     | 类型             | string          | success, warning, error, info | info   |
| message  | 展示内容         | string          | -                             | -      |
| stayTime | 显示时长(ms)     | number          | -                             | 3000   |
| onClose  | 关闭时的回调函数 | (event) => void | —                             | —      |
