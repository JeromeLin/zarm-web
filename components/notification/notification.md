## Notification 提示框

悬浮出现在页面右上角, 适合复杂类型或者系统主动推送的消息通知提示。

### 基本用法

适用性广泛的通知栏

::: demo 设置是否自动关闭
```js
import { Notification, Button } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button theme="primary" onClick={this.open.bind(this)}>会自动关闭</Button>
        <Button theme="primary" onClick={this.open2.bind(this)}>不会自动关闭</Button>
      </div>
    )
  }
  
  open() {
    Notification.open({
      title: '标题名称',
      message: '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案',
    });
  }
  
  open2() {
    Notification.open({
      title: '提示',
      message: '这是一条不会自动关闭的消息',
      stayTime: 0,
    });
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 带有图标

带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息

::: demo Notification 组件有四种通知类型：`success`, `warning`, `info`, `error`。通过`type`字段来设置
```js
import { Notification, Button } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.open3.bind(this)}>成功</Button>
        <Button onClick={this.open4.bind(this)}>警告</Button>
        <Button onClick={this.open5.bind(this)}>消息</Button>
        <Button onClick={this.open6.bind(this)}>错误</Button>
      </div>
    )
  }
  
  open3() {
    Notification.open({
      title: '成功',
      message: '这是一条成功的提示消息',
      theme: 'success',
    });
  }
  
  open4() {
    Notification.open({
      title: '警告',
      message: '这是一条警告的提示消息',
      theme: 'warning'
    });
  }
  
  open5() {
    Notification.primary({
      title: '消息',
      message: '这是一条消息的提示消息'
    });
  }
  
  open6() {
    Notification.danger({
      title: '错误',
      message: '这是一条错误的提示消息'
    });
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 自定义按钮

自定义通知栏底部的操作按钮

::: demo 通过btn prop传递需要展示在底部的操作按钮, 注意key必须是唯一的, 相同的key通知提醒会被统一关闭!
```js
import { Notification, Button } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button theme="primary" onClick={this.open.bind(this)}>自定义按钮1</Button>
        <Button theme="primary" onClick={this.open2.bind(this)}>自定义按钮2</Button>
      </div>
    )
  }
  
  open() {
    const key = `key-${Date.now()}`
    const btn = (
      <React.Fragment>
        <Button size="sm" onClick={() => Notification.remove(key)}>关闭</Button>
        <Button theme="primary" size="sm" onClick={() => alert('你点击了确定按钮')}>确定</Button>
      </React.Fragment>
    )
    Notification.open({
      title: '这是一段标题',
      message: '我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容我是描述内容',
      theme: 'success',
      stayTime: 0,
      btn,
      key
    });
  }
  
  open2() {
    const key = `open${Date.now()}`;
    const btn = <Button size="sm" onClick={() => Notification.remove(key)}>关闭通知</Button>
    Notification.open({
      title: '提示',
      message: '这是一条不会自动关闭的消息',
      stayTime: 0,
      btn,
      key
    });
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 回调函数

回调函数

::: demo 点击notification的回调函数
```js
import { Notification, Button } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button theme="primary" onClick={this.open.bind(this)}>点击我</Button>
      </div>
    )
  }
  
  open() {
    Notification.open({
      title: '点击',
      message: '这是一条成功的提示消息',
      theme: 'success',
      onClick () {alert('点击回调函数')},
      onClose () { alert('关闭回调函数') }
    });
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

<br/>

### Api:
<p>Notification.open(props: NotificationProps)</p>
<p>Notification.success()</p>
<p>Notification.primary()</p>
<p>Notification.danger()</p>
<p>Notification.warning()</p>
<p>Notification.remove(key: string)</p>

### 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题 | string | — | — |
| key   | 通知的唯一性标识 | string | — | — |
| message | 说明文字 | string/ReactElement | — | — |
| className | 自定义类名 | string | - | - |
| theme | 图标主题，只能为列举的四种之一，否则无效(默认default) | string | success/warning/primary/danger | — |
| stayTime | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 4500 |
| onClick | 点击 Notification 时的回调函数 | (event) => void | — | — |
| onClose | 关闭 Notification 时的回调函数 | (event) => void | — | — |



