import React, { Component } from 'react';
import Menu from '../Menu';
import Icon from '../Icon';
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
        {checked && <Icon style={{ float: 'right', marginRight: 10 }} type="right" theme="info" />}
      </Menu.Item >
    );
  }
}

export default Option;
