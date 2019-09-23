# 加载 Loading 

## 基础加载

```jsx
  import { Loading } from 'zarm-web';

  ReactDOM.render(
    <Loading visible={true} />,
    mountNode
  );
```

## 自定义文字

```jsx
  import { Loading } from 'zarm-web';

  ReactDOM.render( 
    <Loading visible={true} text='加载中' />,
    mountNode
  );
```

## 自定义加载指示器

```jsx
  import { Loading, Icon, Alert } from 'zarm-web';

  const icon = <Icon type="loading" className="rotate360" />

  ReactDOM.render( 
    <Loading visible={true} indicator={ icon} />,
    mountNode
  );
```


## 卡片加载

```jsx
  import { Loading, Icon, Alert } from 'zarm-web';

  ReactDOM.render( 
    <Loading visible={true} >
      <p>这里是一个卡片</p>
      <p>这里是内容</p>
    </Loading>,
    mountNode
  );
```
## 延时加载
```jsx
  import { Loading } from 'zarm-web';

  class Demo extends React.Component {
    state = {
      visible: true
    }
    toggle = () => {
      this.setState((state) =>({
         visible: !state.visible
      }))
    }

    render() {
      return (
        <div> 
          <Loading visible={this.state.visible} delay={300}>
          </Loading>
      </div>
      )
    }
  }

ReactDOM.render(<Demo />, mountNode)
```

## 不同尺寸

```jsx
  import { Loading } from 'zarm-web';
  class Demo extends React.Component {
    render() {
      return (
        <div>
          <Loading visible={true} size='xs'/>
          <Loading visible={true} size='md' />
          <Loading visible={true} size='lg' />
        </div>
      )
    }
  }

ReactDOM.render(<Demo />, mountNode);
```
## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| size | string | 'md' | 设置大小，可选值为 `lg`、`md`、`xs`|
| delay | number | - | 延迟显示加载效果的时间（防止闪烁） |
| visible | boolean | false | 是否显示 |
| text | string | - | 自定义文案 |
| fullscreen | boolean | false | 是否显示全屏 |
| indicator | ReactNode | - | 自定义活动指示器 |
