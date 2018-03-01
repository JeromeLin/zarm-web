import React, { PureComponent } from 'react';
import { Panel, Cell } from 'zarm';
import Container from '../components/Container';
import Footer from '../components/Footer';
import '../styles/pages/IndexPage';

class Page extends PureComponent {

  render() {
    const { history } = this.props;

    return (
      <Container className="index-page">
        <header>
          <section className="brand">
            <div className="brand-title">Zarm UI</div>
            <div className="brand-description">众安科技移动端组件库</div>
          </section>
        </header>
        <main>
          <a onClick={() => history.push('/button')}>按钮 Button</a>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
