## Avatar 
头像,支持图片、图标或字符展示。

### 基础用法

:::demo 指定`icon`、`size`、`shape`、 属性。

```js
  render() {
    return (
      <div className="avatar-list">
        <div>
          <Avatar size={80} icon="user" />
          <Avatar size="xl" icon="user"/>
          <Avatar size="lg" icon="user"/>
          <Avatar icon="user"/>
          <Avatar size="sm" icon="user"/>
          <Avatar size="xs" icon="user"/>
        </div>
        <div>
          <Avatar shape="square" size={80} icon="user"/>
          <Avatar shape="square" size="xl" icon="user"/>
          <Avatar shape="square" size="lg" icon="user"/>
          <Avatar shape="square" icon="user"/>
          <Avatar shape="square" size="sm" icon="user"/>
          <Avatar shape="square" size="xs" icon="user"/>
        </div>
      </div>
    )
  }
```
:::

### 类型

:::demo 指定`icon`、`size`、`shape`、 属性。

```js
  render() {
    return (
      <div className="avatar-list">
        <Avatar icon="user"/>
        <Avatar style={{ backgroundColor: 'rgb(245, 106, 0)' }}>U</Avatar>
        <Avatar>USER</Avatar>
        <Avatar src="http://img95.699pic.com/element/40044/5588.png_860.png" alt="my avatar" onError={()=>console.log('load error')}/>
        <Avatar style={{ color: '#2db7f5', backgroundColor: 'rgb(249, 232, 8)' }}>U</Avatar>
        <Avatar style={{ backgroundColor: 'rgba(228, 45, 154, 0.88)' }} icon="user-fill" />
      </div>
    )
  }
```
:::

### Attributes
| 参数                | 说明                                   | 类型                                   | 可选值          | 默认值     | 
|------------------  |-------------------------------------   |----------------------------------     |-------------   |---------  |
| icon               |  icon头像的icon type, 具体查看Icon组件    | string                                |    -           |    -      |
| shape              |  头像的形状                              | string                       | circle,square    | circle
| size               |  头像的大小                              | string  |    xl,lg,sm,xs           | - |
| src                |  图片头像的图片地址                       | string                                 |    -           |    -     |
| alt                |  描述图片的备用文字                       | string                                 |   -            |   -      |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onError | 当图片加载失败时的处理函数，返回false可以阻止默认行为 |  - |

