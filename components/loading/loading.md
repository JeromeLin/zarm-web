# 加载 Loading 

## 基础用法

```jsx
  import { Loading } from 'zarm-web';
  class Demo extends React.Component {
    render() {
      return (
        <div>
          <Loading visible={true}>
            <p>这里是内容</p>
            <p>梅子金黄杏子肥</p>
            <p>麦花雪白菜花稀</p>
          </Loading>
        </div>
      )
    }
  }

ReactDOM.render(<Demo />, mountNode);
```
## 自定义文字

```jsx
  import { Loading } from 'zarm-web';
  class Demo extends React.Component {
    render() {
      return (
        <div>
          <Loading visible={true} text='努力加载中...' size='sm'>
            <p>这里是内容</p>
          </Loading>
        </div>
      )
    }
  }

ReactDOM.render(<Demo />, mountNode);
```

## 不同尺寸

```jsx
  import { Loading } from 'zarm-web';
  class Demo extends React.Component {
    render() {
      return (
        <div>
          <Loading visible={true} size='sm'>
            <p>这里是内容</p>
            <p>梅子金黄杏子肥</p>
            <p>麦花雪白菜花稀</p>
          </Loading>
           <Loading visible={true} size='md'>
            <p>这里是内容</p>
            <p>梅子金黄杏子肥</p>
            <p>麦花雪白菜花稀</p>
          </Loading>
           <Loading visible={true} size='lg'>
            <p>这里是内容</p>
            <p>梅子金黄杏子肥</p>
            <p>麦花雪白菜花稀</p>
          </Loading>
        </div>
      )
    }
  }

ReactDOM.render(<Demo />, mountNode);
```
## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否显示 |
| fullscreen | boolean | false | 是否显示全屏 |
| size | string | 'md' | 设置大小，可选值为 `lg`、`md`、`sm`|
