# Modal

---

模态对话框。

## 何时使用

- 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。
- 另外，结合Modal.Header、Modal.Body、Modal.Footer使用可以设置模态框的各个组成部分。

## API

| 参数        | 说明                                                      | 类型        | 默认值 |
|----------- |---------------------------------------------------------  | ---------- |-------|
| type       | 必选参数，指定警告提示的样式，有四种选择`success`、`info`、`warn`、`error`   | String     | 无    |
| closable   | 可选参数，默认不显示关闭按钮                                  | Boolean   | 无    |
| closeText  | 可选参数，自定义关闭按钮                                     | String     | 无    |
| message    | 必选参数，警告提示内容                                       | String     | 无    |
| description | 可选参数，警告提示的辅助性文字介绍                            | String     | 无    |
| onClose     | 可选参数，关闭时触发的回调函数                                | Function   | 无    |
| showIcon   | 可选参数，是否显示辅助图标                                 | Boolean   | false    |
