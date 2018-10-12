## Upload 上传
文件上传组件。

### 基础用法
点击上传。

:::demo 默认自动上传。

```js
  render() {
    return (
      <div>
        <Upload
          style={{marginBottom: 10}}
          multiple
          fileExt=".gif, .jpg, .png"
          url="/upload"
          data={{
            attachmentType: 2,
            policyCategory: 1,
            objectId: '20040006',
            remark: null
          }}
          onSelect={ file => {
            console.log(file)
          }}
          onComplete={(file, res) => {
            console.log(res);
          }}>
          <Button radius>选择文件并上传</Button>
        </Upload>
      </div>
    )
  }
```
:::

### 自定义上传操作

:::demo 设置`autoUpload`为false，通过`startUpload`属性控制上传时间点

```js
  constructor(props) {
    super(props);
    this.state = {
      startUpload: false
    };
  }
  render() {
    const { startUpload } = this.state;
    return (
      <div>
        <Upload
          style={{marginBottom: 10}}
          multiple
          autoUpload={false}
          startUpload={startUpload}
          fileExt=".gif, .jpg, .png"
          url="/upload"
          data={{
            attachmentType: 2,
            policyCategory: 1,
            objectId: '20040006',
            remark: null
          }}
          onSelect={ file => {
            console.log(file)
          }}
          onComplete={(file, res) => {
            console.log(res);
          }}>
          <Button radius>选择文件</Button>
          <Button radius onClick={() => {
            this.setState({
              startUpload: true
            });
          }}>上传</Button>
        </Upload>
      </div>
    )
  }
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url   | 上传接口url | string |   -  |    -  |
| fileName   | 上传文件字段名 |string |   -  |    files  |
| data   | 需要额外上传的参数 | object |   -  |    {}  |
| startUpload   | 开始上传 | boolean |   -  |    false  |
| autoUpload   | 是否自动上传 | boolean |   -  |    true  |

### Tab.Group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onSelect | 选择文件后触发的事件 |  files |
| onComplete | 上传完成后触发的事件 |  (files, response) |
| onError | 上传失败后触发的事件 |  - |