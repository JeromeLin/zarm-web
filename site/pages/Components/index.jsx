import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import { Loading } from 'zarm-web';
import { documents, components } from '@site/site.config';
import Container from '@site/components/Container';
import SideBar from '@site/components/SideBar';
import Footer from '@site/components/Footer';
import Markdown from '@site/components/Markdown';
import './style.scss';

const LoadableComponent = (component) => {
  const loader = { page: component.module };

  if (component.style) {
    loader.style = () => import(`@site/styles/pages/${component.key}`);
  }

  return Loadable.Map({
    loader,
    render: (loaded, props) => {
      return <Markdown content={loaded.page.default} component={component} {...props} />;
    },
    loading: () => <Loading visible />,
  });
};

const Page = () => {
  const { general, form, feedback, view, navigation, other } = components;
  const containerCls = classnames('main-container', 'markdown');

  return (
    <Container className="components-page">
      <main>
        <SideBar />
        <div className={containerCls}>
          <Switch>
            {documents.map((doc, i) => (
              <Route key={+i} path={`/components/${doc.key}`} component={LoadableComponent(doc)} />
            ))}
            {[...general, ...form, ...feedback, ...view, ...navigation, ...other].map(
              (component, i) => (
                <Route
                  key={+i}
                  path={`/components/${component.key}`}
                  component={LoadableComponent(component)}
                />
              ),
            )}
            <Redirect to="/" />
          </Switch>
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export default Page;
