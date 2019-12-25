import React, { Component } from 'react';
import { InputProps, InputCoreProps, TextAreaProps } from './PropsType';
import Textarea from './Textarea';
import InputCore from './InputCore';

class Input extends Component<InputProps, any> {
  static defaultProps = {
    prefixCls: 'zw-input',
    type: 'text',
    shape: 'radius',
    bordered: 'underline',
  };

  render() {
    const { type } = this.props;
    let children: React.ReactNode;
    if (type === 'textarea') {
      children = <Textarea {...this.props as TextAreaProps} />;
    } else {
      children = <InputCore {...this.props as InputCoreProps} />;
    }

    return children;
  }
}

export default Input;
