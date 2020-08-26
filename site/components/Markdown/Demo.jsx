import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import { Icon } from 'zarm-web';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github-gist.css';
import '@/components/style/entry';

export default ({ lang, children }) => {
  const containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
  const document = children.match(/([^]*)\n?(```[^]+```)/);
  const title = String(document[1]);
  const source = document[2].match(/```(.*)\n?([^]+)```/);
  const containerRef = useRef();
  const [showBlock, setShowBlock] = useState(false);

  const blockControl = () => setShowBlock(!showBlock);

  const locale = lang === 'enUS'
    ? require('zarm-web/locale-provider/locale/en_US')
    : require('zarm-web/locale-provider/locale/zh_CN');

  const renderSource = useCallback((value) => {
    import('@/components').then((Element) => {
      const args = ['context', 'React', 'ReactDOM', 'ZarmWeb'];
      const argv = [this, React, ReactDOM, Element];
      return { args, argv };
    }).then(({ args, argv }) => {
      value = value
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'react';/, 'const { $1 } = React;')
        .replace(/import\s+{\s+(.*)\s+}\s+from\s+'zarm-web';/, 'const { $1 } = ZarmWeb;')
        .replace(/ReactDOM.render\(\s?([^]+?)(,\s?mountNode\s?\))/g, `
          ReactDOM.render(
            <ZarmWeb.LocaleProvider locale={${JSON.stringify(locale.default)}}>
              $1
            </ZarmWeb.LocaleProvider>,
            document.getElementById('${containerId}'),
          )
        `);

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
  }, [containerId, locale.default]);


  useEffect(() => {
    const ele = () => containerRef.current;
    renderSource(source[2]);

    return () => {
      if (ele) {
        ReactDOM.unmountComponentAtNode(ele);
      }
    };
  }, [renderSource, source]);

  return (
    <div className="demo-block">
      {title.split(('\n')).map((item, index) => {
        if (index === 0) return <h2 key={item}>{item}</h2>;
        if (item) return <p key={item}>{item}</p>;
        return null;
      })}
      <div
        ref={containerRef}
        id={containerId}
        className="source"
      />
      <div style={{ display: showBlock ? 'block' : 'none' }}>
        <Highlight>{source[2]}</Highlight>
      </div>
      <div className="demo-block-control" onClick={blockControl}>
        <span>
          {
            showBlock
              ? <><Icon type="arrow-top-fill" />隐藏代码</>
              : <><Icon type="arrow-bottom-fill" />显示代码</>
          }
        </span>
      </div>
    </div>
  );
};
