import React, { useEffect, useCallback, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import marked from 'marked';
import { useLocation } from 'react-router-dom';
import Prism from 'prismjs';
import Context from '@site/utils/context';
import Demo from './Demo';
import './style.scss';

const withOutConvertPage = ['introduce', 'change-log', 'quick-start'];

export default (props) => {
  const globalContext = useContext(Context);
  const { content, component } = props;
  const renderer = new marked.Renderer();
  const cls = classnames(`${component.key}-page`, 'markdown');
  const components = new Map();
  const nodeList = [];
  const containerRef = useRef();

  const renderDOM = useCallback(() => {
    const divNode = document.createElement('div');
    const h2Node = document.getElementById('api-node');
    divNode.setAttribute('class', 'markdown-demo-wrapper');
    // eslint-disable-next-line
    for (const [id, component] of components) {
      const div = document.getElementById(id);
      divNode.append(div);
      nodeList.push(div);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
    containerRef.current.insertBefore(divNode, h2Node);
  }, [components, containerRef, nodeList]);

  useEffect(() => {
    window.scrollTo(0, 0);
    renderDOM();

    return () => {
      nodeList.forEach((element) => {
        ReactDOM.unmountComponentAtNode(element);
        element.parentNode.removeChild(element);
      });
      nodeList.length = 0;
    };
  }, [nodeList, renderDOM]);

  if (typeof content !== 'string') {
    return <span />;
  }

  // 表格
  renderer.table = (header, body) => {
    return `<div class="grid-container"><table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
  };

  // 代码
  // highlightjs对jsx解析还不完善，自闭合标签会破坏高亮显示，暂未解决。
  // https://github.com/highlightjs/highlight.js/issues/1646
  renderer.code = (code, language) => {
    const highlightCode =
      Object.keys(Prism.languages).indexOf(language) > -1
        ? Prism.highlight(code, Prism.languages[language], language)
        : code;
    return `<pre><code class="language-${language}">${highlightCode}</code></pre>`;
  };

  let html = marked(content, { renderer });
  if (!withOutConvertPage.includes(component.key)) {
    components.clear();
    html = marked(
      content.replace(/##\s?([^]+?)((?=##))/g, (match, p1) => {
        const id = parseInt(Math.random() * 1e9, 10).toString(36);
        components.set(
          id,
          React.createElement(Demo, { ...props, globalContext, location: useLocation() }, p1),
        );
        return `<div id=${id} class="markdown-demo-item"></div>`;
      }),
      { renderer },
    )
      .replace('##', '')
      .replace('API', '<h2 id="api-node" style="margin-top: 50px">API</h2>');
  }

  // eslint-disable-next-line react/no-danger
  return <div ref={containerRef} className={cls} dangerouslySetInnerHTML={{ __html: html }} />;
};
