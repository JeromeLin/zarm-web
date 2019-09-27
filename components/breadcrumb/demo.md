# Breadcrumb 面包屑
告知用户当前页面在系统中的位置。



## 基本用法
面包屑的基本用法。

```jsx
import { Breadcrumb } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
          <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
          <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 自定义分隔符
可以自定义面包屑分隔符。

```jsx
import { Breadcrumb } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
          <Breadcrumb.Item href="https://t.zhongan.com">二级菜单</Breadcrumb.Item>
          <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| prefixCls | string | 'zw-breadcrumb' | 类名前缀 |
| separator | ReactNode | '/' | 分隔符 |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | 


Breadcrumb.Item

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| separator | ReactNode | '/' | 分隔符 |
| href | string | - | 链接地址 |
| children | ReactNode | - | 内容 |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | 

