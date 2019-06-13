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
      'za-option__list': true,
      'is-checked': checked,
      'is-disabled': disabled,
    });
    return (
      <li
        className={cls}
        style={{ paddingRight: showCheckIcon ? 25 : 10 }}
        onClick={e => onChange && onChange(e)}
        onDoubleClick={onDoubleClick}
      >
        {children}
        {showCheckIcon && checked && <Icon className="checked-icon" theme="primary" type="right" />}
      </li>
    );
  }
}

export default Option;
