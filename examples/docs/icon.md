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
        <Icon type="arrow-left-fill" />
        <div className="ui-icon-name">arrow-left-fill</div>
      </li>
      <li>
        <Icon type="arrow-right-fill" />
        <div className="ui-icon-name">arrow-right-fill</div>
      </li>
      <li>
        <Icon type="arrow-top-fill" />
        <div className="ui-icon-name">arrow-top-fill</div>
      </li>
      <li>
        <Icon type="arrow-bottom-fill" />
        <div className="ui-icon-name">arrow-bottom-fill</div>
      </li>
      <li>
        <Icon type="right" />
        <div className="ui-icon-name">right</div>
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
        <Icon type="warning-round" />
        <div className="ui-icon-name">warning-round</div>
      </li>
      <li>
        <Icon type="warning-round-fill" />
        <div className="ui-icon-name">warning-round-fill</div>
      </li>
      <li>
        <Icon type="date" />
        <div className="ui-icon-name">date</div>
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
        <Icon type="minus" />
        <div className="ui-icon-name">minus</div>
      </li>
      <li>
        <Icon type="minus-round" />
        <div className="ui-icon-name">minus-round</div>
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
        <Icon type="brush" />
        <div className="ui-icon-name">brush</div>
      </li>
      <li>
        <Icon type="brush-fill" />
        <div className="ui-icon-name">brush-fill</div>
      </li>
      <li>
        <Icon type="empty" />
        <div className="ui-icon-name">empty</div>
      </li>
      <li>
        <Icon type="empty-fill" />
        <div className="ui-icon-name">empty-fill</div>
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
        <Icon type="user" />
        <div className="ui-icon-name">user</div>
      </li>
      <li>
        <Icon type="user-fill" />
        <div className="ui-icon-name">user-fill</div>
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
        <Icon type="folder-fill" theme="error" />
        <div className="ui-icon-name">folder-fill</div>
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
