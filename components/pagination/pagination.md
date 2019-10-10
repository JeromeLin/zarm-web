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

添加`showQuickJumper`属性即可。

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Pagination total={100} showQuickJumper />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 显示每页条数选择器

添加`showPageSizeChanger`属性即可。

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return <Pagination total={100} showPageSizeChanger />;
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 指定每页可以显示多少条

添加`pageSizeOptions`属性即可。

```jsx
import { Pagination } from 'zarm-web';

class Demo extends React.Component {
  render() {
    return (
      <Pagination
        total={100}
        pageSizeOptions={[50, 100, 150]}
        showPageSizeChanger
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
    return <Pagination total={100} showTotal showQuickJumper size="sm" />;
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

通过`onChange`监听翻页和跳转，通过`onPageSizeChange`监听每页条数变更事件。

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
        showPageSizeChanger
        onChange={page => {
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

| 属性                | 类型                        | 默认值           | 说明                       |
| ------------------- | --------------------------- | ---------------- | -------------------------- |
| value               | number                      | -                | 当前页                     |
| defaultValue        | number                      | 1                | 默认页                     |
| simple              | boolean                     | false            | 是否简洁分页               |
| size                | 'md' or 'sm'                | md               | 分页器尺寸                 |
| total               | number                      | 0                | 数据总数                   |
| pageSize            | number                      | 10               | 每页条数                   |
| pageSizeOptions     | number[]                    | [10,20,30,40,50] | 每页条数下拉框的选项       |
| showTotal           | boolean                     | false            | 是否展示总数               |
| showQuickJumper     | boolean                     | false            | 是否展示跳转               |
| showPageSizeChanger | boolean                     | false            | 是否展示每页条数选择器     |
| onPageSizeChange    | (pageSize?: number) => void | -                | 每页展示条数变更触发的事件 |
| onChange            | (page?: number) => void     | -                | 页面切换和跳转时触发的事件 |
