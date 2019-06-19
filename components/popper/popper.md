## Popper 

PopperPopperPopperPopperPopperPopperPopperPopperPopperPopperPopperPopperPopper

### 不同位置

不同位置出现。

::: demo
```js
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  close () {
    this.setState({ visible: false })
  }
  render() {
    const content = (
      <div>
        <p>点我关闭掉popover</p>
        <p>点我关闭掉popover</p>
        <p>点我关闭掉popover</p>
        <Button onClick={this.close.bind(this)}>关闭</Button>
      </div>
    )
    return (
      <div>
        <div style={{ marginLeft: 62 }}>
          <Popper placement="topLeft" title="topLeft text">
            <Button>上左</Button>
          </Popper>
  
          <Popper placement="top" title="top text">
            <Button>上边</Button>
          </Popper>
  
          <Popper placement="topRight" title="topRight text">
            <Button>上右</Button>
          </Popper>
        </div>
        
        <div style={{ width: 62, float: "left" }}>
          <Popper placement="leftTop" title="leftTop text">
            <Button>左上</Button>
          </Popper>
  
          <Popper placement="left" title="left text">
            <Button>左边</Button>
          </Popper>
  
          <Popper placement="leftBottom" title="leftBottom text">
            <Button>左下</Button>
          </Popper>
        </div>
        
        <div style={{ width: 62, marginLeft: 62 * 4.8 }}>
          <Popper placement="rightTop" title="rightTop text">
            <Button>右上</Button>
          </Popper>
  
          <Popper placement="right" title="right text">
            <Button>右边</Button>
          </Popper>
  
          <Popper placement="rightBottom" title="rightBottom text">
            <Button>右下</Button>
          </Popper>
        </div>
        
        <div style={{ marginLeft: 62, clear: 'both' }}>
          <Popper placement="bottomLeft" title="bottomLeft text">
            <Button>下左</Button>
          </Popper>
  
          <Popper placement="bottom" title="bottom text">
            <Button>下边</Button>
          </Popper>
  
          <Popper placement="bottomRight" title="bottomRight">
            <Button>下右</Button>
          </Popper>
        </div>
      </div>
    );
  }
```
:::

### 不同的触发方式

不同的触发方式。

::: demo
```js
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  close () {
    this.setState({ visible: false })
  }
  render() {
    const contentBase = (
      <div>
        <p>我是内容</p>
        <p>我是内容</p>
        <p>我是内容</p>
      </div>
    )
    const content = (
      <div style={{ textAlign: 'center' }}>
        <p>点我关闭掉popover</p>
        <p>点我关闭掉popover</p>
        <p>点我关闭掉popover</p>
        <br/>
        <Button onClick={this.close.bind(this)}>关闭</Button>
      </div>
    )
    return (
      <div>
        <Popper content={contentBase} trigger="click">
          <Button style={{ marginRight: 12 }}>click show Popper</Button>
        </Popper>
        <Popper content={contentBase} trigger="hover">
          <Button style={{ marginRight: 12 }}>hover show Popper</Button>
        </Popper>
        <Popper content={contentBase} trigger="focus">
          <Button style={{ marginRight: 12 }}>focus show Popper</Button>
        </Popper>
        <Popper content={content} trigger="manual" visible={this.state.visible}>
          <Button style={{ marginRight: 12 }} onClick={() => this.setState({ visible: true })}>manual control Popper</Button>
        </Popper>
      </div>
    );
  }
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| content | 需要展示的内容 | string/function/element | — | '' |
| direction | 展示方位 | string | topLeft, top, topRight... | bottomRight |
| className | 弹窗类名 | string | — | '' |
| trigger | 触发方式 | string | hover/click | click |
| mask | 是否有蒙层 | boolean | - | false |
| radius | 是否圆角 | boolean | - | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onMaskClick | 点击蒙层时候触发的事件 | — |
