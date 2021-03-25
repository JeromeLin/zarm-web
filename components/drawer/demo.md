# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 基本用法

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

```jsx
import { Drawer, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {
    visible: false,
  };

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    return (
      <>
        <Button theme="primary" onClick={this.toggle}>
          Open
        </Button>
        <Drawer
          title="Drawer Title"
          visible={this.state.visible}
          onClose={this.toggle}
          afterOpen={() => console.log('afterOpen')}
          afterClose={() => console.log('afterClose')}
        >
          Content of Drawer
        </Drawer>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 尺寸

抽屉尺寸分为 'lg'， 'md'， 'sm'；分别占窗口宽度的 80%， 62%， 38%。

```jsx
import { Drawer, Radio, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {
    visible: false,
    size: 'md',
  };

  handleSize = (size) => {
    this.setState({ size });
  };

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const { visible, size } = this.state;
    return (
      <>
        <div className="rows">
          <Radio.Group
            ghost
            type="button"
            value={size}
            onChange={this.handleSize}
            style={{ marginRight: 10 }}
          >
            <Radio value="sm">sm</Radio>
            <Radio value="md">md</Radio>
            <Radio value="lg">lg</Radio>
          </Radio.Group>
        </div>
        <div className="rows">
          <Button theme="primary" onClick={this.toggle}>
            Open
          </Button>
        </div>
        <Drawer
          visible={visible}
          size={size}
          onClose={this.toggle}
          afterOpen={() => console.log('afterOpen')}
          afterClose={() => console.log('afterClose')}
        >
          Content of Drawer
        </Drawer>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 遮罩层可关闭

点击遮罩层区域可以关闭，可以隐藏关闭按钮。

```jsx
import { Drawer, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {
    visible: false,
  };

  toggle = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    return (
      <>
        <Button theme="primary" onClick={this.toggle}>
          Open
        </Button>
        <Drawer
          maskClosable
          closable={false}
          visible={this.state.visible}
          onClose={this.toggle}
          afterOpen={() => console.log('afterOpen')}
          afterClose={() => console.log('afterClose')}
        >
          Click mask layer to close the Drawer!
        </Drawer>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 多层抽屉

在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。

```jsx
import { Drawer, Button } from 'zarm-web';

class Demo extends React.Component {
  state = {
    visible_first: false,
    visible_second: false,
    visible_three: false,
  };

  toggle = (key) => {
    this.setState({
      [`visible_${key}`]: !this.state[`visible_${key}`],
    });
  };

  render() {
    const { visible_first, visible_second, visible_three } = this.state;

    return (
      <>
        <Button theme="primary" onClick={() => this.toggle('first')}>
          Open the first drawer
        </Button>
        <Drawer
          size="lg"
          visible={visible_first}
          onClose={() => this.toggle('first')}
          afterOpen={() => console.log('afterOpen1')}
          afterClose={() => console.log('afterClose1')}
        >
          <Button theme="primary" onClick={() => this.toggle('second')}>
            Open the second drawer
          </Button>
          <Drawer
            size="sm"
            visible={visible_second}
            onClose={() => this.toggle('second')}
            afterOpen={() => console.log('afterOpen2')}
            afterClose={() => console.log('afterClose2')}
          >
            <Button theme="primary" onClick={() => this.toggle('three')}>
              Open the three drawer
            </Button>
            <Drawer
              size="md"
              visible={visible_three}
              onClose={() => this.toggle('three')}
              afterOpen={() => console.log('afterOpen3')}
              afterClose={() => console.log('afterClose3')}
            >
              Content of Drawer
            </Drawer>
          </Drawer>
        </Drawer>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性         | 类型       | 默认值 | 说明                                                                                       |
| :----------- | :--------- | :----- | :----------------------------------------------------------------------------------------- |
| visible      | boolean    | false  | 是否显示                                                                                   |
| size         | string     | 'md'   | 可选值`lg`, `md`, `sm`, 分别为窗口的 80%， 62%， 38%，当属性 width 存在时以 width 宽度为主 |
| title        | ReactNode  | -      | 抽屉标题                                                                                   |
| mask         | boolean    | true   | 是否展示遮罩层                                                                             |
| maskClosable | boolean    | false  | 是否允许点击遮罩层来关闭抽屉                                                               |
| afterOpen    | () => void | -      | 弹层展示后的回调                                                                           |
| afterClose   | () => void | -      | 弹层关闭后的回调                                                                           |
| onClose      | () => void | -      | 关闭抽屉时触发的回调函数                                                                   |
