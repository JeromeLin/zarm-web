
import React, { Component, PropTypes } from 'react';
import Mask from '../Mask';

class Toast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer: undefined
    };
  }

  componentDidMount() {
    var timer = setTimeout(() => {
      this.props.onClose();
      this.props.onMaskClick();
    }, 3000);
    
    this.setState({
      timer : timer
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  render () {
    const { visible, message, width, onMaskClick, ...others } = this.props;
    const containerStyle = {
      'width' : width,
    };

    return visible ? (
      <div className="ui-toast" {...others}>
        <div className="ui-toast-wrapper" style={containerStyle} onClick={(e) => this._onContainerClick(e)}>
          <div className="ui-toast-container">
            {message}
          </div>
        </div>
        <Mask visible={visible} type="transparent" onClose={onMaskClick} />
      </div>
    ) : null;
  }

  _onContainerClick(e) {
    e.stopPropagation();
  }
}

Toast.propTypes = {
  visible     : PropTypes.bool,
  width       : PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  onClose     : PropTypes.func,
  onMaskClick : PropTypes.func,
};

Toast.defaultProps = {
  visible     : false,
  width       : '100%',
  onClose     : () => {},
  onMaskClick : () => {},
};

export default Toast;

