# Modal

模态对话框。

## 何时使用

- 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个悬浮层，承载相应的操作。
- 另外，结合`Modal.Header` `Modal.Body` `Modal.Footer`使用可以设置模态框的各个组成部分。

## API

| 参数               | 必选 | 说明                                            | 类型     | 默认值 |
|-------------------|-----|------------------------------------------------|----------|-------|
| visible           | 否 | 对话框是否可见                                     | Boolean     | false    |
| animationType     | 否 | 动画效果，可选项为`zoom` `fade` `door` `flip`<br/>`rotate` `moveUp` `moveDown` `moveLeft` `moveRight`<br/>`slideUp` `slideDown` `slideLeft` `slideRight`  | String   | zoom    |
| animationDuration | 否 | 动画执行时长，单位：ms                              | Number              | 300    |
| width             | 否 | 对话框宽度，可以为String类型的百分比格式               | Number or String    | 600    |
| minWidth          | 否 | 对话框最小宽度                                     | Number              | 270    |
| isRadius          | 否 | 是否圆角                                          | Boolean             | false  |
| isRound           | 否 | 是否椭圆角                                        | Boolean             | false  |
| onMaskClick       | 否 | 点击遮罩层的触发的事件                               | Function            | 无     |

### Modal.Header

| 参数               | 必选 | 说明                                            | 类型     | 默认值 |
|-------------------|-----|------------------------------------------------|----------|-------|
| title             | 否 | 标题栏文字                                        | String     | 无    |
| onClose           | 否 | 右侧显示关闭按钮，触发的事件                          | Function   | 无    |

### Modal.Body

| 参数               | 必选 | 说明                                            | 类型     | 默认值 |
|-------------------|-----|------------------------------------------------|----------|-------|
| height            | 否 | 对话框内容区域的高度，可以为String类型的百分比格式  | Number or String    | 无    |

### Modal.Footer
