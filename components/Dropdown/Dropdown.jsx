
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import isNodeInTree from '../utils/isNodeInTree';

class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
      // isShow         : false,
      // animationState : 'leave',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }

  componentWillMount() {
    this.unbindOuterHandlers();
  }

  componentWillUnmount() {
    this.unbindOuterHandlers();
  }

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
    const { className, children, ...others } = this.props;
    // const { isShow, animationState } = this.state;
    const { visible } = this.state;

    const cls = classnames({
      'ui-dropdown'       : true,
      'ui-dropdown-hidden': !visible,
      // [`scaleDown-${animationState}`]: true,
      [className]         : !!className
    });
    
    return <div {...others} className={cls} ref="dropdown">{children}</div>;
  }
  
  setDropdown(isOpen, callback) {
    if (isOpen) {
      this.bindOuterHandlers();
    } else {
      this.unbindOuterHandlers();
    }

    this.setState({
      visible: isOpen
    }, () => {
      callback && callback();
      isOpen && this.props.onOpen && this.props.onOpen();
      !isOpen && this.props.onClose && this.props.onClose();
    });
  }

  handleKeyup(e) {
    (e.keyCode === 27) && this.setDropdown(false);
  }

  handleOuterClick(e) {
    if (isNodeInTree(e.target, ReactDOM.findDOMNode(this))) {
      return false;
    }

    this.setDropdown(false);
  }

  bindOuterHandlers() {
    Events.on(document, 'click', (e) => this.handleOuterClick(e));
    Events.on(document, 'keyup', (e) => this.handleKeyup(e));
  }

  unbindOuterHandlers() {
    Events.off(document, 'click', (e) => this.handleOuterClick(e));
    Events.off(document, 'keyup', (e) => this.handleKeyup(e));
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