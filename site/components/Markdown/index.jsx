import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import prism from 'prismjs';
import Demo from './Demo';

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
    // eslint-disable-next-line
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);
      this.nodeList.push(div);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
    prism.highlightAll();
  }

  render() {
    const { document } = this.props;

    if (typeof document === 'string') {
      this.components.clear();

      const renderer = new marked.Renderer();
      renderer.table = (header, body) => {
        return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
      };
      const html = marked(
        document
          .replace(/(```\s?(jsx|js|ts|tsx)([^]+?)```)/g, (match, p1) => {
            const id = parseInt(Math.random() * 1e9, 10).toString(36);
            this.components.set(id, React.createElement(Demo, this.props, p1));
            return `<div id=${id}></div>`;
          }),
        {
          renderer,
        },
      );

      return (
        // eslint-disable-next-line
        <div dangerouslySetInnerHTML={{ __html: html }} />
      );
    }

    return <span />;
  }
}
