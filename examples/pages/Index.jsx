import React, { PureComponent } from 'react';
import Container from '../components/Container';
import Footer from '../components/Footer';

class Page extends PureComponent {
  render() {
    return (
      <Container className="index-page">
        <header>
          <section className="brand">
            <div className="brand-title">Dragon-UI</div>
            <div className="brand-description">众安科技桌面端组件库</div>
          </section>
        </header>
        <main>
          TODO
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
