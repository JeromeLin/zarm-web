# Message 全局提示

全局展示操作反馈信息。


## 基本用法
最基本的用法。

```jsx
import { Message, Button } from 'zarm-web';

ReactDOM.render(
  <Button
    theme="primary"
    onClick={() => {
      Message.info('This is the content of the message.');
    }}
  >
    Open
  </Button>,
  mountNode,
);
```



## 特定场景下的全局提示
特定场景下带图标的全局提示。

```jsx
import { Message, Button, Icon } from 'zarm-web';

class Demo extends React.Component {
  showSuccess = () => {
    Message.success('This is the content of the message.');
  };

  showError = () => {
    Message.error('This is the content of the message.');
  };

  showWarning = () => {
    Message.warning('This is the content of the message.');
  };

  showLoading = () => {
    const msg = Message.loading('This is the content of the message.');
    // 设置2.5s自动关闭
    setTimeout(msg.close, 2500);
  };

  closeAll = () => Message.closeAll();

  render() {
    return (
      <>
        <div className="rows">
          <Button onClick={this.showSuccess}>Success</Button>
          <Button onClick={this.showWarning}>Warning</Button>
          <Button onClick={this.showError}>Error</Button>
          <Button onClick={this.showLoading}>Loading</Button>
        </div>
        <div className="rows">
          <Button theme="danger" onClick={this.closeAll}>Close all messages</Button>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 增加回调
需要时可增加点击、关闭回调

```jsx
import { Message, Button } from 'zarm-web';

ReactDOM.render(
  <Button
    theme="primary"
    onClick={() => {
      Message.info({
        stayTime: 1500,
        content: 'You can try clicking on me!',
        onClick: () => {
          alert('You clicked this message.');
        },
        onClose: () => {
          alert('The message will be closed');
        },
      });
    }}
  >
    Open
  </Button>,
  mountNode,
);
```



## 弹出位置
设置不同的弹出位置

```jsx
import { Message, Button } from 'zarm-web';

class Demo extends React.Component {
  showNotify(option) {
    Message.info({
      ...option,
      content: 'This is the content of the message.',
    });
  };

  render() {
    return (
      <>
        <div className="rows">
          <Button onClick={() => this.showNotify({ top: 400 })}>Open the message 400px from the top</Button>
        </div>
        <div className="rows">
          <Button onClick={() => this.showNotify({ bottom: 100 })}>Open the message 100px from the bottom</Button>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 更新指定消息内容
可以通过唯一的 key 来更新内容。

```jsx
import { Message, Button } from 'zarm-web';
const key = 'updatable';

class Demo extends React.Component {
  showMessage = () => {
    Message.loading({
      key,
      content: 'Loading...',
    });
    setTimeout(() => {
      Message.success({
        key,
        content: 'Success!',
      });
    }, 2000);
  };

  render() {
    return <Button onClick={this.showMessage}>Open</Button>;
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| content | ReactNode | - | 展示内容 |
| stayTime | number | 5000 | 停留时长(ms)。设置 0 则不自动隐藏 |
| top | string \| number | - | 脱离堆叠栈，距屏幕顶端位置 |
| bottom | string \| number | - | 脱离堆叠栈，距屏幕底端位置 |
| key | string | 自动生成 | 唯一标识，可通过close方法关闭 |
| onClick | (e?: SyntheticEvent<any>) => void | - | 点击时触发的回调函数 |
| onClose | (e?: SyntheticEvent<any>) => void | - | 关闭时触发的回调函数 |

静态方法

```jsx
// 打开全局提示
Message.[success|warning|info|error|loading](string | React.ReactNode | options): { close(): void };

// 关闭指定全局提示
Message.close(key: string): void;

// 关闭所有全局提示
Message.closeAll(): void;

// 销毁
Message.destroy(): void;
```
