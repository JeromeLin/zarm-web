# Alert 警告框
当某个页面需要向用户显示警告的信息时。
非浮层的静态展现形式，始终展现，不会自动消失。

## 基本用法
基础用法，展示提示文字 + 描述文字

```jsx
import { Alert } from 'zarm-web';

ReactDOM.render((
  <>
    <Alert title="基础用法-信息提示" type="info" />
    <Alert title="基础用法-信息提示" type="info" description="信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述" />
    <Alert title="基础用法-成功" type="success" />
    <Alert title="基础用法-成功" type="success" description="成功描述，成功描述，成功描述，成功描述，成功描述，成功描述，成功描述，成功描述，成功描述" />
    <Alert title="基础用法-警告" type="warning" />
    <Alert title="基础用法-警告" type="warning" description="警告描述，警告描述，警告描述，警告描述，警告描述，警告描述，警告描述，警告描述，警告描述" />
    <Alert title="基础用法-错误" type="error" />
    <Alert title="基础用法-错误" type="error" description="错误描述，错误描述，错误描述，错误描述，错误描述，错误描述，错误描述，错误描述，错误描述" />
  </>
), mountNode);
```

## 带icon的提示框
显示icon，让你的提示框更显眼

```jsx
import { Alert } from 'zarm-web';

class Demo extends React.Component {

  render() {
    return (
      <>
        <Alert showIcon title="基础用法-信息提示" type="info"/>
        <Alert showIcon title="基础用法-成功" type="success" />
        <Alert showIcon title="基础用法-警告" type="warning" />
        <Alert showIcon title="基础用法-错误" type="error" />
        <Alert
          showIcon
          title="基础用法-信息提示"
          type="info"
          description="信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述，信息提示描述"
        />
        <Alert
          showIcon
          title="基础用法-成功"
          type="success"
          description="成功描述，成功描述，成功描述，成功描述，成功描述，成功描述，成功描述，成功描述，成功描述"
        />
        <Alert
          showIcon
          title="基础用法-警告"
          type="warning"
          description="警告描述，警告描述，警告描述，警告描述，警告描述，警告描述，警告描述，警告描述，警告描述"
        />
        <Alert
          showIcon
          title="基础用法-错误"
          type="error"
          description="错误描述，错误描述，错误描述，错误描述，错误描述，错误描述，错误描述，错误描述，错误描述"
        />
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 可关闭的警告框
显示关闭按钮，点击可关闭警告提示

```jsx
import { Alert } from 'zarm-web';

class Demo extends React.Component {

  render() {
    return (
      <>
        <Alert closable title="基础用法-信息提示" type="info"/>
        <Alert
          closable
          title="基础用法-警告"
          type="warning"
          description="警告描述，警告描述，警告描述，警告描述，警告描述，警告描述，警告描述，警告描述，警告描述"
        />
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 自定义关闭文案
可自定义关闭按钮，自定义的内容会替换原先默认的关闭`Icon`

```jsx
import { Alert, Icon } from 'zarm-web';

class Demo extends React.Component {

  render() {

    function CustomText ({ onClick }) {
      return (
        <span
          onClick={onClick}
          style={{
            fontSize: 12,
            color: '#909090',
            position: 'absolute',
            top: 8,
            right: 16,
            lineHeight: '22px',
            cursor: 'pointer'
          }}>不再提示</span>
      )
    }

    return (
      <>
        <Alert closable title="基础用法-信息提示" type="info" closeText="查看详情"/>
        <Alert
          closable
          title="阻止折叠隐藏行为"
          preventHide
          type="info"
          onClick={({close}) => {
            const r = window.confirm('您阻止了默认折叠隐藏行为，点击确定，隐藏提示框。点击取消无操作')
            if (r) {
              close()
            }
          }}
        />
        <Alert
          closable
          closeText={<CustomText onClick={() => {window.confirm('您点击了我')}}/>}
          title="点击关闭按钮不隐藏警示框"
          type="warning"
          description="点击关闭按钮不隐藏警示框"
        />
        <Alert
          closable
          closeText={({close}) => <Icon className="zw-alert-custom-close-btn" type="wrong-round-fill" onClick={close}/>}
          title="自定义icon"
          type="error"
        />
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## API

Checkbox 

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| afterClose | () => void | 无 | 关闭动画结束后触发的回调函数 |
| closable | boolean | false | 是否显示关闭按钮 |
| closeText | string \| ReactNode | - | 自定义右侧关闭按钮（当closeText传入类型 `ReactNode` 时，`onClose`，`onClick`，`afterClose`配置生效。 折叠隐藏方法 `close` 以 `props` 形式传入自定义关闭按钮组件, 且 `preventHide` 失效。） |
| description | string | 无 | 警告提示的辅助性文字介绍 |
| icon | ReactNode | 无 | 自定义图标，`showIcon` 为 `true` 时生效 |
| onClose | () => void | 无 | 关闭时触发回调函数 |
| onClick | (close) => void | 无 | 点击关闭（或者自定义右上角按钮）时，当且仅当preventHide为`true`时触发，接收一个对象，内含 `close` 方法，执行 `close` 手动触发隐藏特效，并且 `afterClose` 正常生效 |
| preventHide | boolean | false | 点击关闭（或者自定义右上角按钮）时，是否阻止提示框折叠隐藏，设置为 `true` 时，`onClose` 失效，并且触发 `onClick` 方法 |
| type | string | info | 指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error` |
| title | string | 无 | 警告提示内容 |
| width | number | 500ox | 设置提示框宽度 |
| showIcon | boolean | false | 是否显示辅助图标 |




