import React, { Component } from 'react';
import { InputProps } from './PropsType';
import Textarea from './Textarea';
import InputCore from './InputCore';

class Input extends Component<InputProps, any> {
  static defaultProps = {
    prefixCls: 'zw-input',
    type: 'text',
    shape: 'radius',
    bordered: true,
  };

  render() {
    let children: React.ReactNode;
    if (this.props.type === 'textarea') { // eslint-disable-line
      children = <Textarea {...this.props} />;
    } else {
      children = <InputCore {...this.props} />;
    }

    return children;
  }
}

export default Input;
