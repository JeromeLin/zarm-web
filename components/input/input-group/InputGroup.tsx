import React, { Component, HTMLAttributes } from 'react';
import cn from 'classnames';

interface PropsIF extends HTMLAttributes<HTMLDivElement> {
  prefixCls: string;
}

class InputGroup extends Component<PropsIF, {}> {
  static defaultProps = {
    prefixCls: 'ui-input-group',
  };
  render() {
    const { prefixCls, className, ...others } = this.props;
    const cls = cn({
      [`${prefixCls}`]: !!prefixCls,
      [`${className}`]: !!className,
    });
    return (
      <div className={cls} {...others}>
        {this.props.children}
      </div>
    );
  }
}

export default InputGroup;
