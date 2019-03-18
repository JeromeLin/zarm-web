import * as React from 'react';
import classNames from 'classnames';
import { ButtonGroupProps } from './PropsType';

const ButtonGroup: React.SFC<ButtonGroupProps> = props => {
  const { prefixCls = 'za-btn-group', size, className, ...others } = props;

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}--${size}`]: size,
    },
    className,
  );

  return <div {...others} className={cls} />;
};

export default ButtonGroup;
