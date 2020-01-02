<p align="center">
  <a href="https://zarm-web.netlify.com">
    <img width="200" src="https://zarm.design/images/logo.732d9561.svg">
  </a>
</p>

<h1 align="center">Zarm-Web</h1>

<div align="center">

  [![Build Status](https://www.travis-ci.org/JeromeLin/zarm-web.svg?branch=dev-zarm-web)](https://www.travis-ci.org/JeromeLin/zarm-web)
  [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJeromeLin%2Fzarm-web.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FJeromeLin%2Fzarm-web?ref=badge_shield)
  [![Coverage Status](https://img.shields.io/coveralls/JeromeLin/zarm-web/master.svg)](https://coveralls.io/github/JeromeLin/zarm-web?branch=master)
  [![npm package](https://img.shields.io/npm/v/zarm-web/alpha.svg)](https://www.npmjs.org/package/zarm-web)<!-- [![](https://badgen.net/npm/v/zarm-web/next)](https://www.npmjs.com/package/zarm-web)  -->
  [![NPM downloads](https://img.shields.io/npm/dm/zarm-web.svg)](https://npmjs.org/package/zarm-web) 
  ![JS gzip size](https://img.badgesize.io/https://unpkg.com/zarm-web@latest/dist/zarm-web.min.js?compression=gzip&label=gzip%20size:%20JS)
  ![CSS gzip size](https://img.badgesize.io/https://unpkg.com/zarm-web@latest/dist/zarm-web.min.css?compression=gzip&label=gzip%20size:%20CSS)
  [![Netlify Status](https://api.netlify.com/api/v1/badges/45fb5b8b-392a-4a4a-8731-fb3a4cc6d14c/deploy-status)](https://app.netlify.com/sites/zarm-web/deploys)

  众安科技桌面端UI组件库，基于React。
</div>

## Version 版本

- 历史版本：[![npm package](https://img.shields.io/npm/v/dragon-ui.svg)](https://www.npmjs.org/package/dragon-ui)
- 开发版本：[![npm package](https://img.shields.io/npm/v/zarm-web/alpha.svg)](https://www.npmjs.org/package/zarm-web)


## Install 安装


使用npm安装：
```bash
npm install zarm-web --save
```

或者通过cdn引入umd模块：
```html
<link rel="stylesheet" href="https://unpkg.com/zarm-web@alpha/dist/zarm-web.min.css">
<script type="text/javascript" src="https://unpkg.com/zarm-web@alpha/dist/zarm-web.min.js"></script>
```

## Usage 使用

### 全组件引入

```js
import { Button, Cell } from 'zarm-web';
import 'zarm-web/dist/zarm-web.min.css';
```

### 按需加载

- 方法一（推荐）

> 使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 自动加载Sass文件

```js
  // .babelrc or babel-loader option
  {
    "plugins": [
      ['import', {
        libraryName: 'zarm-web',
        style: true,
      }],
    ]
  }
```

```js
import { Button, Cell } from 'zarm-web';
```

- 方法二：

```js
import Button from 'zarm-web/lib/button';
import 'zarm-web/lib/button/style';
```

### 定制主题

通过修改css变量定义达到定制主题的效果

```js
document.documentElement.style.setProperty('--theme-primary', '#108ee9');
```

变量名可参考 [variable.scss](https://github.com/JeromeLin/zarm-web/blob/dev-zarm-web/components/style/themes/variable.scss)

## Changelog 更新日志

[CHANGELOG.md](https://github.com/JeromeLin/zarm-web/blob/dev-zarm-web/CHANGELOG.md)

## License

MIT


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJeromeLin%2Fzarm-web.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FJeromeLin%2Fzarm-web?ref=badge_large)