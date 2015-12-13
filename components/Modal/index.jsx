
import React, { Component, PropTypes } from 'react';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: {
        width  : 0,
        height : 0
      },
    };
  }

  componentWillMount() {
    // console.log('componentWillMount');
  }

  componentDidMount() {
    // console.log('componentDidMount');

    const dom = this.refs.container;
    this.setState({
      offset: {
        width  : dom.offsetWidth,
        height : dom.offsetHeight,
      }
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps');
  // }

  shouldComponentUpdate() {
    // console.log('shouldComponentUpdate');

    return (this.state.offset.height === 0);
  }

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
    const offset = this.state.offset;
    const style = {};

    style.modal = {};
    style.wrapper = {
      'width'  : '100%',
      'height' : '100%',
    };
    style.container = {
      'position'   : 'absolute',
      'left'       : '50%',
      'top'        : '50%',
      'marginLeft' : - offset.width / 2,
      'marginTop'  : - offset.height / 2,
      'width'      : width,
    };

    if (offset.height > window.innerHeight) {
      style.modal.WebkitOverflowScrolling = 'touch';
      style.wrapper = {};
      style.container.position = 'relative';
      style.container.top = 0;
      style.container.marginTop = 0;
    }

    if (width > window.innerWidth) {
      style.modal.WebkitOverflowScrolling = 'touch';
      style.container.position = 'relative';
      style.container.left = 0;
      style.container.marginLeft = 0;
    }

    return (
      <div className="ui-modal" style={style.modal} onClick={onMaskClick}>
        <div className="ui-modal-wrapper" style={style.wrapper}>
          <div className="ui-modal-container" ref="container" style={style.container} onClick={this._onContainerClick}>
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

