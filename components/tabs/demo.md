# Tabs 选项卡
选项卡切换组件。



## 基本用法

```jsx
import { Tabs } from 'zarm-web';
const { Panel } = Tabs;

ReactDOM.render(
  <Tabs>
    <Panel title="Tab1">Content of Tab1</Panel>
    <Panel title="Tab2">Content of Tab2</Panel>
    <Panel title="Tab3">Content of Tab3</Panel>
    <Panel title="Tab4">Content of Tab4</Panel>
  </Tabs>
, mountNode);
```



## 多种大小

```jsx
import { Tabs, Radio } from 'zarm-web';
const { Panel } = Tabs;

class Demo extends React.Component {
  state = {
    size: 'md',
  }

  handleSize = (size) => {
    this.setState({ size });
  }

  render() {
    const { size } = this.state;

    return (
      <>
        <div className="rows">
          <Radio.Group ghost type="button" value={size} onChange={(value) => this.handleSize(value)}>
            <Radio value="sm">sm</Radio>
            <Radio value="md">md</Radio>
            <Radio value="lg">lg</Radio>
          </Radio.Group>
        </div>
        <div className="rows">
          <Tabs size={size}>
            <Panel title="Tab1">Content of Tab1</Panel>
            <Panel title="Tab2">Content of Tab2</Panel>
            <Panel title="Tab3">Content of Tab3</Panel>
            <Panel title="Tab4">Content of Tab4</Panel>
          </Tabs>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 卡片式

```jsx
import { Tabs, Icon, Button } from 'zarm-web';
const { Panel } = Tabs;

ReactDOM.render(
  <Tabs type="card">
    <Panel title="Tab1">Content of Tab1</Panel>
    <Panel title="Tab2">Content of Tab2</Panel>
    <Panel title="Tab3">Content of Tab3</Panel>
    <Panel title="Tab4">Content of Tab4</Panel>
  </Tabs>
, mountNode);
```



## 无边框卡片式

```jsx
import { Tabs, Button } from 'zarm-web';
const { Panel } = Tabs;

ReactDOM.render(
  <div className="box" style={{ background: '#f2f2f2', padding: 32 }}>
    <Tabs type="noborder-card">
      <Panel title="Tab1" style={{ height: 100, padding: 15 }}>Content of Tab1</Panel>
      <Panel title="Tab2" style={{ height: 100, padding: 15 }}>Content of Tab2</Panel>
      <Panel title="Tab3" style={{ height: 100, padding: 15 }}>Content of Tab3</Panel>
      <Panel title="Tab4" style={{ height: 100, padding: 15 }}>Content of Tab4</Panel>
    </Tabs>
  </div>
, mountNode);
```



## 可滚动

```jsx
import { Tabs, Radio } from 'zarm-web';
const { Panel } = Tabs;

class Demo extends React.Component {
  state = {
    direction: 'horizontal',
  };

  handleDirection = (direction) => {
    this.setState({ direction });
  }

  render() {
    const { direction } = this.state;

    return (
      <>
        <div className="rows">
          <Radio.Group
            ghost
            type="button"
            value={direction}
            onChange={(value) => this.handleDirection(value)}
          >
            <Radio value="horizontal">Horizontal</Radio>
            <Radio value="vertical">Vertical</Radio>
          </Radio.Group>
        </div>
        <div className="rows">
          <Tabs
            style={{ height: 200 }}
            direction={direction}
            onPrevClick={(e) => console.log('prev click: ', e)}
            onNextClick={(e) => console.log('next click', e)}
          >
            {
              [...Array(20).keys()].map((item, index) => (
                <Panel key={+index} title={`Tab${index + 1}`}>
                  Content of Tab{index + 1}
                </Panel>
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



## 新增和关闭

```jsx
import { Tabs, Button } from 'zarm-web';
const { Panel } = Tabs;

class Demo extends React.Component {
  state = {
    value: 2,
    tabs: [
      {
        closable: true,
        title: 'Tab1',
      }, {
        closable: true,
        title: 'Tab2',
      }, {
        closable: true,
        title: 'Tab3',
      },
    ]
  };
  
  onTabClose = (targetIndex) => {
    const { tabs, value } = this.state;
    const filterTabs = tabs.filter((item, index) => targetIndex !== index);
    let currentValue;
    if (targetIndex !== 0) {
      if (targetIndex > value) {
        currentValue = value;
      } else {
        currentValue = value - 1;
      }
    } else {
      currentValue = 0;
    }
    this.setState({
      tabs: filterTabs,
      value: currentValue,
    });
  }

  onTabAdd = () => {
    const { tabs, value } = this.state;
    tabs.push({
      title: 'New Tap',
      closable: true,
      key: Math.random().toString(36).substring(2) + Date.now().toString(36),
    });
    this.setState({
      tabs,
      value: tabs.length - 1,
    });
  }

  render() {
    return (
      <div className="edit-tabs">
        <Tabs
          type="card"
          value={this.state.value}
          onChange={(index) => this.setState({ value: index })}
          onTabClose={this.onTabClose}
        >
          {
            this.state.tabs.map((item, index) => (
              <Panel key={+index} title={item.title} closable={item.closable}>
                Content of {item.title}
              </Panel>
            ))
          }
        </Tabs>
        <div className="add-button" onClick={this.onTabAdd}>+</div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

<h3>Tabs</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | number | 0 | 当前选中的选项卡索引值 |
| defaultValue | number | 0 | 默认选中的选项卡索引值 |
| type | string | 'line' | 选项卡类型，可选值为 `line` 、 `card` 、 `noborder-card`，分别表示线型、卡片型、无边框卡片型 |
| direction | string | 'horizontal' | 选项卡方向 可选值为`horizontal` 、 `vertical`，分别表示横向和纵向 |
| size | string | 'md' | 选项卡大小 可选值为`sm` 、 `md` 、 `lg`  |
| animated | boolean | true | 是否使用切换动画，在direction为`horizontal`时生效 |
| onChange | (index?: number) => void | - | 选项卡切换时触发的回调函数，参数为当前选中的选项卡索引值 |
| onTabClose | (index?: number) => void | - | 点击选项卡关闭按钮时触发的回调函数，参数为当前删除的选项卡索引值 |
| onPrevClick | (e?: number) => void | - | 点击上一页的箭头触发的回调函数 |
| onNextClick | (e?: number) => void | - | 点击下一页的箭头触发的回调函数 |

<h3>Tabs.Panel</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | string | - | 选项卡名称 |
| disabled | boolean | false | 是否禁用 |
| closable | boolean | false | 是否可关闭 |
