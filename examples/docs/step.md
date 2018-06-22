## Step 步骤条
滑动型输入器。

### 基础用法

通过`current`属性设置当前步骤。

:::demo

```js
  render() {
    return (
      <div>
        <Step current={3}>
          <Step.Item>投保单基本信息</Step.Item>
          <Step.Item>投保单位录入</Step.Item>
          <Step.Item>产品选择</Step.Item>
          <Step.Item>总单险种定义</Step.Item>
          <Step.Item>计划创建</Step.Item>
          <Step.Item>被保人清单导入</Step.Item>
          <Step.Item>录入完成</Step.Item>
        </Step>
      </div>
    )
  }
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| current     | 当前步骤   | number  |   -            |    1    |

