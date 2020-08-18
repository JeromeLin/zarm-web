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


ReactDOM.render(
  <>
  <Select
    style={{ width: 280 }}
    search
    placeholder="输入关键字"
    onSearchChange={(value) => {
    }}
    onChange={(data) => {
      console.log(data);
    }}>>
    <Option value="a">我是A</Option>
    <Option value="b">我是B</Option>
    <Option value="c">我是C</Option>
    <Option value="d">我是D</Option>
  </Select>
  </>
, mountNode);

```

## 支持远程搜索

支持输入框搜索选项。

 添加`search`属性，通过`onSearchChange`监听输入框值的变化。

```jsx

import { Select } from 'zarm-web';
const { Option } = Select;

class SelectSearchDemo extends React.Component {
  state = {
    selectValue: '',
    options: []
  };
  render() {
    const { selectValue, options} = this.state;
      return (
        <>
          <Select
            style={{ width: 280 }}
            search
            placeholder="输入关键字"
            onSearchChange={(value) => {
              console.log(value)
              setTimeout(() => {
                 this.setState({ options: [`${value}1`,`${value}2`,`${value}3`,`${value}4`,`${value}5`] })
              }, 1000)
            }}
            onChange={(data) => {
              console.log(data);
              this.setState({
                selectValue: data.value
              }, () => {
                console.log('ahh',this.state.selectValue);
              });
            }}>>
            {this.state.options.map(elem => <Option key={elem} value={elem}>{elem}</Option>)}
          </Select>
        </>
    );
  }
}

ReactDOM.render(<SelectSearchDemo />, mountNode);

```

## 多选并支持查找

支持输入框搜索选项。

添加`multiple` 和`search`属性，可支持多选和查找。

```jsx
import { Select } from 'zarm-web';
const { Option } = Select;

class SelectSearchDemo extends React.Component {
  state = {
    selectValue: ['a'],
  };
  render() {
    const { selectValue, options} = this.state;
      return (
        <>
          <Select
            tagTheme="info"
            search
            multiple
            value={this.state.selectValue}
            style={{ width: 200 }}
            onChange={(selectedArr) => {
              console.log(selectedArr);
              this.setState({
                selectValue: selectedArr
              });
            }}>
            <Select.Option value="a">我是A</Select.Option>
            <Select.Option value="b">我是B</Select.Option>
            <Select.Option value="c">我是C</Select.Option>
            <Select.Option value="d">我是D</Select.Option>
            <Select.Option value="e">我是E</Select.Option>
            <Select.Option value="f">我是F</Select.Option>
            <Select.Option value="g">我是G</Select.Option>
            <Select.Option value="h">我是H</Select.Option>
            <Select.Option value="">我的value是空字符串</Select.Option>
          </Select>
        </>
    );
  }
}

ReactDOM.render(<SelectSearchDemo />, mountNode);

```

## 多选并支持查找

支持输入框搜索选项。

添加`multiple` 和`search`属性，可支持多选和查找。

```jsx
import { Select } from 'zarm-web';
const { Option } = Select;

class SelectSearchDemo extends React.Component {
  state = {
    selectValue: ['a'],
  };
  render() {
    const { selectValue, options} = this.state;
      return (
        <>
          <Select
            tagTheme="info"
            search
            multiple
            value={this.state.selectValue}
            style={{ width: 280 }}
            onChange={(selectedArr) => {
              console.log(selectedArr);
              this.setState({
                selectValue: selectedArr
              });
            }}>
          </Select>
        </>
    );
  }
}

ReactDOM.render(<SelectSearchDemo />, mountNode);

```

## 注意事项

+ 当`multiple`属性为`true`时, `value`需要为`Array<string>`类型
+ 当`multiple`属性为`true`时, `onChange`的回调参数为`(selectedValueArr,selectedValueData)`,数据类型如下：

```jsx

type selectedValueArr = Array<string>;
type selectedValueData = Array<{value:string; text:ReactNode; index:number}>;

```

+ onChange回调的参数中的`value`值类型始终为`string`;
+ 当`multiple`属性为`true`时,若参数`value`中存在目前`option`列表中不存在的元素：则不会显示该元素，但也不会删除该元素。例如：


```jsx
  // this.state = {
  //     selectValue: ['i am not the one']
  // }
  // render() {
  //   return (
  //       <Select
  //         multiple
  //         value={this.state.selectValue}
  //         onChange={(selectedArr) => {
  //           console.log(selectedArr);
  //           this.setState({
  //             selectValue: selectedArr
  //           });
  //         }}>
  //         <Select.Option value="a">我是A</Select.Option>
  //         <Select.Option value="b">我是B</Select.Option>
  //       </Select>
  //   )
  // }
```

以上代码中`'i am not the one'`并不存在于Select.Option中，当你执行`onChange`操作的时候`selectedArr`中依然会保留改字段,但并不会显示在输入框内。



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
