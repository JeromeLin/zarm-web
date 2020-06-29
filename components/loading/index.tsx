import React, { Component, ReactElement } from 'react';
import { ActivityIndicator } from 'zarm';
import classnames from 'classnames';
import debounce from '../utils/debounce';
import LoadingProps from './PropsType';

ActivityIndicator.defaultProps.prefixCls = 'zw-activity-indicator';

function shouldDelay(visible?: boolean, delay?: number): boolean {
  return !!visible && !!delay && !Number.isNaN(Number(delay));
}

interface LoadingStates {
  visible: boolean;
}

class Loading extends Component<LoadingProps, LoadingStates> {
  static displayName = 'Loading';

  static defaultProps = {
    prefixCls: 'zw-loading',
    visible: false,
    size: 'md',
  };

  constructor(props) {
    super(props);
    const { visible, delay } = props;
    const shouldBeDelayed = shouldDelay(visible, delay);
    if (delay) {
      this.updateSpinning = debounce(this.updateSpinning, delay);
    }
    this.state = {
      visible: visible && !shouldBeDelayed,
    };
  }

  componentDidMount() {
    this.updateSpinning();
  }

  componentDidUpdate() {
    this.updateSpinning();
  }

  componentWillUnmount() {
    this.enableScroll();
  }

  getStyle(): {} {
    const { fullscreen } = this.props;
    if (fullscreen) {
      this.disableScroll();
    }
    this.enableScroll();
    return {};
  }

  updateSpinning = () => {
    const { visible } = this.props;
    const { visible: currentVisible } = this.state;
    if (currentVisible !== visible) {
      this.setState({ visible: !!visible });
    }
  };

  debouncifyUpdateSpinning = () => {
    const { delay } = this.props;
    if (delay) {
      this.updateSpinning = debounce(this.updateSpinning, delay);
    }
  };

  documentBody = () => {
    return document.body;
  };

  disableScroll(): void {
    const documentBody = this.documentBody();
    if (documentBody) {
      document.body.style.overflow = 'hidden';
    }
  }

  enableScroll(): void {
    const documentBody = this.documentBody();
    if (documentBody) {
      documentBody.style.removeProperty('overflow');
    }
  }

  isNestedPattern() {
    const { children } = this.props;
    return !!children;
  }

  renderIndicator = () => {
    const { indicator } = this.props;
    const ele = (
      <ActivityIndicator />
    );

    if (React.isValidElement(indicator)) {
      return React.cloneElement(indicator as ReactElement<any>);
    }
    return ele;
  };

  renderLoading = () => {
    const { children, style, prefixCls, text, className, size, fullscreen } = this.props;
    const { visible } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--fullscreen`]: fullscreen,
      [`${prefixCls}--active`]: visible,
      [`${prefixCls}--inline`]: !children,
    });

    const loadingElement = visible && (
      <div className={cls}>
        {this.renderIndicator()}
        {text && <div className={`${prefixCls}__text`}>{text}</div>}
      </div>
    );

    if (this.isNestedPattern() || fullscreen) {
      const containerCls = classnames(`${prefixCls}__container`);
      return (
        <div className={cls} style={this.getStyle()}>
          { this.isNestedPattern() && <div className={containerCls}>{children}</div> }
          {visible && (
            <div className={`${prefixCls}__spin__wrapper`} style={style}>
              <div className={`${prefixCls}__spin`}>
                {this.renderIndicator()}
                {text && <div className={`${prefixCls}__text`}>{text}</div>}
              </div>
            </div>
          )}
        </div>
      );
    }

    return loadingElement;
  };

  render() {
    return this.renderLoading();
  }
}

export default Loading;
