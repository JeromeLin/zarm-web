
import React, { Component } from 'react';
import { Link } from 'react-router';

import '../styles/pages/Page2.scss';

class Page2 extends Component {
  
  render() {
    return (
      <div>
        <p>This is Page2</p>
        <p><Link to="/page1">=> Goto Page1</Link></p>
        <p><a href="#" onClick={() => { this.context.router.goBack() }}>GoBack</a></p>
      </div>
    );
  }
}

Page2.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Page2;