import React from 'react';
import classNames from 'classnames';
import { GroupProps } from './PropsType';

const Group: React.SFC<GroupProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    size,
    compact,
    children,
    ...rest
  } = props;
  const cls = classNames(
    prefixCls,
    className,
    {
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--compact`]: compact,
    },
  );

  return (
    <div
      className={cls}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

Group.defaultProps = {
  prefixCls: 'zw-input-group',
  size: 'md',
  compact: true,
};

export default Group;
