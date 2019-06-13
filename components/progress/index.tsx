import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Progress extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-progress',
    theme: 'default',
    size: null,
    isBlock: false,
    isRadius: false,
    isRound: false,
    className: null,
    percent: 0,
  };

  textRender(percent) {
    const { prefixCls, render } = this.props;
    const renderNode = 'render' in this.props ? (
        render!(percent)
    ) : (
      <span className={`${prefixCls}-line-text`}>{percent}%</span>
    );
    return renderNode;
  }

  render() {
    const {
      prefixCls,
      isRadius,
      isRound,
      percent,
      theme,
      size,
      className,
      style,
    } = this.props;

    const cls = classnames({
      [prefixCls!]: true,
      radius: 'radius' in this.props || isRadius,
      round: 'round' in this.props || isRound,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={style}>
        <div className={`${prefixCls}-line-outer`}>
          <div className={`${prefixCls}-line-inner`}>
            <div className={`${prefixCls}-bg`} style={{ width: `${percent}%` }} />
          </div>
        </div>
        {this.textRender(percent)}
      </div>
    );
  }
}

export default Progress;
