# Button 按钮
常用的操作按钮。



## 按钮主题
以下提供在不同场景中可选择不同颜色为特定功能所使用。

```jsx
import { Button } from 'zarm-web';

ReactDOM.render(
  <>
    <Button>default</Button>
    <Button theme="primary">primary</Button>
    <Button theme="danger">danger</Button>
  </>
, mountNode);
```



## 按钮尺寸
除了默认尺寸外，可以额外设置四种尺寸。

```jsx
import { Button, Icon } from 'zarm-web';

ReactDOM.render(
  <>
    <Button theme="primary" size="xl">xl</Button>
    <Button theme="primary" size="lg">lg</Button>
    <Button theme="primary">md</Button>
    <Button theme="primary" size="sm">sm</Button>
    <Button theme="primary" size="xs">xs</Button>
  </>
, mountNode);
```



## 按钮形状
以下提供在不同场景中可选择不同颜色为特定功能所使用。

```jsx
import { Button } from 'zarm-web';

ReactDOM.render(
  <>
    <Button theme="primary" shape="rect">rect</Button>
    <Button theme="primary" shape="radius">radius</Button>
    <Button theme="primary" shape="round">round</Button>
    <Button theme="primary" shape="circle">c</Button>
  </>
, mountNode);
```



## 禁用状态
按钮处于不可用状态的情况

```jsx
import { Button } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Button disabled theme="primary">primary</Button>
      <Button disabled theme="danger">danger</Button>
      <Button disabled>default</Button>
    </div>
  </>
, mountNode);
```



## 图标按钮

```jsx
import { Button, Icon } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Button icon="search" size="xs">default</Button>
      <Button icon="time" theme="primary" size="xs">primary</Button>
      <Button icon="keyboard" theme="danger" size="xs">danger</Button>
    </div>
    <div className="rows">
      <Button icon="search" size="sm">default</Button>
      <Button icon="time" theme="primary" size="sm">primary</Button>
      <Button icon="keyboard" theme="danger" size="sm">danger</Button>
    </div>
    <div className="rows">
      <Button icon="search" size="md">default</Button>
      <Button icon="time" theme="primary" size="md">primary</Button>
      <Button icon="keyboard" theme="danger" size="md">danger</Button>
    </div>
    <div className="rows">
      <Button icon="search" size="lg">default</Button>
      <Button icon="time" theme="primary" size="lg">primary</Button>
      <Button icon="keyboard" theme="danger" size="lg">danger</Button>
    </div>
    <div className="rows">
      <Button icon="search" shape="circle" />
      <Button icon="search" shape="circle" theme="primary" />
    </div>
    <div className="rows">
      <Button size="lg" icon="time" shape="circle" />
      <Button size="lg" icon="keyboard" shape="circle" theme="primary" />
    </div>
    <div className="rows">
      <Button size="xl" icon="time" shape="circle" />
      <Button size="xl" icon="keyboard" shape="circle" theme="primary" />
    </div>
  </>
, mountNode);
```



## 组合按钮

```jsx
import { Button, Icon } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Button.Group>
        <Button>L</Button>
        <Button>M</Button>
        <Button>R</Button>
      </Button.Group>
      <Button.Group>
        <Button icon="arrow-left" />
        <Button icon="broadcast" />
        <Button icon="arrow-right" />
      </Button.Group>
    </div>
    <div className="rows">
      <Button.Group>
        <Button theme="primary">上一页</Button>
        <Button theme="primary">下一页</Button>
      </Button.Group>
      <Button.Group>
        <Button theme="primary" icon="arrow-left" />
        <Button theme="primary" icon="broadcast" />
        <Button theme="primary" icon="arrow-right" />
      </Button.Group>
    </div>
  </>
, mountNode);
```



## 块级按钮
块级按钮宽度为父元素宽度

```jsx
import { Button, Icon } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Button block>default</Button>
    </div>
    <div className="rows">
      <Button block theme="primary">primary</Button>
    </div>
    <div className="rows">
      <Button block theme="danger">danger</Button>
    </div>
  </>
, mountNode);
```



## 幽灵按钮
幽灵按钮在背景为有色的情况下使用的按钮形式，以下为几项实例

```jsx
import { Button } from 'zarm-web';

ReactDOM.render(
  <div className="rows-dark">
    <Button ghost theme="primary">Ghost</Button>
    <Button ghost disabled theme="primary">禁用状态</Button>
    <Button ghost>Ghost</Button>
    <Button ghost theme="danger">Ghost</Button>
  </div>
, mountNode);
```



## 加载中的按钮
点击按钮后进行数据加载操作，在按钮上显示加载状态。

```jsx
import { Button } from 'zarm-web';

ReactDOM.render(
  <>
    <Button theme="primary" loading>加载中</Button>
    <Button theme="danger" loading>加载中</Button>
    <Button loading>加载中</Button>
    <Button shape="round" loading>加载中</Button>
  </>
, mountNode);
```



## 链接按钮
使用a标签代替button, 可设置href, target属性

```jsx
import { Button } from 'zarm-web';

ReactDOM.render(
  <>
    <Button href="https://www.baidu.com/" theme="primary" target="_blank">primary</Button>
    <Button href="https://www.baidu.com/" theme="default" target="_blank">default</Button>
    <Button href="https://www.baidu.com/" theme="danger" target="_blank">danger</Button>
    <Button href="https://www.baidu.com/" disabled theme="danger" target="_blank">danger</Button>
  </>
, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | 'default' | 设置主题，可选值为 `default`、`primary`、`danger` |
| size | string | 'md' | 设置大小，可选值为 `xl`、`lg`、`md`、`sm`、`xs` |
| shape | string | 'radius' | 设置形状，可选值为 `rect`、`radius`、`round`、`circle` |
| block | boolean | false | 是否块级元素 |
| ghost | boolean | false | 是否幽灵按钮 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否加载中状态 |
| icon | string | '' | 图标类型，设置Icon组件的type |
| onClick | MouseEventHandler&lt;HTMLAnchorElement&gt; \| MouseEventHandler&lt;HTMLButtonElement&gt; | - | 点击后触发的回调函数 |
| htmlType | string | 'button' | 设置`button`原生的`type`值，可选值为 `button`、`submit`、`reset` |
| href | string | - | 点击跳转的地址，指定此属性`button`的行为和`a`链接一致 |
| target | string | - | 相当于 a 链接的 target 属性，href 存在时生效 |
