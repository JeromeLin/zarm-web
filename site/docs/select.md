## Select 选择器

常用的下拉选择器。

### 基础用法

最简单的选择器。

:::demo 通过`value`设置值，通过`onChange`来监听值的变化。

```js
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      data: []
    };
    this.ref = React.createRef();
  }
  componentDidMount(){
    setTimeout(()=>{
      // mock async data
      this.setState({
        data: [
          {
            value: '',
            text: '全部',
          },
          {
            value: 'a',
            text: '我是A'
          },
          {
            value: 'b',
            text: '我是B'
          }
        ]
      });
      console.log(this.ref.current);
    }, 1000);
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Select
          style={{ width: 200 }}
          ref={this.ref}
          onChange={(data) => {
            console.log(data);
            this.setState({
              selectValue : data.value,
            });
        }}>
          {
            data.map(({ value, text }) => {
              return (
                <Select.Option key={value} value={value}>{text}</Select.Option>
              )
            })
          }

        </Select>
      </div>
    )
  }
```
:::

### 是否禁用

添加`disabled`属性即可禁用。

:::demo

```js
  render() {
    return (
      <div>
        <Select
          disabled
          title="我是A"
          style={{ width: 200 }}
          value="a"
        >
          <Select.Option value="a">我是A</Select.Option>
          <Select.Option value="b" disabled>我是B</Select.Option>
          <Select.Option value="c">我是C</Select.Option>
          <Select.Option value="d">我是D</Select.Option>
        </Select>
      </div>
    )
  }
```
:::

### 支持本地搜索

支持输入框搜索选项。

:::demo 添加`search`属性，通过`onSearchChange`监听输入框值的变化。

```js
  constructor(props) {
    super(props)
    this.state = {
      selectValue: ''
    }
  }
  render() {
    return (
      <div>
        <Select
          search
          value={this.state.selectValue}
          style={{ width: 200 }}
          // searchPlaceholder="输入关键字"
          onSearchChange={(value) => {
            console.log(value)
          }}
          onChange={(data) => {
            console.log(data);
            this.setState({
              selectValue: data.value
            });
          }}>
          <Select.Option value="a">我是A</Select.Option>
          <Select.Option value="b">我是B</Select.Option>
          <Select.Option value="c">我是C</Select.Option>
          <Select.Option value="d">我是D</Select.Option>
        </Select>
      </div>
    )
  }
```
:::

### 支持远程搜索

支持输入框搜索选项。

:::demo 添加`search`属性，通过`onSearchChange`监听输入框值的变化。

```js
  constructor(props) {
    super(props)
    this.state = {
      selectValue: '',
      options: []
    }
  }

  render() {
    return (
      <div>
        <Select
          remoteSearch
          value={this.state.selectValue}
          style={{ width: 200 }}
          searchPlaceholder="输入关键字"
          onSearchChange={(value) => {
            console.log(value)
             setTimeout(() => {
                this.setState({ options: [`${value}1`,`${value}2`,`${value}3`,`${value}4`,`${value}5`] })
             }, 1000)
          }}
          onChange={(data) => {
            this.setState({
              selectValue: data.value
            }, () => {
              console.log(this.state.selectValue);
            });
          }}
        >
          {this.state.options.map(elem => <Select.Option key={elem} value={elem}>{elem}</Select.Option>)}
        </Select>
      </div>
    )
  }
```
:::


### 多选

支持输入框多选。

:::demo 添加`multiple`属性，可支持多选。

```js
  constructor(props) {
    super(props)
    this.state = {
      selectValue: ['a'],
      b:'123',
      c:'456'
    }
  }
  render() {
    return (
      <div>
        <Select
          multiple
          value={this.state.selectValue}
          style={{ width: 200 }}
          onChange={(selectedArr,selectedData) => {
            console.log(selectedArr, selectedData);
            this.setState({
              selectValue: selectedArr
            });
          }}>
          <Select.Option value="a">{[this.state.c,this.state.b]}</Select.Option>
          <Select.Option value="b">我是B</Select.Option>
          <Select.Option value="c">我是C</Select.Option>
          <Select.Option value="d">我是D</Select.Option>
           <Select.Option value="e">我是E</Select.Option>
          <Select.Option value="f">我是F</Select.Option>
          <Select.Option value="g">我是G</Select.Option>
          <Select.Option value="h">我是H</Select.Option>
          <Select.Option value="">我的value是空字符串</Select.Option>
        </Select>
      </div>
    )
  }
```
:::


### 多选并支持查找

支持输入框搜索选项。

:::demo 添加`multiple` 和`search`属性，可支持多选和查找。

```js
  constructor(props) {
    super(props)
    this.state = {
      selectValue: ['a']
    }
  }
  render() {
    return (
      <div>
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
        </Select>
      </div>
    )
  }
```
:::

注意事项
+ 当`multiple`属性为`true`时, `value`需要为`Array<string>`类型
+ 当`multiple`属性为`true`时, `onChange`的回调参数为`(selectedValueArr,selectedValueData)`,数据类型如下：
```
type selectedValueArr = Array<string>;
type selectedValueData = Array<{value:string; text:ReactNode; index:number}>;
```
+ onChange回调的参数中的`value`值类型始终为`string`;
+ 当`multiple`属性为`true`时,若参数`value`中存在目前`option`列表中不存在的元素：则不会显示该元素，但也不会删除该元素。例如：
```js
  this.state = {
      selectValue: ['i am not the one']
  }
  render() {
    return (
        <Select
          multiple
          value={this.state.selectValue}
          onChange={(selectedArr) => {
            console.log(selectedArr);
            this.setState({
              selectValue: selectedArr
            });
          }}>
          <Select.Option value="a">我是A</Select.Option>
          <Select.Option value="b">我是B</Select.Option>
        </Select>
    )
  }
```
以上代码中`'i am not the one'`并不存在于Select.Option中，当你执行`onChange`操作的时候`selectedArr`中依然会保留改字段,但并不会显示在输入框内。


### 更多设置

通过`radius`设置圆角。

:::demo

```js
  constructor(props) {
    super(props)
    this.state = {
      selectValue: ''
    }
  }
  render() {
    return (
      <div>
        <Select
          radius
          value={this.state.selectValue}
          style={{ width: 200 }}
          // searchPlaceholder="输入关键字"
          onChange={(data) => {
            this.setState({
              selectValue: data.value
            });
          }}>
          <Select.Option value="a">我是A</Select.Option>
          <Select.Option value="b">我是B</Select.Option>
          <Select.Option value="c">我是C</Select.Option>
          <Select.Option value="d">我是D</Select.Option>
        </Select>
      </div>
    )
  }
```
:::


### Select Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中值   | string, string[] |   -            |    -   |
| defaultValue     | 默认选中值   | string  |   - |     1  |
| radius     | 是否圆角   | boolean   | — | false  |
| search     | 是否支持搜索   | boolean    | — | false   |
| disabled  | 禁用    | -   | -  | -   |
| isDisabled  | 是否禁用    | boolean   | true, false   | false   |
| tagTheme     | 多选状态下的tag标签主题   | string   | — | default  |
| size | Select组件的大小 | string | xs,sm,lg,xl | - |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 选项变更时候触发的事件 |  { index, value, text }|
| onSearchChange | 搜索框值变更触发的事件 | searchValue |


### Select.Multiple Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中值   | string |   -            |    -   |
| defaultValue     | 默认选中值   | string  |   - |     1  |
| radius     | 是否圆角   | boolean   | — | false  |
| disabled  | 禁用    | -   | -  | -   |
| isDisabled  | 是否禁用    | boolean   | true, false   | false   |

### Select.Multiple Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 选项变更时候触发的事件 |  { index, value, text }|
| onDoubleClick | 双击选项触发的事件 | searchValue |


### Option Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| checked     | 是否选中   | boolean   | — | false  |
| disabled     | 是否禁用   | boolean   | — | false  |
| value | 当前option组件的value值（必填） | string | - | - |
