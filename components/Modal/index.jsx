
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import Animation from '../Animation';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow    : false,
      isClosing : false,
    };
  }

  // componentWillMount() {
  //   console.log('componentWillMount');
  // }

  componentDidMount() {
    // console.log('componentDidMount');
    // console.log(this.refs.dialog);
    this.refs.dialog.addEventListener("webkitAnimationEnd", () => {
      console.log('end');
      if (this.state.isClosing) {
        this.setState({
          isShow : false,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps');

    if (nextProps.visible) {
      this.setState({
        isShow    : true,
        isClosing : false,
      });
    } else {
      this.setState({
        isClosing : true,
      });
    }
  }

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
    const { visible, animationType, animationDuration, width, minWidth, isRadius, isRound, className, onMaskClick, children, ...others } = props;


    const classes = {
      modal:  classnames({
                'ui-modal'   : true,
                'radius'     : ('radius' in props || isRadius),
                'round'      : ('round' in props || isRound),
                'fade-enter' : visible,
                'fade-leave' : !visible,
                [className]  : className,
              }),
      dialog: classnames({
                'ui-modal-container'       : true,
                [animationType + '-enter'] : visible,
                [animationType + '-leave'] : !visible,
              })
    }

    const style = {
      modal: {
        display                 : this.state.isShow ? 'flex' : 'none',
        WebkitAnimationDuration : animationDuration + 'ms',
        MozAnimationDuration    : animationDuration + 'ms',
        msAnimationDuration     : animationDuration + 'ms',
        OAnimationDuration      : animationDuration + 'ms',
        animationDuration       : animationDuration + 'ms',

      },
      dialog: {
        width                   : width,
        minWidth                : minWidth,
        WebkitAnimationDuration : animationDuration + 'ms',
        MozAnimationDuration    : animationDuration + 'ms',
        msAnimationDuration     : animationDuration + 'ms',
        OAnimationDuration      : animationDuration + 'ms',
        animationDuration       : animationDuration + 'ms',
      }
    };

    return (
      <div className={classes.modal} style={style.modal} onClick={onMaskClick} {...others}>
        <div className="ui-modal-wrapper">
          <div className={classes.dialog} ref="dialog" style={style.dialog} onClick={this._onContainerClick}>
            {children}
          </div>
        </div>
      </div>
    );
  }

}

Modal.propTypes = { 
  visible           : PropTypes.bool,
  animationType     : PropTypes.oneOf(['fade', 'scale', 'slide', 'rotate']),
  animationDuration : PropTypes.number,
  width             : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth          : PropTypes.number,
  onMaskClick       : PropTypes.func,
};

Modal.defaultProps = {
  visible           : false,
  animationType     : 'scale',
  animationDuration : 300,
  width             : '70%',
  minWidth          : 270,
  onMaskClick       : function () {},
};

export default Modal;

