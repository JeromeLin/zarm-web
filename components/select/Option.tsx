import React, { Component } from 'react';
import cn from 'classnames';
import Checkbox from '../checkbox';
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
        {showCheckIcon && <Checkbox checked={checked}>{children}</Checkbox>}
        {!showCheckIcon && children}
      </li>
    );
  }
}

export default Option;
