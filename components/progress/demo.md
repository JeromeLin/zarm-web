# Progress 进度条

`Progress` 组件用于进度展示。

## 基本用法

通过 `percent` 属性设置进度。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={30} />
    <Progress percent={50} />
    <Progress
      percent={50}
      text={(percent) => <span style={{ whiteSpace: 'nowrap' }}>进度为 {percent}%</span>}
    />
  </>,
  mountNode,
);
```

## 动态展示

动态变化的进度百分比。

```jsx
import { useState } from 'react';
import { Progress, Button, Icon } from 'zarm-web';

const Demo = () => {
  const [percent, setPercent] = useState(0);

  const declinePercent = () => {
    const newPercent = percent - 10 < 0 ? 0 : percent - 10;
    setPercent(newPercent);
  };

  const increasePercent = () => {
    const newPercent = percent + 10 > 100 ? 100 : percent + 10;
    setPercent(newPercent);
  };

  const theme = percent < 80 ? 'warning' : 'success';

  return (
    <>
      <div className="rows" style={{ width: '100%' }}>
        <Progress percent={percent} theme={theme} />
      </div>
      <div className="rows">
        <Button.Group>
          <Button onClick={declinePercent}>
            <Icon type="minus" />
          </Button>
          <Button onClick={increasePercent}>
            <Icon type="add" />
          </Button>
        </Button.Group>
      </div>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

## 多主题

通过设置主题，调整进度条指示器的颜色。
主题通过`theme`属性设置，可选值为`primary`, `warning`, `danger`。
默认为 `primary`。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={40} theme="primary" />
    <Progress percent={40} theme="warning" />
    <Progress percent={40} theme="danger" />
  </>,
  mountNode,
);
```

## 外观类型

通过设置外观类型，调整进度条外观。
类型通过`shape`属性设置，可选值为`line`, `circle`和`semi-circle`，分别表示直线型、原型、半圆型。
默认值是 `line`，即直线型。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={40} shape="line" />
    <Progress percent={40} shape="semi-circle" />
    <Progress percent={40} shape="circle" />
  </>,
  mountNode,
);
```

## 线条粗细

通过 `strokeWidth` 属性，可接收一个数字指定的像素值。
默认值是根据进度条尺寸自动调整。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={40} />
    <Progress percent={40} strokeWidth={4} />
  </>,
  mountNode,
);
```

## 尺寸大小

通过设置尺寸，调整进度条外观大小。
尺寸通过 `size` 属性设置，可选值为 `lg`、`md`、`sm`，分别表示大型尺寸、标准尺寸、小型尺寸，或者 `数字指定的像素值`。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={40} size="sm" />
    <Progress percent={40} size="md" />
    <Progress percent={40} size="lg" />
  </>,
  mountNode,
);
```

## 线条形状

通过设置线条形状，调整线条的折线方式。
线条形状通过 `strokeShape` 属性设置，可选值为 `rect`，`round`，分别表示直角、圆角。
默认值是 `round`，即圆角。

```jsx
import { Progress } from 'zarm-web';

ReactDOM.render(
  <>
    <Progress percent={40} strokeShape="rect" />
    <Progress percent={40} strokeShape="round" />
  </>,
  mountNode,
);
```

## API

| 属性        | 类型                         | 默认值                        | 说明                                                                          |
| :---------- | :--------------------------- | :---------------------------- | :---------------------------------------------------------------------------- |
| theme       | string                       | 'primary'                     | 主题，可选值 `primary`, `warning`, `danger`                                   |
| percent     | number                       | 0                             | 进度百分比值（范围：0 ～ 100）                                                |
| shape       | string                       | 'line'                        | 类型，可选值 `line`, `circle`, `semi-circle`                                  |
| size        | string \| number             | 'md'                          | 尺寸大小，可选值 `lg`, `md`, `sm`，number 类型的值，或者任何合法的 css 宽度值 |
| strokeShape | string                       | 'round'                       | 线条形状，可选值 `round`, `rect`                                              |
| strokeWidth | number                       | 8                             | 线条粗细                                                                      |
| text        | (percent?: number) => string | (percent) => \`\${percent}%\` | 文本信息显示                                                                  |
