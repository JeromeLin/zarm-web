import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import PropsType from './PropsType';

class Tag extends Component<PropsType, any> {
  static defaultProps = {
    theme: 'default',
    size: null,
  };

  render() {
    const { props } = this;
    const {
      theme,
      size,
      isRadius,
      isRound,
      isActive,
      isFocus,
      isDisabled,
      className,
      onClose,
      children,
      style,
    } = props;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      'ui-tag': true,
      radius: 'radius' in props || isRadius,
      round: 'round' in props || isRound,
      active: 'active' in props || isActive,
      focus: 'focus' in props || isFocus,
      disabled,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    const closeIcon = typeof onClose === 'function' ? (
      <Icon
        type="wrong"
        onClick={() => { if (!disabled) { onClose(); } }}
      />
    ) : null;
    return (
      <div className={cls} style={style}>
        {children}
        {closeIcon}
      </div>
    );
  }
}

export default Tag;
