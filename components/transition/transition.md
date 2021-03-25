## Transition 过渡

### 内置动画

内置动画类型。

:::demo visible 控制显示隐藏 name 为动画名称。

```js
  constructor (props) {
    super(props);

    this.state = {
      visible: true,
      name: 'fade',
      directional: true
    }
  }
  render() {
    const { visible, name, directional } = this.state
    return (
      <div>
        <Row>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'fade' }) }}>fade</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'zoom' }) }}>zoom</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'door' }) }}>door</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'flip' }) }}>flip</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'moveUp' }) }}>moveUp</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'moveDown' }) }}>moveDown</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'moveLeft' }) }}>moveLeft</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'moveRight' }) }}>moveRight</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'rotate' }) }}>rotate</Button>
        </Row>
        <Row>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'scaleDown' }) }}>scaleDown</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'scaleUp' }) }}>scaleUp</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'slideUp' }) }}>slideUp</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'slideDown' }) }}>slideDown</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'slideLeft' }) }}>slideLeft</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'slideRight' }) }}>slideRight</Button>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible, name: 'bounces' }) }}>bounce</Button>
        </Row>

        <Transition
          name={name}
          // transitionOnMount
          visible={this.state.visible}
        >
          <div style={{ position: 'relative', opacity: .6, background: '#ed1287', width: 200, height: 200, margin: '30px 0', zIndex: 20000 }}>
          </div>
        </Transition>
      </div>
    )
  }
```

:::

### 静态动画

静态动画。

:::demo Button 组件提供 5 种主题，由`theme`属性来定义，默认为`default`。

```js
  constructor (props) {
    super(props);

    this.state = {
      visible: true,
      name: 'fade',
      directional: true
    }
  }
  render() {
    const { visible, name, directional } = this.state
    return (
      <div>
        <Row>
          <Button type="primary" onClick={() => { this.setState({ name: 'flash' }) }}>flash</Button>
          <Button type="primary" onClick={() => { this.setState({ name: 'shake' }) }}>shake</Button>
          <Button type="primary" onClick={() => { this.setState({ name: 'tada' }) }}>tada</Button>
          <Button type="primary" onClick={() => { this.setState({ name: 'pulse' }) }}>pulse</Button>
          <Button type="primary" onClick={() => { this.setState({ name: 'swing' }) }}>swing</Button>
        </Row>

        <Transition
          name={name}
          directional={false}
          visible={this.state.visible}
        >
          <div
            style={{
              position: 'relative',
              background: '#00BC70',
              width: 200,
              height: 200,
              margin: '30px 0',
              zIndex: 20000,
              opacity: .6
            }}
          />
        </Transition>
      </div>
    )
  }
```

:::

### 动画函数勾子

函数回调。

:::demo onShow onStart onComplete onHide

```js
  constructor (props) {
    super(props);

    this.state = {
      visible: true,
      name: 'bounce',
    }
  }
  onStart (data) {
    console.log(data)
    alert('animation onStart')
  }
  onComplete () {
    alert('animation onComplete')
  }
  onShow () {
    alert('animation onShow')
  }
  onHide () {
    alert('animation onHide')
  }
  onBeforeShow () {
    alert('animation onBeforeShow')
  }
  onBeforeHide () {
    alert('animation onBeforeHide')
  }
  render() {
    const { visible } = this.state
    return (
      <div>
        <Row>
          <Button type="primary" onClick={() => { this.setState({ visible: !visible }) }}>flash</Button>
        </Row>

        <Transition
          name="bounces"
          visible={this.state.visible}
          onStart={this.onStart.bind(this)}
          onComplete={this.onComplete.bind(this)}
          onShow={this.onShow.bind(this)}
          onHide={this.onHide.bind(this)}
          onBeforeShow={this.onBeforeShow.bind(this)}
          onBeforeHide={this.onBeforeHide.bind(this)}
        >
          <div
            style={{
              position: 'relative',
              background: '#EC9131',
              width: 200,
              height: 200,
              margin: '30px 0',
              zIndex: 20000,
              opacity: .6
            }}
          />
        </Transition>
      </div>
    )
  }
```

:::

### Collapse Transition

元素开闭动画过渡

:::demo

```js
  constructor (props) {
    super(props);

    this.state = {
      visible: true,
    }
  }

  render() {
    const { visible } = this.state
    return (
      <div>
        <CollapseTransition
          visible={this.state.visible}
        >
          <div
            style={{
              position: 'relative',
              background: '#ad65ec',
              width: 200,
              height: 200,
              margin: '30px 0',
              zIndex: 20000,
              opacity: .6
            }}
          />
        </CollapseTransition>
        <Button theme="primary" onClick={() => this.setState({ visible: !this.state.visible })}>open</Button>
      </div>
    )
  }
```

:::

### Transition Attributes

| 参数              | 说明                              | 类型    | 可选值               | 默认值 |
| ----------------- | --------------------------------- | ------- | -------------------- | ------ |
| visible           | 是否显示/隐藏                     | boolean | -                    | —      |
| name              | 动画名称                          | string  | 内置动画类型参考上面 | fade   |
| duration          | 动画持续时间                      | number  | —                    | 500    |
| directional       | 是否是静态动画 fasle 代表静态动画 | boolean | —                    | true   |
| transitionOnMount | 是否在节点挂载时动画              | boolean | —                    | false  |
| unmountOnHide     | 节点隐藏时候是否删除节点          | -       | -                    | false  |
| mountOnShow       | 初始化的时候是否挂载节点          | boolean | -                    | true   |

### Transition Events

| 事件名称     | 说明                      | 回调参数               |
| ------------ | ------------------------- | ---------------------- |
| onStart      | 动画开始时候调用          | ({ ...props, status }) |
| onComplete   | 动画结束后调用            | ({ ...props, status }) |
| onShow       | 动画完成之后 显示时候调用 | ({ ...props, status }) |
| onHide       | 动画完成之后 隐藏时候调用 | ({ ...props, status }) |
| onBeforeShow | 显示前调用                | ({ ...props, status }) |
| onBeforeHide | 隐藏之前调用              | ({ ...props, status }) |

### CollapseTransition Attributes

| 参数    | 说明          | 类型    | 可选值 | 默认值 |
| ------- | ------------- | ------- | ------ | ------ |
| visible | 是否显示/隐藏 | boolean | -      | —      |
