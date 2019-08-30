# Tag 标签
用于标记和分类。

## 颜色类型
以下提供在不同场景中可选择不同颜色为特定功能所使用。

```jsx
import { Tag } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
        <div className="multi-rows">
          <Tag >default</Tag>
          <Tag theme="primary">primary</Tag>
          <Tag theme="success">success</Tag>
          <Tag theme="warning">warning</Tag>
          <Tag theme="danger">danger</Tag>
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
        <div className="multi-rows">
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
      <div className="multi-rows">
        <Tag>default</Tag>
        <Tag size="large" theme="info">large</Tag>
        <Tag theme="warning">middle</Tag>
        <Tag size="small" theme="success">small</Tag>
        <Tag size="xsmall" theme="danger">xsmall</Tag>
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
      tags: ['Tag1', 'Tag2', 'Tag3'],
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
      <div className="multi-rows">
        <Tag>default</Tag>
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

##
----
