
import React, { Component, PropTypes } from 'react';
import Mask from '../Mask';

class Toast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: {
        width  : 0,
        height : 0
      },
      timer: undefined
    };
  }

  componentDidMount() {
    const dom = this.refs.container;
    this.setState({
      offset: {
        width  : dom.offsetWidth,
        height : dom.offsetHeight,
      }
    });

    var timer = setTimeout(() => {
      this.props.onMaskClick();
    }, 3000);
    
    this.setState({
      timer : timer
    });
  }

  shouldComponentUpdate() {
    return (this.state.offset.height === 0);
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  _onContainerClick(e) {
    e.stopPropagation();
  }

  render () {
    const style = {};

    style.toast = {};
    style.container = {
      'position'   : 'absolute',
      'left'       : '50%',
      'top'        : '50%',
      'marginLeft' : - this.state.offset.width / 2,
      'marginTop'  : - this.state.offset.height / 2,
      'width'      : this.props.width,
    };

    if (this.state.height > window.innerHeight) {
      style.toast.WebkitOverflowScrolling = 'touch';
      style.container.position = 'relative';
      style.container.top = 0;
      style.container.marginTop = 0;
    }

    if (this.props.width > window.innerWidth) {
      style.toast.WebkitOverflowScrolling = 'touch';
      style.container.position = 'relative';
      style.container.left = 0;
      style.container.marginLeft = 0;
    }

    return (
      <div className="ui-toast" style={style.toast}>
        <div className="ui-toast-container" ref="container" style={style.container} onClick={this._onContainerClick}>
          <div className="ui-toast-body">
            <p style={{textAlign: 'center'}}>{this.props.message}</p>
          </div>
        </div>
        <Mask type="transparent" onClose={this.props.onMaskClick} />
      </div>
    );
  }

}

Toast.propTypes = { 
  width       : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  onMaskClick : PropTypes.func,
};

Toast.defaultProps = {
  width       : '70%',
  onMaskClick : function () {},
};

export default Toast;

