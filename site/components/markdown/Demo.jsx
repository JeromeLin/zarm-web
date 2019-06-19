import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import { transform } from '@babel/standalone';
import { Icon } from '@/components';
import Editor from '../editor';

export default class Canvas extends React.Component {
  playerElem = null;

  constructor(props) {
    super(props);

    this.playerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
    this.document = props.children.match(/([^]*)\n?(```[^]+```)/);
    this.description = marked(this.document[1]);
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/);

    this.state = {
      showBlock: false,
    };
    this.blockControl = this.blockControl.bind(this);
  }


  componentDidMount() {
    this.renderSource(this.source[2]);
  }

  componentWillUnmount() {
    if (this.playerElem) {
      ReactDOM.unmountComponentAtNode(this.playerElem);
    }
  }

  blockControl() {
    const { showBlock } = this.state;
    this.setState({ showBlock: !showBlock });
  }

  renderSource(value) {
    import('@/components').then((Element) => {
      const args = ['context', 'React', 'ReactDOM', 'DragonUi'];
      const argv = [this, React, ReactDOM, Element];

      return {
        args,
        argv,
      };
    }).then(({ args, argv }) => {
      this.source[2] = value;

      value = value
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'dragon-ui';/, 'const { $1 } = DragonUi;')
        .replace('mountNode', `document.getElementById('${this.playerId}')`);

      const { code } = transform(value, { presets: ['es2015', 'react'] });

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
    const { name } = this.props;
    const { showBlock } = this.state;

    return (
      <div className={`demo-block demo-box demo-${name}`}>
        <div
          className="source"
          id={this.playerId}
          ref={(e) => {
            this.playerElem = e;
          }}
        />
        {
          showBlock && (
            <div className="meta">
              {
                this.description && (
                  <div
                    className="description"
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: this.description }}
                  />
                )
              }
              <Editor
                value={this.source[2]}
                onChange={code => this.renderSource(code)}
              />
            </div>
          )
        }
        <div className="demo-block-control" onClick={this.blockControl}>
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
