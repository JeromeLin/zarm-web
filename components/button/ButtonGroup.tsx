import * as React from 'react';
import classNames from 'classnames';
import { ButtonGroupProps } from './PropsType';

const ButtonGroup: React.SFC<ButtonGroupProps> = (props) => {
  const { prefixCls = 'zw-btn-group', size, className, ...others } = props;

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}--${size}`]: size,
  });

  return <div {...others} className={cls} />;
};

export default ButtonGroup;
