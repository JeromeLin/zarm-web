# dragon-ui
  基于React的UI组件库。

### Install 安装
```bash
npm install dragon-ui --save
```

### Usage 使用

* 全组件引入

```js
import { Button, Cell } from 'dragon-ui';
import 'dragon-ui/dist/dragon-ui.min.css';
```

* 按需引入

方法一
> 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 自动加载Sass文件

```js
  // .babelrc or babel-loader option
  {
    "plugins": [
      ['import', {
        libraryName: 'dragon-ui',
        style: true,
      }],
    ]
  }
```
```js
import { Button, Cell } from 'dragon-ui';
```

方法二

```js
import Button from 'dragon-ui/lib/Button';
import 'dragon-ui/lib/Button/style';
```

### Examples & Docs 示例和文档
[中文](https://jeromelin.github.io/dragon-ui)

### License
MIT
