import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Form extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-form',
    type: 'horizontal',
    className: null,
  };
  static Item;
  render() {
    const {
      type, className, children, style, prefixCls,
    } = this.props;

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-${type}`]: 'type' in this.props,
      [className!]: !!className,
    });

    return (
      <form className={cls} style={style}>
        {children}
      </form>
    );
  }
}

export default Form;
