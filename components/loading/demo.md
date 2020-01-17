# Loading 加载



## 基本用法

```jsx
import { Loading } from 'zarm-web';

ReactDOM.render(
  <Loading visible />,
  mountNode,
);
```



## 自定义文字

```jsx
import { Loading } from 'zarm-web';

ReactDOM.render( 
  <Loading visible text="加载中" />,
  mountNode,
);
```



## 自定义加载指示器

```jsx
import { Loading, Icon } from 'zarm-web';

const icon = <Icon type="minus-round" className="rotate360" />

ReactDOM.render( 
  <Loading visible indicator={icon} />,
  mountNode,
);
```



## 卡片加载

```jsx
import { Loading, Icon, Alert } from 'zarm-web';

ReactDOM.render( 
  <Loading visible>
    <div className="loading-container">
      <p>这里是一个容器，这里是一个容器，这里是一个容器，这里是一个容器，这里是一个容器，</p>
      <p>这里是一个容器，这里是一个容器，这里是一个容器，这里是一个容器，</p>
      <p>这里是一个容器</p>
    </div>
  </Loading>,
  mountNode,
);
```



## 延时加载

```jsx
import { Loading, Switch } from 'zarm-web';

class Demo extends React.Component {
  state = {
    loadingState: false,
  };

  toggle = (value) => {
    this.setState(state=> ({
      loadingState: !state.loadingState,
    }));
  };

  render() {
    const { loadingState } = this.state;
    return (
      <div> 
        <Loading visible={loadingState} delay={500} text="加载中">
          <div className="loading-container exp">
            <p>这里是一个容器，这里是一个容器，这里是一个容器，这里是一个容器，这里是一个容器，</p>
            <p>这里是一个容器，这里是一个容器，这里是一个容器，这里是一个容器，</p>
            <p>这里是一个容器</p>
          </div>
        </Loading>
        <p>
          <Switch value={loadingState} onChange={this.toggle} />
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## 不同尺寸

```jsx
import { Loading } from 'zarm-web';

ReactDOM.render(
  <>
    <Loading visible size="sm" />
    <Loading visible size="md" />
    <Loading visible size="lg" />
  </>,
  mountNode,
);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| size | string | 'md' | 设置大小，可选值为 `lg`、`md`、`xs`|
| visible | boolean | false | 是否显示 |
| fullscreen | boolean | false | 是否显示全屏 |
| delay | number | - | 延迟显示加载效果的时间（防止闪烁） |
| text | ReactNode | - | 自定义文案 |
| indicator | ReactNode | - | 自定义活动指示器 |
