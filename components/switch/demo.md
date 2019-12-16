# Swtich 开关
需要表示开关状态/两种状态之间的切换时使用。



## 基本开关
这是一个最基本的开关

```jsx
import { Switch } from 'zarm-web';

class Demo extends React.Component {
  state = {
    checked: false,
  };

  render() {
    return (
      <>
        <Switch
          checked={this.state.checked}
          onChange={(checked) => {
            this.setState({ checked });
            console.log(checked);
          }}
        />
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 禁用状态
开关处于不可用状态的情况。

```jsx
import { Switch } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Switch disabled />
    </div>
    <div className="rows">
      <Switch disabled defaultChecked />
    </div>
  </>
, mountNode);
```



## 不同尺寸
额外提供一个小号的开关来适应更多场景的使用。

```jsx
import { Switch } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Switch />
    </div>
    <div className="rows">
      <Switch size="sm" />
    </div>  
  </>
, mountNode);
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
          defaultChecked={false} />
        </div>
        <div className="multi-rows">
          <Switch 
          loading
          defaultChecked={true} />
        </div>
        <div className="multi-rows">
          <Switch 
          loading
          size={'sm'}
          defaultChecked={false} />
        </div>
        <div className="multi-rows">
          <Switch 
          loading
          size={'sm'}
          defaultChecked={true} />
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
| checked | boolean | false | 值 |
| defaultChecked | boolean | false | 初始值 |
| size | string | 'md' | 开关大小，可选值为`md`，`sm`|
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否是加载中的开关 |
| onChange | (checked?: boolean) => void | - | 点击后触发的回调函数 |