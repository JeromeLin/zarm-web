## Progress 进度条

用于展示当前进度。

### 基本用法

最简单的用法。

::: demo 通过`percent`属性设置进度。
```js
  render() {
    return (
      <div>
        <Progress percent="30" />
      </div>
    );
  }
```
:::

### 五种主题

可设置不同的主题。

::: demo 通过`theme`属性设置，支持’default', 'info', 'success', 'warning', 'error'。
```js
  render() {
    return (
      <div>
        <Progress percent="30" />
        <Progress percent="30" theme="info" />
        <Progress percent="30" theme="success" />
        <Progress percent="30" theme="warning" />
        <Progress percent="30" theme="error" />
      </div>
    );
  }
```
:::

### 端点形状

可设置端点形状。

::: demo 通过`radius`, `round`属性设置。
```js
  render() {
    return (
      <div>
        <Progress percent="30" size="lg" theme="info"/>
        <Progress percent="30" radius size="lg" theme="info" />
        <Progress percent="30" round size="lg" theme="info" />
      </div>
    );
  }
```
:::

### 不同尺寸

可设置不同尺寸。

::: demo 除默认的大小外，还支持'xl', 'lg', 'sm', 'xs'。
```js
  render() {
    return (
      <div>
        <Progress percent="30" size="xl" theme="info" />
        <Progress percent="30" size="lg" theme="info" />
        <Progress percent="30" theme="info" />
        <Progress percent="30" size="sm" theme="info" />
        <Progress percent="30" size="xs" theme="info" />
      </div>
    );
  }
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| theme | 主题 | string | default/success/warning/info/error | default |
| percent | 进度 | number | — | 0 |
| className | 弹窗类名 | string | — | '' |
| size | 尺寸 | string | xl/lg/sm/xs | - |
| radius | 端点是否圆角 | boolean | — | false |
| round | 端点是否圆形 | boolean | — | false |
