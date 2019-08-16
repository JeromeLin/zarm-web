import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import { Icon } from 'zarm-web';
import 'highlight.js/styles/github-gist.css';
import { documents, components } from '@site/site.config';
import Format from '@site/utils/format';
import Container from '@site/components/Container';
import Header from '@site/components/Header';
import SideBar from '@site/components/SideBar';
import ScrollToTop from '@site/components/ScrollToTop';
import Markdown from '@site/components/Markdown';
import './style.scss';

const isComponentPage = page => ['quick-start', 'change-log'].indexOf(page) === -1;

const LoadableComponent = (component) => {
  return Loadable({
    loader: component.module,
    render: (loaded, props) => {
      const C = loaded.default;
      return <Markdown document={C} name={component.name} className={`${Format.camel2Dash(component.name)}-page`} {...props} />;
    },
    loading: () => null,
  });
};

class Page extends PureComponent {
  render() {
    const { match } = this.props;
    const { basic, layout, form, data, notice, navigation, others } = components;

    const containerCls = classnames('main-container', {
      'no-simulator': !isComponentPage(match.params.component),
    });

    return (
      <Container className="components-page">
        <Header />
        <main>
          <SideBar />
          <div className={containerCls}>
            <Switch>
              {
                documents.map((doc, i) => (
                  <Route key={+i} path={`/components/${Format.camel2Dash(doc.name)}`} component={LoadableComponent(doc)} />
                ))
              }
              {
                [...basic, ...layout, ...form, ...data, ...notice, ...navigation, ...others].map((component, i) => (
                  <Route key={+i} path={`/components/${Format.camel2Dash(component.name)}`} component={LoadableComponent(component)} />
                ))
              }
              <Route path="*" component={LoadableComponent(documents[0])} />
              <Redirect to="/" />
            </Switch>
          </div>
          <ScrollToTop>
            <div className="scroll-to-top">
              <Icon type="arrow-top" />
            </div>
          </ScrollToTop>
        </main>
        {/* <Footer /> */}
      </Container>
    );
  }
}

export default withRouter(Page);
