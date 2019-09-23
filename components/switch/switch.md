## Swtich 组件
一个最基本的swtich组件。

```jsx
import { Switch } from 'zarm-web';

class Demo extends React.Component {
  constructor(){
    super();
    this.state = {
      value:false
    }
  }
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Switch 
          onChange={(value)=>{
           console.log("current value ",value)
          }}
          value={this.state.value} />
        </div>
        
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 禁用类型
按钮处于不可用状态的情况。

```jsx
import { Switch } from 'zarm-web';

class Demo extends React.Component {
  constructor(){
    super();
    this.state = {
      value:false
    }
  }
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Switch 
          disabled
          value={this.state.value} />
        </div>
        
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 不同尺寸
除了默认尺寸外，可以额外设置四种尺寸。

```jsx
import { Switch } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="multi-rows">
          <Switch value={false} >默认尺寸</Switch>
        </div>
        <div className="multi-rows">
          <Switch value={false} size="sm" >sm尺寸</Switch>
        </div>

        
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| size | string | 'md' | 设置大小，可选值为 `sm`|
| value | boolean | false | switch开关状态 |
| disabled | boolean | false | 是否禁用 |
| onChange | function | - | 点击后触发的回调函数 |
| style | object | - | 自定义样式 |