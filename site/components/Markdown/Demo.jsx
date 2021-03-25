import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import Prism from 'prismjs';
import { Icon } from 'zarm-web';
import enUS from 'zarm-web/config-provider/locale/en_US';
import zhCN from 'zarm-web/config-provider/locale/zh_CN';
import '@/components/style/entry';

export default ({ location, globalContext, children }) => {
  const containerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
  const document = children.match(/([^]*)\n?(```[^]+```)/);
  const title = String(document[1]);
  const source = document[2].match(/```(.*)\n?([^]+)```/);
  const containerRef = useRef();
  const [showBlock, setShowBlock] = useState(false);

  const renderSource = useCallback(() => {
    const locale = {
      en_US: enUS,
      zh_CN: zhCN,
    };

    import('@/components')
      .then((Element) => {
        const args = ['context', 'React', 'ReactDOM', 'ZarmWeb', 'GlobalContext', 'Locale'];
        const argv = [this, React, ReactDOM, Element, globalContext, locale];
        return { args, argv };
      })
      .then(({ args, argv }) => {
        const lang = globalContext.locale === 'enUS' ? enUS : zhCN;
        const value = source[2]
          .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'react';/, 'const { $1 } = React;')
          .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'zarm-web';/, 'const { $1 } = ZarmWeb;')
          .replace(
            /import\s+(.*)\s+from\s+'zarm-web\/config-provider\/locale\/(.*)';/g,
            "const $1 = Locale['$2'];",
          )
          // 替换格式
          // ReactDOM.render(<Demo />, mountNode);
          .replace(
            /ReactDOM.render\(\s?([^]+?)(,\s?mountNode\s?\))/g,
            `ReactDOM.render(
              <ZarmWeb.ConfigProvider locale={${JSON.stringify(lang)}}>
                $1
              </ZarmWeb.ConfigProvider>, document.getElementById('${containerId}'))`,
          )
          // 替换格式
          // ReactDOM.render(
          //   <>
          //     <Button>default</Button>
          //     <Button theme="primary">primary</Button>
          //   </>,
          //   mountNode,
          // );
          .replace(
            /ReactDOM.render\(\s?([^]+?)(,([\r\n])(\s)*mountNode,\s?\))/g,
            `ReactDOM.render(
              <ZarmWeb.ConfigProvider locale={${JSON.stringify(lang)}}>
                $1
              </ZarmWeb.ConfigProvider>, document.getElementById('${containerId}'))`,
          );

        const { code } = transform(value, {
          presets: ['es2015', 'react'],
          plugins: ['proposal-class-properties'],
        });

        args.push(code);
        // eslint-disable-next-line
        new Function(...args)(...argv);
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          throw err;
        }
      });
  }, [containerId, source]);

  useEffect(() => {
    const container = containerRef.current;
    renderSource();

    return function cleanup() {
      container && ReactDOM.unmountComponentAtNode(container);
    };
  }, [renderSource]);

  const highlightCode =
    Object.keys(Prism.languages).indexOf(source[1]) > -1
      ? Prism.highlight(source[2], Prism.languages[source[1]], source[1])
      : source[2];

  return (
    <div className="demo-block">
      {title.split('\n').map((item, index) => {
        if (index === 0) return <h2 key={item}>{item}</h2>;
        if (item) return <p key={item}>{item}</p>;
        return null;
      })}
      <div ref={containerRef} id={containerId} className="source" />
      <div style={{ display: showBlock ? 'block' : 'none' }}>
        <pre>
          <code
            className={`language-${source[1]}`}
            dangerouslySetInnerHTML={{ __html: highlightCode }}
          />
        </pre>
      </div>
      <div className="demo-block-control" onClick={() => setShowBlock(!showBlock)}>
        <span>
          {showBlock ? (
            <>
              <Icon type="arrow-top-fill" />
              隐藏代码
            </>
          ) : (
            <>
              <Icon type="arrow-bottom-fill" />
              显示代码
            </>
          )}
        </span>
      </div>
    </div>
  );
};
