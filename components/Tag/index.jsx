
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

class Tag extends Component {

  render () {
    const props = this.props;
    const { theme, size, isRadius, isRound, isActive, isFocus, isDisabled, className, onClose, children, ...others } = props;
    const disabled = ('disabled' in props || isDisabled);

    const cls = classnames({
      'ui-tag'           : true,
      'radius'           : ('radius' in props || isRadius),
      'round'            : ('round' in props || isRound),
      'active'           : ('active' in props || isActive),
      'focus'            : ('focus' in props || isFocus),
      'disabled'         : disabled,
      [`theme-${theme}`] : !!theme,
      [`size-${size}`]   : !!size,
      [className]        : !!className,
    });

    const closeIcon = onClose
                   ? <Icon type="close" onClick={!disabled && onClose} />
                   : null;
    return (
      <div className={cls}>{children}{closeIcon}</div>
    );
  }
}

Tag.propTypes = {
  theme   : PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  size    : PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  onClose : PropTypes.func,
};

Tag.defaultProps = {
  theme   : 'default',
  size    : null,
};

export default Tag;