import React, { Component } from 'react';
import { InputProps, InputCoreProps, TextAreaProps } from './PropsType';
import Textarea from './Textarea';
import InputCore from './InputCore';
import Group from './Group';

class Input extends Component<InputProps, any> {
  static defaultProps = {
    prefixCls: 'zw-input',
    type: 'text',
    shape: 'radius',
    bordered: 'underline',
  };

  static Group: typeof Group;

  private input;

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  render() {
    const { type } = this.props;
    let children: React.ReactNode;
    if (type === 'textarea') {
      children = (
        <Textarea
          ref={(el) => {
            this.input = el;
          }}
          {...(this.props as TextAreaProps)}
        />
      );
    } else {
      children = (
        <InputCore
          ref={(el) => {
            this.input = el;
          }}
          {...(this.props as InputCoreProps)}
        />
      );
    }

    return children;
  }
}

export default Input;
