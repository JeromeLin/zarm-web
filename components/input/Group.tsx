import React, { isValidElement, cloneElement } from 'react';
import classNames from 'classnames';
import { InputGroupProps } from './PropsType';

const Group: React.SFC<InputGroupProps> = (props) => {
  const { prefixCls, className, style, size, shape, compact, children, ...rest } = props;

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}--${size}`]: size,
    [`${prefixCls}--compact`]: compact,
  });

  const items = React.Children.map(children, (element) => {
    if (isValidElement(element)) {
      return cloneElement(element, {
        ...element.props,
        size,
        shape,
      });
    }

    return null;
  });

  return (
    <div className={cls} style={style} {...rest}>
      {items}
    </div>
  );
};

Group.defaultProps = {
  prefixCls: 'zw-input-group',
  compact: true,
};

export default Group;
