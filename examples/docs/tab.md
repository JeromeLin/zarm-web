## Tab 标签页
选项卡切换组件。

### 基础用法
普通选项卡。

:::demo

```js
  render() {
    return (
      <div>
        <Tab.Group defaultValue={1} onChange={(i) => console.log(i)}>
          <Tab title="选项卡1">
            <div style={{padding: 10}}>
              这是选项卡1的文字
            </div>
          </Tab>
          <Tab title="选项卡2">
            <div style={{padding: 10}}>
              这是选项卡2的文字
            </div>
          </Tab>
          <Tab title="选项卡3">
            <div style={{padding: 10}}>
              这是选项卡3的文字
            </div>
          </Tab>
        </Tab.Group>
      </div>
    )
  }
```
:::

### Tab Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title    | 选项名称  | string |   -  |    -  |


### Tab.Group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| radius    | 是否圆角   | boolean |   -  |    false   |
| value   | 值 | boolean |   -   |    false   |
| defaultValue  | 默认值 | boolean |   -   |    false   |


### Tab.Group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 状态变化触发的事件 |  value |