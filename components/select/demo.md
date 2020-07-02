# Select 选择器

常用的下拉选择器。

## 基本用法

最简单的选择器。通过`value`设置值，通过`onChange`来监听值的变化。添加`disabled`属性即可禁用。


```jsx
import { Select } from 'zarm-web';
const { Option } = Select;

ReactDOM.render(
  <>
  <Select style={{ width: 120, marginRight: 10}}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
  </Select>
  <Select disabled style={{ width: 120, marginRight: 10}}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
  </Select>
  <Select style={{ width: 120 }} radius={true} defaultValue="lily">
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="lily">Lily</Option>
  </Select>
  </>
, mountNode);
```

## 多选

支持输入框多选。添加`multiple`属性，可支持多选。

```jsx
import { Select } from 'zarm-web';
const { Option } = Select;

ReactDOM.render(
  <>
  <Select multiple style={{ width: 280 }}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="lily">Lily</Option>
    <Option value="john">John</Option>
    <Option value="honey">Honey</Option>
  </Select>
  </>
, mountNode);


```

## 支持本地搜索

支持输入框搜索选项。

添加`search`属性，通过`onSearchChange`监听输入框值的变化。

```jsx
import { Select } from 'zarm-web';
const { Option } = Select;

// constructor(props) {
//   super(props)
//   this.state = {
//     selectValue: ''
//   }
// }

ReactDOM.render(
  <>
  <Select
    style={{ width: 280 }}
    search
    placeholder="输入关键字"
    onSearchChange={(value) => {
      console.log(value)
    }}
    onChange={(data) => {
      console.log(data);
      // this.setState({
      //   selectValue: data.value
      // });
    }}>>
    <Option value="a">我是A</Option>
    <Option value="b">我是B</Option>
    <Option value="c">我是C</Option>
    <Option value="d">我是D</Option>
  </Select>
  </>
, mountNode);



  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     selectValue: ''
  //   }
  // }
  // render() {
  //   return (
  //     <div>
  //       <Select
  //         search
  //         value={this.state.selectValue}
  //         style={{ width: 200 }}
  //         // searchPlaceholder="输入关键字"
  //         onSearchChange={(value) => {
  //           console.log(value)
  //         }}
  //         onChange={(data) => {
  //           console.log(data);
  //           this.setState({
  //             selectValue: data.value
  //           });
  //         }}>
  //         <Select.Option value="a">我是A</Select.Option>
  //         <Select.Option value="b">我是B</Select.Option>
  //         <Select.Option value="c">我是C</Select.Option>
  //         <Select.Option value="d">我是D</Select.Option>
  //       </Select>
  //     </div>
  //   )
  // }
```



## API


<h3>Select Attributes</h3>

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中值   | string, string[] |   -            |    -   |
| defaultValue     | 默认选中值   | string  |   - |     1  |
| radius     | 是否圆角   | boolean   | — | false  |
| search     | 是否支持搜索   | boolean    | — | false   |
| disabled  | 禁用    | -   | -  | -   |
| isDisabled  | 是否禁用    | boolean   | true, false   | false   |
| tagTheme     | 多选状态下的tag标签主题   | string   | — | default  |
| size | Select组件的大小 | string | xs,sm,lg,xl | - |

<h3>Select Events</h3>

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 选项变更时候触发的事件 |  { index, value, text }|
| onSearchChange | 搜索框值变更触发的事件 | searchValue |

<h3>Select.Multiple Attributes</h3>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中值   | string |   -            |    -   |
| defaultValue     | 默认选中值   | string  |   - |     1  |
| radius     | 是否圆角   | boolean   | — | false  |
| disabled  | 禁用    | -   | -  | -   |
| isDisabled  | 是否禁用    | boolean   | true, false   | false   |

<h3>Select.Multiple Events</h3>


| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 选项变更时候触发的事件 |  { index, value, text }|
| onDoubleClick | 双击选项触发的事件 | searchValue |

<h3>Option Attributes</h3>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| checked     | 是否选中   | boolean   | — | false  |
| disabled     | 是否禁用   | boolean   | — | false  |
| value | 当前option组件的value值（必填） | string | - | - |
