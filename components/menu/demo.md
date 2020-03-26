# Menu 导航菜单
为侧边栏等提供导航菜单列表

## 内联模式
默认 mode=inline，子菜单内嵌在菜单中

```jsx
import { Menu, Icon } from 'zarm-web';

const wrapperStyle = {
  width: 238,
  border: '1px solid #efefef'
}

ReactDOM.render(
  <div style={wrapperStyle}>
    <Menu>
      <Menu.SubMenu title={<span><Icon type="keyboard" size="lg" />新契约</span>}>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title={<span><Icon type="date" size="lg" />核保</span>}>
        <Menu.ItemGroup title="分组1">
          <Menu.Item>核保权限定义</Menu.Item>
          <Menu.Item>核保权限分配</Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.ItemGroup title="分组2">
          <Menu.Item>规则配置</Menu.Item>
          <Menu.Item>人工核保</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu title={<span><Icon type="time" size="lg" />批改</span>}>
        <Menu.Item>批改新增</Menu.Item>
        <Menu.Item>批改复核</Menu.Item>
        <Menu.Item>批改回退</Menu.Item>
        <Menu.Item>批改共享池</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </div>,
  mountNode
);
```

## 深色主题的内联模式
通过 theme 属性可以设置深色主题

```jsx
import { Menu, Icon } from 'zarm-web';

const wrapperStyle = {
  width: 238,
  // border: '1px solid #efefef'
}

ReactDOM.render(
  <div style={wrapperStyle}>
    <Menu theme="dark">
      <Menu.SubMenu title={<span><Icon type="keyboard" size="lg" />新契约</span>}>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title={<span><Icon type="date" size="lg" />核保</span>}>
        <Menu.ItemGroup title="分组1">
          <Menu.Item>核保权限定义</Menu.Item>
          <Menu.Item>核保权限分配</Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="分组2">
          <Menu.Item>规则配置</Menu.Item>
          <Menu.Item>人工核保</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu title={<span><Icon type="time" size="lg" />批改</span>}>
        <Menu.Item>批改新增</Menu.Item>
        <Menu.Item>批改复核</Menu.Item>
        <Menu.Item>批改回退</Menu.Item>
        <Menu.Item>批改共享池</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  </div>,
  mountNode
);
```

## 可缩起的内联菜单
通过控制 inlineCollapsed 属性，内联模式可以缩起或展开

```jsx
import { Menu, Icon, Button } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false
    }
  }
  toggleCollapse(){
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    const wrapperStyle = {
      width: 256,
    }
    return (
      <div>
        <div style={wrapperStyle}>
          <Button theme="primary" onClick={this.toggleCollapse.bind(this)} style={{ marginBottom: 16 }}>切换</Button>
          <Menu inlineCollapsed={this.state.collapse} style={{ border: '1px solid #efefef' }}>
            <Menu.SubMenu title={<span><Icon type="broadcast" size="lg" />理赔</span>}>
              <Menu.Item><span>报案</span></Menu.Item>
              <Menu.Item><span>任务分配</span></Menu.Item>
              <Menu.SubMenu title={<React.Fragment><span>理赔工作流</span></React.Fragment>}>
                <Menu.Item><span>休假维护</span></Menu.Item>
                <Menu.Item><span>时效维护</span></Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.SubMenu title={<span><Icon type="keyboard" size="lg" /><span>新契约</span></span>}>
              <Menu.Item><span>投保单复核</span></Menu.Item>
              <Menu.Item><span>在线投保单管理</span></Menu.Item>
              <Menu.Item><span>投保单录入</span></Menu.Item>
              <Menu.Item><span>新增计划</span></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={<span><Icon type="date" size="lg" /><span>核保</span></span>}>
              <Menu.Item><span>核保权限定义</span></Menu.Item>
              <Menu.Item><span>核保权限分配</span></Menu.Item>
              <Menu.Item><span>规则配置</span></Menu.Item>
              <Menu.Item><span>人工核保</span></Menu.Item>
            </Menu.SubMenu>
            <Menu.Item title="团险批改"><Icon type="time" size="lg" /><span>团险批改</span></Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```

## 垂直模式
设置 mode=vertical，子菜单以浮层的方式展示


```jsx
import { Menu, Icon } from 'zarm-web';

const wrapperStyle = {
  width: 238,
  border: '1px solid #efefef'
}

ReactDOM.render(
  <div style={wrapperStyle}>
    <Menu mode="vertical">
      <Menu.SubMenu title={<span><Icon type="keyboard" size="lg" />新契约</span>}>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title={<span><Icon type="date" size="lg" />核保</span>}>
        <Menu.ItemGroup title="分组1">
          <Menu.Item>核保权限定义</Menu.Item>
          <Menu.Item>核保权限分配</Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="分组2">
          <Menu.Item>规则配置</Menu.Item>
          <Menu.Item>人工核保</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu title={<span><Icon type="time" size="lg" />批改</span>}>
        <Menu.Item>批改新增</Menu.Item>
        <Menu.SubMenu title="批改管理">
          <Menu.Item>批改复核</Menu.Item>
          <Menu.Item>批改回退</Menu.Item>
          <Menu.Item>批改共享池</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  </div>,
  mountNode
);
```

## 深色主题的垂直模式
通过 theme 属性可以设置深色主题

```jsx
import { Menu, Icon } from 'zarm-web';

const wrapperStyle = {
  width: 238,
  border: '1px solid #efefef'
}

ReactDOM.render(
  <div style={wrapperStyle}>
    <Menu mode="vertical" theme="dark">
      <Menu.SubMenu title={<span><Icon type="keyboard" size="lg" />新契约</span>}>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title={<span><Icon type="date" size="lg" />核保</span>}>
        <Menu.ItemGroup title="分组1">
          <Menu.Item>核保权限定义</Menu.Item>
          <Menu.Item>核保权限分配</Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="分组2">
          <Menu.Item>规则配置</Menu.Item>
          <Menu.Item>人工核保</Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu title={<span><Icon type="time" size="lg" />批改</span>}>
        <Menu.Item>批改新增</Menu.Item>
        <Menu.SubMenu title="批改管理">
          <Menu.Item>批改复核</Menu.Item>
          <Menu.Item>批改回退</Menu.Item>
          <Menu.Item>批改共享池</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  </div>,
  mountNode
);
```

## 只展开当前子菜单
通过 openKeys 属性控制展开的子菜单

```jsx
import { Menu } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: ['a']
    }
  }
  onOpenChange(openKeys) {
    console.log(openKeys)
    const lastKey = openKeys.pop();
    this.setState({
      openKeys: [lastKey]
    });
  }
  render() {
    const wrapperStyle = {
      width: 238,
      border: '1px solid #efefef',
      backgroundColor: '#001529'
    }
    const { openKeys } = this.state;
    return (
      <div style={wrapperStyle}>
        <Menu
          theme="dark"
          openKeys={openKeys}
          defaultOpenKeys={['a']}
          onOpenChange={(keys) => this.onOpenChange(keys)}
        >
          <Menu.SubMenu title="新契约" key="a">
            <Menu.Item>投保单复核</Menu.Item>
            <Menu.Item>在线投保单管理</Menu.Item>
            <Menu.Item>投保单录入</Menu.Item>
            <Menu.Item>新增计划</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="核保" key="b">
            <Menu.Item>核保权限定义</Menu.Item>
            <Menu.Item>核保权限分配</Menu.Item>
            <Menu.Item>规则配置</Menu.Item>
            <Menu.Item>人工核保</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu title="批改" key="c">
            <Menu.Item>批改新增</Menu.Item>
            <Menu.Item>批改复核</Menu.Item>
            <Menu.Item>批改回退</Menu.Item>
            <Menu.Item>批改共享池</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```


## API

# Menu

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| prefixCls | string | 'zw-menu' | 组件样式前缀 |
| className | string | - | 自定义组件根元素类名 |
| style | CSSProperties | - | 自定义组件根元素样式 |
| mode | string | 'inline' | 设置菜单模式，可选值`inline`、`vertical` |
| theme | string | 'light' | 设置主题，可选值`light`、`dark` |
| defaultOpenKeys | string[] | - | 默认展开的子菜单key |
| defaultSelectedKeys | string[] | - | 默认选中的菜单key |
| openKeys | string[] | - | 需要展开的子菜单key |
| selectedKeys | string[] | - | 需要选中的菜单项key |
| inlineIndent | number | 24 | `inline`模式时每一层菜单的缩进 |
| inlineCollapsed | boolean | false | `inline`模式时菜单是否收起 |
| onSelect | (selectedKeys: string[]) => void | noop | 菜单选中时的回调函数 |
| onOpenChange | (openKeys: string[]) => void | noop | 子菜单收起展开时候的回调函数 |


# Menu.Item

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| className | string | - | 自定义菜单项类名 |
| style | CSSProperties | - | 自定义菜单项样式 |
| title | string | - | `inline`模式菜单收起，鼠标移入的提示文案 |
| key | string | - | 菜单的唯一性key值 |
| disabled | boolean | false | 是否置灰不可点击 |
| onClick | (e: React.MouseEvent, itemKey: string) => void | noop | 点击菜单后的回调函数 |
| onDoubleClick | (e: React.MouseEvent, itemKey: string) => void | noop | 双击菜单后的回调函数 |


# Menu.SubMenu

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| className | string | - | 自定义子菜单类名 |
| style | CSSProperties | - | 自定义子菜单样式 |
| title | string | - | 子菜单名称  |
| key | string | - | 子菜单的唯一性key值 |


# Menu.ItemGroup

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| className | string | - | 自定义菜单组类名 |
| style | CSSProperties | - | 自定义菜单组样式 |
| title | string | - | 菜单组名称  |

# Menu.Divider

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| className | string | - | 自定义分割线类名 |
| style | CSSProperties | - | 自定义分割线样式 |
