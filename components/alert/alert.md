# Alert 警告框
用于展示重要的提示信息。

## 基本用法
弹窗形式，默认有一个关闭按钮。

```jsx
import { Alert, Button } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
    };
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);

    this.ref = React.createRef();
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
      <>
        <Button theme="danger" onClick={this.showAlert}>警告</Button>
        <Alert
          visible={alertVisible}
          theme="warning"
          ref={this.ref}
          onClose={this.hideAlert}
          message='这是一个警告框'
        />
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

##
