
import React, { Component, PropTypes, Children } from 'react';

class ModalFooter extends Component {

  render () { 
    const { children } = this.props; 
    const itemStyle = {
      width : 100 / Children.count(children) + '%',
    };
    const items = Children.map(children, (option, index) => {
      return <li key={index} style={itemStyle}>{option}</li>
    });

    return (
      <div className="ui-modal-footer">
        <ul>
          {items}
        </ul>
      </div>
    );
  }

}

export default ModalFooter;

