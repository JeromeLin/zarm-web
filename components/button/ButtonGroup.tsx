import React from 'react';
import classNames from 'classnames';
import { ButtonGroupProps } from './PropsType';

const ButtonGroup: React.SFC<ButtonGroupProps> = (props) => {
  const { prefixCls = 'zw-button-group', size, className, ...others } = props;

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}--${size}`]: size,
  });

  return <div {...others} className={cls} />;
};

export default ButtonGroup;
