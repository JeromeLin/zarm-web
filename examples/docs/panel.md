## Panel 面板
用于结构化展示信息。

### 基础用法

:::demo

```js
  render() {
    return (
      <div>
        <Panel>
          <Panel.Header>
            <Panel.Title>头部左侧</Panel.Title>
            <Panel.More>
              头部右侧
            </Panel.More>
          </Panel.Header>
          <Panel.Body>
            React is the entry point to the React library. If you load React from a script tag, these top-level APIs are available on the React global. If you use ES6 with npm, you can write import React from 'react'. If you use ES5 with npm, you can write var React = require('react').
            React is the entry point to the React library. If you load React from a script tag, these top-level APIs are available on the React global. If you use ES6 with npm, you can write import React from 'react'. If you use ES5 with npm, you can write var React = require('react').
            React is the entry point to the React library. If you load React from a script tag, these top-level APIs are available on the React global. If you use ES6 with npm, you can write import React from 'react'. If you use ES5 with npm, you can write var React = require('react').
          </Panel.Body>
          <Panel.Footer>
            <Panel.Title>底部左侧</Panel.Title>
            <Panel.More>
              底部右侧
            </Panel.More>
          </Panel.Footer>
        </Panel>
      </div>
    )
  }
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| radius    | 是否圆角 | boolean |   -  |    -  |
| theme   | 主题 | string |   defualt,info,success,warning,error  |   default  |