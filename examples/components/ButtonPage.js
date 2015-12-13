
import React, { Component } from 'react';
import hljs from 'highlight.js';
import Document from '../../components/Document';
import Button from '../../components/Button';
import '../../styles/index.scss';

import '../styles/ButtonPage.scss';

class ButtonPage extends Component {

  componentDidMount() {
    hljs.initHighlightingOnLoad();
  }

  render() {

    return (
      <div>

        <Document title="按钮主题" 
          demo={
            <div>
              <div className="demo-inline">
                <Button>Default</Button>
                <Button theme="primary">Primary</Button>
                <Button theme="info">Info</Button>
                <Button theme="success">Success</Button>
                <Button theme="warning">Warning</Button>
                <Button theme="danger">Danger</Button>
              </div>
            </div>
          }
          code={
            `import { Button } from '../../components';\n\n` +
            `ReactDOM.render(\n` +
            `  <div>\n` +
            `    <Button>Default</Button>\n` +
            `    <Button theme="primary">Primary</Button>\n` +
            `    <Button theme="info">Info</Button>\n` +
            `    <Button theme="success">Success</Button>\n` +
            `    <Button theme="warning">Warning</Button>\n` +
            `    <Button theme="danger">Danger</Button>\n` +
            `  </div>\n` +
            `, document.getElementById('button-theme-demo'));`
          } />

        <Document title="圆角按钮"
          demo={
            <div>
              <div className="demo-inline">
                <Button radius>Default</Button>
                <Button radius theme="primary">Primary</Button>
                <Button radius theme="info">Info</Button>
                <Button radius theme="success">Success</Button>
                <Button radius theme="warning">Warning</Button>
                <Button radius theme="danger">Danger</Button>
              </div>
            </div>
          }
          code={
            `import { Button } from '../../components';\n\n` +
            `ReactDOM.render(\n` +
            `  <div>\n` +
            `    <Button radius>Default</Button>\n` +
            `    <Button radius theme="primary">Primary</Button>\n` +
            `    <Button radius theme="info">Info</Button>\n` +
            `    <Button radius theme="success">Success</Button>\n` +
            `    <Button radius theme="warning">Warning</Button>\n` +
            `    <Button radius theme="danger">Danger</Button>\n` +
            `  </div>\n` +
            `, document.getElementById('button-radius-demo'));`
          } />

        <Document title="椭圆按钮"
          demo={
            <div>
              <div className="demo-inline">
                <Button round>Default</Button>
                <Button round theme="primary">Primary</Button>
                <Button round theme="info">Info</Button>
                <Button round theme="success">Success</Button>
                <Button round theme="warning">Warning</Button>
                <Button round theme="danger">Danger</Button>
              </div>
            </div>
          }
          code={
            `import { Button } from '../../components';\n\n` +
            `ReactDOM.render(\n` +
            `  <div>\n` +
            `    <Button round>Default</Button>\n` +
            `    <Button round theme="primary">Primary</Button>\n` +
            `    <Button round theme="info">Info</Button>\n` +
            `    <Button round theme="success">Success</Button>\n` +
            `    <Button round theme="warning">Warning</Button>\n` +
            `    <Button round theme="danger">Danger</Button>\n` +
            `  </div>\n` +
            `, document.getElementById('button-round-demo'));`
          } />

        <Document title="块级显示"
          demo={
            <div>
              <div className="demo-inline">
                <Button block>Default - block</Button>
              </div>
              <div className="demo-inline">
                <Button block theme="primary">Primary - block</Button>
              </div>
            </div>
          }
          code={
            `import { Button } from '../../components';\n\n` +
            `ReactDOM.render(\n` +
            `  <div>\n` +
            `    <Button block>Default - block</Button>\n` +
            `    <Button block theme="primary">Primary - block</Button>\n` +
            `  </div>\n` +
            `, document.getElementById('button-block-demo'));`
          } />

        <Document title="禁用状态"
          demo={
            <div>
              <div className="demo-inline">
                <Button disabled>Default - disabled</Button>
                <Button disabled theme="primary">Primary - disabled</Button>
              </div>
            </div>
          }
          code={
            `import { Button } from '../../components';\n\n` +
            `ReactDOM.render(\n` +
            `  <div>\n` +
            `    <Button disabled>Default - disabled</Button>\n` +
            `    <Button disabled theme="primary">Primary - disabled</Button>\n` +
            `  </div>\n` +
            `, document.getElementById('button-disabled-demo'));`
          } />

        <Document title="激活状态"
          demo={
            <div>
              <div className="demo-inline">
                <Button active>Default - active</Button>
                <Button active theme="primary">Primary - active</Button>
              </div>
            </div>
          }
          code={
            `import { Button } from '../../components';\n\n` +
            `ReactDOM.render(\n` +
            `  <div>\n` +
            `    <Button active>Default - active</Button>\n` +
            `    <Button active theme="primary">Primary - active</Button>\n` +
            `  </div>\n` +
            `, document.getElementById('button-active-demo'));`
          } />

        <Document title="按钮尺寸"
          demo={
            <div>
              <div className="demo-inline">
                <Button size="xl">Default - xl</Button>
                <Button theme="primary" size="xl">Primary - xl</Button>
              </div>
              <div className="demo-inline">
                <Button size="lg">Default - lg</Button>
                <Button theme="primary" size="lg">Primary - lg</Button>
              </div>
              <div className="demo-inline">
                <Button>Default</Button>
                <Button theme="primary">Primary</Button>
              </div>
              <div className="demo-inline">
                <Button size="sm">Default - sm</Button>
                <Button theme="primary" size="sm">Primary - sm</Button>
              </div>
              <div className="demo-inline">
                <Button size="xs">Default - xs</Button>
                <Button theme="primary" size="xs">Primary - xs</Button>
              </div>
            </div>
          }
          code={
            `import { Button } from '../../components';\n\n` +
            `ReactDOM.render(\n` +
            `  <div>\n` +
            `    <Button size="xl">Default - xl</Button>\n` +
            `    <Button theme="primary" size="xl">Primary - xl</Button>\n` +
            `  </div>\n` +
            `  <div>\n` +
            `    <Button size="lg">Default - lg</Button>\n` +
            `    <Button theme="primary" size="lg">Primary - lg</Button>\n` +
            `  </div>\n` +
            `  <div>\n` +
            `    <Button>Default</Button>\n` +
            `    <Button theme="primary">Primary</Button>\n` +
            `  </div>\n` +
            `  <div>\n` +
            `    <Button size="sm">Default - sm</Button>\n` +
            `    <Button theme="primary" size="sm">Primary - sm</Button>\n` +
            `  </div>\n` +
            `  <div>\n` +
            `    <Button size="xs">Default - xs</Button>\n` +
            `    <Button theme="primary" size="xs">Primary - xs</Button>\n` +
            `  </div>\n` +
            `, document.getElementById('button-size-demo'));`
          } />

      </div>
    );
  }
}

export default ButtonPage;