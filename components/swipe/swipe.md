## Swipe 轮播图
轮播图组件。

### 基础用法

:::demo

```js
  render() {
    return (
      <div>
        <Swipe speed={1000}>
          <div className="ui-swipe-item">
            <div className="ui-swipe-pic">
              <a href="http://www.baidu.com">
                <img src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png" />
              </a>
            </div>
            <div className="ui-swipe-info">
              <div className="ui-swipe-title">百度</div>
            </div>
          </div>
          <div className="ui-swipe-item">
            <div className="ui-swipe-pic">
              <a href="http://www.taobao.com">
                <img src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png" />
              </a>
            </div>
            <div className="ui-swipe-info">
              <div className="ui-swipe-title">淘宝</div>
            </div>
          </div>
          <div className="ui-swipe-item">
            <div className="ui-swipe-pic">
              <a href="http://www.qq.com">
                <img src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png" />
              </a>
            </div>
            <div className="ui-swipe-info">
              <div className="ui-swipe-title">腾讯</div>
            </div>
          </div>
        </Swipe>
      </div>
    )
  }
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| direction     | 轮播方向   | string |   'left', 'right', 'top', 'bottom'   |    'left'    |
| height   | 高度 | number |   -   |    160   |
| activeIndex  | 当前值 | number |   -   |    0   |
| speed  | 移动速度 | number |   -   |    300   |
| autoPlay  | 自动播放 | boolean |   -   |    true   |
| autoPlayIntervalTime  | 自动播放暂停时间 | number |   -   |    3000   |
| moveDistanceRatio  | 滑动距离比 | number |   -   |   0.5   |
| moveTimeSpan  | 滑动释放时间 | number |   -   |   300   |








