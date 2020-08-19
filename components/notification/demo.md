# Notification 通知提醒框

全局的通知提醒信息。浮于屏幕角落（默认右上角），5s 后自动消失，不会打断用户操作。
当鼠标移入移出时会重新计算停留时间。


## 基本用法
最基本的用法。

```jsx
import { Notification, Button } from 'zarm-web';

ReactDOM.render(
  <Button
    theme="primary"
    onClick={() => {
      Notification.open({
        title: 'Notification Title',
        content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification. ',
      });
    }}
  >
    Open
  </Button>,
  mountNode,
);
```



## 特定场景下的通知提醒框
特定场景下带图标的通知提醒框。

```jsx
import { Notification, Button, Icon } from 'zarm-web';

const options = {
  title: 'Notification Title',
  content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification. ',
};

class Demo extends React.Component {
  showSuccess = () => {
    Notification.success(options);
  };

  showInfo = () => {
    Notification.info(options);
  };

  showError = () => {
    Notification.error(options);
  };

  showWarning = () => {
    Notification.warning(options);
  };

  customIcon = () => {
    Notification.open({
      title: 'Notification Title',
      content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification. ',
      icon: <Icon type="question-round-fill" size="sm" />,
    });
  };

  closeAll = () => Notification.closeAll();

  render() {
    return (
      <>
        <div className="rows">
          <Button onClick={this.showSuccess}>Success</Button>
          <Button onClick={this.showInfo}>Info</Button>
          <Button onClick={this.showWarning}>Warning</Button>
          <Button onClick={this.showError}>Error</Button>
        </div>
        <div className="rows">
          <Button onClick={this.customIcon}>Open a notification with custom icon</Button>
        </div>
        <div className="rows">
          <Button theme="danger" onClick={this.closeAll}>Close all notifications</Button>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 自定义样式
自定义通知提醒框的样式

```jsx
import { Notification, Button } from 'zarm-web';

ReactDOM.render(
  <Button
    theme="primary"
    onClick={() => {
      Notification.open({
        title: 'Notification Title',
        content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification. ',
        className: 'custom-style',
        style: {
          width: 400,
        }
      });
    }}
  >
    Open
  </Button>,
  mountNode,
);
```



## 主动关闭
自定义通知框的停留时间，默认5s，取消自动关闭只要将该值设为 0 即可，然后主动控制将其关闭。

```jsx
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {};

  show = () => {
    let msgInstance = Notification.info({
      title: 'Notification Title',
      content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification. ',
      stayTime: 0,
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
        <Button theme="primary" onClick={this.show} disabled={this.state.msgInstance}>
          Open
        </Button>
        <Button onClick={this.close} disabled={!this.state.msgInstance}>
          Close
        </Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 增加回调
需要时可增加点击、关闭回调

```jsx
import { Notification, Button } from 'zarm-web';

ReactDOM.render(
  <Button
    theme="primary"
    onClick={() => {
      Notification.success({
        stayTime: 1500,
        title: 'Notification Title',
        content: 'You can try clicking on me!',
        onClick: () => {
          alert('You clicked this notification.');
        },
        onClose: () => {
          alert('The notification will be closed');
        },
      });
    }}
  >
    Open
  </Button>,
  mountNode,
);
```



## 自定义底部

```jsx
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  open = () => {
    let instance = Notification.open({
      title: 'Notification Title',
      content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification. ',
      type: 'success',
      stayTime: 0,
      footer: (
        <>
          <Button size="sm" onClick={() => instance.close()}>
            Close
          </Button>
          <Button theme="primary" size="sm" onClick={() => alert('You clicked OK button.')}>
            Ok
          </Button>
        </>
      )
    });
  };

  render() {
    return <Button theme="primary" onClick={this.open}>Open</Button>;
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 弹出位置
设置不同的弹出位置和偏移距离

```jsx
import { Notification, Button } from 'zarm-web';

class Demo extends React.Component {
  show(option) {
    Notification.open({
      ...option,
      title: 'Notification Title',
      content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification. ',
    });
  };

  render() {
    return (
      <>
        <div className="rows">
          <Button onClick={() => this.show({ position: 'topRight' })}>topRight</Button>
          <Button onClick={() => this.show({ position: 'topLeft' })}>topLeft</Button>
          <Button onClick={() => this.show({ position: 'bottomLeft' })}>bottomLeft</Button>
          <Button onClick={() => this.show({ position: 'bottomRight' })}>bottomRight</Button>
        </div>
        <div className="rows">
          <Button onClick={() => this.show({ top: 400 })}>Open the notification 400px from the top</Button>
        </div>
        <div className="rows">
          <Button onClick={() => this.show({ bottom: 100 })}>Open the notification 100px from the bottom</Button>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 更新指定通知提醒框的状态和内容
可以通过唯一的 key 来控制指定的通知提醒框。

```jsx
import { Notification, Button } from 'zarm-web';
const key = 'updatable';

class Demo extends React.Component {
  show = () => {
    Notification.open({
      key,
      stayTime: 0,
      title: 'Notification Title',
      content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification. ',
    });
    setTimeout(() => {
      Notification.open({
        key,
        title: 'New Title',
        content: 'This is new content of the notification. ',
      });
    }, 1000);
  };

  close = () => {
    Notification.close(key);
  };

  render() {
    return (
      <>
        <Button onClick={this.show}>Open</Button>
        <Button onClick={this.close}>Close</Button>
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

<h3>静态方法</h3>

```jsx
// 打开通知
Notification.open(options): { close(): void };

// 打开指定场景主题的通知
Notification.[success|warning|info|error](options | React.ReactNode): { close(): void };

// 关闭指定通知
Notification.close(key: string): void;

// 关闭所有通知
Notification.closeAll(): void;

// 销毁
Notification.destroy(): void;
```
