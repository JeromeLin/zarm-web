import React, { Component } from 'react';
import Radio from './Radio';
import PropsType from './PropsType';

export default class RadioButton extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-radio-button',
  };

  render() {
    const radioProps = { ...this.props };

    return <Radio prefixCls="zw-radio-button" {...radioProps} />;
  }
}
