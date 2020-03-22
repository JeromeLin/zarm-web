# Message 全局提示

全局展示操作反馈信息。浮于顶部居中，3s 后自动消失，不会打断用户操作。
当鼠标移入移出时会重新计算停留时间。



## 基本用法

```js
import { Message, Button, Icon } from 'zarm-web';

class Demo extends React.Component {
  showSuccess = () => {
    Message.success('这是一条成功的消息提示，出现在网站顶部3s后消失');
  };

  showInfo = () => {
    Message.info('这是一条普通消息提示，出现在网站顶部3s后消失');
  };

  showError = () => {
    Message.error('这是一条错误的消息提示，出现在网站顶部3s后消失');
  };

  showWarning = () => {
    Message.warning('这是一条警告的消息提示，出现在网站顶部3s后消失');
  };

  showLoading = () => {
    Message.loading('这是一条Loading的消息提示，不会自动消失');
  };

  noIcon = () => {
    Message.open({
      content: '这是一条不带Icon的消息提示，出现在网站顶部3s后消失',
    });
  };

  customIcon = () => {
    Message.open({
      icon: <Icon type="question-round-fill" size="sm" />,
      content: '这是一条自定义Icon的消息提示，出现在网站顶部3s后消失',
    });
  }

  customContent = () => {
    Message.error(
      <div style={{ color: 'red' }}>
        这是一条错误的消息提示，出现在网站顶部3s后消失
      </div>
    );
  }

  closeAll = () => Message.closeAll();

  render() {
    return (
      <>
        <div className="rows">
          <Button onClick={this.showSuccess}>成功</Button>
          <Button onClick={this.showInfo}>信息</Button>
          <Button onClick={this.showWarning}>警告</Button>
          <Button onClick={this.showError}>错误</Button>
          <Button onClick={this.showLoading}>加载中</Button>
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
调用 instance.close()

```js
import { Message, Button } from 'zarm-web';
class Demo extends React.Component {
  state = {};
  showMessage = () => {
    let msgInstance = Message.loading({
      stayTime: 0,
      content: "这是一条Loading的消息提示",
      // 非必须，演示需要
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
      <div>
        <Button onClick={this.showMessage} disabled={this.state.msgInstance}>
          显示
        </Button>
        <Button onClick={this.close} disabled={!this.state.msgInstance}>
          隐藏
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 增加回调

需要时可增加点击、关闭回调

{ onClick(e): void, onClose(): void }

```js
import { Message, Button } from 'zarm-web';
class Demo extends React.Component {
  showMessage = () => {
    Message.success({
      stayTime: 1500,
      content: "这是一条带点击&关闭回调的消息提示",
      onClick() {
        alert("你点击了该message");
      },
      onClose() {
        alert("message关闭");
      }
    });
  };
  render() {
    return (
      <div>
        <Button onClick={this.showMessage}>显示</Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 弹出位置

{ top: string, bottom: string }

```js
import { Message, Button } from 'zarm-web';
class Demo extends React.Component {
  showNotify(option) {
    Message.loading({
      ...option,
      stayTime: 2000,
      content: "这是一条通知"
    });
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.showNotify({ top: "400px" })}>
          自定义top
        </Button>
        <Button onClick={() => this.showNotify({ bottom: "100px" })}>
          自定义bottom
        </Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 自定义 key

通常用在需要通过编程方式精确控制隐藏时用到

{ key: 'your unique key' }

Message.close('your unique key');

```js
import { Message, Button } from 'zarm-web';
class Demo extends React.Component {
  state = { disabled: false };
  showMessage() {
    Message.warning({
      key: "key1",
      stayTime: 0,
      content: "这是一条自定义key的消息提示"
    });
    this.setState({ disabled: true });
  }
  close() {
    Message.close("key1");
    this.setState({ disabled: false });
  }
  render() {
    return (
      <div>
        <Button
          onClick={() => this.showMessage()}
          disabled={this.state.disabled}
        >
          显示
        </Button>
        <Button onClick={() => this.close()}>关闭</Button>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

`Message.open(options): { close(): void };`

`Message.[success|warning|info|error|loading](options|React.ReactNode): { close(): void };`

`Message.close(key: string): void;`

`Message.closeAll(): void;`

`Message.destroy(): void;`

| 参数     | 说明                              | 类型                       | 可选值                                 | 默认值     |
| -------- | --------------------------------- | -------------------------- | -------------------------------------- | ---------- |
| content  | 展示内容                          | React.ReactNode | -                                      | -          |
| stayTime | 停留时长(ms)。设置 0 则不自动隐藏 | number                     | -                                      | 3000       |
| icon     | 图标                              | string\|React.ReactElement | success\|info\|warning\|error\|loading | -          |
| key      | 唯一标识，可通过 close 方法关闭   | string                     | -                                      | (自动生成) |
| top      | 脱离堆叠栈，距屏幕顶端位置        | string                     | -                                      | -          |
| bottom   | 脱离堆叠栈，距屏幕底端位置        | string                     | -                                      | -          |
| onClick  | 点击时触发                        | function                   | -                                      | -          |
| onClose  | 关闭时触发                        | function                   | -                                      | -          |
