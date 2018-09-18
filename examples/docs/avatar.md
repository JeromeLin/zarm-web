## Avatar 
头像。

### 基础用法

:::demo 指定`icon`、`size`、`shape`、 属性。

```js
  render() {
    return (
      <div className="avatar-list">
        <div>
          <Avatar size={64} icon="user" />
          <Avatar size="large" icon="user"/>
          <Avatar icon="user"/>
          <Avatar size="small" icon="user"/>
        </div>
        <div>
          <Avatar shape="square" size={64} icon="user" />
          <Avatar shape="square" size="large" icon="user"/>
          <Avatar shape="square" icon="user"/>
          <Avatar shape="square" size="small" icon="user"/>
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
        <Avatar icon="user" />
        <Avatar>U</Avatar>
        <Avatar>USER</Avatar>
        <Avatar src="http://img95.699pic.com/element/40044/5588.png_860.png" alt="my avatar" onError={()=>console.log('load error')}/>
        <Avatar style={{ color: '#2db7f5', backgroundColor: 'rgb(249, 232, 8)' }}>U</Avatar>
        <Avatar style={{ backgroundColor: 'rgba(228, 45, 154, 0.88)' }} icon="user" />
      </div>
    )
  }
```
:::

### Attributes
| 参数                | 说明                                   | 类型                                   | 可选值          | 默认值     | 
|------------------  |-------------------------------------   |----------------------------------     |-------------   |---------  |
| icon               |  icon头像的icon tyep, 具体查看Icon组件    | string                                |    -           |    -      |
| shape              |  头像的形状                              | circle 或 square                       |   -            | circle    |
| size               |  头像的大小                              | number 或 string: large small default  |    -           | default   |
| src                |  图片头像的图片地址                       | string                                 |    -           |    -     |
| alt                |  描述图片的备用文字                       | string                                 |   -            |   -      |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onError | 当图片加载失败时的处理函数，返回false可以阻止默认行为 |  - |

