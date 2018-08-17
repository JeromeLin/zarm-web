## Select 选择器

常用的下拉选择器。

### 基础用法

最简单的选择器。

:::demo 通过`value`设置值，通过`onChange`来监听值的变化。

```js
  constructor(props) {
    super(props)
    this.state = {
      selectValue: '',
      options: []
    };
  }
  componentDidMount() {
    let i = 1;
    let options = [];
    while(i < 100) {
      options.push(`我是${i}`);
      i++;
    }
    this.setState({
      options
    });
  }
  render() {
    const { options } = this.state;
    return (
      <div>
        <Select
          style={{ width: 200 }}
          value={this.state.selectValue}
          onChange={(data) => {
            console.log(data);
            this.setState({
              selectValue : data.value,
            });
        }}>
          <Select.Option value="a">我是A</Select.Option>
          <Select.Option value="b" disabled>我是B</Select.Option>
          <Select.Option value="c">我是C</Select.Option>
          <Select.Option value="d">我是D</Select.Option>
          {
            options.map((text) => {
              return <Select.Option value={text} key={text}>{text}</Select.Option>
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

### 带搜索框

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

### 多选穿梭框

使用`Select.Multiple`实现。

:::demo

```js
  constructor(props) {
    super(props)
    this.state = {
      mulSelectLeft: [
        {value: 1, name: '我是选项一'},
        {value: 2, name: '我是选项二'},
        {value: 3, name: '我是选项三'},
        {value: 4, name: '我是选项四'},
      ],
      mulSelectLeftValue: [],
      mulSelectRight: [],
      mulSelectRightValue: [],
    }
  }
  render() {
    return (
      <div>
        <Select.Multiple
          style={{ width: 200, height: 200 }}
          value={this.state.mulSelectLeftValue}
          onChange={(selectedRows, row) => {
            this.setState({ mulSelectLeftValue: selectedRows });
          }}
        >
          {
            this.state.mulSelectLeft.map((option, index) => {
              return <Select.Option key={index} value={option.value}>{option.name}</Select.Option>
            })
          }
        </Select.Multiple>

        <span style={{margin: '-10px 10px 0 10px', textAlign: 'center', verticalAlign: 'middle', display: 'inline-block'}}>
          <Button
            radius
            style={{float: 'left', clear: 'both'}}
            isDisabled={this.state.mulSelectLeftValue.length == 0}
            onClick={() => {
              const mulSelectLeft = [...this.state.mulSelectLeft].filter(item => (this.state.mulSelectLeftValue.indexOf(item.value) < 0) && item);
              let selected = [...this.state.mulSelectLeft].filter(item => (this.state.mulSelectLeftValue.indexOf(item.value) > -1) && item);
              let mulSelectRight = this.state.mulSelectRight.concat(selected);
              this.setState({
                mulSelectLeft,
                mulSelectRight,
                mulSelectLeftValue: [],
                mulSelectRightValue: []
            });
          }}><Icon type="add" /></Button>
          <Button
            radius
            style={{float: 'left', clear: 'both', marginTop: 10}}
            isDisabled={this.state.mulSelectRightValue.length == 0}
            onClick={()=> {
              const mulSelectRight = [...this.state.mulSelectRight].filter(item => (this.state.mulSelectRightValue.indexOf(item.value) < 0) && item);
              let selected = [...this.state.mulSelectRight].filter(item => (this.state.mulSelectRightValue.indexOf(item.value) > -1) && item);
              let mulSelectLeft = this.state.mulSelectLeft.concat(selected);
              this.setState({
                mulSelectLeft,
                mulSelectRight,
                mulSelectLeftValue: [],
                mulSelectRightValue: []
            });
          }}><Icon type="minus" /></Button>
        </span>

        <Select.Multiple
          style={{width: 200, height: 200}}
          value={this.state.mulSelectRightValue}
          onChange={(selectedRows, row) => {
            this.setState({ mulSelectRightValue: selectedRows });
          }}
        >
          {
            this.state.mulSelectRight.map((option, index) => {
              return <Select.Option key={index} value={option.value}>{option.name}</Select.Option>
            })
          }
        </Select.Multiple>
      </div>
    )
  }
```
:::

### Select Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中值   | string |   -            |    -   |
| defaultValue     | 默认选中值   | string  |   - |     1  |
| radius     | 是否圆角   | boolean   | — | false  |
| search     | 是否支持搜索   | boolean    | — | false   |
| disabled     | 是否禁用   | boolean   | — | false  |


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
| disabled     | 是否禁用   | boolean   | — | false  |

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