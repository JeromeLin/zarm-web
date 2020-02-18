# Notification 通知框

全局的通知提醒信息。浮于屏幕角落（默认右上角），5s 后自动消失，不会打断用户操作。

当鼠标移入移出时会重新计算停留时间。

## 基本用法

```js
import { Notification, Button, Icon } from 'zarm-web';

class Demo extends React.Component {
  showSuccess() {
    Notification.success("这是一条成功的通知，出现在网站顶部5s后消失");
  }
  showInfo() {
    Notification.info("这是一条普通通知，出现在网站顶部5s后消失");
  }
  showError() {
    Notification.error("这是一条错误的通知，出现在网站顶部5s后消失");
  }
  showWarning() {
    Notification.warning("这是一条警告的通知，出现在网站顶部5s后消失");
  }
  noIcon() {
    Notification.open({
      title: "我没有ICON",
      content: "这是一条不带ICON的通知，出现在网站顶部5s后消失"
    });
  }
  customIcon() {
    Notification.open({
      title: "自定义ICON",
      icon: <Icon type="question-round-fill" size="sm" />,
      content: "这是一条自定义ICON的通知，出现在网站顶部5s后消失"
    });
  }
  useReactNode() {
    Notification.error(
      <div style={{ color: "red" }}>
        这是一条错误的通知，出现在网站顶部5s后消失
      </div>
    );
  }
  render() {
    return (
      <>
        <div className="btn-box">
          <Button onClick={() => this.showSuccess()}>成功</Button>
          <Button onClick={() => this.showInfo()}>信息</Button>
          <Button onClick={() => this.showWarning()}>警告</Button>
          <Button onClick={() => this.showError()}>错误</Button>
          <Button onClick={() => this.noIcon()}>不带ICON</Button>
          <Button onClick={() => this.customIcon()}>自定义ICON</Button>
          <Button onClick={() => this.useReactNode()}>使用ReactNode</Button>
        </div>
        <Button onClick={() => Notification.closeAll()}>关闭所有</Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 手动关闭

调用 instance.close()

```js
import { Notification, Button } from 'zarm-web';
class Demo extends React.Component {
  state = {};
  showMessage = () => {
    let msgInstance = Notification.info({
      stayTime: 0,
      content: "这是一条Loading的通知",
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
import { Notification, Button } from 'zarm-web';
class Demo extends React.Component {
  showMessage = () => {
    Notification.success({
      stayTime: 1500,
      content: "这是一条带点击&关闭回调的通知",
      onClick() {
        alert("你点击了该通知");
      },
      onClose() {
        alert("通知关闭");
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

## 自定义底部

{ footer: ReactElement }

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
    let instance = Notification.open({
      title: "这是一段标题",
      content:
        "我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容",
      type: "success",
      stayTime: 0,
      footer: (
        <>
          <Button size="sm" onClick={() => instance.close()}>
            关闭
          </Button>
          <Button
            theme="primary"
            size="sm"
            onClick={() => alert("你点击了确定按钮")}
          >
            确定
          </Button>
        </>
      )
    });
  }
  open2() {
    let instance = Notification.open({
      title: "自定义底部",
      content: "这是一条不会自动关闭的通知",
      stayTime: 0,
      footer: (
        <Button size="sm" onClick={() => instance.close()}>
          关闭通知
        </Button>
      )
    });
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 弹出位置

{ position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' }
{ top: string, bottom: string }

```js
import { Notification, Button } from 'zarm-web';
class Demo extends React.Component {
  showNotify(option) {
    Notification.open({
      ...option,
      content: "这是一条通知"
    });
  }
  render() {
    return (
      <>
        <div className="btn-box">
          <Button onClick={() => this.showNotify({ position: "topRight" })}>
            右上角
          </Button>
          <Button onClick={() => this.showNotify({ position: "topLeft" })}>
            左上角
          </Button>
          <Button onClick={() => this.showNotify({ position: "bottomLeft" })}>
            左下角
          </Button>
          <Button onClick={() => this.showNotify({ position: "bottomRight" })}>
            右下角
          </Button>
        </div>
        <Button onClick={() => this.showNotify({ top: "400px" })}>
          自定义top
        </Button>
        <Button onClick={() => this.showNotify({ bottom: "100px" })}>
          自定义bottom
        </Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 自定义 key

通常用在需要通过编程方式精确控制隐藏时用到

{ key: 'your unique key' }

Notification.close('your unique key');

```js
import { Notification, Button } from 'zarm-web';
class Demo extends React.Component {
  state = { disabled: false };
  showMessage() {
    Notification.warning({
      key: "key1",
      stayTime: 0,
      content: "这是一条自定义key的通知",
      // 非必须，演示目的
      onClose: () => {
        this.setState({ disabled: false });
      }
    });
    this.setState({ disabled: true });
  }
  close() {
    Notification.close("key1");
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

`Message.[success|warning|info|error](options|React.ReactNode): { close(): void };`

`Message.close(key: string): void;`

`Message.closeAll(): void;`

`Message.destroy(): void;`

| 参数     | 说明                              | 类型                       | 可选值                                     | 默认值     |
| -------- | --------------------------------- | -------------------------- | ------------------------------------------ | ---------- |
| title    | 通知标题                          | React.ReactNode            | -                                           | -          |
| content  | 展示内容                          | React.ReactNode            | -                                           | -          |
| stayTime | 停留时长(ms)。设置 0 则不自动隐藏    | number                     | -                                          | 5000       |
| position | 弹出位置                          | string                     | topLeft\|topRight\|bottomLeft\|bottomRight |topRight   |
| top      | 脱离堆叠栈，距屏幕顶端位置           | string                     | -                                          | -          |
| bottom   | 脱离堆叠栈，距屏幕底端位置           | string                     | -                                          | -          |
| icon     | 图标                             | string\|React.ReactElement | success\|info\|warning\|error              | -          |
| key      | 唯一标识，可通过close方法关闭        | string                     | -                                          | (自动生成) |
| footer   | 自定义底部显示                     | React.ReactNode            | -                                          | -          |
| onClick  | 点击时触发                        | function                   | -                                          | -          |
| onClose  | 关闭时触发                        | function                   | -                                          | -          |
