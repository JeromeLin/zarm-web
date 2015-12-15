
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

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
    const props = this.props;
    const { visible, width, minWidth, isRadius, isRound, className, onMaskClick, children, ...others } = props;

    const classes = classnames({
      'ui-modal'         : true,
      'radius'           : ('radius' in props || isRadius),
      'round'            : ('round' in props || isRound),
      [className]        : className,
    });

    const containerStyle = {
      'width'    : width,
      'minWidth' : minWidth,
    };

    return visible ? (
      <div className={classes} onClick={onMaskClick} {...others}>
        <div className="ui-modal-wrapper">
          <div className="ui-modal-container" ref="container" style={containerStyle} onClick={this._onContainerClick}>
            {children}
          </div>
        </div>
      </div>
    ) : null;
  }

}

Modal.propTypes = { 
  width       : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth    : PropTypes.number,
  onMaskClick : PropTypes.func,
};

Modal.defaultProps = {
  width       : '70%',
  minWidth    : 270,
  onMaskClick : function () {},
};

export default Modal;

