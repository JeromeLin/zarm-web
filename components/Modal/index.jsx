
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import addEndEventListener  from '../utils/animationEvents';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow         : false,
      animationState : 'leave',
    };
  }

  // componentWillMount() {
  //   console.log('componentWillMount');
  // }

  componentDidMount() {
    // console.log('componentDidMount');
    this.animationEvents = addEndEventListener(this.refs.dialog, this.animationEnd.bind(this));

    if (this.props.visible) {
      this.enter();
    }
  }

  componentWillUnmount() {
    if (this.animationEvents) {
      this.animationEvents.remove();
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps');
    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  animationEnd(e) {
    let node = this.refs.dialog;
    if (e && e.target !== node) {
      return;
    }

    if (this.state.animationState === 'leave') {
      this.setState({ isShow: false });
    }
  }

  enter() {
    this.setState({
      isShow: true,
      animationState: 'enter'
    });
  }

  leave() {
    if (this.animationEvents) {
      this.setState({
        animationState: 'leave'
      });
    } else {
      this.setState({
        isShow: false
      })
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
    const { visible, animationType, animationDuration, width, minWidth, isRadius, isRound, className, onMaskClick, children, ...others } = this.props;
    const { isShow, animationState } = this.state;

    const classes = {
      modal:  classnames({
                'ui-modal'                 : true,
                'radius'                   : ('radius' in this.props || isRadius),
                'round'                    : ('round' in this.props || isRound),
                ['fade-' + animationState] : true,
                [className]                : className,
              }),
      dialog: classnames({
                'ui-modal-container'                   : true,
                [animationType + '-' + animationState] : true,
              })
    }

    const style = {
      modal: {
        // visibility              : isShow ? 'visible' : 'hidden',
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

    if (!isShow) {
      style.modal.display = 'none';
    }

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

