import React, { Component, ReactElement } from 'react';
import { ActivityIndicator } from 'zarm';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from '../utils/debounce';
import LoadingProps from './PropsType';

ActivityIndicator.defaultProps.prefixCls = 'zw-activity-indicator';

function shouldDelay(visible?: boolean, delay?: number): boolean {
  return !!visible && !!delay && !Number.isNaN(Number(delay));
}
class Loading extends Component<LoadingProps, any> {
  static defaultProps = {
    prefixCls: 'zw-loading',
    visible: false,
    size: 'md',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    size: PropTypes.oneOf(['lg', 'md', 'xs']),
    delay: PropTypes.number,
    visible: PropTypes.bool,
    className: PropTypes.string,
    fullscreen: PropTypes.bool,
    indicator: PropTypes.element,
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
    // this.debouncifyUpdateSpinning();
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
      this.setState({ visible });
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
      documentBody.style.setProperty('overflow', 'hidden');
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
    const { indicator, size, prefixCls } = this.props;
    const dotClassName = `${prefixCls}__svg`;
    const hash = {
      lg: 'lg',
      md: 'md',
    };
    const ele = (
      <ActivityIndicator size={hash[size || 'md']} className={dotClassName} />
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
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--fullscreen`]: !!fullscreen,
    });

    const textCls = size === 'xs' ? { display: 'inline' } : {};

    const loadingElement = !!visible && (
      <div className={cls}>
        {this.renderIndicator()}
        {text && (
          <div className={`${prefixCls}__text`} style={textCls}>
            {text}
          </div>
        )}
      </div>
    );

    if (this.isNestedPattern() || fullscreen) {
      return (
        <div className={cls} style={this.getStyle()}>
          {!!visible && (
            <div className={`${prefixCls}__mask`}>
              <div className={`${prefixCls}__spin`} style={style}>
                {this.renderIndicator()}
                {text && (
                  <div className={`${prefixCls}__text`} style={textCls}>
                    {text}
                  </div>
                )}
              </div>
            </div>
          )}
          {children}
        </div>
      );
    }
    return loadingElement;
  };

  render() {
    return <>{this.renderLoading()}</>;
  }
}

export default Loading;
