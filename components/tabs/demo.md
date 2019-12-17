# Tabs 标签页
选项卡切换组件。

## size

```jsx
import { Tabs, Button } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'md',
      fields: [{
        closable: false,
        title: "Tab1",
        key: "1"
      }, {
        closable: false,
        title: "Tab2",
        key: "2",
      }, {
        closable: false,
        title: "Tab3",
        key: "3",
      }, {
        closable: false,
        title: "Tab4",
        key: "4"
      }, {
        closable: false,
        title: "Tab5",
        key: "5",
      }]
    };
  }
  handleSize = (size) => {
    this.setState({size});
  }
  render() {
    return (
      <>
        <div className="rows">
          <Button.Group>
            <Button onClick={() => this.handleSize('sm')}>sm</Button>
            <Button onClick={() => this.handleSize('md')}>md</Button>
            <Button onClick={() => this.handleSize('lg')}>lg</Button>
          </Button.Group>
        </div>
        <Tabs type="line" onChange={(i) => console.log(i)} size={this.state.size}>
          {
              this.state.fields.map((item, index) => (
                <Tab key={item.key} title={item.title} style={{padding: 10}} disabled={item.disabled} closable={item.closable}>
                  这是选项卡{item.key}的文字
                </Tab>
              ))
            }
        </Tabs>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## line

```jsx
import { Tabs, Button } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      fields: [{
        closable: false,
        title: "Tab1",
        key: "1"
      }, {
        closable: false,
        disabled: true,
        title: "Tab2",
        key: "2",
      }, {
        closable: false,
        title: "Tab3",
        key: "3",
      }, {
        closable: true,
        title: "Tab4",
        key: "4"
      }, {
        closable: false,
        title: "Tab5",
        key: "5",
      }]
    };
  }
  onTabClose = (targetIndex) => {
    const { fields } = this.state;
    this.setState({
      fields: fields.filter((item, index) => targetIndex !== index),
    });
  }
  render() {
    return (
      <Tabs type="line" value={this.state.value} onChange={(i) => this.setState({value: i})} onTabClose={this.onTabClose} size={this.state.size} animated={this.state.animate}>
        {
            this.state.fields.map((item, index) => (
              <Tab key={item.key} title={item.title} style={{padding: 10}} disabled={item.disabled} closable={item.closable}>
                这是选项卡{item.key}的文字
              </Tab>
            ))
          }
      </Tabs>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## card

```jsx
import { Tabs, Icon, Button } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Tabs type="card" onChange={(i) => console.log(i)}>
        <Tab title={<><Icon type="required" />Tab1</>}>
          <div style={{padding: 10}}>
            <p>这是选项卡1的文字</p>
            <p>这是选项卡1的文字</p>
            <p>这是选项卡1的文字</p>
          </div>
        </Tab>
        <Tab disabled title="Tab2">
          <div style={{padding: 10}}>
            <p>这是选项卡2的文字</p>
            <p>这是选项卡2的文字</p>
            <p>这是选项卡2的文字</p>
          </div>
        </Tab>
        <Tab title="Tab3">
          <div style={{padding: 10}}>
            <p>这是选项卡3的文字</p>
            <p>这是选项卡3的文字</p>
            <p>这是选项卡3的文字</p>
          </div>
        </Tab>
        <Tab title="Tab4">
          <div style={{padding: 10}}>
            <p>这是选项卡4的文字</p>
            <p>这是选项卡4的文字</p>
            <p>这是选项卡4的文字</p>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## noborder-card

```jsx
import { Tabs, Button } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSize = (size) => {
    this.setState({size});
  }
  render() {
    return (
      <div className="box" style={{background: '#F2F2F2', padding: '32px'}}>
        <Tabs type="noborder-card" direction="horizontal" defaultValue={0} onChange={(i) => console.log(i)}>
          <Tab title={<>Tab1</>}>
          <div style={{padding: 10}}>
            <p>这是选项卡1的文字</p>
            <p>这是选项卡1的文字</p>
            <p>这是选项卡1的文字</p>
          </div>
        </Tab>
        <Tab disabled title="Tab2">
          <div style={{padding: 10}}>
            <p>这是选项卡2的文字</p>
            <p>这是选项卡2的文字</p>
            <p>这是选项卡2的文字</p>
          </div>
        </Tab>
        <Tab title="Tab3">
          <div style={{padding: 10}}>
            <p>这是选项卡3的文字</p>
            <p>这是选项卡3的文字</p>
            <p>这是选项卡3的文字</p>
          </div>
        </Tab>
        <Tab title="Tab4">
          <div style={{padding: 10}}>
            <p>这是选项卡4的文字</p>
            <p>这是选项卡4的文字</p>
            <p>这是选项卡4的文字</p>
          </div>
        </Tab>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## line scroll

```jsx
import { Tabs, Button } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 'horizontal',
    };
  }

  onTabClose = (current) => {
    const { fields } = this.state;
    this.setState({
      fields: fields.filter((item, index) => current !== index),
    });
  }

  render() {
    return (
      <div>
        <Tabs type="line" closable direction="horizontal" defaultValue={0} onChange={(i) => console.log(i)} onTabClose={this.onTabClose} onPrevClick={(e) => console.log('prev click: ', e)} onNextClick={() => console.log('next click')}>
          {
            [...Array(40).keys()].map((item, index) => (
              <Tab key={index} title={`Tab${index + 1}`} style={{padding: 10}}>
                这是选项卡{index + 1}的文字
              </Tab>
            ))
          }
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## card scroll

```jsx
import { Tabs, Button } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  onTabClose = (targetIndex) => {
    const { fields } = this.state;
    this.setState({
      fields: fields.filter((item, index) => targetIndex !== index),
    });
  }

  render() {
    return (
      <>
        <div>
          <Tabs type="line" closable direction="vertical" defaultValue={0} onChange={(i) => console.log(i)} onTabClose={this.onTabClose} style={{height: '192px'}} onPrevClick={() => console.log('prev click')} onNextClick={() => console.log('next click')}>
            {
              [...Array(40).keys()].map((item, index) => (
                <Tab key={index} title={`Tab${index + 1}`}>
                  这是选项卡{index + 1}的文字
                </Tab>
              ))
            }
          </Tabs>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

Tabs

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | number | 0 | 当前选中的tab索引值 |
| defaultValue | number | 0 | 默认选中的tab索引值 |
| type | string | 'line' | tab的类型，包含线型 卡片型 无边框卡片型，可选值为 `line` 、 `card` 、 `noborder-card`  |
| size | string | 'md' | 大小 可选值为`sm` 、 `md` 、 `lg`  |
| onChange | (index?: number) => void | - | 面板切换时触发的回调函数，参数为当前选中的tab索引值 |
| onTabClose | (index?: number) => void | - | 处理Tab关闭函数 |
| style | CSSProperties | - | 自定义容器样式 |
| className | string | - | 添加自定义容器类名 |
| prefixCls | string | 'zw-tabs' | 类名的前缀 |
| animated | boolean | true | 是否使用切换动画，在direction为horizontal时生效 |

Tabs.Tab

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | string | - | 自定义tab名称 |
| disabled | boolean | false | 禁用 |
| closable | boolean | false | 是否关闭 |


