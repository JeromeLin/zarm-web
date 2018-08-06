## Notification 提示框

悬浮出现在页面右上角, 适合复杂类型或者系统主动推送的消息通知提示。

### 基本用法

适用性广泛的通知栏

::: demo 设置是否自动关闭
```js
render() {
  return (
    <div>
      <Button onClick={this.open.bind(this)}>可自动关闭</Button>
      <Button onClick={this.open2.bind(this)}>不会自动关闭</Button>
    </div>
  )
}

open() {
  Notification({
    title: '标题名称',
    message: '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
  });
}

open2() {
  Notification({
    title: '提示',
    message: '这是一条不会自动关闭的消息',
    duration: 0
  });
}
```
:::

### 带有图标

带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息

::: demo Notification 组件有四种通知类型：`success`, `warning`, `info`, `error`。通过`type`字段来设置
```js
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
  Notification({
    title: '成功',
    message: '这是一条成功的提示消息',
    type: 'success',
    duration: 0
  });
}

open4() {
  Notification({
    title: '警告',
    message: '这是一条警告的提示消息',
    type: 'warning'
  });
}

open5() {
  Notification.info({
    title: '消息',
    message: '这是一条消息的提示消息'
  });
}

open6() {
  Notification.error({
    title: '错误',
    message: '这是一条错误的提示消息'
  });
}
```
:::

### 回调函数
::: demo 点击notification的回调函数
```js
render() {
  return (
    <div>
      <Button onClick={this.open.bind(this)}>点击我</Button>
    </div>
  )
}

open() {
  Notification({
    title: '点击',
    message: '这是一条成功的提示消息',
    type: 'success',
    onClick () {alert('click')}
  });
}
```
:::

### 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题 | string | — | — |
| message | 说明文字 | string/ReactElement | — | — |
| className | 自定义类名 | string | - | - |
| type | 图标主题，只能为列举的四种之一，否则无效 | string | success/warning/info/error | — |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 4500 |
| onClick | 点击 Notification 时的回调函数 | function | — | — |



