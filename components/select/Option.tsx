import React, { Component } from 'react';
import cn from 'classnames';
import Icon from '../icon';
import { OptionProps } from './PropsType';

class Option extends Component<OptionProps, any> {
  static defaultProps = {
    isDisabled: false,
    onChange: () => { },
  };

  render() {
    const {
      children, checked, disabled, onDoubleClick, showCheckIcon, onChange,
    } = this.props;

    const cls = cn({
      'zw-option__list': true,
      'is-checked': checked,
      'is-disabled': disabled,
    });
    return (
      <li
        className={cls}
        onClick={(e) => onChange && onChange(e)}
        onDoubleClick={onDoubleClick}
      >
        {children}
        {showCheckIcon && checked && (
          <Icon
            className="checked-icon"
            theme="primary"
            type="right"
            size="sm"
          />
        )}
      </li>
    );
  }
}

export default Option;
