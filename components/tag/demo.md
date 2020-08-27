# Tag 标签
用于标记和分类。



## 颜色类型
以下提供在不同场景中可选择不同颜色为特定功能所使用

```jsx
import { Tag } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Tag>default</Tag>
      <h3>四种预置颜色</h3>
      <Tag color="green">green</Tag>
      <Tag color="blue">blue</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="red">red</Tag>
    </div>
    <div className="rows">
      <h3>自定义颜色</h3>
      <Tag color="#00bc70">#00bc70</Tag>
      <Tag color="#54c0e8">#54c0e8</Tag>
      <Tag color="#ec9131">#ec9131</Tag>
      <Tag color="#ff5050">#ff5050</Tag>
      <Tag color="#616161">#616161</Tag>
    </div>
  </>
, mountNode);
```



## 边框
可以设置边框属性

```jsx
import { Tag } from 'zarm-web';

ReactDOM.render(
  <>
    <Tag bordered={false}>default</Tag>
    <Tag bordered={false} color="green">green</Tag>
    <Tag bordered={false} color="blue">blue</Tag>
    <Tag bordered={false} color="orange">orange</Tag>
    <Tag bordered={false} color="red">red</Tag>
  </>
, mountNode);
```



## 圆角
可以设置圆角大小

```jsx
import { Tag } from 'zarm-web';

ReactDOM.render(
  <>
    <Tag>radius</Tag>
    <Tag shape="rect">rect</Tag>
    <Tag shape="round">round</Tag>
  </>
, mountNode);
```



## 尺寸
可以设置尺寸大小

```jsx
import { Tag } from 'zarm-web';

ReactDOM.render(
  <>
    <Tag size="lg">lg</Tag>
    <Tag>md</Tag>
    <Tag size="sm">sm</Tag>
    <Tag size="xs">xs</Tag>
  </>
, mountNode);
```



## 可删除
用数组生成一组标签，可以动态添加和删除

```jsx
import { Tag, Icon, Input, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {
    tags: ['Tag1', 'Tag2'],
    inputValue: '',
    inputVisible: false,
  };

  onCloseTag = (index) => {
    const { tags } = this.state;
    tags.splice(index, 1);
    this.setState({ tags });
  };

  onShowInput = () => {
    this.setState({
      inputVisible: true,
    }, () => {
      this.input.focus();
    });
  };

  onBlur = () => {
    const { inputValue, tags } = this.state;

    if (inputValue.trim()) {
      this.setState({
        tags: [...tags, inputValue],
        inputVisible: false,
        inputValue: '',
      });
    } else {
      this.setState({
        inputVisible: false,
        inputValue: ''
      });
    }
  };

  onValueChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  onKeydown = (e) => {
    if (e.keyCode === 13) {
      this.onBlur();
    }
  };

  onRemoveAll = () => {
    this.setState({
      tags: [],
    });
  };

  render() {
    const { tags, inputValue, inputVisible } = this.state;
    return (
      <>
        {
          tags.map((tag, index) => {
            return (
              <Tag closable key={+index} onClose={() => this.onCloseTag(index)}>
                {tag.length > 16 ? tag.slice(0, 16) + '...' : tag}
              </Tag>
            );
          })
        }
        <br />
        {
          inputVisible
            ? <Input
                ref={(ele) => this.input = ele }
                bordered
                value={inputValue}
                onChange={this.onValueChange}
                onBlur={this.onBlur}
                onKeyDown={this.onKeydown}
                style={{
                  width: 80,
                }}
              />
            : <Button ref={(ele) => this.button = ele } onClick={this.onShowInput}>+ New Tag</Button>
        }
        <Button theme="danger" style={{ marginLeft: 10 }} onClick={this.onRemoveAll}>Remove All</Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 可选择
可通过 `CheckableTag` 实现类似 Checkbox 的效果，点击切换选中效果

```jsx
import { Tag } from 'zarm-web';

const { CheckableTag } = Tag;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        {
          name: '上海',
          checked: false,
        },
        {
          name: '北京',
          checked: true,
        },
        {
          name: '深圳',
          checked: false,
        },
        {
          name: '台湾',
          checked: false,
          disabled: true,
        }
      ]
    }
  }

  selectItem = (nextStatus, index) => {
    const { cities } = this.state
    const item = cities[index];
    item.checked = nextStatus;
    cities.splice(index, 1, item);

    this.setState({
      cities: cities,
    }, console.log('当前选中的城市:', this.state.cities.filter(c => c.checked)))
  }

  render() {
    const { cities } = this.state;

    return (
      <>
        {
          cities.map((city, index) => {
            return (
              <CheckableTag
                disabled={city.disabled}
                checked={city.checked}
                onChange={checked => this.selectItem(checked, index)}
                key={index + city.name}
              >
                {city.name}
              </CheckableTag>
            );
          })
        }
      </>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| size | string | 'md' | 设置大小，可选值为 `lg`、`md`、`sm`、`xs` |
| shape | string | 'radius' | 设置形状，可选值为 `rect`、`radius`、`round` |
| color | string | - | 设置颜色，可选值为 `green`、`blue`、 `red`、 `orange` 或者自定义颜色值 |
| bordered | boolean | true | 是否边框样式 |
| closable | boolean | false | 是否可关闭 |
| onClose | (e) => void | - | 关闭回调事件，closable 为 `true` 时生效 |

<h3>Tag.CheckableTag</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| size | string | 'md' | 设置大小，可选值为 `lg`、`md`、`sm`、`xs` |
| shape | string | 'radius' | 设置形状，可选值为 `radius`、`rect`、`round` |
| disabled | boolean | false | 设置是否可切换 |
| onChange | (checked: boolean) => void | - | 选中状态变化事件，参数为切换后的状态 |
