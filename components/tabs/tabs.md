# Tabs 标签页
选项卡切换组件。

## line

```jsx
import { Tabs } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <Tabs type="line" onChange={(i) => console.log(i)} value={2}>
        <Tab title="Tab1">
          <div style={{padding: 10}}>
            这是选项卡1的文字
          </div>
        </Tab>
        <Tab disabled title="Tab2">
          <div style={{padding: 10}}>
            这是选项卡2的文字
          </div>
        </Tab>
        <Tab title="Tab3">
          <div style={{padding: 10}}>
            这是选项卡3的文字
          </div>
        </Tab>
        <Tab title="Tab4">
          <div style={{padding: 10}}>
            这是选项卡4的文字
          </div>
        </Tab>
      </Tabs>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## card

```jsx
import { Tabs } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <Tabs type="card" onChange={(i) => console.log(i)}>
        <Tab title="Tab1">
          <div style={{padding: 10}}>
            这是选项卡1的文字
          </div>
        </Tab>
        <Tab disabled title="Tab2">
          <div style={{padding: 10}}>
            这是选项卡2的文字
          </div>
        </Tab>
        <Tab title="Tab3">
          <div style={{padding: 10}}>
            这是选项卡3的文字
          </div>
        </Tab>
        <Tab title="Tab4">
          <div style={{padding: 10}}>
            这是选项卡4的文字
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
import { Tabs } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  render() {
    return (
      <div className="box" style={{background: '#F2F2F2', padding: '32px'}}>
        <Tabs type="noborder-card" direction="horizontal" defaultValue={0} onChange={(i) => console.log(i)}>
          <Tab title="Tab1">
            <div style={{padding: 10}}>
              这是选项卡1的文字
            </div>
          </Tab>
          <Tab disabled title="Tab2">
            <div style={{padding: 10}}>
              这是选项卡2的文字
            </div>
          </Tab>
          <Tab title="Tab3">
            <div style={{padding: 10}}>
              这是选项卡3的文字
            </div>
          </Tab>
          <Tab title="Tab4">
            <div style={{padding: 10}}>
              这是选项卡4的文字
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
import { Tabs } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      }, {
        closable: false,
        title: "Tab6",
        key: "6",
      }, {
        closable: false,
        title: "Tab7",
        key: "7"
      }, {
        closable: false,
        title: "Tab8",
        key: "8",
      }, {
        closable: false,
        title: "Tab9",
        key: "9",
      }, {
        closable: false,
        title: "Tab10",
        key: "10"
      }, {
        closable: false,
        title: "Tab11",
        key: "11"
      }, {
        closable: false,
        title: "Tab12",
        key: "12",
      }, {
        closable: false,
        title: "Tab13",
        key: "13",
      }, {
        closable: false,
        title: "Tab14",
        key: "14"
      }, {
        closable: false,
        title: "Tab15",
        key: "15",
      }, {
        closable: false,
        title: "Tab16",
        key: "16",
      }, {
        closable: false,
        title: "Tab17",
        key: "17"
      }, {
        closable: false,
        title: "Tab18",
        key: "18",
      }, {
        closable: false,
        title: "Tab19",
        key: "19",
      }, {
        closable: false,
        title: "Tab20",
        key: "20"
      }, {
        closable: false,
        title: "Tab21",
        key: "21"
      }, {
        closable: false,
        title: "Tab22",
        key: "22",
      }, {
        closable: false,
        title: "Tab23",
        key: "23",
      }, {
        closable: false,
        title: "Tab24",
        key: "24"
      }, {
        closable: false,
        title: "Tab25",
        key: "25",
      }, {
        closable: false,
        title: "Tab26",
        key: "26",
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
      <div>
        <Tabs type="line" closable direction="horizontal" defaultValue={0} onChange={(i) => console.log(i)} onTabClose={this.onTabClose}>
          {
            this.state.fields.map((item, index) => (
              <Tab key={item.key} title={item.title} disabled={item.disabled} closable={item.closable} style={{padding: 10}}>
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
import { Tabs } from 'zarm-web';
const { Tab } = Tabs;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      }, {
        closable: false,
        title: "Tab6",
        key: "6",
      }, {
        closable: false,
        title: "Tab7",
        key: "7"
      }, {
        closable: false,
        title: "Tab8",
        key: "8",
      }, {
        closable: false,
        title: "Tab9",
        key: "9",
      }, {
        closable: false,
        title: "Tab10",
        key: "10"
      }, {
        closable: false,
        title: "Tab11",
        key: "11"
      }, {
        closable: false,
        title: "Tab12",
        key: "12",
      }, {
        closable: false,
        title: "Tab13",
        key: "13",
      }, {
        closable: false,
        title: "Tab14",
        key: "14"
      }, {
        closable: false,
        title: "Tab15",
        key: "15",
      }, {
        closable: false,
        title: "Tab16",
        key: "16",
      }, {
        closable: false,
        title: "Tab17",
        key: "17"
      }, {
        closable: false,
        title: "Tab18",
        key: "18",
      }, {
        closable: false,
        title: "Tab19",
        key: "19",
      }, {
        closable: false,
        title: "Tab20",
        key: "20"
      }, {
        closable: false,
        title: "Tab21",
        key: "21"
      }, {
        closable: false,
        title: "Tab22",
        key: "22",
      }, {
        closable: false,
        title: "Tab23",
        key: "23",
      }, {
        closable: false,
        title: "Tab24",
        key: "24"
      }, {
        closable: false,
        title: "Tab25",
        key: "25",
      }, {
        closable: false,
        title: "Tab26",
        key: "26",
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
      <div>
        <Tabs type="line" closable direction="vertical" defaultValue={0} onChange={(i) => console.log(i)} onTabClose={this.onTabClose} style={{height: '300px'}}>
          {
            this.state.fields.map((item, index) => (
              <Tab key={item.key} title={item.title} disabled={item.disabled} closable={item.closable}>
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

## API

Tabs

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | number | 0 | 当前选中的tab索引值 |
| defaultValue | number | 0 | 默认选中的tab索引值 |
| type | string | 'line' | tab的类型，包含线型 卡片型 无边框卡片型，可选值为 `line` 、 `card` 、 `noborder-card`  |
| size | string | 'md' | 大小 可选值为`sm` 、 `md` 、 `lg`  |
| onChange | function | - | 面板切换时触发的回调函数，参数为当前选中的tab索引值 |
| onTabClose | function | 处理Tab关闭函数 |
| style | object | -' | 自定义容器样式 |
| className | string | - | 添加自定义容器类名 |
| prefixCls | string | - | 类名的前缀 |
| animated | boolean | - | 是否使用切换动画，在direction为horizontal时生效 |

Tabs.Tab

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | string | - | 自定义tab名称 |
| disabled | boolean | false | 禁用 |
| closable | boolean | false | 是否关闭 |


