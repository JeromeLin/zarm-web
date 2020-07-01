# Select 选择器

常用的下拉选择器。

## 基本用法

最简单的选择器。通过`value`设置值，通过`onChange`来监听值的变化。

```jsx
import { Select } from 'zarm-web';
const { Option } = Select;

ReactDOM.render(
  <Select style={{ width: 120 }}>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
  </Select>
, mountNode);
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
