## Dropdown 下拉框
下拉框组件。

### 基础用法
目前支持三种触发方式 `click hover contextMenus`,默认值为`click`。
:::demo 通过`visible`属性控制显隐。
```js
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      dropdown2:false,
      dropdown3:false,
      dropdown4:false
    }
  }

  render() {
    const overlay = <Menu>
                <Menu.Item><Checkbox value="name">姓名</Checkbox></Menu.Item>
                <Menu.Item><Checkbox value="age">年龄</Checkbox></Menu.Item>
                <Menu.Item onClick={()=>{
                  this.setState({
                    dropdown: false,
                    dropdown2:false,
                    dropdown3:false,
                    dropdown4:false
                  });
                }}>点我关闭弹窗</Menu.Item>
              </Menu>;

    return (
      <div style={{position: 'relative'}}>
        <Dropdown
          visible={this.state.dropdown}
          onVisibleChange={visible => {
            this.setState({
              dropdown: visible
            });
          }}
          overlay={overlay}
          >
            <Button theme="info">
              toggle
            </Button>
        </Dropdown>


        <Dropdown
          disabled
          visible={this.state.dropdown2}
          style={{position: 'absolute', left: 0, top: 36, minWidth: 200}}
          onVisibleChange={visible => {
            this.setState({
              dropdown2: visible
            });
          }}
          overlay={overlay}
          >
            <Button disabled theme="info">
              disabled
            </Button>
        </Dropdown>


        <Dropdown
          trigger="hover"
          visible={this.state.dropdown3}
          style={{position: 'absolute', left: 0, top: 36, minWidth: 200}}
          onVisibleChange={visible => {
            this.setState({
              dropdown3: visible
            });
          }}
          overlay={overlay}
          >
            <Button theme="info">
              hover me
            </Button>
        </Dropdown>

        <Dropdown
          trigger="contextMenu"
          visible={this.state.dropdown4}
          style={{position: 'absolute', left: 0, top: 36, minWidth: 200}}
          onVisibleChange={visible => {
            this.setState({
              dropdown4: visible
            });
          }}
          overlay={overlay}
          >
            <Button theme="info">
              right click me
            </Button>
        </Dropdown>
      </div>
    )
  }
```
:::

### 弹窗的定位
定位信息有6种 `bottomLeft, bottomCenter, bottomRight, topLeft, topCenter, topRight`。通过`placement`控制显示位置
:::demo 通过`placement`属性控制弹窗的位置。
```js
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      dropdown2:false,
    }
  }
  render() {
    const overlay = <Menu>
                <Menu.Item><Checkbox value="name">姓名</Checkbox></Menu.Item>
                <Menu.Item><Checkbox value="age">年龄</Checkbox></Menu.Item>
                <Menu.Item onClick={()=>{
                  this.setState({
                    dropdown: false,
                    dropdown2:false,
                  });
                }}>点我关闭当前弹窗</Menu.Item>
              </Menu>;

    return (
      <div style={{position: 'relative'}}>
        <Dropdown
          visible={this.state.dropdown}
          style={{position: 'absolute', left: 0, top: 36, minWidth: 200}}
          onVisibleChange={visible => {
            this.setState({
              dropdown: visible
            });
          }}
          overlay={overlay}
          >
            <Button theme="info">
              点我从下面弹出
            </Button>
        </Dropdown>

        <Dropdown
          placement="topLeft"
          visible={this.state.dropdown2}
          style={{position: 'absolute', left: 0, top: 36, minWidth: 200}}
          onVisibleChange={visible => {
            this.setState({
              dropdown2: visible
            });
          }}
          overlay={overlay}
          >
            <Button theme="info">
              点我从上面弹出
            </Button>
        </Dropdown>
      </div>
    )
  }
```
:::


### `onVisibleChange` 参数
这个参数为当显示属性发生变化的回调函数 为必传项，一般情况下, 我们都需要保持外部数据和内部数据的一致性。参考下面用法
```
onVisibleChange={(visible)=>{
      this.setState({
        dropdownVisible: visible
      })
  }
}
```

### 静态方法
```
Drop.hide();         // 隐藏所有的Dropdown组件
Drop.show();         // 显示所有的Dropdown组件(不包括禁用的组件)
Drop.reposition();   // 重新定位所有的组件(不包括隐藏和禁用的组件)
```


### `notRenderInDisabledMode` 参数
当这个参数为true 且 disable参数也为true的时候，将不会渲染弹窗，这会在一些一直都是disabled状态下的组件节省渲染开销，尤其在渲染大量数据的情况下。

### `className` 和 `style`参数
className 和 style 参数会作用在弹出框的最外层 ui-dropdown节点上。内部的style会覆盖传入的style(若冲突), 会被覆盖的属性有：
```
display                  // 控制dropdown的显示
left                     // 控制dropdown的位置
top                      // 控制dropdown的位置
animationDuration        // 控制dropdown动画的事件 默认为300
zIndex                   // 控制组件的显示层级 默认为9999
position                 // 控制组件的定位方式，只能为absolute
```

### 内部实现
设 点击的触发组件为 triggerBox, 弹出的组件为 DropdownBox
+ Dropdown组件在实现的时候，考虑到定位信息的获取，把所有的DropdownBox都动态创建到body的根节点下。然后相对于body进行绝对定位。计算出当前triggerBox的位置然后设置弹出框的绝对定位信息， 若父级中有position:fixed样式，则动态创建到该元素下。
+ 监听了window.resize事件，当window.resize的时候自动计算目前已弹出的DropdownBox的位置。  
+ 监听了document的点击事件，当点击外部的时候回自动隐藏DropdownBox。  
+ 默认在triggerBox和DropdownBox之间有5px的间隙。  
+ 当trigger参数为hover的时候，鼠标移出之后会延迟300ms后，DropdownBox才会消失，为了让用户在从triggerBox滑到DropdownBox的时候，经过间隙不会直接隐藏DropdownBox。  
+ DropdownBox的动画效果时长为300ms，目前不支持自定义。  
+ 当前的弹出框的最小宽度为当前triggerBox的宽度。可以自己设置宽度。


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| visible   |  是否显示         | boolean |  -     |    false    |
| radius    |  是否圆角         | boolean |  -     |    false    |
| prefixCls |  组件的className  | string | -      | ui-dropdown|
| overlay   |  组件弹出层的内容  | ReactElement | -  |-|
| placement |  组件对齐的方式    | string | bottomLeft, bottomCenter, bottomRight, topLeft, topCenter, topRight| bottomLeft |
| className |  弹出层的className | string | - | - |
| style |  弹出层的style | React.CSSProperties | - | - |
| trigger | 出发弹出框的方式 | string | click hover contextMenu | click |
| disabled | 是否禁用弹出框 | boolean | - | false |
| zIndex | 当前弹框的zIndex值 | number | - | 9999 |
| notRenderInDisabledMode | 在disable为true的时候是否不渲染overlay | boolean | - | false |
| onVisibleChange | 显示属性变化时候的回调函数（必传）| (visible:boolean):=> void | - | - |
| getPopupContainer | 获取dropdown挂载点的函数（必传）| ():=> HTMLElement | - | - |