## Alert 警告框

用于展示重要的提示信息。

### 基本用法

弹窗形式，默认有一个关闭按钮。

::: demo Alert 组件提供四种主题，由`theme`属性指定，默认值为`info`。通过`message`属性设置显示文本，默认带icon。
```js
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
    };
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  showAlert() {
    this.setState({
      alertVisible: true,
    });
  }

  hideAlert() {
    this.setState({
      alertVisible: false,
    });
  }

  render() {
    const { alertVisible } = this.state;
    return (
      <div>
        <Button theme="warning" onClick={this.showAlert}>警告</Button>
        <Alert
          visible={alertVisible}
          theme="warning"
          onClose={this.hideAlert}
          message='这是一个警告框'
        />
      </div>
    );
  }
```
:::

### 自定义关闭按钮

自定义关闭按钮的几种用法。

::: demo 可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable`属性决定是否可关闭，默认为`true`。另外可以设置`closeText`来替代默认的'关闭'文本。设置`onClose`事件来设置关闭时的回调，通过`visible`属性来控制弹窗的显示和隐藏。
```js
  constructor(props) {
    super(props);
    this.state = {
      alertAVisible: false,
      alertBVisible: false,
      alertCVisible: false,
    };
  }

  showAlert(which) {
    this.setState({
      [`alert${which}Visible`]: true,
    });
  }

  hideAlert(which) {
    this.setState({
      [`alert${which}Visible`]: false,
    });
  }

  render() {
    const { alertAVisible, alertBVisible, alertCVisible } = this.state;
    return (
      <div>
        <Button theme="warning" onClick={() => this.showAlert('A')}>不可关闭</Button>
        <Button theme="success" onClick={() => this.showAlert('B')}>自定义按钮文本</Button>
        <Button theme="error" onClick={() => this.showAlert('C')}>回调演示</Button>
        <Alert
          visible={alertAVisible}
          theme="warning"
          closable={false}
          message='不可关闭警告框'
        />
        <Alert
          visible={alertBVisible}
          theme="success"
          onClose={() => this.hideAlert('B')}
          message='自定义按钮文本'
          closeText="知道了"
        />
        <Alert
          visible={alertCVisible}
          theme="warning"
          onClose={() => {
            this.hideAlert('C');
            this.showAlert('B');
          }}
          message='这是回调演示'
        />
      </div>
    );
  }
```
:::

### 隐藏 icon

根据业务需要可隐藏表示状态的icon。

::: demo 通过设置`hideIcon`属性来隐藏 icon。
```js
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
    };
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  showAlert() {
    this.setState({
      alertVisible: true,
    });
  }

  hideAlert() {
    this.setState({
      alertVisible: false,
    });
  }

  render() {
    const { alertVisible } = this.state;
    return (
      <div>
        <Button theme="info" onClick={this.showAlert}>隐藏icon</Button>
        <Alert
          visible={alertVisible}
          theme="info"
          onClose={this.hideAlert}
          message='隐藏icon演示'
          hideIcon
        />
      </div>
    );
  }
```
:::

###  命令式方式调用

根据业务需要添加命令式调用

::: demo 通过调用`Alert.show(object)`来显示Alert。
```js
  render() {
    return (
      <div>
        <Button theme="success" onClick={()=>{
          Alert.show({
            message:'测试',
            theme:'success',
            closeText:'取消'
          })
        }}>命令式调用</Button>
      </div>
    );
  }
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 内容文本 | string | — | '' |
| theme | 主题 | string | success/warning/info/error | info |
| width | 弹窗宽度 | number | — | 270 |
| className | 弹窗类名 | string | — | '' |
| closable | 是否可关闭 | boolean | — | true |
| closeText | 关闭按钮自定义文本 | string | — | — |
| hideIcon | 是否隐藏图标 | boolean | — | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 关闭alert时触发的事件 | — |
