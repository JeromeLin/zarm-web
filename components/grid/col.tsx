import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);

export interface ColSize {
  span?: number;
  order?: number;
  offset?: number;
  push?: number;
  pull?: number;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: string | number;
  span?: number;
  order?: number;
  offset?: number;
  push?: number;
  pull?: number;
  xs?: number | ColSize;
  sm?: number | ColSize;
  md?: number | ColSize;
  lg?: number | ColSize;
  prefixCls?: string;
}

export default class Col extends Component<ColProps, {}> {
  static propTypes = {
    span: PropTypes.number,
    order: PropTypes.number,
    offset: PropTypes.number,
    push: PropTypes.number,
    pull: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
    xs: objectOrNumber,
    sm: objectOrNumber,
    md: objectOrNumber,
    lg: objectOrNumber,
  };

  render() {
    const { props } = this;
    const { span, order, offset, push, pull, className, children, prefixCls = 'col', gutter, style, ...others } = props;
    let sizeClassObj = {};
    ['xs', 'sm', 'md', 'lg'].forEach((size) => {
      let sizeProps: ColSize = {};
      if (typeof props[size] === 'number') {
        sizeProps.span = props[size];
      } else if (typeof props[size] === 'object') {
        sizeProps = props[size] || {};
      }

      delete others[size];

      sizeClassObj = {
        ...sizeClassObj,
        [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
        [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
        sizeProps.offset || sizeProps.offset === 0,
        [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
      };
    });
    const cls = classnames(prefixCls, className, sizeClassObj, {
      'gutter-row': gutter,
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull,
    });
    const colStyle = gutter ? { paddingLeft: Number(gutter) / 2, paddingRight: Number(gutter) / 2 } : {};

    return (
      <div
        className={cls}
        style={{ ...style, ...colStyle }}
      >
        {children}
      </div>
    );
  }
}
