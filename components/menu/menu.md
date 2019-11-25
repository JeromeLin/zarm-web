# Menu 导航菜单
为侧边栏或下拉框等组件提供导航菜单列表。

## 水平导航
设置mode属性为horizontal

```jsx
import { Menu } from 'zarm-web';

ReactDOM.render(
  <Menu mode="horizontal" defaultSelectedKeys={['a']}>
    <Menu.Item key="a">意健险</Menu.Item>
    <Menu.Item key="b">健康险个险</Menu.Item>
    <Menu.Item key="c">雇主责任险</Menu.Item>
    <Menu.Item key="d">运营后台管理</Menu.Item>
    <Menu.Item key="e">公共功能</Menu.Item>
    <Menu.Item key="f">询报价</Menu.Item>
  </Menu>,
  mountNode
);
```


## 侧边导航
默认的inline菜单模式


```jsx
import { Menu, Icon } from 'zarm-web';

const wrapperStyle = {
  width: 238,
  border: '1px solid #efefef'
}

ReactDOM.render(
  <div style={wrapperStyle}>
    <Menu>
      <Menu.SubMenu title="新契约">
        <Menu.Item disabled>投保单复核</Menu.Item>
        <Menu.Divider />
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="核保">
        <Menu.Item>核保权限定义</Menu.Item>
        <Menu.Item>核保权限分配</Menu.Item>
        <Menu.Item>规则配置</Menu.Item>
        <Menu.Item>人工核保</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="批改">
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

## 多层嵌套
SubMenu内可以继续嵌套SubMenu

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
          <Menu inlineCollapsed={this.state.collapse} theme="dark">
            <Menu.SubMenu title={<span><Icon type="keyboard" size="lg" theme="primary" />理赔</span>}>
              <Menu.Item><span>报案</span></Menu.Item>
              <Menu.Item><span>任务分配</span></Menu.Item>
              <Menu.SubMenu title={<React.Fragment><span>理赔工作流</span></React.Fragment>}>
                <Menu.Item><span>休假维护</span></Menu.Item>
                <Menu.Item><span>时效维护</span></Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.SubMenu title={<span><Icon type="keyboard" size="lg" theme="primary" /><span>新契约</span></span>}>
              <Menu.Item><span>投保单复核</span></Menu.Item>
              <Menu.Item><span>在线投保单管理</span></Menu.Item>
              <Menu.Item><span>投保单录入</span></Menu.Item>
              <Menu.Item><span>新增计划</span></Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={<span><Icon type="keyboard" size="lg" theme="primary" /><span>核保</span></span>}>
              <Menu.Item><span>核保权限定义</span></Menu.Item>
              <Menu.Item><span>核保权限分配</span></Menu.Item>
              <Menu.Item><span>规则配置</span></Menu.Item>
              <Menu.Item><span>人工核保</span></Menu.Item>
            </Menu.SubMenu>
            <Menu.Item><Icon type="keyboard" size="lg" theme="primary" /><span>批改</span></Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode)
```

## 深色主题
通过theme属性设置菜单颜色主题

```jsx
import { Menu } from 'zarm-web';

const wrapperStyle = {
  width: 238,
  border: '1px solid #efefef',
  backgroundColor: '#001529'
}

ReactDOM.render(
  <div style={wrapperStyle}>
    <Menu theme="dark">
      <Menu.SubMenu title="新契约">
        <Menu.Item>投保单复核</Menu.Item>
        <Menu.Item>在线投保单管理</Menu.Item>
        <Menu.Item>投保单录入</Menu.Item>
        <Menu.Item>新增计划</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="核保">
        <Menu.Item>核保权限定义</Menu.Item>
        <Menu.Item>核保权限分配</Menu.Item>
        <Menu.Item>规则配置</Menu.Item>
        <Menu.Item>人工核保</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="批改">
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

## 只展开一个子菜单
可以通过openKeys属性控制展开项

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
// TODO
