import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import { Icon } from 'zarm-web';
import Highlight from 'react-highlight';
import '@/components/style/entry';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
    this.document = props.children.match(/([^]*)\n?(```[^]+```)/);
    this.title = String(this.document[1]);
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
        .replace(/import\s+{\s+(.*)\s+}\s+from\s+'zarm-web';/, 'const { $1 } = ZarmWeb;')
        .replace('mountNode', `document.getElementById('${this.containerId}')`);

      const { code } = transform(value, {
        presets: ['es2015', 'react'],
        plugins: ['proposal-class-properties'],
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
        {this.title.split(('\n')).map((item, index) => {
          if (index === 0) return <h2 key={item}>{item}</h2>;
          if (item) return <p key={item}>{item}</p>;
          return null;
        })}
        <div
          className="source"
          id={this.containerId}
          ref={(elem) => { this.containerElem = elem; }}
        />
        <div style={{ display: showBlock ? 'block' : 'none' }}>
          <Highlight>{this.source[2]}</Highlight>
        </div>
        <div className="demo-block-control" onClick={() => this.blockControl()}>
          {
            showBlock ? (
              <span>
                <Icon type="arrow-top-fill" />隐藏代码
              </span>
            ) : (
              <span>
                <Icon type="arrow-bottom-fill" />显示代码
              </span>
            )
          }
        </div>
      </div>
    );
  }
}
