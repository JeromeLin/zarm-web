# Notification 通知框

悬浮出现在页面右上角, 适合复杂类型或者系统主动推送的消息通知提示。

## 基本用法

Notification.open( options: object )

```js
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.open.bind(this)}>会自动关闭</Button>
        <Button onClick={this.open2.bind(this)}>不会自动关闭</Button>
      </div>
    );
  }
  open() {
    Notification.open({
      title: '标题名称',
      message:
        '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
    });
  }
  open2() {
    Notification.open({
      title: '提示',
      message: '这是一条不会自动关闭的通知',
      stayTime: 0
    });
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 带有图标

常用来显示「成功、警告、消息、错误」类的系统通知

Notification.[ success | warning | info | error ] ( options: object | string | ReactElement )

```js
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.open3.bind(this)}>成功</Button>
        <Button onClick={this.open4.bind(this)}>警告</Button>
        <Button onClick={this.open5.bind(this)}>消息</Button>
        <Button onClick={this.open6.bind(this)}>错误</Button>
      </div>
    );
  }
  open3() {
    Notification.success({
      title: '成功',
      message: '这是一条成功的通知'
    });
  }
  open4() {
    Notification.warning({
      title: '警告',
      message: '这是一条警告的通知'
    });
  }
  open5() {
    Notification.info({
      title: '消息',
      message: '这是一条消息的通知'
    });
  }
  open6() {
    Notification.error({
      title: '错误',
      message: '这是一条错误的通知'
    });
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 自定义底部按钮

{ btn: ReactElement }

```js
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.open.bind(this)}>自定义按钮1</Button>
        <Button onClick={this.open2.bind(this)}>自定义按钮2</Button>
      </div>
    );
  }
  open() {
    let instance;
    const btn = (
      <React.Fragment>
        <Button size="sm" onClick={() => instance.close()}>
          关闭
        </Button>
        <Button
          theme="primary"
          size="sm"
          onClick={() => alert('你点击了确定按钮')}
        >
          确定
        </Button>
      </React.Fragment>
    );
    instance = Notification.open({
      title: '这是一段标题',
      message:
        '我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容',
      type: 'success',
      stayTime: 0,
      btn
    });
  }
  open2() {
    let instance = Notification.open({
      title: '提示',
      message: '这是一条不会自动关闭的通知',
      stayTime: 0,
      btn: (
        <Button size="sm" onClick={() => instance.close()}>
          关闭通知
        </Button>
      )
    });
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 带回调函数

{ onClick: Function, onClose: Function }

```js
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.open.bind(this)}>点击我</Button>
      </div>
    );
  }
  open() {
    Notification.open({
      title: '标题',
      message: '这是一条成功的提示通知',
      type: 'success',
      stayTime: 0,
      onClick() {
        alert('点击回调函数');
      },
      onClose() {
        alert('关闭回调函数');
      }
    });
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 主动关闭

instance.close()

```js
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {
    visible: false
  };
  showMessage() {
    this.instance = Notification.success({
      title: '通知',
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

| 参数      | 说明                                  | 类型                | 可选值                     | 默认值 |
| --------- | ------------------------------------- | ------------------- | -------------------------- | ------ |
| title     | 标题                                  | string              | —                          | —      |
| message   | 说明文字                              | string/ReactElement | —                          | —      |
| className | 自定义类名                            | string              | -                          | -      |
| type      | 通知类型                              | string              | success/warning/info/error | —      |
| stayTime  | 显示时间, 毫秒。设为 0 则不会自动关闭 | number              | —                          | 5000   |
| onClick   | 点击内容区域时的回调函数              | (event) => void     | —                          | —      |
| onClose   | 关闭时的回调函数                      | (event) => void     | —                          | —      |
