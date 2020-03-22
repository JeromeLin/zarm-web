# Notification 通知框

全局的通知提醒信息。浮于屏幕角落（默认右上角），5s 后自动消失，不会打断用户操作。
当鼠标移入移出时会重新计算停留时间。



## 基本用法

```js
import { Notification, Button, Icon } from 'zarm-web';

class Demo extends React.Component {
  showSuccess = () => {
    Notification.success('这是一条成功提示的通知，出现在网站顶部5s后消失');
  };

  showInfo = () => {
    Notification.info('这是一条普通提示的通知，出现在网站顶部5s后消失');
  };

  showError = () => {
    Notification.error('这是一条错误提示的通知，出现在网站顶部5s后消失');
  };

  showWarning = () => {
    Notification.warning('这是一条警告提示的通知，出现在网站顶部5s后消失');
  };

  noIcon = () => {
    Notification.open({
      title: '我没有Icon',
      content: '这是一条不带Icon的通知，出现在网站顶部5s后消失',
    });
  };

  customIcon = () => {
    Notification.open({
      title: '自定义Icon',
      icon: <Icon type="question-round-fill" size="sm" />,
      content: '这是一条自定义Icon的通知，出现在网站顶部5s后消失',
    });
  };

  customContent = () => {
    Notification.error(
      <div style={{ color: 'red' }}>
        这是一条错误的通知，出现在网站顶部5s后消失
      </div>
    );
  };

  closeAll = () => Notification.closeAll();

  render() {
    return (
      <>
        <div className="rows">
          <Button onClick={this.showSuccess}>成功</Button>
          <Button onClick={this.showInfo}>信息</Button>
          <Button onClick={this.showWarning}>警告</Button>
          <Button onClick={this.showError}>错误</Button>
        </div>
        <div className="rows">
          <Button onClick={this.noIcon}>不带Icon</Button>
          <Button onClick={this.customIcon}>自定义Icon</Button>
          <Button onClick={this.customContent}>自定义内容</Button>
        </div>
        <div className="rows">
          <Button theme="primary" onClick={this.closeAll}>关闭所有</Button>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 手动关闭

```js
import { Notification, Button } from 'zarm-web';
class Demo extends React.Component {
  state = {};

  showMessage = () => {
    let msgInstance = Notification.info({
      stayTime: 0,
      content: '这是一条Loading的通知',
      // 非必须，演示目的
      onClose: () => {
        this.setState({ msgInstance: null });
      }
    });
    this.setState({ msgInstance });
  };

  close = () => {
    this.state.msgInstance.close();
  };

  render() {
    return (
      <>
        <Button onClick={this.showMessage} disabled={this.state.msgInstance}>
          显示
        </Button>
        <Button onClick={this.close} disabled={!this.state.msgInstance}>
          隐藏
        </Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 增加回调
需要时可增加点击、关闭回调

```js
import { Notification, Button } from 'zarm-web';
class Demo extends React.Component {
  showMessage = () => {
    Notification.success({
      stayTime: 1500,
      content: '这是一条带点击和关闭回调的通知',
      onClick() {
        alert('你点击了该通知');
      },
      onClose() {
        alert('通知关闭');
      }
    });
  };

  render() {
    return <Button onClick={this.showMessage}>显示</Button>;
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 自定义底部

```js
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  open = () => {
    let instance = Notification.open({
      title: '这是一段标题',
      content: '我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容',
      type: 'success',
      stayTime: 0,
      footer: (
        <>
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
        </>
      )
    });
  };

  open2 = () => {
    let instance = Notification.open({
      title: '自定义底部',
      content: '这是一条不会自动关闭的通知',
      stayTime: 0,
      footer: (
        <Button size="sm" onClick={() => instance.close()}>关闭通知</Button>
      )
    });
  };

  render() {
    return (
      <>
        <Button onClick={this.open}>自定义按钮1</Button>
        <Button onClick={this.open2}>自定义按钮2</Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 弹出位置
设置不同的弹出位置和偏移距离

```js
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  showNotify(option) {
    Notification.open({
      ...option,
      content: '这是一条通知',
    });
  };

  render() {
    return (
      <>
        <div className="rows">
          <Button onClick={() => this.showNotify({ position: 'topRight' })}>右上角</Button>
          <Button onClick={() => this.showNotify({ position: 'topLeft' })}>左上角</Button>
          <Button onClick={() => this.showNotify({ position: 'bottomLeft' })}>左下角</Button>
          <Button onClick={() => this.showNotify({ position: 'bottomRight' })}>右下角</Button>
        </div>
        <div className="rows">
          <Button onClick={() => this.showNotify({ top: 400 })}>距离顶部400px的通知</Button>
          <Button onClick={() => this.showNotify({ bottom: 100 })}>距离底部100px的通知</Button>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 自定义 key
通常用在需要通过编程方式精确控制隐藏时用到

```js
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {
    disabled: false,
  };

  showMessage = () => {
    Notification.warning({
      key: 'key1',
      stayTime: 0,
      content: '这是一条自定义key的通知',
      // 非必须，演示目的
      onClose: () => {
        this.setState({ disabled: false });
      }
    });
    this.setState({ disabled: true });
  };

  close = () => {
    Notification.close('key1');
    this.setState({ disabled: false });
  };

  render() {
    return (
      <>
        <Button onClick={this.showMessage} disabled={this.state.disabled}>显示</Button>
        <Button onClick={this.close}>关闭</Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | ReactNode | - | 通知标题 |
| content | ReactNode | - | 展示内容 |
| stayTime | number | 5000 | 停留时长(ms)。设置 0 则不自动隐藏 |
| position | string | 'topRight' | 弹出位置。可选项：`topLeft`、`topRight`、`bottomLeft`、`bottomRight` |
| top | string \| number | - | 脱离堆叠栈，距屏幕顶端位置 |
| bottom | string \| number | - | 脱离堆叠栈，距屏幕底端位置 |
| icon | string \| ReactElement | - | 图标。可选项：`success`、`info`、`warning`、`error` |
| key | string | 自动生成 | 唯一标识，可通过close方法关闭 |
| footer | ReactNode | - | 自定义底部显示 |
| onClick | (e?: SyntheticEvent<any>) => void | - | 点击时触发的回调函数 |
| onClose | (e?: SyntheticEvent<any>) => void | - | 关闭时触发的回调函数 |

静态方法

```js
// 打开通知
Message.open(options): { close(): void };

// 打开指定场景主题的通知
Message.[success|warning|info|error](options | React.ReactNode): { close(): void };

// 关闭指定通知
Message.close(key: string): void;

// 关闭所有通知
Message.closeAll(): void;

// 销毁
Message.destroy(): void;
```
