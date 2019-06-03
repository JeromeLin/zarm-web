## Popconfirm 气泡确认框

点击或移入元素，弹出气泡式的确认框。

### 基本用法

最简单的使用方式。

::: demo
```js
  render() {
    return (
      <div>
        <Popconfirm content={'确认删除吗'} onOk={() => {alert('confirmed')}} direction="top">
          <Button>Delete</Button>
        </Popconfirm>
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
              <Popconfirm key={item} content={'这是一个' + item + '的Popconfirm' } direction={item}>
                <Button theme="info" style={{marginRight: 10}}>{item}</Button>
              </Popconfirm>
            );
          }) 
        }
        </div>
        {
          ['top', 'topLeft',  'topRight', 'bottom', 'bottomLeft', 'bottomRight'].map(item => {
            return (
              <Popconfirm key={item} content={'这是一个' + item + '的Popconfirm' } direction={item}>
                <Button theme="warning" style={{marginRight: 10}}>{item}</Button>
              </Popconfirm>
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
        <Popconfirm trigger="hover" content={'这是一个Popconfirm' } direction="top">
          <Button theme="info">Hover</Button>
        </Popconfirm>
      </div>
    );
  }
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| content | 需要展示的内容 | string/element | — | '' |
| direction | 展示方位 | string | topLeft, top, topRight... | bottomRight |
| trigger | 触发方式 | string | hover/click | click |
| okText | 确认文案 | string | - | 确认 |
| cancelText | 取消文案 | string | - | 取消 |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onOk | 点击确认时候触发的事件 | — |
| onCancel | 点击取消时候触发的事件 | — |