import React, { Component } from 'react';
import * as classnames from 'classnames';
import Menu from '../Menu';
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
    const className = classnames({
      'ui-select-option': true,
      'active': checked,
      'disabled': disabled,
    });
    return (
      <li
        className={className}
        data-checked={checked}
        onClick={e => props.onChange(e)}
        onDoubleClick={onDoubleClick}
      >
        {children}
      </li>
    );
  }
}

export default Option;
