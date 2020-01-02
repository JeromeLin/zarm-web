# Checkbox 多选框
拥有开/关状态的基础组件，常用于条目多选场景。



## 基础用法
单独使用，表示在两种状态之间切换。

```jsx
import { Checkbox } from 'zarm-web';

ReactDOM.render(
  <Checkbox onChange={(e) => console.log(e)}>选择</Checkbox>
, mountNode);
```


## 组合使用
一组可选项中进行多项选择。

```jsx
import { Checkbox } from 'zarm-web';

class Demo extends React.Component {
  state = {
    checkboxValue: []
  }

  render() {
    return (
      <>
        <div style={{marginBottom: 8}}>选择了：{this.state.checkboxValue.join(',')}</div>
        <Checkbox.Group
          value={this.state.checkboxValue}
          onChange={(values) => {
            console.log(values)
            this.setState({
              checkboxValue: values
            });
          }}
        >
          <Checkbox value="a" onChange={value => console.log(value)}>A</Checkbox>
          <Checkbox value="b">B</Checkbox>
          <Checkbox value="c">C</Checkbox>
          <Checkbox value="d">D</Checkbox>
        </Checkbox.Group>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 禁用状态
不可勾选状态。

```jsx
import { Checkbox } from 'zarm-web';

ReactDOM.render(
  <>
    <Checkbox
      disabled
      onChange={(e) => console.log(e)}
    >
      选择
    </Checkbox>
    <Checkbox
      disabled
      checked
      onChange={(e) => console.log(e)}
    >
      选择
    </Checkbox>
  </>
, mountNode);
```



## 部分选中状态
未全部选中，即部分选中状态。
可以使用`indeterminate`属性来定义样式是否为部分选中。

```jsx
import { Checkbox } from 'zarm-web';

const plainOptions = ['a', 'b', 'c', 'd'];

class Demo extends React.Component {
  state = {
    checkboxValue: ['a','c'],
    indeterminate: true,
    checkAll: false,
  }

  onCheckAllChange = e => {
    this.setState({
      checkboxValue: e.target.checked ? JSON.parse(JSON.stringify(plainOptions)) : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  onChange = checkboxValue => {
    this.setState({
      checkboxValue,
      indeterminate: !!checkboxValue.length && checkboxValue.length < plainOptions.length,
      checkAll: checkboxValue.length === plainOptions.length,
    });
  };
 
  render() {
    return (
      <>
        <div style={{marginBottom: 8}}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            全选
          </Checkbox>
        </div>

        <Checkbox.Group
          value={this.state.checkboxValue}
          onChange={this.onChange}
        >
          <Checkbox value="a">A</Checkbox>
          <Checkbox value="b">B</Checkbox>
          <Checkbox value="c">C</Checkbox>
          <Checkbox value="d">D</Checkbox>
        </Checkbox.Group>
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

<h3>Checkbox</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| checked | boolean | false | 是否选中 |
| defaultChecked | boolean | false | 默认选中 |
| disabled | boolean | false | 是否禁用 |
| value | string \| number | - | - | 选择框对应的值 |
| indeterminate | boolean | false | 是否是部分选中状态 |
| id | string | - | 方便外部带有 for 属性的 label 标签控制当前 checkbox |
| onChange | React.ChangeEventHandler&lt;HTMLInputElement&gt; | - | 勾选状态变化触发的事件 |

<h3>Checkbox.Group</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string[] \| number[] | [] | 选中的值 | 
| defaultValue | string[] \| number[] | [] | 默认选中的值 |    
| disabled | boolean | false | 整组禁用 | 
| onChange | (values: string[] \| number[]) => void | - | 勾选状态变化触发的事件 | 


