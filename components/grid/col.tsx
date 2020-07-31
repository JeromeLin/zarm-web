import React, { useContext } from 'react';
import cls from 'classnames';
import { GutterContext } from './row';

type FlexType = number | 'none' | 'auto' | string;

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  offset?: number;
  push?: number;
  pull?: number;
  order?: number;
  flex?: FlexType;
  prefixCls?: string;
}

function parseFlex(flex: FlexType): string {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }

  return flex;
}

export default function Col(props: ColProps) {
  const {
    children,
    span,
    offset,
    push,
    pull,
    order,
    flex,
    className,
    style,
    prefixCls = 'zw-col',
  } = props;
  const { gutter } = useContext(GutterContext);

  const x = gutter[0] / 2;
  const y = gutter[1] / 2;

  const clsName = cls([
    prefixCls,
    className,
    { [`${prefixCls}-span-${span}`]: span !== undefined },
    { [`${prefixCls}-offset-${offset}`]: offset !== undefined },
    { [`${prefixCls}-push-${push}`]: push !== undefined },
    { [`${prefixCls}-pull-${pull}`]: pull !== undefined },
    { [`${prefixCls}-order-${order}`]: order !== undefined },
  ]);

  const innerStyle = {
    ...(x > 0 ? { paddingLeft: x, paddingRight: x } : {}),
    ...(y > 0 ? { paddingTop: y, paddingBottom: y } : {}),
    ...(flex ? { flex: parseFlex(flex) } : {}),
    ...style,
  };

  return (
    <div style={innerStyle} className={clsName}>
      {children}
    </div>
  );
}
