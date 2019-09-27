<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 10:45:04
 * @LastEditTime: 2019-09-27 11:26:45
 * @LastEditors: Please set LastEditors
 -->
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
      drawerVisible: false,
      drawerVisible1: false,
      drawerVisible2: false,
      visible: {
      popBottom: false,
      popTop: false,
      popLeft: false,
      popRight: false,
      picker: false,
    },
    value: '',
  };

    this.drawerShow = this.drawerShow.bind(this);
    this.drawerHide = this.drawerHide.bind(this);
    this.drawerShow1 = this.drawerShow1.bind(this);
    this.drawerHide1 = this.drawerHide1.bind(this);
    this.drawerShow2 = this.drawerShow2.bind(this);
    this.drawerHide2 = this.drawerHide2.bind(this);

    this.ref = React.createRef();
  }

  drawerShow() {
    this.setState({
      drawerVisible: true,
    });
  }

  drawerHide() {
    this.setState({
      drawerVisible: false,
    });
  }

  drawerShow1() {
    this.setState({
      drawerVisible1: true,
    });
  }

  drawerHide1() {
    this.setState({
      drawerVisible1: false,
    });
  }

  drawerShow2() {
    this.setState({
      drawerVisible2: true,
    });
  }

  drawerHide2() {
    this.setState({
      drawerVisible2: false,
    });
  }

  toggle = (key) => {
    const visible = this.state.visible;
    visible[key] = !visible[key];
    this.setState({ visible });
  }

  render() {
    const { drawerVisible, visible, drawerVisible1, drawerVisible2 } = this.state;
    return (
      <>
        <Button size="xs" onClick={() => {
          this.toggle('popTop');
        }}>上方</Button>

        <Button size="xs" onClick={() => {
          this.toggle('popBottom');
          // setTimeout(() => {
          //   this.toggle('popBottom');
          // }, 3000);
        }}>下方</Button>


        <Button size="xs" onClick={() => {
          this.toggle('popLeft');
          // setTimeout(() => {
          //   this.toggle('popLeft');
          // }, 3000);
        }}>左边</Button>


        <Button size="xs" onClick={() => {
          this.toggle('popRight');
          // setTimeout(() => {
          //   this.toggle('popRight');
          // }, 3000);
        }}>右边</Button>

        <Drawer
          visible={visible.popRight}
          direction="right"
          onClose={() => this.toggle('popRight')}
          closable
          width={200}
          title="嵌套1"
          maskClosable
          // afterOpen={() => console.log('afterOpen1')}
          afterClose={() => console.log('afterClose')}
          onMaskClick={() => console.log('onMaskClick')}
        >
          <Button theme="danger" onClick={this.drawerShow}>右划</Button>
          <Drawer
            visible={drawerVisible}
            onClose={this.drawerHide}
            direction="right"
            title="嵌套2"
            width={100}
            closable
            maskClosable={false}
            // afterOpen={() => console.log('afterOpen2')}
            afterClose={() => console.log('afterClose')}
            onMaskClick={() => console.log('onMaskClick')}
          >
            <Button theme="danger" onClick={this.drawerShow1}>右划1</Button>
            <Drawer
              visible={drawerVisible1}
              title="嵌套3"
              onClose={this.drawerHide1}
              closable
              maskClosable={false}
              // afterOpen={() => console.log('afterOpen3')}
              afterClose={() => console.log('afterClose')}
              onMaskClick={() => console.log('onMaskClick')}
            >
              <Button theme="danger" onClick={this.drawerShow2}>右划2</Button>
              <Drawer
                visible={drawerVisible2}
                onClose={this.drawerHide2}
                title="嵌套4"
                closable
                maskClosable={false}
                // afterOpen={() => console.log('afterOpen4')}
                afterClose={() => console.log('afterClose')}
                onMaskClick={() => console.log('onMaskClick')}
              >
              </Drawer>
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

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否显示 |
| direction | string | 'bottom' | 弹出方向，可选值 `top`, `bottom`, `left`, `right`, `center` |
| animationType | string | 'fade' | 当弹出方向为中间位置（direction="center"）时的动画效果，可选值 `fade`, `door`, `flip`, `rotate`, `zoom`,`moveUp`, `moveDown`, `moveLeft`, `moveRight`,`slideUp`, `slideDown`, `slideLeft`, `slideRight` |
| animationDuration | number | 200 | 动画执行时间（单位：毫秒） |
| width | string &#124; number | - | 弹层宽度 |
| mask | boolean | true | 是否展示遮罩层 |
| maskover | boolean | true | 嵌套遮罩层是否叠加黑色背景 |
| maskType | string | 'normal' | 遮罩层的类型，可选值 `transparent`, `normal` |
| afterOpen | () => void | - | 弹层展示后的回调 |
| afterClose | () => void | - | 弹层关闭后的回调 |
| onMaskClick | () => void | - | 点击遮罩层时触发的回调函数 |



