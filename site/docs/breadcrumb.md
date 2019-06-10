## Breadcrumb 面包屑

告知用户当前页面在系统中的位置。

### 基本用法

面包屑的基本用法。

::: demo 通过`Breadcrumb.Item`设置层级，如需跳转可添加`href`属性。
```js
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>模块</Breadcrumb.Item>
          <Breadcrumb.Item href="https://t.zhongan.com">应用</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
```
:::

### 自定义分隔符

可以自定义面包屑分隔符。

::: demo 可以通过`separator`属性设置分隔符。
```js
  render() {
    return (
      <div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>模块</Breadcrumb.Item>
          <Breadcrumb.Item href="https://t.zhongan.com">应用</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
```
:::



### Breadcrumb Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| separator | 分隔符 | string | — | '/' |
| className | 类名 | string | — | '' |


### Breadcrumb.Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| href | 跳转链接 | string | — | - |
| className | 类名 | string | — | '' |
