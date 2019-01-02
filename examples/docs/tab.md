## Tab 标签页
选项卡切换组件。

### 基础用法

卡片样式选项卡, 支持动态宽度tab, 结合icon。

:::demo

```js
  render() {
    return (
      <div>
        <Tab.Group defaultValue={0} onChange={(i) => console.log(i)}>
          <Tab title="选项卡1">
            <div style={{padding: 10}}>
              这是选项卡1的文字
            </div>
          </Tab>
          <Tab disabled title="选项卡2">
            <div style={{padding: 10}}>
              这是选项卡2的文字
            </div>
          </Tab>
          <Tab title="选项卡3">
            <div style={{padding: 10}}>
              这是选项卡3的文字
            </div>
          </Tab>
          <Tab title={<span><Icon type="user-fill" /> 选项卡4</span>}>
            <div style={{padding: 10}}>
              这是选项卡4的文字
            </div>
          </Tab>
        </Tab.Group>
      </div>
    )
  }
```
:::

普通选项卡，支持动态宽度tab。

:::demo

```js
  render() {
    return (
      <div>
        <Tab.Group type="line" defaultValue={0} onChange={(i) => console.log(i)}>
          <Tab title="选项卡1">
            <div style={{padding: 10}}>
              这是选项卡1的文字
            </div>
          </Tab>
          <Tab disabled title="选项卡2">
            <div style={{padding: 10}}>
              这是选项卡2的文字
            </div>
          </Tab>
          <Tab title="选项卡3">
            <div style={{padding: 10}}>
              这是选项卡3的文字
            </div>
          </Tab>
          <Tab title="选项卡4444444">
             <div style={{padding: 10}}>
               这是选项卡4的文字
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
| title    | 选项名称  | string/ReactElement |   -  |    -  |
| disabled    | 是否禁用  | boolean |   -  |    false  |


### Tab.Group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| radius    | 是否圆角   | boolean |   -  |    false   |
| value   | 值 | number |   -   |    false   |
| defaultValue  | 默认值 | number |   -   |    false   |
| type  | 选项卡形式 | string |   card/line   |    'card'   |


### Tab.Group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 状态变化触发的事件 |  value |
