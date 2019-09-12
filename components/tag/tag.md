# Tag 标签
用于标记和分类。


## 颜色类型

以下提供在不同场景中可选择不同颜色为特定功能所使用。

```jsx
import { Tag } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div  className="multi-rows">
          <Tag>default</Tag>
          <h3>4种预置颜色</h3>
          <Tag color="green">green</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="red">red</Tag>
        </div>
        <div  className="multi-rows">
          <h3>自定义颜色</h3>
          <Tag color="#00BC70">#00BC70</Tag>
          <Tag color="#54C0E8">#54C0E8</Tag>
          <Tag color="#EC9131">#EC9131</Tag>
          <Tag color="#FF5050">#FF5050</Tag>
          <Tag color="#616161">#616161</Tag>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Demo />, mountNode);
```

## 边框
bordered 默认有边框

```jsx
import { Tag } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div className="multi-rows">
          <Tag>default</Tag>
          <Tag bordered={false}>unbordered</Tag>
          <h3>有边框</h3>
          <Tag color="green">green</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="#EC9131">#EC9131</Tag>
          <Tag color="#FF5050">#FF5050</Tag>
          <Tag color="#616161">#616161</Tag>
          <Tag color="pink">pink bordered</Tag>
        </div>
        <div className="multi-rows">
          <h3>无边框</h3>
          <Tag bordered={false} color="green">green</Tag>
          <Tag bordered={false} color="blue">blue</Tag>
          <Tag bordered={false} color="#EC9131">#EC9131</Tag>
          <Tag bordered={false} color="#FF5050">#FF5050</Tag>
          <Tag bordered={false} color="#616161">#616161</Tag>
          <Tag bordered={false} color="pink">pink unbordered</Tag>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Demo />, mountNode);
```

## 圆角

可以设置圆角大小 default radius

```jsx
import { Tag } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
        <div>
          <Tag>radius</Tag>
          <Tag shape="rect">rect</Tag>
          <Tag shape="round">round</Tag>
        </div>
    );
  }
}
ReactDOM.render(<Demo />, mountNode);
```

## 尺寸

可以设置尺寸

```jsx
import { Tag } from 'zarm-web';
class Demo extends React.Component {
  render() {
    return (
      <div>
        <Tag>default</Tag>
        <Tag size="lg">large</Tag>
        <Tag size="md">middle</Tag>
        <Tag size="sm">small</Tag>
        <Tag size="xs">xsmall</Tag>
      </div>
    );
  }
}
ReactDOM.render(<Demo />, mountNode);
```

## 可删除

可以设置可删除

```jsx
import { Tag, Icon, Input } from 'zarm-web';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['Tag1', 'Tag2'],
      inputValue: '',
      inputVisible: false
    };
  }
  closeTag = (index) => {
    const tags = this.state.tags
    tags.splice(index, 1)
    this.setState({
      tags
    })
  }
  showInput = () => {
    this.setState({
      inputVisible: true
    }, () => {
      this.input.focus()
    })
  }
  saveInputVal = () => {
    const { inputValue, tags } = this.state
    if (inputValue.trim()) {
      const temp = [...tags, inputValue]
      this.setState({
        tags: temp,
        inputVisible: false,
        inputValue: ''
      })
    } else {
      this.setState({
        inputVisible: false,
        inputValue: ''
      })
    }
  }

  changeValue = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  handleKeydown = (e) => {
    if (e.keyCode === 13) {
      this.saveInputVal()
    }
  }
  clearTags = () => {
    this.setState({
      tags: []
    })
  }
  render() {
    const { tags, inputValue, inputVisible } = this.state
    return (
      <div>
        <Tag>uncloseable</Tag>
        {
          tags.map((t, index) => {
            const overlong = t.length > 16
            return <Tag closable key={t + index} onClose={e => this.closeTag(index)}>{
              overlong ? t.slice(0, 16) + '...' : t
              }</Tag>
          })
        }
        {
          inputVisible
            ? <input // Input组件尚未提交，暂用原生input
              ref={input => this.input = input }
              size="sm"
              value={inputValue}
              onChange={this.changeValue}
              onBlur={this.saveInputVal}
              onKeyDown={this.handleKeydown}
              style={{width: '80px', height: '26px', display: 'inline-block', verticalAlign: 'text-bottom', borderRadius: '4px', lineHeight: '26px', fontSize: '12px', border: '1px solid #CECECE', padding: '4px 8px'}}
            />
            : <Tag
              style={{borderStyle: 'dashed', background: '#fff' }}
              onClick={this.showInput}
            >+ new tag</Tag>
        }
        <Icon
          type="empty"
          theme="success"
          style={{ marginLeft: '40px', fontSize: '24px', cursor: 'pointer'}}
          onClick={this.clearTags }
        />
      </div>
    );
  }
}
ReactDOM.render(<Demo />, mountNode);
```

## 可选择标签
类似于checkbox

```jsx
import { Tag } from 'zarm-web';

const CheckableTag = Tag.CheckableTag;

class DemoCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [{
        name: '上海',
        checked: false,
       }, {
        name: '北京',
        checked: true,
       }, {
        name: '深圳',
        checked: false,
       }]
    }
  }
  selectItem = (nextStatus, index) => {
    const { cities } = this.state
    const item = cities[index]
    item.checked = nextStatus
    cities.splice(index, 1, item)
    this.setState({
      cities: cities
    }, () => {
      console.log('当前选中的城市:', this.state.cities.filter(c => c.checked))
    })
  }
  render() {
    const { cities } = this.state
    return (
      <div>
        <CheckableTag disabled={true}>uncheckable</CheckableTag>
        {
          cities.map((city, index) => {
            return <CheckableTag
            checked={city.checked}
            onChange={e => this.selectItem(e, index)}
            key={index + city.name}
            >{city.name}</CheckableTag>
          })
        }
      </div>
    )
  }
}
ReactDOM.render(<DemoCheck />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| color | string | 'gray' | 设置主题，可选值为 `gray`、`green`、`blue`, `red`, `orange` 或者自定义颜色值 |
| size | string | 'middle' | 设置大小，可选值为 `lg`、`md`、`sm`、`xs` |
| shape | string | 'radius' | 设置形状，可选值为 `rect`、`radius`、`round` |
| bordered | boolean | true | 是否边框样式 |
| closable | boolean | false | 是否可关闭 |
| onClose | (e) => void | fn | 关闭回调事件，closable为true时生效 |

# Tag.CheckableTag

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| size | string | 'middle' | 设置大小，可选值为 `lg`、`md`、`sm`、`xs` |
| shape | string | 'radius' | 设置形状，可选值为 `rect`、`radius`、`round` |
| disabled | boolean | false | 设置是否可切换 |
| onChange | function | - | 选中状态变化事件，参数为切换后的状态 |
