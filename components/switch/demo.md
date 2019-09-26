# Swtich 开关
需要表示开关状态/两种状态之间的切换时使用。


## 基本开关
这是一个最基本的开关

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
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Switch 
          disabled
          value={false} />
        </div>
        <div className="multi-rows">
          <Switch 
          disabled
          value={true} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 加载中
点击开关后进行数据加载操作，在按钮上显示加载状态。

```jsx
import { Switch } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Switch 
          loading
          value={false} />
        </div>
        <div className="multi-rows">
          <Switch 
          loading
          value={true} />
        </div>
        <div className="multi-rows">
          <Switch 
          loading
          size={'sm'}
          value={false} />
        </div>
        <div className="multi-rows">
          <Switch 
          loading
          size={'sm'}
          value={true} />
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
| loading | boolean | false | 是否显示加载中的状态 |
| onChange | (checked: boolean) => void | - | 点击后触发的回调函数 |
| style | object | - | 自定义样式 |