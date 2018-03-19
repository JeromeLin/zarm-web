import React, { Component } from 'react';
import { Button } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/pages/ButtonPage';

class Page extends Component {

  render() {
    return (
      <Container className="button-page">
        <Header title="按钮 Button" />
        <main>
          <Button>default</Button>
          <Button theme="primary">primary</Button>

          <Button block>default</Button>
          <Button block disabled>disabled default</Button>
          <Button block theme="primary">primary</Button>
          <Button block disabled theme="primary">disabled primary</Button>

          <Button block bordered>default</Button>
          <Button block bordered disabled>disabled default</Button>
          <Button block bordered theme="primary">primary</Button>
          <Button block bordered disabled theme="primary">disabled primary</Button>

          <Button theme="default">default</Button>
          <Button theme="primary">primary</Button>
          <Button theme="success">success</Button>
          <Button theme="warning">warning</Button>
          <Button theme="error">error</Button>

          <Button theme="primary" size="lg">lg</Button>
          <Button theme="primary">md</Button>
          <Button theme="primary" size="sm">sm</Button>

          <Button shape="radius" theme="primary">圆角按钮</Button>
          <Button shape="round" theme="primary">椭圆角按钮</Button>
          <Button bordered shape="circle" theme="primary">GO</Button>
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
