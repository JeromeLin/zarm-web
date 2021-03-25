# Avatar 头像

支持图片或字符展示。

## 基本用法

可指定大小、形状

```jsx
import { Avatar } from 'zarm-web';

ReactDOM.render(
  <>
    <div className="rows">
      <Avatar size="xl">xl</Avatar>
      <Avatar size="lg">lg</Avatar>
      <Avatar>md</Avatar>
      <Avatar size="sm">sm</Avatar>
      <Avatar size="xs">xs</Avatar>
    </div>
    <div className="rows">
      <Avatar shape="square" size="xl">
        xl
      </Avatar>
      <Avatar shape="square" size="lg">
        lg
      </Avatar>
      <Avatar shape="square">md</Avatar>
      <Avatar shape="square" size="sm">
        sm
      </Avatar>
      <Avatar shape="square" size="xs">
        xs
      </Avatar>
    </div>
  </>,
  mountNode,
);
```

## 多种类型

支持两种类型：图片、字符，其中字符型可以自定义图标颜色及背景色，同时也支持 style 自定义字符大小进行覆盖。

```jsx
import { Avatar } from 'zarm-web';

const img = 'https://static.zhongan.com/website/health/zarm/images/icons/state.png';

ReactDOM.render(
  <>
    <Avatar src={img} alt="my avatar" />
    <Avatar style={{ color: 'red', backgroundColor: 'rgb(249, 232, 8)' }}>User</Avatar>
    <Avatar style={{ fontSize: 24 }}>U</Avatar>
  </>,
  mountNode,
);
```

## 自动调整字符大小

对字符型头像的字符大小自适应调整

```jsx
import { Avatar, Button } from 'zarm-web';

const textList = ['Zhong', 'An', 'Component', 'Library', 'Zarm-Web'];
const colorList = ['#48f57b', '#a6e62f', '#ffbf00', '#38ae83', '#34cd83'];

class Demo extends React.Component {
  state = {
    showIndex: 0,
  };

  textListLastIndex = textList.length - 1;

  onChangeTextPlay = () => {
    const { showIndex } = this.state;
    const { textListLastIndex } = this;
    this.setState({
      showIndex: showIndex < textListLastIndex ? showIndex + 1 : 0,
    });
  };

  render() {
    const { showIndex } = this.state;

    return (
      <>
        <Avatar size={'lg'} style={{ backgroundColor: `${colorList[showIndex]}` }}>
          {textList[showIndex]}
        </Avatar>
        <Button onClick={this.onChangeTextPlay} style={{ marginLeft: 15 }}>
          Change
        </Button>
      </>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```

## 带徽标的头像

```jsx
import { Avatar, Badge } from 'zarm-web';

ReactDOM.render(
  <>
    <Badge shape="round" text="5">
      <Avatar shape="square">L</Avatar>
    </Badge>
    <Badge>
      <Avatar shape="square">W</Avatar>
    </Badge>
  </>,
  mountNode,
);
```

## API

| 属性  | 类型   | 默认值   | 说明                                             |
| :---- | :----- | :------- | :----------------------------------------------- |
| shape | string | 'circle' | 头像的形状，可选值为`circle`、`square`           |
| size  | string | 'md'     | 头像的大小, 可选值为`xl`、`lg`、`md`、`sm`、`xs` |
| src   | string | -        | 图片头像的图片地址                               |
| alt   | string | -        | 描述图片的备用文字                               |
