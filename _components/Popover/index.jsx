import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Popper from './popper';
import { on } from '../utils/events';

const directMap = {
  top: 'top', topLeft: 'top-start', topRight: 'top-end',
  right: 'right', rightTop: 'right-start', rightBottom: 'right-end',
  bottom: 'bottom', bottomLeft: 'bottom-start', bottomRight: 'bottom-end',
  left: 'left', leftTop: 'left-start', leftBottom: 'left-end'
};

class Popover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    const instance = this.instance;
    const reference = findDOMNode(this.reference);
    const pop = this.pop;
    const trigger = this.props.trigger;

    if (trigger === 'click') {
      on(reference, 'click', (e) => {
        this.setState({
          visible: !this.state.visible
        });
      });
      on(document, 'click', ({ target }) => {
        if (!instance || instance.contains(target)
        || !reference || reference.contains(target)
        || !pop || pop.contains(target)) {
          return;
        }
        this.hidePop();
      });
    } else {
      on(reference, 'mouseenter', () => {
        this.showPop();
      });
      on(reference, 'mouseleave', () => {
        this.hidePop();
      });
      on(pop, 'mouseenter', () => {
        this.showPop();
      });
      on(pop, 'mouseleave', () => {
        this.hidePop();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible !== nextProps.visible) {
      this.setState({
        visible: !!nextProps.visible
      });
    }
  }

  componentDidUpdate() {
    const { visible } = this.state;
    const { direction } = this.props;
    const reference = findDOMNode(this.reference);

    if (visible) {
      if (this.popper) {
        this.popper.update();
      } else {
        if (this.arrow) {
          this.arrow.setAttribute('x-arrow', '');
        }
        this.popper = new Popper(reference, this.pop, {
          placement: directMap[direction]
        });
      }
    } else {
      if (this.popper) {
        this.popper.destroy();
      }
      delete this.popper;
    }
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
    delete this.popper;
  }

  showPop() {
    clearTimeout(this.timer);
    this.setState({
      visible: true
    });
  }

  hidePop() {
    const trigger = this.props.trigger;
    if (trigger === 'click') {
      this.setState({
        visible: false
      });
      return;
    }
    this.timer = setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 200);
  }

  render() {
    const { visible } = this.state;
    const { children, content, prefixCls, className, radius, mask, onMaskClick } = this.props;
    const child = React.isValidElement(children) ? children : <span>{children}</span>;
    const popContent = typeof content === 'function' ? content() : content;
    const cls = classnames({
      'ui-popover': true,
      [className]: !!className
    });
    const contentCls = classnames({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-content-show`]: visible,
      [`${prefixCls}-content-radius`]: !!radius,
    });
    const maskCls = classnames({
      [`${prefixCls}-mask`]: true,
      [`${prefixCls}-mask-show`]: visible
    });

    return (
      <div className={cls} ref={instance => { this.instance = instance; }}>
        { !!mask ? <div className={maskCls} onClick={onMaskClick}/> : null}
        <div
          className={contentCls}
          ref={pop => { this.pop = pop; }}>
          { popContent }
          <span
          className={`${prefixCls}-arrow`}
          ref={arrow => { this.arrow = arrow; }}
          />
        </div>
        { React.cloneElement(child, { ref: reference => { this.reference = reference; } }) }
      </div>
    );
  }
}

Popover.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  trigger: PropTypes.oneOf([
    'click', 'hover'
  ]),
  mask: PropTypes.bool,
  radius: PropTypes.bool,
  direction: PropTypes.oneOf([
    'topLeft', 'top', 'topRight',
    'rightTop', 'right', 'rightBottom',
    'bottomLeft', 'bottom', 'bottomRight',
    'leftTop', 'left', 'leftBottom'
  ]),
  onMaskClick: PropTypes.func,
  content: PropTypes.any,
};

Popover.defaultProps = {
  prefixCls: 'ui-popover',
  className: null,
  visible: false,
  trigger: 'click',
  mask: false,
  radius: true,
  direction: 'bottomRight',
  onMaskClick() {},
  content: null,
};

export default Popover;
