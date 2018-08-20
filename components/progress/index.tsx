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
    const { prefixCls } = this.props;
    const render =
      'render' in this.props ? (
        this.props.render!(percent)
      ) : (
        <span className={`${prefixCls}-line-text`}>{percent}%</span>
      );
    return render;
  }
  render() {
    const { props } = this;
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
      radius: 'radius' in props || isRadius,
      round: 'round' in props || isRound,
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
