import React, { Component } from 'react';
import Radio from './Radio';
import PropsType from './PropsType';

export default class RadioButton extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'za-radio-button',
  };

  render() {
    const radioProps = { ...this.props };

    return <Radio prefixCls="za-radio-button" {...radioProps} />;
  }
}
