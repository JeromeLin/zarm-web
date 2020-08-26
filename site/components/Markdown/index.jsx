import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import marked from 'marked';
import Demo from './Demo';
import './style.scss';

const withOutConvertPage = ['introduce', 'change-log', 'quick-start'];

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.components = new Map();
    this.nodeList = [];
  }

  componentDidMount() {
    this.renderDOM();
  }

  componentWillUnmount() {
    this.nodeList.forEach((element) => {
      ReactDOM.unmountComponentAtNode(element);
      element.parentNode.removeChild(element);
    });
    this.nodeList = [];
  }


  renderDOM() {
    const divNode = document.createElement('div');
    const h2Node = document.getElementById('api-node');
    divNode.setAttribute('class', 'markdown-demo-wrapper');
    // eslint-disable-next-line
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);
      divNode.append(div);
      this.nodeList.push(div);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
    this.markdownCon.insertBefore(divNode, h2Node);
  }

  render() {
    const { document, component } = this.props;
    const renderer = new marked.Renderer();
    const cls = classnames(`${component.key}-page`, 'markdown');

    if (typeof document === 'string') {
      if (!withOutConvertPage.includes(component.key)) {
        this.components.clear();

        // 表格
        renderer.table = (header, body) => {
          return `<div class="grid-container"><table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
        };

        let html = marked(
          document
          // .replace(/## API\s?([^]+)/g, '')
          //   .replace(/##\s*API\s?([^]+)/g, '$1')
          // .replace(/(```\s?jsx([^]+?)```)/g, (match, p1) => {
            .replace(/##\s?([^]+?)((?=##))/g, (match, p1) => {
              const id = parseInt(Math.random() * 1e9, 10).toString(36);
              // console.log(p1)
              this.components.set(id, React.createElement(Demo, { ...this.props }, p1));
              return `<div id=${id} class="markdown-demo-item"></div>`;
            }),
          {
            renderer,
          },
        );

        html = html.replace('##', '').replace('API', '<h2 id="api-node" style="margin-top: 50px">API</h2>');
        // eslint-disable-next-line react/no-danger
        return <div dangerouslySetInnerHTML={{ __html: html }} className={cls} ref={(el) => { this.markdownCon = el; }} />;
      }

      const html = marked(document, { renderer });

      // eslint-disable-next-line react/no-danger
      return <div dangerouslySetInnerHTML={{ __html: html }} className={cls} ref={(el) => { this.markdownCon = el; }} />;
    }

    return <span />;
  }
}
