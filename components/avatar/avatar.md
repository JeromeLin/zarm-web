# Avatar 头像
支持图片、图标或字符展示。

## 基础用法
指定`icon`、`size`、`shape`、 属性。

```jsx
import { Avatar } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div className="avatar-list">
         <div>
           <Avatar size={100} icon="time" />
           <Avatar size="xl" icon="time"/>
           <Avatar size="lg" icon="time"/>
           <Avatar icon="time"/>
           <Avatar size="sm" icon="time"/>
           <Avatar size="xs" icon="time"/>
         </div>
         <div>
           <Avatar shape="square" size={80} icon="time"/>
           <Avatar shape="square" size="xl" icon="time"/>
           <Avatar shape="square" size="lg" icon="time"/>
           <Avatar shape="square" icon="time"/>
           <Avatar shape="square" size="sm" icon="time"/>
           <Avatar shape="square" size="xs" icon="time"/>
         </div>
       </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## 类型

```jsx
import { Avatar } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div className="avatar-list">
        <Avatar icon="date"/>
        <Avatar style={{ backgroundColor: 'rgb(245, 106, 0)' }}>U</Avatar>
        <Avatar>USER</Avatar>
        <Avatar src="http://img95.699pic.com/element/40044/5588.png_860.png" alt="my avatar" onError={()=>console.log('load error')}/>
        <Avatar style={{ color: '#2db7f5', backgroundColor: 'rgb(249, 232, 8)' }}>U</Avatar>
        <Avatar style={{ backgroundColor: 'rgba(228, 45, 154, 0.88)' }} icon="time" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 可选值 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| icon | string | - | - |icon头像的icon type, 具体查看Icon组件|
| shape | string | 'circle','square' | 'circle' | 头像的形状
| size | string | `xl`、`lg`、`sm`、`xs` | - | 头像的大小
| src | string | - | - | 图片头像的图片地址 |
| alt | string | - | - | 描述图片的备用文字 |

Events

| 事件名称 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| onError | 当图片加载失败时的处理函数，返回false可以阻止默认行为 | - |
