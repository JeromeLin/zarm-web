
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import addEndEventListener from '../utils/animationEvents';

class Dropdown extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isShow         : false,
  //     animationState : 'leave',
  //   };
  // }

  // componentDidMount() {
  //   this.animationEvents = addEndEventListener(this.refs.dropdown, this.animationEnd.bind(this));

  //   if (this.props.visible) {
  //     this.enter();
  //   }
  // }

  // componentWillUnmount() {
  //   if (this.animationEvents) {
  //     this.animationEvents.remove();
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (!this.props.visible && nextProps.visible) {
  //     this.enter();
  //   } else if (this.props.visible && !nextProps.visible) {
  //     this.leave();
  //   }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return !!(this.state.isShow || nextState.isShow);
  // }

  render () { 
    const { visible, className, children, ...others } = this.props;
    // const { isShow, animationState } = this.state;

    const cls = classnames({
      'ui-dropdown'       : true,
      'ui-dropdown-hidden': !visible,
      // [`scaleDown-${animationState}`]: true,
      [className]         : !!className
    });
    
    return <div {...others} className={cls} ref="dropdown">{children}</div>;
  }
  
  // animationEnd(e) {
  //   let node = this.refs.dialog;
  //   if (e && e.target !== node) {
  //     return;
  //   }

  //   if (this.state.animationState === 'leave') {
  //     this.setState({
  //       isShow: false
  //     });
  //   }
  // }

  // enter() {
  //   this.setState({
  //     isShow: true,
  //     animationState: 'enter',
  //   });
  // }

  // leave() {
  //   if (this.animationEvents) {
  //     this.setState({
  //       animationState: 'leave',
  //     });
  //   } else {
  //     this.setState({
  //       isShow: false,
  //     })
  //   }
  // }
}

export default Dropdown;