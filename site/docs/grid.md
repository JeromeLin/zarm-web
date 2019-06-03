## Grid 栅格

### 基础用法

:::demo

```js
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
      </React.Fragment>
    )
  }
```
:::

### 设置栅格间隙gutter

:::demo

```js
  render() {
    return (
      <Row gutter="16">
        <Col span={8}><div className="grid-box">col-8</div></Col>
        <Col span={8}><div className="grid-box">col-8</div></Col>
        <Col span={8}><div className="grid-box">col-8</div></Col>
      </Row>
    )
  }
```
:::

### 设置栅格偏移

:::demo offset为偏移数量

```js
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={4} offset={3}>1</Col>
          <Col span={4} offset={2}>2</Col>
        </Row>
        <Row>
          <Col span={4} offset={16}>3</Col>
          <Col span={4}>4</Col>
        </Row>
      </React.Fragment>
    )
  }
```
:::

### flex布局方式的栅格

justify设置横轴对齐方式 align设置纵轴对齐方式

:::demo type设置布局方式

```js
  render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="start">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>
        <Row type="flex" justify="end">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col>
        </Row>
        <Row type="flex" justify="center" align="top">
          <Col span={4}><p className="height-100">col-4</p></Col>
          <Col span={4}><p className="height-50">col-4</p></Col>
          <Col span={4}><p className="height-120">col-4</p></Col>
          <Col span={4}><p className="height-80">col-4</p></Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={4}><p className="height-100">col-4</p></Col>
          <Col span={4}><p className="height-50">col-4</p></Col>
          <Col span={4}><p className="height-120">col-4</p></Col>
          <Col span={4}><p className="height-80">col-4</p></Col>
        </Row>
        <Row type="flex" justify="space-between" align="bottom">
          <Col span={4}><p className="height-100">col-4</p></Col>
          <Col span={4}><p className="height-50">col-4</p></Col>
          <Col span={4}><p className="height-120">col-4</p></Col>
          <Col span={4}><p className="height-80">col-4</p></Col>
        </Row>
      </React.Fragment>
    )
  }
```
:::

### Flex 排序

通过 Flex 布局的 Order 来改变元素的排序。

:::demo

```js
  render() {
    return (
      <Row type="flex">
        <Col span={6} order={4}>1 col-order-4</Col>
        <Col span={6} order={3}>2 col-order-3</Col>
        <Col span={6} order={2}>3 col-order-2</Col>
        <Col span={6} order={1}>4 col-order-1</Col>
      </Row>
    )
  }
```
:::

### 响应式布局

:::demo 预设四个响应尺寸：xs sm md lg

```js
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={2} sm={4} md={6} lg={8}>Col</Col>
          <Col xs={20} sm={16} md={12} lg={8}>Col</Col>
          <Col xs={2} sm={4} md={6} lg={8}>Col</Col>
        </Row>
      </React.Fragment>
    )
  }
```
:::

### Row Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| justify     | 横轴对齐方式   | start/end/center/space-between/space-around    | — | -   |
| align     | 纵轴对齐方式   | top/middle/bottom    | — | middle   |
| gutter  | 间隔    | string/number   | -  | 0   |
| type  | 布局模式，可选 flex，现代浏览器下有效    | string   | -  | -   |

### Col Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| offset | 栅格左侧的间隔格数，间隔内不可以有栅格 | number | - | 0 | 
| order | 栅格顺序，flex 布局模式下有效 | number | - | 0 | 
| pull | 栅格向左移动格数 | number | - | 0 | 
| push | 栅格向右移动格数 | number | - | 0 | 
| span | 栅格占位格数 | number | - | 0 | 
| xs | 响应式栅格 | number | - | - | 
| sm | 响应式栅格 | number | - | - | 
| md | 响应式栅格 | number | - | - | 
| lg | 响应式栅格 | number | - | - | 
