# Button 按钮
常用的操作按钮。



## 颜色类型
以下提供在不同场景中可选择不同颜色为特定功能所使用。

```jsx
import { Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Button theme="primary">primary</Button>
          <Button theme="danger">error</Button>
          <Button>default</Button>
        </div>
        <div className="multi-rows" style={{ background: '#ccc', height: 60, lineHeight: '60px', paddingLeft: 12 }}>
          <Button ghost theme="primary">primary</Button>
          <Button ghost theme="danger">error</Button>
          <Button ghost>default</Button>
        </div>
        <div className="multi-rows">
          <Button shape="round" theme="primary">primary</Button>
          <Button shape="round" theme="danger">error</Button>
          <Button shape="round">default</Button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 禁用类型
按钮处于不可用状态的情况。

```jsx
import { Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Button disabled theme="primary">primary</Button>
          <Button disabled theme="danger">danger</Button>
          <Button disabled>default</Button>
        </div>
        <div className="multi-rows">
          <Button disabled theme="primary">primary</Button>
          <Button disabled theme="danger">danger</Button>
          <Button disabled>default</Button>
        </div>
        <div className="multi-rows" style={{ background: '#ccc', height: 60, lineHeight: '60px', paddingLeft: 12 }}>
          <Button disabled ghost theme="primary">primary</Button>
          <Button disabled ghost theme="danger">danger</Button>
          <Button disabled ghost>default</Button>
        </div>
        <div className="multi-rows">
          <Button disabled shape="round" theme="primary">primary</Button>
          <Button disabled shape="round" theme="danger">danger</Button>
          <Button disabled shape="round">default</Button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 图形按钮、block按钮、组合按钮
block按钮宽度为父元素宽度

```jsx
import { Button, Icon } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Button shape="round">default</Button>
          <Button shape="round" theme="primary">primary</Button>
          <Button shape="round" theme="danger">danger</Button>
        </div>
        <div className="multi-rows">
          <Button shape="circle" theme="primary"><Icon type="right" /></Button>
          <Button shape="circle" theme="primary"><Icon type="empty-fill" /></Button>
          <Button shape="circle"><Icon type="search" /></Button>
        </div>
        <div className="multi-rows block-row">
          <Button block>default</Button>
          <Button block theme="primary">primary</Button>
          <Button block theme="danger">danger</Button>
        </div>
        <div className="multi-rows">
          <Button.Group>
            <Button theme="primary">上一页</Button>
            <Button theme="primary">下一页</Button>
          </Button.Group>
          <Button.Group>
            <Button theme="primary"><Icon type="arrow-left" /></Button>
            <Button theme="primary"><Icon type="broadcast" /></Button>
            <Button theme="primary"><Icon type="arrow-right" /></Button>
          </Button.Group>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 不同尺寸
除了默认尺寸外，可以额外设置四种尺寸。

```jsx
import { Button, Icon } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="multi-rows">
          <Button theme="primary" size="xl">xl</Button>
          <Button theme="primary" size="lg">lg</Button>
          <Button theme="primary">md</Button>
          <Button theme="primary" size="sm">sm</Button>
          <Button theme="primary" size="xs">xs</Button>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 幽灵按钮形式
幽灵按钮在背景为有色的情况下使用的按钮形式，以下为几项实例

```jsx
import { Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div className="ghost-btn-container">
        <Button ghost theme="primary">Ghost</Button>
        <Button ghost disabled theme="primary">禁用状态</Button>
        <Button ghost>Ghost</Button>
        <Button ghost theme="danger">Ghost</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 加载中
点击按钮后进行数据加载操作，在按钮上显示加载状态。

```jsx
import { Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Button theme="primary" loading>加载中</Button>
        <Button loading>加载中</Button>
        <Button shape="round" loading>加载中</Button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 链接按钮
使用a标签代替button, 可设置href, target属性

```jsx
import { Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Button href="https://www.baidu.com/" theme="primary" target="_blank">百度一下</Button>
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'default' | 设置主题，可选值为 `default`、`primary`、`danger` |
| size | string | 'md' | 设置大小，可选值为 `lg`、`md`、`sm`、`xs` |
| shape | string | 'radius' | 设置形状，可选值为 `rect`、`radius`、`round`、`circle` |
| block | boolean | false | 是否块级元素 |
| ghost | boolean | false | 是否幽灵按钮 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否加载中状态 |
| icon | ReactNode | - | 设置图标 |
| onClick | MouseEventHandler&lt;HTMLAnchorElement&gt; \| MouseEventHandler&lt;HTMLButtonElement&gt; | - | 点击后触发的回调函数 |
| htmlType | string | 'button' | 设置`button`原生的`type`值，可选值为 `button`、`submit`、`reset` |
| href | string | - | 点击跳转的地址，指定此属性`button`的行为和`a`链接一致 |
| target | string | - | 相当于 a 链接的 target 属性，href 存在时生效 |
