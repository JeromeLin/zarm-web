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
          onChange={(e) => this.onChange(e)}
        >
          <span className="content">未选中</span>
        </Radio>

        <Radio
          value="a"
          onChange={(e) => this.onChange(e)}
        >
          <span className="content">hover</span>
        </Radio>

         <Radio
          value="a"
          onChange={(e) => this.onChange(e)}
        >
          <span className="content">已选中</span>
        </Radio>

         <Radio
          value="a"
          disabled='disabled'
          onChange={(e) => this.onChange(e)}
        >
          <span className="content" >禁用</span>
        </Radio>

         <Radio
          value="a"
          checked={true}
          disabled='disabled'
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
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Radio.Group size="lg" >
            <Radio.Button value="选项一">选项一</Radio.Button>
            <Radio.Button value="选项二">选项二</Radio.Button>
            <Radio.Button value="选项三">选项三</Radio.Button>
          </Radio.Group>
        </div>
        <div className="multi-rows">
          <Radio.Group size="md" >
            <Radio.Button value="选项一">选项一</Radio.Button>
            <Radio.Button value="选项二">选项二</Radio.Button>
            <Radio.Button value="选项三">选项三</Radio.Button>
          </Radio.Group>
        </div>
        <div className="multi-rows">
          <Radio.Group size="sm" >
            <Radio.Button value="选项一">选项一</Radio.Button>
            <Radio.Button value="选项二">选项二</Radio.Button>
            <Radio.Button value="选项三">选项三</Radio.Button>
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
| theme | string | 'default' | 设置主题，可选值为 `default`、`primary`、`danger` |
| size | string | 'md' | 设置大小，可选值为 `lg`、`md`、`sm`、`xs` |
| shape | string | 'radius' | 设置形状，可选值为 `rect`、`radius`、`round`、`circle` |
| block | boolean | false | 是否块级元素 |
| ghost | boolean | false | 是否幽灵按钮 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否加载中状态 |
| icon | ReactNode | - | 设置图标 |
| onClick | MouseEventHandler&lt;HTMLAnchorElement&gt; \| MouseEventHandler&lt;HTMLButtonElement&gt; | - | 点击后触发的回调函数 |
| htmlType | string | 'button' | 设置`button`原生的`type`值，可选值为 `button`、`submit`、`reset` |
| href | string | - | 点击跳转的地址，指定此属性`button`的行为和`a`链接一致 |
| target | string | - | 相当于 a 链接的 target 属性，href 存在时生效 |