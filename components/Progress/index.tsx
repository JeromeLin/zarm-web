import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Progress extends Component<PropsType, any> {
  static defaultProps = {
    theme: 'default',
    size: null,
    isBlock: false,
    isRadius: false,
    isRound: false,
    className: null,
    percent: 0,
  };

  textRender(percent) {
    const render =
      'render' in this.props ? (
        this.props.render!(percent)
      ) : (
        <span className="ui-progress-line-text">{percent}%</span>
      );
    return render;
  }
  render() {
    const { props } = this;
    const {
      isRadius,
      isRound,
      percent,
      theme,
      size,
      className,
      style,
    } = this.props;

    const cls = classnames({
      'ui-progress': true,
      radius: 'radius' in props || isRadius,
      round: 'round' in props || isRound,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={style}>
        <div className="ui-progress-line-outer">
          <div className="ui-progress-line-inner">
            <div className="ui-progress-bg" style={{ width: `${percent}%` }} />
          </div>
        </div>
        {this.textRender(percent)}
      </div>
    );
  }
}

export default Progress;
