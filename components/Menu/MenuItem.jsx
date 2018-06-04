import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class MenuItem extends Component {
  render() {
    const { props } = this;
    const {
      checked, isDisabled, children, onClick, style, onDoubleClick,
    } = props;

    const cls = classnames({
      'ui-menu-item': true,
      selected: !!checked,
      disabled: 'disabled' in props || isDisabled,
    });

    return (
      <li
        className={cls}
        role="menuitem"
        style={style}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {children}
      </li>
    );
  }
}

MenuItem.propTypes = {
  checked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
};

MenuItem.defaultProps = {
  checked: false,
  isDisabled: false,
  onClick: () => {},
  onDoubleClick: () => {},
};

export default MenuItem;
