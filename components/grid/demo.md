# Grid 栅格

采用24格划分的栅格系统



## 基本用法
通过 span 设置宽度占比，默认占 24 格即 100%。

```jsx
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <>
    <Row>
      <Col>
        <div>col</div>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <div>col-12</div>
      </Col>
      <Col span={12}>
        <div>col-12</div>
      </Col>
    </Row>
  </>
, mountNode);
```



## 区块间隔
通过 Row 的 gutter 属性设置 Col 之间的水平间距。如果需要垂直间距，可以写成数组形式 [水平间距, 垂直间距]。

```jsx
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <>
    <h4>水平间距</h4>
    <Row gutter={6}>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
    </Row>

    <h4>水平间距, 垂直间距</h4>
    <Row gutter={[6, 10]}>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={6}>
        <div>col-6</div>
      </Col>
      <Col span={8}>
        <div>col-8</div>
      </Col>
      <Col span={8}>
        <div>col-8</div>
      </Col>
      <Col span={8}>
        <div>col-8</div>
      </Col>
    </Row>
  </>
, mountNode);
```



## 左间距
通过 offset 属性，设置 Col 的 margin-left。

```jsx
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <Row gutter={[0, 10]}>
    <Col span={8}>
      <div>col-8</div>
    </Col>
    <Col span={8} offset={8}>
      <div>col-8 offset-8</div>
    </Col>

    <Col span={6} offset={6}>
      <div>col-6 offset-6</div>
    </Col>
    <Col span={6} offset={6}>
      <div>col-6 offset-6</div>
    </Col>
  </Row>
, mountNode);
```



## 左右偏移
通过 push 属性，设置 Col 的 左偏移; 通过 pull 属性，设置 Col 的 右偏移。

```jsx
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <Row>
    <Col span={6} push={18}>
      <div>col-6 push-18</div>
    </Col>
    <Col span={18} pull={6}>
      <div>col-18 pull-6</div>
    </Col>
  </Row>
, mountNode);
```



## 布局
通过 justify 属性，设置 Col 其在父节点里面的排版方式。

```jsx
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <>
    <h4>justify start</h4>
    <Row justify="start" className="row-bg">
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
    </Row>

    <h4>justify center</h4>
    <Row justify="center" className="row-bg">
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
    </Row>

    <h4>justify end</h4>
    <Row justify="end" className="row-bg">
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
    </Row>

    <h4>justify space-between</h4>
    <Row justify="space-between" className="row-bg">
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
    </Row>

    <h4>justify space-around</h4>
    <Row justify="space-around" className="row-bg">
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
      <Col span={4}>
        <div>col-4</div>
      </Col>
    </Row>
  </>
, mountNode);
```



## 垂直对齐
通过 align 属性，设置 Col 的 垂直对齐方式。

```jsx
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <>
    <h4>align top</h4>
    <Row justify="center" align="top" className=" row-bg">
      <Col span={8}>
        <div className="col col-height-8">col-8</div>
      </Col>
      <Col span={8}>
        <div>col-8</div>
      </Col>
      <Col span={8}>
        <div className="col col-height-10">col-8</div>
      </Col>
    </Row>

    <h4>align middle</h4>
    <Row justify="center" align="middle" className=" row-bg">
      <Col span={8}>
        <div className="col col-height-8">col-8</div>
      </Col>
      <Col span={8}>
        <div>col-8</div>
      </Col>
      <Col span={8}>
        <div className="col col-height-10">col-8</div>
      </Col>
    </Row>

    <h4>align bottom</h4>
    <Row justify="center" align="bottom" className=" row-bg">
      <Col span={8}>
        <div className="col col-height-8">col-8</div>
      </Col>
      <Col span={8}>
        <div>col-8</div>
      </Col>
      <Col span={8}>
        <div className="col col-height-10">col-8</div>
      </Col>
    </Row>

    <h4>align stretch</h4>
    <Row justify="center" align="stretch" className=" row-stretch row-bg">
      <Col span={8}>
        <div className="col col-height-8">col-8</div>
      </Col>
      <Col span={8}>
        <div>col-8</div>
      </Col>
      <Col span={8}>
        <div className="col col-height-10">col-8</div>
      </Col>
    </Row>
  </>
, mountNode);
```



## 排序
通过 order 属性，设置 Col 的 顺序。

```jsx
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <Row justify="center" align="top">
    <Col span={8} order={2}>
      <div>col-8 第1个</div>
    </Col>
    <Col span={8} order={1}>
      <div>col-8 第2个</div>
    </Col>
    <Col span={8} order={0}>
      <div>col-8 第3个</div>
    </Col>
  </Row>
, mountNode);
```



## flex
通过 flex 属性，设置 Col 样式。

```jsx
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <>
    <Row gutter={[0, 10]}>
      <Col flex={2}>
        <div>2 / 5</div>
      </Col>
      <Col flex={3}>
        <div>3 / 5</div>
      </Col>
    </Row>
    <Row gutter={[0, 10]}>
      <Col flex="100px">
        <div>100px</div>
      </Col>
      <Col flex="auto">
        <div>Fill Rest</div>
      </Col>
    </Row>
    <Row gutter={[0, 10]}>
      <Col flex="1 1 200px">
        <div>1 1 200px</div>
      </Col>
      <Col flex="0 1 300px">
        <div>0 1 300px</div>
      </Col>
    </Row>
  </>
, mountNode);
```



## API

<h3>Row</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| gutter | number \| [number, number] | 0 | 设置栅格水平间隔，使用数组可同时设置`[水平间隔,垂直间隔]` |
| align | string | 'stretch' | 垂直对齐方式，可选值为 `top`、 `middle`、 `bottom`、 `stretch` |
| justify | string | 'start' | 水平排列方式，可选值为 `start`、`end`、`center`、`space-around`、`space-between` |

<h3>Col</h3>

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| flex | string \| number | - | flex 布局属性 |
| offset | number | - | 栅格左侧的间隔格数 |
| order | number | - | 栅格顺序 |
| pull | number | - | 栅格向左移动格数 |
| push | number | - | 栅格向右移动格数 |
| span | number | - | 栅格占位格数，为 0 时相当于 display: none |
