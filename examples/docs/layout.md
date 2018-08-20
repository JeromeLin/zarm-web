## Layout 布局

页面整体布局组件。

### 基础用法

上中下布局。

:::demo
```js
  render() {
    const layoutStyle = {
      color: '#fff',
      textAlign: 'center'
    };
    const contentStyle = {
      height: 140,
      background: '#001529',
      opacity: 0.4,
      lineHeight: '140px',
    };
    const footerStyle = {
      background: '#001529',
    }
    return (
      <div>
        <Layout style={layoutStyle}>
          <Layout.Header>Header</Layout.Header>
          <Layout.Content style={contentStyle}>Content</Layout.Content>
          <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
        </Layout>
      </div>
    )
  }
```
:::

### 带侧边

上中下布局+侧边。

:::demo
```js
  render() {
    const layoutStyle = {
      color: '#fff',
      textAlign: 'center'
    };
    const contentStyle = {
      height: 140,
      background: '#001529',
      opacity: 0.4,
      lineHeight: '140px',
    };
    const siderStyle = {
      opacity: 0.8,
      lineHeight: '140px',
    }
    const footerStyle = {
      background: '#001529',
    }
    return (
      <div>
        <Layout style={layoutStyle}>
          <Layout.Header>Header</Layout.Header>
          <Layout>
            <Layout.Sider style={siderStyle}>Sider</Layout.Sider>
            <Layout.Content style={contentStyle}>Content</Layout.Content>
          </Layout>
          <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
        </Layout>
      </div>
    )
  }
```
:::

:::demo
```js
  render() {
    const layoutStyle = {
      color: '#fff',
      textAlign: 'center'
    };
    const contentStyle = {
      height: 140,
      background: '#001529',
      opacity: 0.4,
      lineHeight: '140px',
    };
    const siderStyle = {
      opacity: 0.8,
      lineHeight: '140px',
    }
    const footerStyle = {
      background: '#001529',
    }
    return (
      <div>
        <Layout style={layoutStyle}>
          <Layout.Header>Header</Layout.Header>
          <Layout>
            <Layout.Content style={contentStyle}>Content</Layout.Content>
            <Layout.Sider style={siderStyle}>Sider</Layout.Sider>
          </Layout>
          <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
        </Layout>
      </div>
    )
  }
```
:::

### 侧边布局

:::demo
```js
  render() {
    const layoutStyle = {
      color: '#fff',
      textAlign: 'center'
    };
    const contentStyle = {
      height: 180,
      background: '#001529',
      opacity: 0.4,
      lineHeight: '180px',
    };
    const siderStyle = {
      opacity: 0.8,
      lineHeight: '180px',
    }
    return (
      <div>
        <Layout style={layoutStyle}>
          <Layout.Sider style={siderStyle}>Sider</Layout.Sider>
          <Layout>
            <Layout.Header>Header</Layout.Header>
            <Layout.Content style={contentStyle}>Content</Layout.Content>
          </Layout>
        </Layout>
      </div>
    )
  }
```
:::

### 可折叠侧边

:::demo
```js
  render() {
    const layoutStyle = {
      color: '#fff',
      textAlign: 'center'
    };
    const contentStyle = {
      height: 180,
      background: '#001529',
      opacity: 0.4,
      lineHeight: '180px',
    };
    const siderStyle = {
      opacity: 0.8,
      lineHeight: '180px',
    }
    const footerStyle = {
      background: '#001529',
    }
    return (
      <div>
        <Layout style={layoutStyle}>
          <Layout.Sider onCollapse={collapsed => console.log(collapsed)} collapsible style={siderStyle}>
            Sider
          </Layout.Sider>
          <Layout>
            <Layout.Header>Header</Layout.Header>
            <Layout.Content style={contentStyle}>Content</Layout.Content>
          </Layout>
        </Layout>
      </div>
    )
  }
```
:::

### Layout Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| style     | 自定义样式   | object  |   -     |    -     |
| className  | 样式类名 | string  |   -     |    -  |

Header,Content,Footer组件属性同Layout。

### Sider Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| collapsible     | 是否可折叠 | boolean  |   -   |    False   |
| collapsed  | 折叠状态 | boolean  |   -     |    False  |
| collapsedWidth  | 折叠时候的宽度 | numer  |   -     |    80  |
| width  | 未折叠时候的宽度 | numer  |   -     |    236  |
| trigger  | 自定义折叠触发的trigger，设为null隐藏 | string/ReactNode  |   -     |    -  |

### Sider Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onCollapse | 折叠事件发生时触发 | collapsed |