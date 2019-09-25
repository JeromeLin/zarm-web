import React, { Component } from 'react';
import Radio from './Radio';
import PropsType from './PropsType';

export default class RadioButton extends Component<PropsType> {
  static defaultProps = {
    prefixCls: 'zw-radio-button',
  };

  render() {
    const radioProps = { ...this.props };

    return <Radio {...radioProps} />;
  }
}
