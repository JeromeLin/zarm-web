# 单选框 Radio 


## 基本用法

```jsx
import { Radio } from 'zarm-web';

class Demo extends React.Component {
  onChange (e) {
    console.log(e.target.value)
  }
  render() {
    return (
      <div className="za-row">
        <Radio
          value="a"
          style={{'marginRight':'15px'}}
          onChange={(e) => this.onChange(e)}
        >
          <span className="content">未选中</span>
        </Radio>

        <Radio
          value="a"
          onChange={(e) => this.onChange(e)}
          style={{'marginRight':'15px'}}
        >
          <span className="content">hover</span>
        </Radio>

         <Radio
          checked
          style={{'marginRight':'15px'}}
          onChange={(e) => this.onChange(e)}
        >
          <span className="content">已选中</span>
        </Radio>

         <Radio
          value="a"
          disabled= {true}
          style={{'marginRight':'15px'}}
          onChange={(e) => this.onChange(e)}
        >
          <span className="content" >禁用</span>
        </Radio>

         <Radio
          value="a"
          checked={true}
          disabled={true}
          onChange={(e) => this.onChange(e)}
        >
          <span className="content" >禁用</span>
        </Radio>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 无底色按钮样式/有底色按钮样式
```jsx

import { Radio } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: ''
    }
  }
  
  onChange = (e) => {
    console.log(e.target.value)
  }

  render() {
    return (
      <div className="r-con">
        <Radio.Group ghost shape='rect' type="button" onChange={(e) => this.onChange(e)} style={{'marginBottom':'15px'}}>
          <Radio value="选项一">选项一</Radio>
          <Radio value="选项二">选项二</Radio>
          <Radio value="选项三">选项三</Radio>
        </Radio.Group>
        <Radio.Group ghost  className="ghost-demo" style={{'marginBottom':'15px'}}>
          <Radio value="选项一">选项一</Radio>
          <Radio disabled value="选项二">选项二</Radio>
          <Radio value="选项三">选项三</Radio>
        </Radio.Group>
        <Radio.Group disabled value="选项一" shape='round' style={{'marginBottom':'15px'}}>
          <Radio value="选项一">选项一</Radio>
          <Radio value="选项二">选项二</Radio>
          <Radio value="选项三">选项三</Radio>
        </Radio.Group>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 三种大小

```jsx

import { Radio } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: ''
    }
  }

  onChange = (e) => {
    console.log(e.target.value)
  }

  render() {
    return (
      <div>
        <div className="multi-rows" style={{'marginBottom':'15px'}}>
          <Radio.Group size="lg" type="button" onChange={this.onChange} shape='round'>
            <Radio value="选项一">选项一</Radio>
            <Radio value="选项二">选项二</Radio>
            <Radio value="选项三">选项三</Radio>
          </Radio.Group>
        </div>
        <div className="multi-rows" style={{'marginBottom':'15px'}}>
          <Radio.Group size="md" shape='round'>
            <Radio value="选项一">选项一</Radio>
            <Radio value="选项二">选项二</Radio>
            <Radio value="选项三">选项三</Radio>
          </Radio.Group>
        </div>
        <div className="multi-rows" style={{'marginBottom':'15px'}} shape='round'>
          <Radio.Group size="sm" shape='round'>
            <Radio value="选项一">选项一</Radio>
            <Radio value="选项二">选项二</Radio>
            <Radio value="选项三">选项三</Radio>
          </Radio.Group>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | number，string | - | 值 |
| checked | boolean | false | 选中值 |
| disabled | boolean | false | 是否禁用|
| onChange | (checked: boolean) => void | - | 值变化时触发的回调函数 |
| id | string | - | 方便外部带有for属性的label标签控制当前radio |
| style | boolean | React.CSSProperties | 自定义样式 |
| className | string | - | 追加类名 |
| defaultChecked | boolean | false | 初始选中值|

# Radio.Group

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | number ， string | - | 选中值 |
| size | `lg`、`md`、`sm` | 'md' | 大小，只对按钮类型生效  |
| block | boolean | false | 是否为块级元素，type为button类型时有效 |
| disabled | boolean | false | 是否禁用|
| onChange | (checked: boolean) => void | - | 值变化时触发的回调函数 |
| style | boolean | React.CSSProperties | 自定义样式 |
| className | string | - | 追加类名 |
| defaultValue | number ， string | - | 初始选中值|
| type | 'button', 'normal' | 'button' | 显示类型|
| ghost | boolean | false | 按钮类型是否为幽灵按钮|
| shape | 'radius' , 'rect' , 'round' | radius | 形状。 type为button类型时有效|
