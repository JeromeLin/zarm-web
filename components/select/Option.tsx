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
    const { props } = this;
    const {
      children, checked, disabled, onDoubleClick, showCheckIcon,
    } = props;

    const cls = cn({
      'za-option-list': true,
      'is-checked': checked,
      'is-disabled': disabled,
    });
    return (
      <li
        className={cls}
        style={{ paddingRight: showCheckIcon ? 25 : 10 }}
        onClick={e => props.onChange(e)}
        onDoubleClick={onDoubleClick}
      >
        {children}
        {showCheckIcon && checked && <Icon className="checked-icon" theme="primary" type="right" />}
      </li>
    );
  }
}

export default Option;
