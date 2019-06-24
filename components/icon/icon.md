## Icon 图标

提供了常用的图标。

### 使用方法

通过`type`属性设置图标类型
```jsx
import { Icon } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <ul className="icon-list icon-basic-list">
        <li>
        <Icon type="arrow-double-left" />
        <span>arrow-double-left</span>
      </li>

      <li>
        <Icon type="arrow-double-right" />
        <span>arrow-double-right</span>
      </li>

      <li>
        <Icon type="arrow-down" />
        <span>arrow-down</span>
      </li>

      <li>
        <Icon type="arrow-up" />
        <span>arrow-up</span>
      </li>

      <li>
        <Icon type="back" />
        <span>back</span>
      </li>

      <li>
        <Icon type="caret-bottom-fill" />
        <span>caret-bottom-fill</span>
      </li>

      <li>
        <Icon type="caret-left-fill" />
        <span>caret-left-fill</span>
      </li>

      <li>
        <Icon type="caret-right-fill" />
        <span>caret-right-fill</span>
      </li>

      <li>
        <Icon type="caret-top-fill" />
        <span>caret-top-fill</span>
      </li>

      <li>
        <Icon type="caret" />
        <span>caret</span>
      </li>

      <li>
        <Icon type="check-circle-fill" />
        <span>check-circle-fill</span>
      </li>

      <li>
        <Icon type="check-circle" />
        <span>check-circle</span>
      </li>

      <li>
        <Icon type="check" />
        <span>check</span>
      </li>

      <li>
        <Icon type="close-circle-fill" />
        <span>close-circle-fill</span>
      </li>

      <li>
        <Icon type="close-circle" />
        <span>close-circle</span>
      </li>

      <li>
        <Icon type="close" />
        <span>close</span>
      </li>

      <li>
        <Icon type="customer-service" />
        <span>customer-service</span>
      </li>

      <li>
        <Icon type="date" />
        <span>date</span>
      </li>

      <li>
        <Icon type="delete" />
        <span>delete</span>
      </li>

      <li>
        <Icon type="down-circle" />
        <span>down-circle</span>
      </li>

      <li>
        <Icon type="down" />
        <span>down</span>
      </li>

      <li>
        <Icon type="download" />
        <span>download</span>
      </li>

      <li>
        <Icon type="edit" />
        <span>edit</span>
      </li>

      <li>
        <Icon type="exclamation-circle-fill" />
        <span>exclamation-circle-fill</span>
      </li>

      <li>
        <Icon type="exclamation-circle" />
        <span>exclamation-circle</span>
      </li>

      <li>
        <Icon type="info-circle-fill" />
        <span>info-circle-fill</span>
      </li>

      <li>
        <Icon type="info-circle" />
        <span>info-circle</span>
      </li>

      <li>
        <Icon type="insurance" />
        <span>insurance</span>
      </li>

      <li>
        <Icon type="left-circl" />
        <span>left-circl</span>
      </li>

      <li>
        <Icon type="left" />
        <span>left</span>
      </li>

      <li>
        <Icon type="loading" />
        <span>loading</span>
      </li>

      <li>
        <Icon type="location" />
        <span>location</span>
      </li>

      <li>
        <Icon type="menu" />
        <span>menu</span>
      </li>

      <li>
        <Icon type="message" />
        <span>message</span>
      </li>

      <li>
        <Icon type="minus" />
        <span>minus</span>
      </li>

      <li>
        <Icon type="more-outline" />
        <span>more-outline</span>
      </li>

      <li>
        <Icon type="more" />
        <span>more</span>
      </li>

      <li>
        <Icon type="next" />
        <span>next</span>
      </li>

      <li>
        <Icon type="picture-outline" />
        <span>picture-outline</span>
      </li>

      <li>
        <Icon type="picture" />
        <span>picture</span>
      </li>

      <li>
        <Icon type="plus" />
        <span>plus</span>
      </li>

      <li>
        <Icon type="question-circle-fill" />
        <span>question-circle-fill</span>
      </li>

      <li>
        <Icon type="question-circle" />
        <span>question-circle</span>
      </li>

      <li>
        <Icon type="refresh" />
        <span>refresh</span>
      </li>

      <li>
        <Icon type="remove-fill" />
        <span>remove-fill</span>
      </li>

      <li>
        <Icon type="right-circle" />
        <span>right-circle</span>
      </li>

      <li>
        <Icon type="right" />
        <span>right</span>
      </li>

      <li>
        <Icon type="search" />
        <span>search</span>
      </li>

      <li>
        <Icon type="star-off" />
        <span>star-off</span>
      </li>

      <li>
        <Icon type="star-on" />
        <span>star-on</span>
      </li>

      <li>
        <Icon type="step-backward" />
        <span>step-backward</span>
      </li>

      <li>
        <Icon type="step-forward" />
        <span>step-forward</span>
      </li>

      <li>
        <Icon type="time" />
        <span>time</span>
      </li>

      <li>
        <Icon type="up-circle" />
        <span>up-circle</span>
      </li>

      <li>
        <Icon type="up" />
        <span>up</span>
      </li>
      </ul>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```

### 颜色主题

通过`theme`属性设置主题, 或者通过style定制覆盖颜色
```js

import { Icon } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <ul className="icon-list icon-theme-list">
        <li>
        <Icon type="picture-outline" theme="primary"/>
        <span>picture-outline</span>
      </li>

      <li>
        <Icon type="plus" style={{color: '#f50'}}/>
        <span>plus</span>
      </li>
      </ul>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```

### 尺寸主题

通过`size`属性设置主题, 或者通过style定制覆盖尺寸
```js
import { Icon } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <ul className="icon-list icon-size-list">

      <li>
        <Icon type="star-on" size={24}/>
        <span>star-on</span>
      </li>

      <li>
        <Icon type="star-on" style={{fontSize: '32px'}}/>
        <span>star-on</span>
      </li>

      <li>
        <Icon type="star-on" theme="primary" size='lg'/>
        <span>star-on</span>
      </li>

      </ul>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   right,right-round...           |    —     |
| theme     | 主题   | string    |  default, primary, success, warning, danger |   default   |
| size     | 尺寸   | number, string    |  number, xs, sm, lg, xl |   -   |
| style    | 样式覆盖 | string |  -  |
