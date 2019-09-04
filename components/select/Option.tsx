import React, { Component } from 'react';
import cn from 'classnames';
import Icon from '../icon';
import { OptionProps } from './PropsType';
import Menu from '../menu';

class Option extends Component<OptionProps, any> {
  static displayName: 'Option';

  static defaultProps = {
    isDisabled: false,
    onChange: () => { },
  };

  render() {
    const { props } = this;
    const {
      children, className, checked, disabled, onChange, isDisabled, onDoubleClick, showCheckIcon,
      ...DOMProps
    } = props;

    const cls = cn({
      [`${className}`]: !!className,
      checked,
      disabled: isDisabled || disabled,
    });
    return (
      <Menu.Item
        isDisabled={isDisabled}
        checked={checked}
        className={cls}
        style={{ paddingRight: showCheckIcon ? 25 : 10 }}
        onClick={onChange}
        onDoubleClick={onDoubleClick}
        {...DOMProps}
      >
        {children}
        {showCheckIcon && checked && <Icon className="checked-icon" theme="info" type="right" />}
      </Menu.Item>
    );
  }
}

export default Option;
