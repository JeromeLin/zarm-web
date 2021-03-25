# 快速上手

## 安装

### 使用 npm 或 yarn 安装（推荐）

```bash
# npm
$ npm install zarm-web --save

# yarn
$ yarn add zarm-web
```

### 或者通过 link 和 script 标签分别引入样式文件和 js 脚本文件（不推荐）

```html
<link rel="stylesheet" href="https://unpkg.com/zarm-web/dist/zarm-web.min.css" />
<script type="text/javascript" src="https://unpkg.com/zarm-web/dist/zarm-web.min.js"></script>
```

## 使用

### 全组件引入

```js
import { Button } from 'zarm-web';
import 'zarm-web/dist/zarm-web.min.css';
```

### 按需加载

> 注意：zarm-web 默认支持基于 ES module 的 tree shaking，不使用以下插件也会有按需加载的效果。

- 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 自动加载 Sass 文件（推荐）

```js
// .babelrc or babel-loader option
{
  "plugins": [
    ['import', {
      libraryName: 'zarm-web',
      style: true, // or 'css'
    }],
  ]
}
```

```js
import { Button } from 'zarm-web';
```

- 手动引入

```js
import { Button } from 'zarm-web'; // 加载js
import 'zarm-web/dist/zarm-web.min.css'; // 加载css
```

### 定制主题

通过修改 css 变量定义达到定制主题的效果

```js
document.documentElement.style.setProperty('--theme-primary', '#108ee9');
```

变量名可参考 [variable.scss](https://github.com/JeromeLin/zarm-web/blob/dev-zarm-web/components/style/themes/variable.scss)
