import React, { Component } from 'react';
import Menu from '../menu';
import Icon from '../icon';
import { OptionProps, IDisableProps } from './PropsType';

class Option extends Component<OptionProps, any> {
  static defaultProps = {
    isDisabled: false,
    onChange: () => { },
  };

  render() {
    const { props } = this;
    const {
      children, checked, disabled, isDisabled, onDoubleClick,
    } = props;

    const disableProps: IDisableProps = {
      isDisabled,
    };
    if (disabled) {
      disableProps.disabled = true;
    }
    return (
      <Menu.Item
        checked={checked}
        {...disableProps}
        onClick={e => props.onChange(e)}
        onDoubleClick={onDoubleClick}
      >
        {children}
        {checked && <Icon className="checked-icon" theme="info" type="right" />}
      </Menu.Item >
    );
  }
}

export default Option;
