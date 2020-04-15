# Progress 进度条

`Progress`组件用于进度展示。


## 基本用法

通过`percent`属性设置进度。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(<Progress percent={30} />, mountNode);
```

## 进度文本

进度的文本表示有默认值，但可通过`children`属性重写。

也可以通过`text`属性接受一个format函数，重新格式化进度文本。

```jsx
import { Progress } from 'zarm-web';

const percent = 40;
const percentFormatter = percent => <><strong>{percent}</strong>%</>;
ReactDOM.render(
    <>
    <Progress percent={percent}>
    {percent}
    <small style={{color: "gray"}}>%</small>
    </Progress>
    <Progress percent={percent} text={percentFormatter} />
    </>
, mountNode);
```

## 主题

通过设置主题，调整进度条指示器的颜色。

主题通过`theme`属性设置，可选值为`primary`, `warning`, `danger`。

默认为 `primary`。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={10} theme={'primary'} />
    <Progress percent={70} theme={'warning'} />
    <Progress percent={90} theme={'danger'} />
  </>
, mountNode);
```

## 外观类型

通过设置外观类型，调整进度条外观。

类型通过`shape`属性设置，可选值为`line`, `circle`和`semi-circle`，分别表示直线型、原型、半圆型。

默认值是 `line`，即直线型。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={20} shape={'semi-circle'} />
    <Progress percent={50} shape={'line'} />
    <Progress percent={70} shape={'circle'} />
  </>
, mountNode);
```

## 线条粗细

通过`strokeWidth`属性，可接收一个`数字指定的像素值`。

默认值是8(px)。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={20} />
    <Progress percent={20} strokeWidth={6} />
    <Progress percent={50} shape={'semi-circle'} />
    <Progress percent={50} shape={'semi-circle'} strokeWidth={4} />
    <Progress percent={70} shape={'circle'} />
    <Progress percent={70} shape={'circle'} strokeWidth={4} />
  </>
, mountNode);
```

## 尺寸

通过设置尺寸，调整进度条外观大小。

尺寸通过`size`属性设置，可选值为`lg`、`md`、`sm`，分别表示大型尺寸、标准尺寸、小型尺寸，或者`数字指定的像素值`。

当尺寸选择了值`lg`，`md`，`sm`之一时，线条的粗细会跟着变动，除非明确设定了线条粗细。

尺寸`lg`、`md`、`sm`对应的值可通过css主题修改变量，详见下面**修改样式主题**一节。

尺寸的默认值是 `md`，即标准尺寸。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={30} size={'lg'} />
    <Progress percent={30} size={'lg'} shape={'circle'} />
    <Progress percent={30} size={'lg'} shape={'semi-circle'} />
    <Progress percent={30} size={'lg'} strokeWidth={6} />
    <Progress percent={30} size={'lg'} shape={'circle'} strokeWidth={6} />
    <Progress percent={30} size={'lg'} shape={'semi-circle'} strokeWidth={6} />
    <Progress percent={50} size={'md'} />
    <Progress percent={50} size={'md'} shape={'circle'} />
    <Progress percent={50} size={'md'} shape={'semi-circle'} />
    <Progress percent={70} size={'sm'} />
    <Progress percent={70} size={'sm'} shape={'circle'} />
    <Progress percent={70} size={'sm'} shape={'semi-circle'} />
  </>
, mountNode);
```

## 线条形状

通过设置线条形状，调整线条的折线方式。

线条形状通过`strokeShape`属性设置，可选值为`rect`，`round`，分别表示直角、圆角。

默认值是`round`，即圆角。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={20} strokeShape={'rect'} />
    <Progress percent={20} strokeShape={'round'} />
    <Progress percent={50} strokeShape={'rect'} shape={'semi-circle'} />
    <Progress percent={50} strokeShape={'round'} shape={'semi-circle'} />
    <Progress percent={70} strokeShape={'rect'} shape={'circle'} />
    <Progress percent={70} strokeShape={'round'} shape={'circle'} />
  </>
, mountNode);
```

## 修改样式主题

在使用`Progress`组件时可通过js指定值，也可通过修改样式主题修改值(如果样式相对统一，推荐后者)。

在js中，以`document.documentElement.style.setProperty('--progress-background', '#f7f7f7');`这样的方式修改样式主题值。

`Progress`组件相关主题列表请点开下面代码。

```css
:root {
  // 进度条背景色
  --progress-background: #f2f2f2;
  // 进度条宽度
  // --progress-width-#{size} 仅针对shape: 'line'
  --progress-width-lg: 100%;
  --progress-width-md: 100%;
  --progress-width-sm: 140px;
  // 进度条大小
  // --progress-size-#{size} 同时针对shape: 'semi-circle' | 'circle'
  --progress-size-lg: 200px;
  --progress-size-md: 150px;
  --progress-size-sm: 80px;
  // --progress-weight-#{weight} 已调整为通过js设置(跟随size自动变化)
  //--progress-weight-lg: 10px;
  //--progress-weight-md: 8px;
  //--progress-weight-sm: 4px;
  // 环状进度文本字体同时针对shape: 'circle' 和 'semi-circle'
  --progress-font-size-circle-lg: 30px;
  --progress-font-size-circle-md: 24px;
  --progress-font-size-circle-sm: 18px;
}
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| theme | string | `primary` | 主题，可选值 `primary`, `warning`, `danger` |
| percent | number | 0 | 进度百分值（范围：0～100） |
| shape | string | `line` | 类型，可选值 `line`, `circle`, `semi-circle` |
| size | string, number | `md` | 组件大小，可选值 `lg`, `md`, `sm`，number类型的值，或者任何合法的css宽度值 |
| strokeShape | string | `round` | 线条形状，可选值 `round`, `rect` |
| strokeWidth | number | 8 | 线条粗细 |
| text | (percent: number) => string | `(percent) => percent + '%'` | 进度百分比的格式化函数，children会覆盖它 |
