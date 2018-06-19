import React, { Component } from 'react';
import { Alert, Button } from 'dragon-ui';
import Container from '../components/Container';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
    };
  }

  showAlert = () => {
    this.setState({
      alertVisible: true,
    });
  }

  render() {
    const { alertVisible } = this.state;
    return (
      <main>
        <Button theme="info" onClick={this.showAlert}>点我</Button>
        <Alert visible={alertVisible}>
          确定是否删除吗？
        </Alert>
      </main>
    );
  }
}

export default Page;
