## Icon 图标

提供了常用的图标。

### 使用方法

基本用法。

:::demo 通过`type`属性设置图标类型
```js
render() {
  return (
    <ul className="icon-list">
      <li>
        <Icon type="arrowleftb" />
        <div className="ui-icon-name">arrowleftb</div>
      </li>
      <li>
        <Icon type="arrowrightb" />
        <div className="ui-icon-name">arrowrightb</div>
      </li>
      <li>
        <Icon type="arrowtop" />
        <div className="ui-icon-name">arrowrightb</div>
      </li>
      <li>
        <Icon type="arrowbottom" />
        <div className="ui-icon-name">arrowrightb</div>
      </li>
      <li>
        <Icon type="right" />
        <div className="ui-icon-name">right</div>
      </li>
      <li>
        <Icon type="close" />
        <div className="ui-icon-name">close</div>
      </li>
      <li>
        <Icon type="check-round-fill" />
        <div className="ui-icon-name">check-round-fill</div>
      </li>
      <li>
        <Icon type="check-round" />
        <div className="ui-icon-name">check-round</div>
      </li>
      <li>
        <Icon type="question-round-fill" />
        <div className="ui-icon-name">question-round-fill</div>
      </li>
      <li>
        <Icon type="question-round" />
        <div className="ui-icon-name">question-round</div>
      </li>
      <li>
        <Icon type="info-round-fill" />
        <div className="ui-icon-name">info-round-fill</div>
      </li>
      <li>
        <Icon type="info-round" />
        <div className="ui-icon-name">info-round</div>
      </li>
      <li>
        <Icon type="arrow-top" />
        <div className="ui-icon-name">arrow-top</div>
      </li>
      <li>
        <Icon type="arrow-bottom" />
        <div className="ui-icon-name">arrow-bottom</div>
      </li>
      <li>
        <Icon type="arrow-left" />
        <div className="ui-icon-name">arrow-left</div>
      </li>
      <li>
        <Icon type="arrow-right" />
        <div className="ui-icon-name">arrow-right</div>
      </li>
      <li>
        <Icon type="close-round-fill" />
        <div className="ui-icon-name">close-round-fill</div>
      </li>
      <li>
        <Icon type="minus" />
        <div className="ui-icon-name">minus</div>
      </li>
      <li>
        <Icon type="warning-round-fill" />
        <div className="ui-icon-name">warning-round-fill</div>
      </li>
      <li>
        <Icon type="download" />
        <div className="ui-icon-name">download</div>
      </li>
      <li>
        <Icon type="warning-round" />
        <div className="ui-icon-name">warning-round</div>
      </li>
      <li>
        <Icon type="date" />
        <div className="ui-icon-name">date</div>
      </li>
      <li>
        <Icon type="close-round" />
        <div className="ui-icon-name">close-round</div>
      </li>
      <li>
        <Icon type="square-check-fill" />
        <div className="ui-icon-name">square-check-fill</div>
      </li>
      <li>
        <Icon type="square-check" />
        <div className="ui-icon-name">square-check</div>
      </li>
      <li>
        <Icon type="wrong" />
        <div className="ui-icon-name">wrong</div>
      </li>
      <li>
        <Icon type="wrong-round-fill" />
        <div className="ui-icon-name">wrong-round-fill</div>
      </li>
      <li>
        <Icon type="wrong-round" />
        <div className="ui-icon-name">wrong-round</div>
      </li>
      <li>
        <Icon type="add-round" />
        <div className="ui-icon-name">add-round</div>
      </li>
      <li>
        <Icon type="add" />
        <div className="ui-icon-name">add</div>
      </li>
      <li>
        <Icon type="add-round-fill" />
        <div className="ui-icon-name">add-round-fill</div>
      </li>
      <li>
        <Icon type="jianhao" />
        <div className="ui-icon-name">jianhao</div>
      </li>
      <li>
        <Icon type="tishifill" />
        <div className="ui-icon-name">tishifill</div>
      </li>
      <li>
        <Icon type="wenhaofill" />
        <div className="ui-icon-name">wenhaofill</div>
      </li>
      <li>
        <Icon type="wenhao" />
        <div className="ui-icon-name">wenhao</div>
      </li>
      <li>
        <Icon type="xuanze" />
        <div className="ui-icon-name">xuanze</div>
      </li>
      <li>
        <Icon type="right-round-fill" />
        <div className="ui-icon-name">right-round-fill</div>
      </li>
      <li>
        <Icon type="right-round" />
        <div className="ui-icon-name">right-round</div>
      </li>
      <li>
        <Icon type="minus-round-fill" />
        <div className="ui-icon-name">minus-round-fill</div>
      </li>
      <li>
        <Icon type="required" />
        <div className="ui-icon-name">required</div>
      </li>
      <li>
        <Icon type="loading" />
        <div className="ui-icon-name">loading</div>
      </li>
      <li>
        <Icon type="download1" />
        <div className="ui-icon-name">download1</div>
      </li>
      <li>
        <Icon type="minus-round" />
        <div className="ui-icon-name">minus-round</div>
      </li>
      <li>
        <Icon type="brush" />
        <div className="ui-icon-name">brush</div>
      </li>
      <li>
        <Icon type="brush_fill" />
        <div className="ui-icon-name">brush_fill</div>
      </li>
      <li>
        <Icon type="camera_fill" />
        <div className="ui-icon-name">camera_fill</div>
      </li>
      <li>
        <Icon type="camera" />
        <div className="ui-icon-name">camera</div>
      </li>
      <li>
        <Icon type="collection_fill" />
        <div className="ui-icon-name">collection_fill</div>
      </li>
      <li>
        <Icon type="collection" />
        <div className="ui-icon-name">collection</div>
      </li>
      <li>
        <Icon type="computer_fill" />
        <div className="ui-icon-name">computer_fill</div>
      </li>
      <li>
        <Icon type="empty" />
        <div className="ui-icon-name">empty</div>
      </li>
      <li>
        <Icon type="empty_fill" />
        <div className="ui-icon-name">empty_fill</div>
      </li>
      <li>
        <Icon type="like_fill" />
        <div className="ui-icon-name">like_fill</div>
      </li>
      <li>
        <Icon type="lock" />
        <div className="ui-icon-name">lock</div>
      </li>
      <li>
        <Icon type="setup_fill" />
        <div className="ui-icon-name">setup_fill</div>
      </li>
      <li>
        <Icon type="setup" />
        <div className="ui-icon-name">setup</div>
      </li>
      <li>
        <Icon type="search" />
        <div className="ui-icon-name">search</div>
      </li>
      <li>
        <Icon type="time-circle" />
        <div className="ui-icon-name">time-circle</div>
      </li>
      <li>
        <Icon type="folder" />
        <div className="ui-icon-name">folder</div>
      </li>
      <li>
        <Icon type="folder-open" />
        <div className="ui-icon-name">folder-open</div>
      </li>
      <li>
        <Icon type="folder-add" />
        <div className="ui-icon-name">folder-add</div>
      </li>
      <li>
        <Icon type="menu" />
        <div className="ui-icon-name">menu</div>
      </li>
      <li>
        <Icon type="stop" />
        <div className="ui-icon-name">stop</div>
      </li>
      <li>
        <Icon type="file-text-fill" />
        <div className="ui-icon-name">file-text-fill</div>
      </li>
      <li>
        <Icon type="folder-add-fill" />
        <div className="ui-icon-name">file-add-fill</div>
      </li>
      <li>
        <Icon type="folder-fill" />
        <div className="ui-icon-name">file-fill</div>
      </li>
      <li>
        <Icon type="folder-open-fill" />
        <div className="ui-icon-name">file-open-fill</div>
      </li>
      <li>
        <Icon type="cloud-fill" />
        <div className="ui-icon-name">cloud-fill</div>
      </li>
      <li>
        <Icon type="like-fill" />
        <div className="ui-icon-name">like-fill</div>
      </li>
      <li>
        <Icon type="unlike-fill" />
        <div className="ui-icon-name">unlike-fill</div>
      </li>
      <li>
        <Icon type="pushpin-fill" />
        <div className="ui-icon-name">pushpin-fill</div>
      </li>
    </ul>
  )
}
```
:::


### 颜色主题

用法。
:::demo 通过`theme`属性设置主题。 或者通过style定制覆盖颜色和字体样式等...
```js
render() {
  return (
    <ul className="icon-list">
      <li>
        <Icon type="like_fill" theme="error" />
        <div className="ui-icon-name">like-fill</div>
      </li>

      <li>
        <Icon type="folder" theme="success" />
        <div className="ui-icon-name">folder</div>
      </li>

      <li>
        <Icon type="info-round" style={{ color: 'green', fontSize: '50px' }} />
        <div className="ui-icon-name">info-round</div>
      </li>
    </ul>
  )
}
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   right,right-round...           |    —     |
| theme     | 主题   | string    |   info,success,warning,error,default |   default   |
| style    | 样式覆盖 | string |  -  |
