
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow         : false,
      isPending      : false,
      animationState : 'leave',
    };

    this.animationEnd = this.animationEnd.bind(this);
  }
  
  componentWillMount() {
    if (this.props.visible) {
      this.enter();
    }
  }

  componentWillUpdate() {
    Events.on(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.on(this.modal, 'animationend', this.animationEnd);
  }

  componentWillUnmount() {
    Events.off(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.off(this.modal, 'animationend', this.animationEnd);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!(this.state.isShow || nextState.isShow);
  }

  render () {
    const { animationType, animationDuration, width, minWidth, isRadius, isRound, className, onMaskClick, children, ...others } = this.props;
    const { isShow, isPending, animationState } = this.state;

    const classes = {
      modal:  classnames({
        'ui-modal'                : true,
        'radius'                  : ('radius' in this.props || isRadius),
        'round'                   : ('round' in this.props || isRound),
        [`fade-${animationState}`]: isPending,
        [className]               : !!className,
      }),
      dialog: classnames({
        'ui-modal-dialog'                     : true,
        [`${animationType}-${animationState}`]: true,
      })
    };

    const style = {
      modal: {
        WebkitAnimationDuration : `${animationDuration}ms`,
        MozAnimationDuration    : `${animationDuration}ms`,
        msAnimationDuration     : `${animationDuration}ms`,
        OAnimationDuration      : `${animationDuration}ms`,
        animationDuration       : `${animationDuration}ms`,
      },
      dialog: {
        width                   : width,
        minWidth                : minWidth,
        WebkitAnimationDuration : `${animationDuration}ms`,
        MozAnimationDuration    : `${animationDuration}ms`,
        msAnimationDuration     : `${animationDuration}ms`,
        OAnimationDuration      : `${animationDuration}ms`,
        animationDuration       : `${animationDuration}ms`,
      }
    };

    if (!isShow) {
      style.modal.display = 'none';
    }

    return (
      <div className={classes.modal} style={style.modal} onClick={onMaskClick} ref={(ele) => { this.modal = ele; }}>
        <div className="ui-modal-wrapper">
          <div {...others} className={classes.dialog} ref="dialog" style={style.dialog} onClick={(e) => this.onContainerClick(e)}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  animationEnd() {
    if (this.state.animationState === 'leave') {
      this.setState({
        isShow: false,
        isPending: false
      });
    } else {
      this.setState({
        isShow: true,
        isPending: false
      });
    }
  }

  enter() {
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'enter',
    });
  }

  leave() {
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'leave',
    });
  }

  onContainerClick(e) {
    e.stopPropagation();
  }
}

Modal.propTypes = {
  visible           : PropTypes.bool,
  animationType     : PropTypes.oneOf([
    'fade', 'door', 'flip', 'rotate', 'zoom',
    'moveUp', 'moveDown', 'moveLeft', 'moveRight',
    'slideUp', 'slideDown', 'slideLeft', 'slideRight'
  ]),
  animationDuration : PropTypes.number,
  width             : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth          : PropTypes.number,
  isRadius          : PropTypes.bool,
  isRound           : PropTypes.bool,
  onMaskClick       : PropTypes.func,
};

Modal.defaultProps = {
  visible           : false,
  animationType     : 'zoom',
  animationDuration : 300,
  width             : 600,
  minWidth          : 270,
  isRadius          : false,
  isRound           : false,
  onMaskClick       : function () {},
};

export default Modal;
