import React, { useEffect, useCallback, createRef } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import marked from 'marked';
import Demo from './Demo';
import './style.scss';

const withOutConvertPage = ['introduce', 'change-log', 'quick-start'];

export default (props) => {
  const { content, component } = props;
  const renderer = new marked.Renderer();
  const cls = classnames(`${component.key}-page`, 'markdown');
  const components = new Map();
  const nodeList = [];
  const markdownCon = createRef();

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
    markdownCon.current.insertBefore(divNode, h2Node);
  }, [components, markdownCon, nodeList]);

  useEffect(() => {
    renderDOM();
    window.scrollTo(0, 0);

    return () => {
      nodeList.forEach((element) => {
        ReactDOM.unmountComponentAtNode(element);
        element.parentNode.removeChild(element);
      });
      nodeList.length = 0;
    };
  }, [nodeList, renderDOM]);

  if (typeof content === 'string') {
    if (!withOutConvertPage.includes(component.key)) {
      components.clear();

      // 表格
      renderer.table = (header, body) => {
        return `<div class="grid-container"><table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
      };

      let html = marked(
        content
        // .replace(/## API\s?([^]+)/g, '')
        //   .replace(/##\s*API\s?([^]+)/g, '$1')
        // .replace(/(```\s?jsx([^]+?)```)/g, (match, p1) => {
          .replace(/##\s?([^]+?)((?=##))/g, (match, p1) => {
            const id = parseInt(Math.random() * 1e9, 10).toString(36);
            // console.log(p1)
            components.set(id, React.createElement(Demo, { ...props }, p1));
            return `<div id=${id} class="markdown-demo-item"></div>`;
          }),
        {
          renderer,
        },
      );

      html = html.replace('##', '').replace('API', '<h2 id="api-node" style="margin-top: 50px">API</h2>');
      // eslint-disable-next-line react/no-danger
      return <div dangerouslySetInnerHTML={{ __html: html }} className={cls} ref={markdownCon} />;
    }

    const html = marked(content, { renderer });

    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{ __html: html }} className={cls} ref={markdownCon} />;
  }

  return <span />;
};
