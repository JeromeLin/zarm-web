## Button 按钮
常用的操作按钮。

### 颜色类型
以下提供在不同场景中可选择不同颜色为特定功能所使用。
```js
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

ReactDOM.render(<Demo />, mountNode)
```


### 禁用类型
按钮处于不可用状态的情况。
```js
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

ReactDOM.render(<Demo />, mountNode)
```



### 图形按钮、block按钮、组合按钮
block按钮宽度为父元素宽度

```js
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
            <Button theme="primary"><Icon type="right" /></Button>
            <Button theme="primary"><Icon type="empty-fill" /></Button>
            <Button theme="primary"><Icon type="search" /></Button>
          </Button.Group>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```



### 不同尺寸
除了默认尺寸外，可以额外设置四种尺寸。

```js
import { Button, Icon } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="multi-rows">
          <Button theme="primary" size='xl'>xl尺寸</Button>
          <Button theme="primary" size='lg'>lg尺寸</Button>
          <Button theme="primary">默认尺寸</Button>
          <Button theme="primary" size='sm'>sm尺寸</Button>
          <Button theme="primary" size='xs'>xs尺寸</Button>
        </div>
        <div className="multi-rows">
          <Button shape="round" theme="primary" size='xl'>xl尺寸</Button>
          <Button shape="round" theme="primary" size='lg'>lg尺寸</Button>
          <Button shape="round" theme="primary">默认尺寸</Button>
          <Button shape="round" theme="primary" size='sm'>sm尺寸</Button>
          <Button shape="round" size='xs'>xs尺寸</Button>
        </div>
        <div className="multi-rows">
          <Button shape="circle" theme="primary" size='xl'><Icon type="right" /></Button>
          <Button shape="circle" theme="primary" size='lg'><Icon type="brush" /></Button>
          <Button shape="circle" theme="primary"><Icon type="user-fill" /></Button>
          <Button shape="circle" theme="primary" size='sm'><Icon type="empty-fill" /></Button>
          <Button shape="circle" size='xs'><Icon type="search" /></Button>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```



### 幽灵按钮形式
幽灵按钮在背景为有色的情况下使用的按钮形式，以下为几项实例

```js
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

ReactDOM.render(<Demo />, mountNode)
```



### 加载中
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

ReactDOM.render(<Demo />, mountNode)
```

### 链接按钮
使用a标签代替button, 可设置href, target属性

```js
import { Button } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Button href="https://www.baidu.com/" theme="primary" target="_blank">百度一下</Button>
  }
}

ReactDOM.render(<Demo />, mountNode)
```



### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size      | 尺寸   | string  |   xl,lg,sm,xs            |    —     |
| theme     | 主题   | string    |   primary, danger, default |     default   |
| icon      | 设置按钮图标   | ReactNode    | — | -   |
| ghost     | 幽灵属性，使按钮背景透明   | boolean    | — | false   |
| shape     | 设置形状   | string    | circle/round/rect/radius | radius   |
| loading   | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用    | boolean   | true, false   | false   |
| href      | href属性   | string | - | - |
| target    | target属性, href存在时生效 | string | - | - |
| htmlType  | 按钮类型 | string | button/submit/reset | button |
| style     | 按钮样式 | React.CSSProperty | - | - |
