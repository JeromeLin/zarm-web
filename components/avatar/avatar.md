# Avatar 头像
支持图片或字符展示。

## 基础用法
指定'size''、'shape'属性。默认shape为'circle'，默认size为'md'

```jsx
import { Avatar } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div className="avatar-list">
         <div>
           <Avatar size="xl">XL</Avatar>
           <Avatar size="lg">LG</Avatar>
           <Avatar>MD</Avatar>
           <Avatar size="sm">SM</Avatar>
           <Avatar size="xs">XS</Avatar>
         </div>
         <div>
           <Avatar shape="square" size="xl">XL</Avatar>
           <Avatar shape="square" size="lg">LG</Avatar>
           <Avatar shape="square">MD</Avatar>
           <Avatar shape="square" size="sm">SM</Avatar>
           <Avatar shape="square" size="xs">XS</Avatar>
         </div>
       </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## 类型
支持style自定义，字符自动调整大小。且支持两种类型：图片、字符

```jsx
import { Avatar } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div className="avatar-list">
        <Avatar size="sm" style={{ fontSize: '12px' }}>USER</Avatar>
        <Avatar size="sm" style={{ color: 'red', backgroundColor: 'rgb(249, 232, 8)' }}>USER</Avatar>
        <Avatar size="sm" src="site/images/avatar/avatar.png" alt="my avatar" onError={()=>console.log('load error')}/>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| shape | string | 'circle' | 头像的形状，可选值为`circle`、`square`
| size | string | 'md' | 头像的大小, 可选值为`xl`、`lg`、`md`、`sm`、`xs`
| src | string | - | 图片头像的图片地址 |
| alt | string | - | 描述图片的备用文字 |

Events

| 事件名称 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| onError | 当图片加载失败时的处理函数，返回false可以阻止默认行为 | event |
