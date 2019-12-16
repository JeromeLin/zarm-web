## Input 输入框

最基础的表单输入组件。

基本用法。
通过`type`属性输入类型。
```jsx
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input type="text" placeholder="请输入" />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## textarea

通过type设置。
将`type`属性设置为`textarea`，同时可设置`rows`，`cols`属性。 
设置了maxLength之后，会在右下角显示可以输入的字数。
设置了showLength,会在右下角显示当前输入的字数。
```jsx
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input maxLength={500} showLength type="textarea" placeholder="请输入" rows={10} style={{ height: 200 }}/>
      </div>
    )
  }  
}

ReactDOM.render(<Demo />, mountNode);
```

## 不同尺寸

通过size设置。

除了默认大小外，可以设置`xl`,`lg`,`sm`,`xs`四种不同尺寸。
```jsx
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input style={{width: 150, marginRight: 8}} size="xl" placeholder="请输入" />
        <br />
        <Input style={{width: 150, marginRight: 8}} size="lg" placeholder="请输入" />
        <br />
        <Input style={{width: 150, marginRight: 8}} size="sm" placeholder="请输入" />
        <br />
        <Input style={{width: 150, marginRight: 8}} size="xs" placeholder="请输入" />
      </div>
    )
  } 
}

ReactDOM.render(<Demo />, mountNode);
```

## 直角输入框

通过radius设置，默认为圆角。

通过`shape`属性设置输入框是否直角。 shape?: 'rect' | 'radius';
```jsx
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input shape="rect" type="text" placeholder="请输入" />
      </div>
    )
  }  
}

ReactDOM.render(<Demo />, mountNode);
```


## 添加前置和后置标签

通过addonBefore和addonAfter设置。

通过`addonBefore`和`addonAfter`属性设置前置和后置标签。
addon支持的类型请参考 `Attributes`

```jsx
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input addonBefore="http://" type="text" placeholder="请输入" />
        <br />
        <Input addonAfter=".com" type="text" placeholder="请输入" />
      </div>
    )
  }  
}

ReactDOM.render(<Demo />, mountNode);
```

## 禁用状态

通过disabled设置。

通过`disabled`属性设置输入框是否禁用, 禁用状态下不可输入。
```jsx
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input disabled type="text" value="禁用" />
      </div>
    )
  }  
}

ReactDOM.render(<Demo />, mountNode);
```

## 设置InputGroup

使用InputGroup标签设置。

使用InputGroup标签设置。
```jsx
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input.Group>
          <Input type="text" placeholder="please input gender" />
          <Input type="text" placeholder="please input name" />
        </Input.Group>
      </div>
    )
  }  
}

ReactDOM.render(<Demo />, mountNode);
```

## 设置InputSearch

使用InputSearch标签设置。

设置InputSearch的属性来处理搜索框。
```jsx
import { Input } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Input.Search placeholder="please input gender" />
      </div>
    )
  }
  
}

ReactDOM.render(<Demo />, mountNode);
```

## 监听事件

支持onChange,onFocus,onBlur等标准事件
设置`onBlur`事件回调，在失去焦点时触发。
```jsx
import { Input } from 'zarm-web';

class Demo extends React.Component {
  handleBlur(e) {
    alert('输入框的值是：' + e.target.value);
  }

  render() {
    return (
      <div>
        <Input type="text" placeholder="请输入" onBlur={(e) => { this.handleBlur(e); }} />
      </div>
    )
  }  
}

ReactDOM.render(<Demo />, mountNode);
```


## API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   text, textarea, number...           |    text     |
| size     | 尺寸   | string  |   xl, lg, sm, xs        |    -     |
| radius   *已废弃  |  是否圆角   | boolean  |   -     |    false   |
| shape    |  圆角形状   | shape rect |   -     |    false   |
| value     | 值   | string  |   -        |    -     |
| defautValue     | 默认值  | string  |   -     |    -     |
| placeholder     | 占位符   | string  |   -      |    -     |
| disabled  | 禁用    | -   | -  | -   |
| isDisabled * 已废弃 | 废弃 | boolean   | true, false   | false   |
| addonBefore | Input的前置标签 textarea无效 | ReactNode ()=>ReactNode AddonType |-|-|
| addonAfter | Input的后置标签 textarea无效 | ReactNode ()=>ReactNode AddonType |-|-|
| maxLength | 输入框的输入字符长度限制 在textarea下，会在右下角显示 | ReactNode ()=>ReactNode AddonType |-|-|
| showLength | 是否显示当前的textarea已输入的字符长度 在textarea下，会在右下角显示 | ReactNode ()=>ReactNode AddonType |-|-|
