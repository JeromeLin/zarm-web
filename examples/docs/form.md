## Form 表单
表单组件，用于包裹表单元素组件。

### 基础用法

:::demo 使用`Fomr.Item`包裹`Input`,`Button`等表单元素组件。

```js
  render() {
    return (
      <div>
        <Form>
          <Form.Item label="账号">
            <Input placeholder="请输入..." />
          </Form.Item>
          <Form.Item label="密码">
            <Input placeholder="请输入..." />
          </Form.Item>
          <Form.Item>
            <Button theme="success">登录</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
```
:::

### 行内排列

:::demo 设置`type`属性为`inline`，并给`Form.Item`设置相应的栅格布局类。

```js
  render() {
    return (
      <Form type="inline">
        <Form.Item
          className="col-sm-4"
          label="类型">
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item
          className="col-sm-4"
          label="来源">
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item
          className="col-sm-4"
          label="">
          <Button theme="success">查询</Button>
        </Form.Item>
      </Form>
    )
  }
```
:::

### 帮助提示

:::demo 设置`type`属性为`inline`，并给`Form.Item`设置相应的栅格布局类。

```js
  render() {
    return (
      <Form type="inline">
        <Form.Item
          className="col-sm-6"
          theme="error"
          help="类型不能为空"
          label="类型">
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item
          className="col-sm-6"
          label="来源">
          <Input placeholder="请输入..." />
        </Form.Item>
      </Form>
    )
  }
```
:::

### Form Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string  |   inline/horizontal       |    horizontal    |

### Form.Item Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| theme     | 主题  | string  |   'success', 'warning', 'error', 'validating', 'default'      |    default   |
| required    | 是否必填 | boolean  |   -     |   false  |
| label    | label文案 | string  |   -     |   - |
| labelCol    | label栅格宽度 | string  |   -     |   - |
| controlCol    | 输入组件栅格宽度 | string  |   -     |   - |
| help    | 帮助提示 | string  |   -     |   - |




