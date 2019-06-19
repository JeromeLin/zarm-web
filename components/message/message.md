## Message 全局提示

全局展示操作反馈信息。

### 使用方法

用户操作控件后，需要提示信息、成功、错误时。 浮于顶部居中，3s后自动消失，不会打断用户操作。

:::demo 通过`theme`属性设置提示主题类型。
```js
import { Message, Button } from 'dragon-ui';

class Demo extends React.Component {
  showSuccess () {
    Message.success('这是一条成功的消息提示，出现在网站顶部3s后消失')
  }

  showError () {
    Message.danger('这是一条错误的消息提示，出现在网站顶部3s后消失')
  }

  showWarning () {
    Message.warning('这是一条警告的消息提示，出现在网站顶部3s后消失')
  }

  showLoading () {
    Message.loading('这是一条Loading的消息提示，出现在网站顶部3s后消失')
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.showWarning()}>警告提示</Button>
        <Button onClick={() => this.showSuccess()}>成功提示</Button>
        <Button onClick={() => this.showError()}>错误提示</Button>
        <Button onClick={() => this.showLoading()}>加载提示</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
:::

### 自定义关闭时长

自定义关闭时长，鼠标移入时会重置timer，移出时候再重新计算关闭时长

:::demo 通过`stayTime`属性设置显示时长
```js
import { Message, Button } from 'dragon-ui';

class Demo extends React.Component {
  showMessage () {
    Message.config({
      theme: 'loading',
      message: '这是一条Loading的消息提示，出现在网站顶部8s后消失',
      stayTime: 8000
    })
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.showMessage()}>延迟关闭</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```
:::




### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   primary, success, warning, danger, loading        |    info    |
| message  | 展示内容   | string/React.ReactElement  |   -      |    -    |
| stayTime | 显示时长(ms) | number  |   -     |    3000    |
