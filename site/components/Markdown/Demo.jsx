import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import { Icon } from 'zarm-web';
import Editor from '../Editor';
import '@/components/style/entry';

export default class Canvas extends React.Component {
  constructor(props) {
    console.log(props.children);
    super(props);
    this.containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
    this.document = props.children.match(/([^]*)\n?(```[^]+```)/);
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/);
    this.state = {
      showBlock: false,
    };
    this.containerElem = null;
  }

  componentDidMount() {
    this.renderSource(this.source[2]);
  }

  componentWillUnmount() {
    if (this.containerElem) {
      ReactDOM.unmountComponentAtNode(this.containerElem);
    }
  }

  blockControl() {
    const { showBlock } = this.state;
    this.setState({ showBlock: !showBlock });
  }

  renderSource(value) {
    import('@/components').then((Element) => {
      const args = ['context', 'React', 'ReactDOM', 'ZarmWeb'];
      const argv = [this, React, ReactDOM, Element];
      return { args, argv };
    }).then(({ args, argv }) => {
      value = value
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'zarm-web';/, 'const { $1 } = ZarmWeb;')
        .replace('mountNode', `document.getElementById('${this.containerId}')`);

      const { code } = transform(value, {
        presets: ['es2015', 'react'],
      });

      args.push(code);
      // eslint-disable-next-line
      new Function(...args)(...argv);
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    });
  }

  render() {
    const { className } = this.props;
    const { showBlock } = this.state;

    return (
      <div className={`demo-block demo-box ${className}`}>
        <div
          className="source"
          id={this.containerId}
          ref={(elem) => { this.containerElem = elem; }}
        />
        {
          showBlock && (
            <div className="meta">
              <Editor
                value={this.source[2]}
                onChange={code => this.renderSource(code)}
              />
            </div>
          )
        }
        <div className="demo-block-control" onClick={() => this.blockControl()}>
          {
            showBlock ? (
              <span>
                <Icon type="arrow-top-fill" />隐藏
              </span>
            ) : (
              <span>
                <Icon type="arrow-bottom-fill" />展开
              </span>
            )
          }
        </div>
      </div>
    );
  }
}
