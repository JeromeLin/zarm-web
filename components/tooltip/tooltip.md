## Tooltip 文字提示
文字提示气泡框。

### 基础用法
支持各种方位。

:::demo

```js
  render() {
    return (
      <div>
        {
          ['left', 'right', 'top', 'bottom', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((item, index) => {
            let title = '这是一个' + item + '的Tooltip';
            return (
              <Tooltip key={index} title={title} direction={item} style={{marginRight : 10}}>
                <Button style={{marginRight: 0, marginBottom: 8}}>{item}</Button>
              </Tooltip>
            );
          })
        }
      </div>
    )
  }
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| direction    | 方位  | string |   left,right,top...  |    bottom  |
| title    | 文字  | string |   -  |    - |
| trigger   | 触发方式  | string |   click, hover  |   hover  |



