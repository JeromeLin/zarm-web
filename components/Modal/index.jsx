
import React, { Component, PropTypes } from 'react';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentWillMount() {
  //   console.log('componentWillMount');
  // }

  // componentDidMount() {
  //   console.log('componentDidMount');
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps');
  // }

  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate');
  //   return false;
  // }

  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate');
  // }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount');
  // }

  _onContainerClick(e) {
    e.stopPropagation();
  }

  render () {
    // console.log('render');
    const { width, onMaskClick, children } = this.props;
    const containerStyle = {
      'width' : width,
    };

    return (
      <div className="ui-modal" onClick={onMaskClick}>
        <div className="ui-modal-wrapper">
          <div className="ui-modal-container" ref="container" style={containerStyle} onClick={this._onContainerClick}>
            {children}
          </div>
        </div>
      </div>
    );
  }

}

Modal.propTypes = { 
  width       : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onMaskClick : PropTypes.func,
};

Modal.defaultProps = {
  width       : '70%',
  onMaskClick : function () {},
};

export default Modal;

