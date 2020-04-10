import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Icon, Loading } from 'zarm-web';
import 'highlight.js/styles/github-gist.css';
import { documents, components } from '@site/site.config';
import Container from '@site/components/Container';
import Header from '@site/components/Header';
import SideBar from '@site/components/SideBar';
import ScrollToTop from '@site/components/ScrollToTop';
import Markdown from '@site/components/Markdown';
import './style.scss';
import Test from '../../../examples/pages/test/test';
import TestSearch from '../../../examples/pages/test/testSearch';

const LoadableComponent = (component) => {
  const loader = { page: component.module };

  if (component.style) {
    loader.style = () => import(`@site/styles/pages/${component.key}`);
  }

  return Loadable.Map({
    loader,
    render: (loaded, props) => {
      return (
        <Markdown
          document={loaded.page.default}
          component={component}
          {...props}
        />
      );
    },
    loading: () => <Loading visible />,
  });
};

class Page extends PureComponent {
  render() {
    const { general, layout, form, feedback, view, navigation, other } = components;
    return (
      <Container className="components-page">
        <Header />
        <main>
          <SideBar />
          <div className="main-container">
            <Switch>
              {
                documents.map((doc, i) => (
                  <Route key={+i} path={`/components/${doc.key}`} component={LoadableComponent(doc)} />
                ))
              }
              {
                [...general, ...layout, ...form, ...feedback, ...view, ...navigation, ...other].map((component, i) => (
                  <Route key={+i} path={`/components/${component.key}`} component={LoadableComponent(component)} />
                ))
              }
              <Route path="/components/test" component={Test} />
              <Route path="/components/testS" component={TestSearch} />
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
