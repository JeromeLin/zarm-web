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

众安科技基于 React 研发的一款适用于企业级的桌面端 UI 组件库。

</div>

[Zarm](https://github.com/ZhongAnTech/zarm) 是其移动端版本的实现。

Zarm 的命名，灵感来源于众安保险秉承的理念：做有温度的保险。Zarm = za + warm，za 代表“众安”，warm 有“温暖”的含义，以重合的 a 字母为中心，各取左右两部分。追求极致的用户体验，致力于做有温度的组件库也是 zarm 项目发起的初衷。

## 安装

### 使用 npm 或 yarn 安装（推荐）

```bash
# npm
npm install zarm-web@alpha --save

# yarn
yarn add zarm-web@alpha
```

### 或者通过 link 和 script 标签分别引入样式文件和 js 脚本文件（不推荐）

```html
<link rel="stylesheet" href="https://unpkg.com/zarm-web@alpha/dist/zarm-web.min.css" />
<script type="text/javascript" src="https://unpkg.com/zarm-web@alpha/dist/zarm-web.min.js"></script>
```

## 使用

### 全组件引入

```js
import { Button, Input } from 'zarm-web';
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
        style: true,  // or 'css'
      }],
    ]
  }
```

```js
import { Button } from 'zarm-web';
```

- 手动引入

```js
import Button from 'zarm-web/lib/button';
import 'zarm-web/lib/button/style/css'; // 加载css
// import 'zarm-web/lib/button/style'; // 加载scss
```

### 定制主题

通过修改 css 变量定义达到定制主题的效果

```js
document.documentElement.style.setProperty('--theme-primary', '#108ee9');
```

变量名可参考 [variable.scss](https://github.com/JeromeLin/zarm-web/blob/dev-zarm-web/components/style/themes/variable.scss)

## 社区

| issue                                                        |
| :----------------------------------------------------------- |
| [github issue](https://github.com/JeromeLin/zarm-web/issues) |

## 开源协议

MIT

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FJeromeLin%2Fzarm-web.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FJeromeLin%2Fzarm-web?ref=badge_large)
