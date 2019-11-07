# Drawer抽屉
屏幕边缘滑出的浮层面板。

## 基本用法
抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

```jsx
import { Drawer, Button } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false
    }
    this.drawerHide = this.drawerHide.bind(this);
  }

  drawerHide() {
    this.setState({
      drawerVisible: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="multi-rows">
          <Button theme="primary" size="xl" onClick={() => this.setState({ drawerVisible: true })}>Drawer</Button>
        </div>
        <Drawer
          visible={this.state.drawerVisible}
          onClose={this.drawerHide}
          closable
          maskClosable={false}
          afterOpen={() => console.log('afterOpen1')}
          afterClose={() => console.log('afterClose')}
          onMaskClick={() => console.log('onMaskClick')}
        >
          <div>
            sdljfgdlskjgfkldsgflksdgfljgsklfgklsd
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 抽屉尺寸
抽屉尺寸分为 ‘lg’, 'md', 'sm'。 分别占窗口宽度的80%， 62%， 38%。 默认大小为 ‘md’

```jsx
import { Drawer, Button, Radio } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      radioValue: 'md',
      drawerVisiblelg: false,
      drawerVisiblemd: false,
      drawerVisiblesm: false,
    }
    this.drawerHide = this.drawerHide.bind(this);
    this.drawerShow = this.drawerShow.bind(this);
  }

  drawerHide(radioValue) {
    const drawerVisible = `drawerVisible${radioValue}`;

    this.setState({
      [drawerVisible]: false,
    });
  }

  drawerShow(radioValue) {
    const drawerVisible = `drawerVisible${radioValue}`;

    this.setState({
      [drawerVisible]: true,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="multi-rows">
          <Button theme="primary" size="xl" onClick={() => this.drawerShow('lg')}>Drawer-lg</Button>
          <Button style={{ margin: '0 10px' }} theme="primary" size="xl" onClick={() => this.drawerShow('md')}>Drawer-md</Button>
          <Button theme="primary" size="xl" onClick={() => this.drawerShow('sm')}>Drawer-sm</Button>
        </div>

        <Drawer
          visible={this.state.drawerVisiblelg}
          onClose={() => this.drawerHide('lg')}
          size="lg"
          closable
          maskClosable={false}
          afterOpen={() => console.log('afterOpen1')}
          afterClose={() => console.log('afterClose')}
          onMaskClick={() => console.log('onMaskClick')}
        >
          <div>
            Drawer lg
          </div>
        </Drawer>

        <Drawer
          visible={this.state.drawerVisiblemd}
          onClose={() => this.drawerHide('md')}
          size="md"
          closable
          maskClosable={false}
          afterOpen={() => console.log('afterOpen1')}
          afterClose={() => console.log('afterClose')}
          onMaskClick={() => console.log('onMaskClick')}
        >
          <div>
            Drawer md
          </div>
        </Drawer>

        <Drawer
          visible={this.state.drawerVisiblesm}
          onClose={() => this.drawerHide('sm')}
          size="sm"
          closable
          maskClosable={false}
          afterOpen={() => console.log('afterOpen1')}
          afterClose={() => console.log('afterClose')}
          onMaskClick={() => console.log('onMaskClick')}
        >
          <div>
            Drawer sm
          </div>
        </Drawer>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 点击遮罩区关闭
基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭

```jsx
import { Drawer, Button } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false
    }
    this.drawerHide = this.drawerHide.bind(this);
  }

  drawerHide() {
    this.setState({
      drawerVisible: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="multi-rows">
          <Button theme="primary" size="xl" onClick={() => this.setState({ drawerVisible: true })}>Drawer</Button>
        </div>
        <Drawer
          visible={this.state.drawerVisible}
          onClose={this.drawerHide}
          maskClosable={this.drawerHide}
          afterOpen={() => console.log('afterOpen1')}
          afterClose={() => console.log('afterClose')}
          onMaskClick={() => console.log('onMaskClick')}
        >
          点击遮罩区关闭
        </Drawer>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## 嵌套
多个Drawer嵌套

```jsx
import { Drawer, Button } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      drawerVisible1: false
    }
    this.drawerHide = this.drawerHide.bind(this);
    this.drawerHide1 = this.drawerHide1.bind(this);
  }

  drawerHide() {
    this.setState({
      drawerVisible: false,
    });
  }

  drawerHide1() {
    this.setState({
      drawerVisible1: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="multi-rows">
          <Button theme="primary" size="xl" onClick={() => this.setState({ drawerVisible: true })}>Drawer</Button>
        </div>
        <Drawer
          visible={this.state.drawerVisible}
          onClose={this.drawerHide}
          size="lg"
          maskClosable={this.drawerHide}
          afterOpen={() => console.log('afterOpen1')}
          afterClose={() => console.log('afterClose')}
          onMaskClick={() => console.log('onMaskClick')}
        >
          <Drawer
            visible={this.state.drawerVisible1}
            onClose={this.drawerHide1}
            size="sm"
            maskClosable={this.drawerHide1}
            afterOpen={() => console.log('afterOpen1')}
            afterClose={() => console.log('afterClose')}
            onMaskClick={() => console.log('onMaskClick')}
          >
            It`s Me
          </Drawer>
          <Button theme="primary" size="xl" onClick={() => this.setState({ drawerVisible1: true })}>Drawer</Button>
        </Drawer>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否显示 |
| size | string | normal | 可选值`lg`, `md`, `sm`, 分别为窗口的80%， 62%， 38%，当属性width存在时以width宽度为主 |
| mask | boolean | true | 是否展示遮罩层 |
| maskClosable | boolean | - | 是否点击遮罩层来关闭抽屉 |
| afterOpen | () => void | - | 弹层展示后的回调 |
| afterClose | () => void | - | 弹层关闭后的回调 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |



