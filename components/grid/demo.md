# Grid 栅格

24 栅格组件

## 基本用法

通过 span 设置宽度占比，默认占 24 格即 100%。

```js
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <div>
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
  </div>,
  mountNode
);
```

## 区块间隔

通过 Row 的 gutter 属性设置 Col 之间的水平间距。如果需要垂直间距，可以写成数组形式 [水平间距, 垂直间距]。

```js
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <div>
    <div className="marginB-20">水平间距</div>
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
    <div className="marginTB-20">水平间距, 垂直间距</div>
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
  </div>,
  mountNode
);
```

## 左间距

通过 offset 属性，设置 Col 的 margin-left。

```js
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <div>
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
  </div>,
  mountNode
);
```

## 左右偏移

通过 push 属性，设置 Col 的 左偏移; 通过 pull 属性，设置 Col 的 右偏移。

```js
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <div>
    <Row>
      <Col span={6} push={18}>
        <div>col-6 push-18</div>
      </Col>
      <Col span={18} pull={6}>
        <div>col-18 pull-6</div>
      </Col>
    </Row>
  </div>,
  mountNode
);
```

## 布局

通过 justify 属性，设置 Col 其在父节点里面的排版方式。

```js
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <div>
    <div className="marginB-20">justify start</div>
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

    <div className="marginTB-20">justify center</div>
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

    <div className="marginTB-20">justify end</div>
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

    <div className="marginTB-20">justify space-between</div>
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

    <div className="marginTB-20">justify space-around</div>
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
  </div>,
  mountNode
);
```

## 垂直对齐

通过 align 属性，设置 Col 的 垂直对齐方式。

```js
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <div>
    <div className="marginB-20">align top</div>
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

    <div className="marginTB-20">align middle</div>
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

    <div className="marginTB-20">align bottom</div>
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

    <div className="marginTB-20">align stretch</div>
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
  </div>,
  mountNode
);
```

## 排序

通过 order 属性，设置 Col 的 顺序。

```js
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <div>
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
  </div>,
  mountNode
);
```

## flex

通过 flex 属性，设置 Col 样式。

```js
import { Row, Col } from 'zarm-web';

ReactDOM.render(
  <div>
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
  </div>,
  mountNode
);
```

## API

<h3>Row Attributes</h3>

| 参数      | 说明       | 类型                      | 可选值                                      | 默认值  |
| --------- | ---------- | ------------------------- | ------------------------------------------- | ------- |
| gutter    | 水平间隔   | number or [number,number] | -                                           | 0       |
| align     | 垂直对齐   | 枚举                      | top middle bottom stretch                   | stretch |
| justify   | 布局方式   | 枚举                      | start end center space-around space-between | start   |
| className | 样式类名   | string                    | -                                           | -       |
| style     | 自定义样式 | object                    | -                                           | -       |

<h3>Col Attributes</h3>

| 参数      | 说明                                      | 类型             | 可选值 | 默认值 |
| --------- | ----------------------------------------- | ---------------- | ------ | ------ |
| flex      | flex 布局属性                             | string or number | -      | -      |
| offset    | 栅格左侧的间隔格数，间隔内不可以有栅格    | number           | 1-24   | -      |
| order     | 栅格顺序                                  | number           | 1-24   | -      |
| pull      | 栅格向左移动格数                          | number           | 1-24   | -      |
| push      | 栅格向右移动格数                          | number           | 1-24   | -      |
| span      | 栅格占位格数，为 0 时相当于 display: none | number           | 0-24   | -      |
| className | 样式类名                                  | string           | -      | -      |
| style     | 自定义样式                                | object           | -      | -      |
