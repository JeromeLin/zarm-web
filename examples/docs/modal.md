## Modal 模态框
在当前页面打开一个模态对话框。

### 基础用法

Modal组件的基础用法。

:::demo 可以通过`Modal.Header`,`Modal.Body`,`Modal.Footer`子组件定义模态框的不同部分。

```js
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <div>
        <Button theme="info" onClick={() => this.toggleModal()}>展示模态框</Button>
        <Modal visible={modalVisible}>
          <Modal.Header title="标题" onClose={() => this.toggleModal()} />
          <Modal.Body className="test">
            我是模态框
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toggleModal()}>取消</Button>
            <Button theme="success" onClick={() => { alert('你点击了确定') }}>确定</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
```
:::

### 不同的动画

支持多种展示动画。

:::demo 可以通过`animationType`属性设置不同的动画方式，默认`zoom`。

```js
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animationType: 'zoom'
    };
  }
  toggleModal(animationType) {
    this.setState({
      modalVisible: !this.state.modalVisible,
      animationType
    });
  }
  render() {
    const { modalVisible, animationType } = this.state;
    return (
      <div className="buttons">
        <Button onClick={() => this.toggleModal('zoom')}>zoom</Button>
        <Button onClick={() => this.toggleModal('door')}>door</Button>
        <Button onClick={() => this.toggleModal('flip')}>flip</Button>
        <Button onClick={() => this.toggleModal('rotate')}>rotate</Button>
        <Button onClick={() => this.toggleModal('slideUp')}>slideUp</Button>
        <Button onClick={() => this.toggleModal('slideDown')}>slideDown</Button>
        <Button onClick={() => this.toggleModal('slideLeft')}>slideLeft</Button>
        <Button onClick={() => this.toggleModal('slideRight')}>slideRight</Button>
        <Button onClick={() => this.toggleModal('moveUp')}>moveUp</Button>
        <Button onClick={() => this.toggleModal('moveDown')}>moveDown</Button>
        <Button onClick={() => this.toggleModal('moveLeft')}>moveLeft</Button>
        <Button onClick={() => this.toggleModal('moveRight')}>moveRight</Button>
        <Modal visible={modalVisible} animationType={animationType}>
          <Modal.Header title="标题" onClose={() => this.toggleModal()} />
          <Modal.Body>
            我是一个模态框
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toggleModal()}>取消</Button>
            <Button theme="success" onClick={() => { alert('你点击了确定') }}>确定</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
```
:::

### 圆角模态框

可以设置圆角模态框。

:::demo 使用`radius`属性设置圆角

```js
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <div>
        <Button theme="info" onClick={() => this.toggleModal()}>圆角模态框</Button>
        <Modal visible={modalVisible} radius>
          <Modal.Header title="标题" onClose={() => this.toggleModal()} />
          <Modal.Body>
            我是一个模态框
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toggleModal()}>取消</Button>
            <Button theme="success" onClick={() => { alert('你点击了确定') }}>确定</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
```
:::


### Modal Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| visible    | 是否可见  | boolean  |   -            |    false     |
| width     | 宽度   | number  |   -            |    600     |
| radius     | 是否圆角   | boolean    | - | false   |
| animationType     | 动画方式  | string    | zoom,door,flip... | zoom   |
| animationDuration     | 动画时长(ms)  | number   | - | 300  |


### Modal Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onMaskClick | 点击遮罩触发的事件 | — |


### Modal.Header Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title    | 标题  | string  |   -            |    ''     |

### Modal.Header Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 点击关闭图标触发的事件 | — |