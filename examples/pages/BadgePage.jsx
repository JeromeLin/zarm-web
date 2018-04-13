import React, { Component } from 'react';
import { Badge } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/BadgePage';

class Page extends Component {

  render() {
    return (
      <Container className="badge-page">
        <Header title="徽标 Badge" />
        <main>
          <Badge shape="dot" />
          <br /><br />
          <Badge text="免费" />
          <br /><br />
          <Badge shape="radius" text="new" />
          <br /><br />
          <Badge shape="circle" text={3} />
          <br /><br />
          <div className="box">
            <Badge sup shape="dot"><div className="box-item" /></Badge>
          </div>
          <br /><br />
          <div className="box">
            <Badge sup shape="radius" text="new"><div className="box-item" /></Badge>
          </div>
          <br /><br />
          <div className="box">
            <Badge sup shape="round" text="999+"><div className="box-item" /></Badge>
          </div>
          <br /><br />
          <div className="box">
            <Badge sup shape="circle" text={3}><div className="box-item" /></Badge>
          </div>

        </main>
        <Footer />
      </Container>
    );
  }
}

export default Page;
