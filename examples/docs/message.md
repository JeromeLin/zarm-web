## Message 全局提示

全局展示操作反馈信息。

### 使用方法

顶部居中显示并自动消失。

:::demo 通过`type`属性输入类型。
```js
  constructor(props) {
    super(props);
    this.state = {
      msg: []
    }
  }
  showMessage() {
    const { msg } = this.state;
    this.setState({
      msg: [
        ...msg,
        {
          m: '提交成功'
        }
      ]
    })
  }
  render() {
    return (
      <div>
        <Button theme="info" onClick={() => this.showMessage()}>提示</Button>
        <Message msg={this.state.msg} theme="info"/>
      </div>
    )
  }
```
:::

### 五种主题

通过`theme`设置。

:::demo 支持`info`,`success`,`warning`,`error`四种主题，默认`info`。
```js
  constructor(props) {
    super(props);
    this.state = {
      msg: [],
      theme: 'info'
    }
  }
  showMessage(m, theme) {
    const { msg } = this.state;
    this.setState({
      msg: [
        ...msg,
        {
          m,
        }
      ],
      theme
    })
  }
  render() {
    const { msg, theme } = this.state;
    return (
      <div>
        <Button theme="info" onClick={() => this.showMessage('info提示', 'info')}>info提示</Button>
        <Button theme="success" onClick={() => this.showMessage('success提示', 'success')}>success提示</Button>
        <Button theme="warning" onClick={() => this.showMessage('warning提示', 'warning')}>warning提示</Button>
        <Button theme="error" onClick={() => this.showMessage('error提示', 'error')}>error提示</Button>
        <Message msg={msg} theme={theme}/>
      </div>
    )
  }
```
:::

### 自定义时长

通过`duration`设置显示时长。

:::demo 通过`radius`属性设置输入框是否圆角。
```js
  constructor(props) {
    super(props);
    this.state = {
      msg: []
    }
  }
  showMessage() {
    const { msg } = this.state;
    this.setState({
      msg: [
        ...msg,
        {
          m: '提交成功'
        }
      ]
    })
  }
  render() {
    return (
      <div>
        <Button theme="info" onClick={() => this.showMessage()}>提示5s</Button>
        <Message msg={this.state.msg} theme="info" duration={5000} />
      </div>
    )
  }
```
:::


###  命令式方式调用

根据业务需要添加命令式调用

::: demo 通过调用`Message.show(object)`来显示Message。
```js
  render() {
    return (
      <div>
        <Button theme="success" onClick={()=>{
          Message.show({
            msg:'hello world',
            theme:'success',
            duration:3000,
            callback:()=>{
              console.log('hello wordl');
            }
          })
        }}>命令式调用</Button>
      </div>
    );
  }
```
:::



### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| msg    | 消息对象数组 [{ m, duration }] | array  |      -        |    []    |
| theme     | 主题   | string  |   info, success, warning, error        |    info    |
| duration     | 显示时长(ms) | number  |   -     |    1500    |
