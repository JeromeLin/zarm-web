import React from 'react';
import cls from 'classnames';
import './style/row.scss';

type Align = 'top' | 'middle' | 'bottom' | 'stretch';
type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | [number, number];
  align?: Align;
  justify?: Justify;
}

export const GutterContext = React.createContext({ gutter: [0, 0] });

export default function Row(props: RowProps) {
  const { align, justify, className, style, children } = props;
  let { gutter = 0 } = props;

  if (!Array.isArray(gutter)) {
    gutter = [gutter, 0];
  }

  const x = gutter[0] / 2;
  const y = gutter[1] / 2;

  const innerStyle = {
    ...(x > 0 ? { marginLeft: -x, marginRight: -x } : {}),
    ...(y > 0 ? { marginTop: -y, marginBottom: y } : {}),
    ...style,
  };

  const clsName = cls(
    className,
    'zarm-row',
    { [`zarm-row-${align}`]: align },
    { [`zarm-row-${justify}`]: justify },
  );

  return (
    <div className={clsName} style={innerStyle}>
      <GutterContext.Provider value={{ gutter }}>
        {children}
      </GutterContext.Provider>
    </div>
  );
}
