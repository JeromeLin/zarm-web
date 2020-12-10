import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Popper from './popper';
import PropsType from './PropsType';

const directMap = {
  top: 'top',
  topLeft: 'top-start',
  topRight: 'top-end',
  right: 'right',
  rightTop: 'right-start',
  rightBottom: 'right-end',
  bottom: 'bottom',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
  left: 'left',
  leftTop: 'left-start',
  leftBottom: 'left-end',
};

class Popover extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-popover',
    className: null,
    visible: false,
    trigger: 'click',
    mask: false,
    radius: true,
    direction: 'bottomRight',
    onMaskClick() { },
    content: null,
  };

  mountNode: HTMLDivElement;

  private instance: HTMLDivElement | null;
  private pop: HTMLDivElement | null;
  private reference: HTMLSpanElement | null;
  private popper;
  private timer: number;
  private arrow;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.mountNode = document.createElement('div');
    this.mountNode.classList.add('ui-popover-mount-node');
    this.mountNode.style.setProperty('z-index', '2021');
    this.mountNode.style.setProperty('postion', 'relative');
  }

  onDocumentClick = (e: MouseEvent) => {
    const { visible } = this.state;
    if (!this.instance || !this.pop || !visible) {
      return;
    }
    if (e.target) {
      if (this.instance.contains(e.target as Node) || this.pop.contains(e.target as Node)) {
        return;
      }
    }
    this.hidePop();
  }

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    if (this.popper) {
      this.popper.destroy();
    }
    if (this.mountNode.parentNode) {
      this.mountNode.parentNode.removeChild(this.mountNode);
    }
    delete this.popper;
  }

  referenceRef = (elem: HTMLSpanElement | null) => this.reference = elem;

  trigger = () => {
    const { trigger } = this.props;
    if (trigger === 'click') {
      this.setState({
        visible: !this.state.visible,
      });
    }
  }

  onTriggerEnter = () => {
    const { trigger } = this.props;
    if (trigger !== 'click') {
      this.showPop();
    }
  }

  onTriggerLeave = () => {
    const { trigger } = this.props;
    if (trigger !== 'click') {
      this.hidePop();
    }
  }

  componentWillReceiveProps(nextProps: this['props']) {
    if (this.state.visible !== nextProps.visible) {
      this.setState({
        visible: !!nextProps.visible,
      });
    }
  }

  componentDidUpdate() {
    const { visible } = this.state;
    const { direction } = this.props;
    const { reference } = this; // eslint-disable-line

    if (visible) {
      document.body.appendChild(this.mountNode);
      if (this.arrow) {
        this.arrow.setAttribute('x-arrow', '');
      }
      if (reference) {
        const triggerElem = reference.children[0] || reference;
        this.popper = new Popper(triggerElem, this.pop, {
          placement: directMap[direction],
        });
      }
    } else {
      if (this.mountNode.parentNode) {
        this.mountNode.parentNode.removeChild(this.mountNode);
      }
      if (this.popper) {
        this.popper.destroy();
      }
      delete this.popper;
    }
  }

  showPop() {
    clearTimeout(this.timer);
    this.setState({
      visible: true,
    });
  }

  hidePop() {
    const { trigger } = this.props;
    if (trigger === 'click') {
      this.setState({
        visible: false,
      });
      return;
    }
    this.timer = setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 200);
  }

  render() {
    const { visible } = this.state;
    const {
      children,
      content,
      prefixCls,
      className,
      radius,
      mask,
      onMaskClick,
      popoverClassName,
    } = this.props;
    const child = <span
      ref={this.referenceRef}
      onClick={this.trigger}
      onMouseEnter={this.onTriggerEnter}
      onMouseLeave={this.onTriggerLeave}
    >
      {children}
    </span>;
    const popContent = typeof content === 'function' ? content() : content;
    const cls = classnames({
      'ui-popover': true,
      [className!]: !!className,
    });
    const contentCls = classnames({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-content-show`]: visible,
      [`${prefixCls}-content-radius`]: !!radius,
      [`${popoverClassName}`]: !!popoverClassName,
    });
    const maskCls = classnames({
      [`${prefixCls}-mask`]: true,
      [`${prefixCls}-mask-show`]: visible,
    });

    const popoverContent = (
      <div
        className={contentCls}
        onMouseEnter={this.onTriggerEnter}
        onMouseLeave={this.onTriggerLeave}
        // tslint:disable-next-line:jsx-no-multiline-js
        ref={(pop) => {
          this.pop = pop;
        }}
      >
        {popContent}
        <span
          className={`${prefixCls}-arrow`}
          // tslint:disable-next-line:jsx-no-multiline-js
          ref={(arrow) => {
            this.arrow = arrow;
          }}
        />
      </div>);
    return (
      <div
        className={cls}
        // tslint:disable-next-line:jsx-no-multiline-js
        ref={(instance) => {
          this.instance = instance;
        }}
      >
        {mask ? <div className={maskCls} onClick={onMaskClick} /> : null}
        {ReactDOM.createPortal(popoverContent, this.mountNode)}
        {React.cloneElement(child)}
      </div>
    );
  }
}

export default Popover;
