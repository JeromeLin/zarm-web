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
          defaultChecked={true}
          />
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
          checked={false} />
        </div>
        <div className="multi-rows">
          <Switch 
          disabled
          checked={true} />
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
          checked={false} />
        </div>
        <div className="multi-rows">
          <Switch 
          loading
          checked={true} />
        </div>
        <div className="multi-rows">
          <Switch 
          loading
          size={'sm'}
          checked={false} />
        </div>
        <div className="multi-rows">
          <Switch 
          loading
          size={'sm'}
          checked={true} />
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
          <Switch checked={false} >默认尺寸</Switch>
        </div>
        <div className="multi-rows">
          <Switch checked={false} size="sm" >sm尺寸</Switch>
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
| checked | boolean | false | 值 |
| defaultChecked | boolean | false | 初始值 |
| size | string | 'md' | 开关大小，可选值为`md`，`sm`|
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否是加载中的开关 |
| className | string | - | Switch 器类名 |
| onChange | (value: boolean) => void | - | 点击后触发的回调函数 |