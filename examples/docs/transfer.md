## Transfer 
多选框。

### 基础用法

:::demo 指定`initialPanelTitle`、`selectedPanelTitle`、`initialValue`、`keyOfItem` 、 `displayNameOfItem` 和 `width` 属性。

```js
  constructor(props) {
    super(props);
    this.state = {
      initialValue: [
        {
          id: '1',
          name: '张三',
          dept: '直营部',
          age: 46,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市杨浦区四平路324号',
            comp: '1xxx公司'
          },
          state: true
        },
        {
          id: '2',
          name: '李四',
          dept: '健康险事业部',
          age: 32,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: 'aaaa',
            comp: '2xxx公司'
          },
          state: true
        },
        {
          id: '3',
          name: '王五',
          dept: '金融信保部',
          age: 20,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '上海市浦东区张杨路1400号',
            comp: '3xxx公司'
          },
          state: false
        },
        {
          id: '4',
          name: '奥巴马',
          dept: '健康险事业部',
          age: 45,
          iphone: '15617283931',
          android: '15617283930',
          tel: '23412341231',
          address: {
            home: '美国洛杉矶',
            comp: '2xxx公司'
          },
          state: false
        },
      ],
      selectedValue: [],
    }
  }
  render() {
    const { initialValue, selectedValue } = this.state;
    return (
      <div>
        <Transfer initialPanelTitle='初始值' selectedPanelTitle='已选值' radius initialValue={initialValue}  selectedValue={selectedValue} keyOfItem='id' displayNameOfItem='name' width={500} onAdd={(value)=>{this.setState({selectedValue: value});}}/>
      </div>
    )
  }
```
:::

### Attributes
| 参数                | 说明              | 类型          | 可选值          | 默认值   | 
|------------------  |-----------------  |----------    |-------------   |-------- |
| initialPanelTitle  |  初始值选择框的标题  | string       |    -           |    ' '   |
| selectedPanelTitle |  已选值选择框的标题  | string       |    -           |    ' '   |
| initialValue       |  初始值选择框的数据  | object[]     |    -           |    [ ]   |
| selectedValue      |  已选值选择框的数据  | object[]     |    -           |    [ ]   |
| keyOfItem          |  选项的索引        | string        |   -            |    ' '   |
| displayNameOfItem  |  选项的显示名称     | string        |   -            |    ' '   |
| radius             |  是否圆角          | boolean       |   -            |   false |
| disabled           |  是否只读          | boolean       |   -            |  false  |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onAdd | 点击按钮 + 触发的事件 |  value |
| onMinus | 点击按钮 - 触发的事件 |  value |
| onDoubleAdd | 双击初始值选择框的选项触发的事件 |  value |
| onDoubleMinus | 双击已选值选择框的选项触发的事件 |  value |
