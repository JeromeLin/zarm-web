import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import Demo from './Demo';
import './style.scss';

const withOutConvertPage = ['ChangeLog', 'QuickStart'];

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
    const fg = [0, 1].reduce((prev, item) => {
      const demoWrapper = document.createElement('div');
      demoWrapper.classList.add('demo-wrapper', `demo-wrapper-${item ? 'right' : 'left'}`);
      prev.appendChild(demoWrapper);
      return prev;
    }, document.createDocumentFragment());

    let index = 0;
    // eslint-disable-next-line
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);
      if ((index & 1) === 0) {
        fg.children[0].appendChild(div);
      } else {
        fg.children[1].appendChild(div);
      }
      // divNode.append(div);
      this.nodeList.push(div);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
      index++;
    }

    const header = document.createElement('h2');
    header.innerText = '代码演示';
    header.classList.add('demo-wrapper-header');
    fg.prepend(header);
    if (h2Node) {
      h2Node.parentNode.insertBefore(fg, h2Node);
    } else {
      this.markdownCon.appendChild(fg);
    }
  }

  render() {
    const { document, name } = this.props;
    const renderer = new marked.Renderer();

    if (typeof document === 'string') {
      if (!withOutConvertPage.includes(name)) {
        this.components.clear();

        renderer.table = (header, body) => {
          return `<table class="grid" id="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
        };

        const documentString = document
          // .replace(/## API\s?([^]+)/g, '')
          //   .replace(/##\s*API\s?([^]+)/g, '$1')
          // .replace(/(```\s?jsx([^]+?)```)/g, (match, p1) => {
          .replace(/#+\s[\s\S]+?(?=\n#|\n$)/g, (p1) => {
            const id = parseInt(Math.random() * 1e9, 10).toString(36);
            if (p1.match(/```jsx?[\s\S]+```/)) {
              this.components.set(id, React.createElement(Demo, {
                ...this.props,
                renderTitle: (str) => {
                  return marked(str);
                },
              }, p1));
              return `<div id="${id}" class="markdown-demo-item"></div>`;
            }
            return `\n${p1}`;
          });

        let html = documentString.replace('## API', '<h2 id="api-node" style="margin-top: 50px">API</h2>');
        html = marked(documentString, { renderer });
        // eslint-disable-next-line react/no-danger
        return <div dangerouslySetInnerHTML={{ __html: html }} className="markdown-outer" ref={(el) => { this.markdownCon = el; }} />;
      }

      const html = marked(document, { renderer });

      // eslint-disable-next-line react/no-danger
      return <div dangerouslySetInnerHTML={{ __html: html }} className="markdown-outer" ref={(el) => { this.markdownCon = el; }} />;
    }

    return <span />;
  }
}
