# Pagination 分页

采用分页的形式分隔长列表，每次只加载一个页面。

## 基础用法

最简单的分页。

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Pagination total={100} />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 显示总数

通过设置 showTotal 展示总共有多少数据。

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Pagination total={100} showTotal />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 显示跳转

添加`showJumper`属性即可。

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Pagination total={100} showJumper />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 显示每页条数选择器

添加`showPageSizeSelector`属性即可。

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Pagination total={100} showPageSizeSelector />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 指定每页可以显示多少条

添加`pageSizeSource`属性即可。

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <Pagination
        total={100}
        pageSizeSource={[50, 100, 150]}
        showPageSizeSelector
      />
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 小型分页

占用更小位置的分页

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Pagination total={100} showTotal showJumper size="small" />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 迷你

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Pagination total={100} simple />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 事件回调

通过`onPageChange`监听翻页和跳转，通过`onPageSizeChange`监听每页条数变更事件。

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10
    };
  }
  render() {
    const { pageSize } = this.state;
    return (
      <Pagination
        total={100}
        pageSize={pageSize}
        showPageSizeSelector
        onPageChange={page => {
          alert('翻页到：' + page);
        }}
        onPageSizeChange={pageSize => {
          alert('每页展示：' + pageSize);
          this.setState({
            pageSize
          });
        }}
      />
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## API

```jsx
<Pagination onChange="{onChange}" total="{50}" />
```

| 参数                 | 说明                                         | 类型                     | 可选值 | 默认值           |
| -------------------- | -------------------------------------------- | ------------------------ | ------ | ---------------- |
| value                | 当前页数                                     | number                   | -      | -                |
| defaultValue         | 默认的当前页数                               | number                   | -      | 1                |
| total                | 数据总数                                     | number                   | —      | 0                |
| pageSize             | 每页条数                                     | number                   | —      | 10               |
| pageSizeSource       | 指定每页可以显示多少条                       | number[]                 | -      | [10,20,30,40,50] |
| showTotal            | 用于显示数据总量                             | boolean                  | —      | false            |
| showJumper           | 是否可以快速跳转至某页                       | boolean                  | —      | false            |
| showPageSizeSelector | 是否展示每页条数选择器                       | boolean                  | —      | false            |
| onChange             | 页码改变的回调，参数是改变后的页码及每页条数 | Function(page, pageSize) | —      | noop             |
| onPageSizeChange     | pageSize 变化的回调                          | Function(page, pageSize) | —      | noop             |
| onPageChange         | 翻页或跳转触发的事件                         | page                     | —      | noop             |
