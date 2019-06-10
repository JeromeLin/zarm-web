import React, { PureComponent, cloneElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

type Align = 'top' | 'middle' | 'top';
type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

export interface IProps {
  gutter?: string | number;
  prefixCls?: string;
  style?: object;
  className?: string;
  justify?: Justify;
  align?: Align;
  type?: 'flex' | undefined;
}

export default class Row extends PureComponent<IProps> {
  static defaultProps = {
    prefixCls: 'za-row',
    gutter: 0,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
    align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  };

  render() {
    const { gutter, prefixCls, style, className, children, justify, align, type } = this.props;
    const rowStyle = gutter ? { marginLeft: -gutter / 2, marginRight: -gutter / 2 } : {};
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--flex`]: type === 'flex',
      [`${prefixCls}--flex-${justify}`]: justify,
      [`${prefixCls}--flex-${align}`]: align,
    });

    return (
      <div className={cls} style={{ ...style, ...rowStyle }}>
        {
          React.Children.map(children, (element: React.ReactElement<any>, index) => cloneElement(element, {
            gutter,
            key: index,
          }))
        }
      </div>
    );
  }
}
