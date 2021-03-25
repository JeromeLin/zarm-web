# Breadcrumb 面包屑

告知用户当前页面在系统中的位置。

## 基本用法

面包屑的基本用法。

```jsx
import { Breadcrumb } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Breadcrumb>
        <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
        <Breadcrumb.Item href="https://zarm.design">二级菜单</Breadcrumb.Item>
        <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
      </Breadcrumb>
    </div>
    <div className="rows">
      <Breadcrumb style={{ background: '#f8f8f8' }}>
        <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
        <Breadcrumb.Item href="https://zarm.design">二级菜单</Breadcrumb.Item>
        <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  </>,
  mountNode,
);
```

## 自定义分隔符

可以自定义面包屑分隔符。

```jsx
import { Breadcrumb } from 'zarm-web';

ReactDOM.render(
  <Breadcrumb separator=">">
    <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
    <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
    <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
  </Breadcrumb>,
  mountNode,
);
```

## API

<h3>Breadcrumb</h3>

| 属性      | 类型      | 默认值 | 说明   |
| :-------- | :-------- | :----- | :----- |
| separator | ReactNode | '/'    | 分隔符 |

<h3>Breadcrumb.Item</h3>

| 属性      | 类型                        | 默认值 | 说明         |
| :-------- | :-------------------------- | :----- | :----------- |
| separator | ReactNode                   | '/'    | 分隔符       |
| href      | string                      | -      | 链接地址     |
| onClick   | (event: MouseEvent) => void | -      | 点击回调事件 |
