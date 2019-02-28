## Confirm 确认框

用于重要操作的确认提示。

### 基本用法

弹窗形式，默认有取消和确定两个按钮。

::: demo
```js
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.showConfirm = this.showConfirm.bind(this);
    this.hideConfirm = this.hideConfirm.bind(this);
  }

  showConfirm() {
    this.setState({
      visible: true,
    });
  }

  hideConfirm() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button theme="error" onClick={this.showConfirm}>删除</Button>
        <Confirm
          visible={visible}
          onOk={this.hideConfirm}
          onCancel={this.hideConfirm}
          message='确认删除吗？'
        />
      </div>
    );
  }
```
:::

### 自定义操作按钮

自定义操作按钮的文案。

::: demo 通过`okText`, `cancelText`属性设置。
```js
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.showConfirm = this.showConfirm.bind(this);
    this.hideConfirm = this.hideConfirm.bind(this);
  }

  showConfirm() {
    this.setState({
      visible: true,
    });
  }

  hideConfirm() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button theme="info" onClick={this.showConfirm}>自定义操作按钮</Button>
        <Confirm
          visible={visible}
          okText="继续"
          cancelText="返回"
          onOk={this.hideConfirm}
          onCancel={this.hideConfirm}
          message='继续操作吗？'
        />
      </div>
    );
  }
```
:::

###  命令式方式调用

根据业务需要添加命令式调用

::: demo 通过调用`Confirm.show(object)`来显示Confirm。
```js
  render() {
    return (
      <div>
        <Button theme="success" onClick={async ()=>{
         let a = await Confirm.show("hello world");
         console.log(a);
        }}>命令式调用</Button>
      </div>
    );
  }
```
:::

使用 `Confirm.show(object)`调用时，参数有两种形式。
```
// 方式1
Confirm.show("message");

// 方式2
Confirm.show({
  message: "message",
  onOk: ()=> {}
});
```

在使用的时候也可以使用异步的方式获取点击的按钮。

+ 使用回调
```
Confirm.show({
    message: "message",
    onOk: ()=> {
      doSomething();
    }
});
```
+ 使用异步
```
Confirm.show({
    message: "message",
}).then(result =>{
    if(result) {
      doSomething();
    }
});
```
+ 使用 `async`
```
onClick = async ()=> {
    if(await Confirm.show("hello world")){
      doSomething();
    };
}
```

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 内容文本 | string | — | '' |
| width | 弹窗宽度 | number | — | 270 |
| okText | 确认按钮文本 | string | — | 确认 |
| cancelText | 取消按钮文本 | string | — | 取消 |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onOk | 点击确认触发的事件 | — |
| onCancel | 点击取消触发的事件 | — |
