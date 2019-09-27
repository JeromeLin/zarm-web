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

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator | 分隔符 | string | — | '/' |
| className | 类名 | string | — | '' |


Breadcrumb.Item

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| href | 跳转链接 | string | — | - |
| className | 类名 | string | — | '' |
