import React, { PureComponent } from 'react';
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
            <div className="brand-title">Zarm-web UI</div>
            <div className="brand-description">众安科技桌面端组件库</div>
          </section>
        </header>
        <main>
          <ul>
            <li><a onClick={() => history.push('/button')}>按钮 Button</a></li>
            <li><a onClick={() => history.push('/icon')}>图标 Icon</a></li>
            <li><a onClick={() => history.push('/badge')}>徽标 Badge</a></li>
            <li><a onClick={() => history.push('/modal')}>模态框 Modal</a></li>
          </ul>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
