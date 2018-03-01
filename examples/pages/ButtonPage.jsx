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
        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
