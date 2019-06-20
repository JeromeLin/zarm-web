## Pagination 分页
一般配合Table组件做分页展示。

### 基础用法

最简单的分页。

:::demo 只需要设置`total`，`pageSize`默认为10。

```js

import { Pagination } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Pagination total={100} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);

```
:::

### 小型分页

添加size属性即可

:::demo 只需要设置`total`，`size`

```js
import { Pagination } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
         <Pagination size='sm' total={100} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);

```
:::

### 简洁型分页

添加simple属性即可

:::demo 只需要设置`total`，`simple`

```js
import { Pagination } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
          <Pagination simple total={100} />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 显示总数

添加`showToal`属性即可。

:::demo

```js

import { Pagination } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
          <Pagination total={100} showTotal />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 显示跳转

添加`showJumper`属性即可。

:::demo

```js

import { Pagination } from 'dragon-ui';

class Demo extends React.Component {
  render() {
    return (
      <div>
          <Pagination total={100} showTotal showJumper />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 显示每页条数选择器

添加`showPageSizeSelector`属性即可。

:::demo

```js
import { Pagination } from 'dragon-ui';
class Demo extends React.Component {
  render() {
    return (
      <div>
          <Pagination total={100} showJumper showPageSizeSelector />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 设置页面下拉框的数据源

添加`pageSizeSource`属性即可。

:::demo

```js
import { Pagination } from 'dragon-ui';
class Demo extends React.Component {
  render() {
    return (
      <div>
          <Pagination total={100} pageSizeSource={[50,100,150]}  showJumper showPageSizeSelector />
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
:::

### 事件回调

通过`onPageChange`监听翻页和跳转，通过`onPageSizeChange`监听每页条数变更事件。

:::demo

```js
import { Pagination } from 'dragon-ui';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10
    }
  }
 render() {
    const { pageSize } = this.state;
    return (
      <div>
        <Pagination
          total={100}
          pageSize={pageSize}
          showJumper
          showPageSizeSelector
          onPageChange={(page) => {
            alert('翻页到：' + page);
          }}
          onPageSizeChange={(pageSize) => {
            alert('每页展示：' + pageSize);
            this.setState({
              pageSize
            });
          }}
        />
      </div>
    )
  }
}
ReactDOM.render(<Demo />, mountNode);

```
:::

### 事件回调

通过`onChange`兼容`onPageSizeChange`与`onPageChange`，监听翻页和跳转以及每页条数变更事件。


:::demo

```js
import { Pagination } from 'dragon-ui';
class Demo extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      currentPage: 1,
    }
  }
  render() {
    const { pageSize, currentPage } = this.state;
    return (
      <div>
        <Pagination
          total={100}
          value={currentPage}
          pageSize={pageSize}
          showJumper
          showPageSizeSelector
          onChange={({pageSize, currentPage}) => {
            alert('每页展示：' + pageSize + ',且当前页是' + currentPage);
            this.setState({
              pageSize,
              currentPage,
            });
          }}
        />
      </div>
    )
  }
}
ReactDOM.render(<Demo />, mountNode);

```
:::

### 更多设置

通过`bordered`设置样式。

:::demo

```js
import { Pagination } from 'dragon-ui';
class Demo extends React.Component {
  render() {
    return (
      <div>
        <Pagination
          total={100}
          bordered
          showJumper
          showPageSizeSelector
        />
      </div>
    )
  }
}
ReactDOM.render(<Demo />, mountNode);


```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 当前页   | number  |   -            |    -   |
| defaultValue     | 默认页   | number   |   - |     1  |
| simple     |  简洁型分页   | boolean   |   true,false |     false |
| size     |  尺寸   | number   |   md,sm |     md |
| total     | 总数   | number    | — | 0   |
| pageSize     | 每页条数   | number    | — | 10   |
| pageSizeSource |页数下拉框的数据源 | number[] | - | [10,20,30,40,50]
| showTotal     | 是否展示总数   | boolean    | — | false  |
| showJumper     | 是否展示跳转   | boolean    | — | false   |
| showPageSizeSelector     | 是否展示每页条数选择器  | boolean   | — | false  |
| bordered     | 是否有边框   | boolean    | — | false   |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onPageChange | 翻页或跳转触发的事件 | page |
| onPageSizeChange | 每页展示条数变更触发的事件 | pageSize |
| onChange |监听翻页和跳转以及每页条数变更事件。 | {pageSize, currentPage} |
