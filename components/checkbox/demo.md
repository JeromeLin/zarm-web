# Checkbox 多选框
多选框。


## 基础用法

单独使用，表示在两种状态之间切换。


```js
import { Checkbox } from 'zarm-web';

class Demo extends React.Component {
  onChange(e) {
    console.log(e.target.checked);
  }
  render() {
    return (
      <div>
        <Checkbox
          onChange={(e) => this.onChange(e)}
        >
          选择
        </Checkbox>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## 组合使用

一组可选项中进行多项选择。


```js
import { Checkbox } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxValue: []
    }
  }
  render() {
    return (
      <div>
        <div style={{marginBottom: 8}}>选择了：{this.state.checkboxValue.join(',')}</div>
        <Checkbox.Group
          value={this.state.checkboxValue}
          onChange={(values) => {
            this.setState({
              checkboxValue: values
            });
          }}
        >
          <Checkbox value="a">A</Checkbox>
          <Checkbox value="b">B</Checkbox>
          <Checkbox value="c">C</Checkbox>
          <Checkbox value="d">D</Checkbox>
        </Checkbox.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 禁用状态

不可勾选状态。


```js
import { Checkbox } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Checkbox
          disabled
          onChange={(e) => this.onChange(e)}
        >
          选择
        </Checkbox>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 部分选中状态

未全部选中，即部分选中状态。

可以使用`indeterminate`属性来定义样式是否为部分选中。

```js
import { Checkbox } from 'zarm-web';
const plainOptions = ['a','b','c','d'];
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxValue: ['a','c'],
      indeterminate: true,
      checkAll:false,
    }
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
      <div>
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
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

Checkbox 

| 参数                | 类型                 | 默认值 | 说明   
| :-------------  | :------------------  | :----- | :--------
| checked          | boolean               | false  | 是否选中 
| defaultChecked   | boolean                | false  | 默认选中 
| disabled         | boolean                     | -     | 禁用  
| value           | string               | - | - | 选择框对应的值 
| indeterminate  | boolean        | false  | 是否是部分选中状态 
| className       | string                 |  -| 追加类名      
| style           | React.CSSProperties          | -      | 自定义样式 
| id              | string   | - | 方便外部带有 for 属性的 label 标签控制当前 checkbox
| onChange        | Function(e:Event)  |-| 勾选状态变化触发的事件 

Checkbox.Group 

| 参数          | 类型                  | 默认值 | 说明                  
| ------------  | ------------------ | ------ | ----------------------
| value         | string[]             | false  | 选中的值   
| defaultValue  | string[]            | false  | 默认选中的值    
| disabled      | boolean                  | false  | 整组禁用  
| className     | string               |     -   | 追加类名   
| style         | React.CSSProperties        | -     | 自定义样式    
| onChange      |  Function(values)    |-| 勾选状态变化触发的事件 


