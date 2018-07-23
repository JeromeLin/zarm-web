## Popover 气泡卡片

点击/鼠标移入元素，弹出气泡式的卡片。

### 基本用法

最简单的使用方式。

::: demo
```js
  render() {
    return (
      <div>
        <Popover content={() => '这是一个Popover' }>
          <Button theme="info">Click</Button>
        </Popover>
      </div>
    );
  }
```
:::

### 不同方位

可自定义方位。

::: demo 通过`direction`属性设置方位。
```js
  render() {
    return (
      <div>
        <div style={{ marginBottom: 8 }}>
        {
          ['left', 'leftTop',  'leftBottom', 'right', 'rightTop', 'rightBottom'].map(item => {
            return (
              <Popover key={item} content={() => '这是一个' + item + '的Popover' } direction={item}>
                <Button theme="info" style={{marginRight: 10}}>{item}</Button>
              </Popover>
            );
          })
        }
        </div>
        {
          ['top', 'topLeft',  'topRight', 'bottom', 'bottomLeft', 'bottomRight'].map(item => {
            return (
              <Popover key={item} content={() => '这是一个' + item + '的Popover' } direction={item}>
                <Button theme="warning" style={{marginRight: 10}}>{item}</Button>
              </Popover>
            );
          }) 
        }
      </div>
    );
  }
```
:::

### 不同触发方式

可以设置触发的方式。

::: demo 通过设置`trigger`属性设置触发方式，默认`click`。
```js
  render() {
    return (
      <div>
        <Popover trigger="hover" content={() => '这是一个Popover' } direction="top">
          <Button theme="info">Hover</Button>
        </Popover>
      </div>
    );
  }
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| content | 需要展示的内容 | string/function/element | — | '' |
| direction | 展示方位 | string | topLeft, top, topRight... | bottomRight |
| className | 弹窗类名 | string | — | '' |
| trigger | 触发方式 | string | hover/click | click |
| mask | 是否有蒙层 | boolean | - | false |
| radius | 是否圆角 | boolean | - | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onMaskClick | 点击蒙层时候触发的事件 | — |