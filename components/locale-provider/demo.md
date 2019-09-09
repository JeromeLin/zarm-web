# 国际化

LocaleProvider组件提供了国际化功能，可以通过locale属性设置语言包。

## 基本用法

```jsx
import { Alert, Button, LocaleProvider } from 'zarm-web';

const localeCN = {
  locale: 'zh-cn',
  Alert: {
    close: '关闭',
  },
}
const localeEN = {
  locale: 'en',
  Alert: {
    close: 'Close'
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: localeCN,
      alertVisible: false,
    };
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);
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

  toggleLanguage() {
    const { locale } = this.state

    if (locale === localeEN) {
      this.setState({
        locale: localeCN
      });
    } else {
      this.setState({
        locale: localeEN
      });
    }
    this.showAlert();
  }

  render() {
    const { alertVisible, locale } = this.state;
    console.log(locale);

    return (
      <LocaleProvider locale={locale}>
        <div>
          <Button theme="primary" onClick={this.toggleLanguage}>切换语言</Button>
          <Alert
            visible={alertVisible}
            onClose={this.hideAlert}
            message='注意关闭按钮'
          />
        </div>
      </LocaleProvider>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| locale | { locale: string, [componentName: string]: { [localeKey: string]: string } } | - | 设置语言包 |
