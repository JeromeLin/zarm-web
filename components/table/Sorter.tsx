import React, { Component } from 'react';
import classnames from 'classnames';
import { SorterProps } from './PropsType';

class Sorter extends Component<SorterProps, any> {
  render() {
    const { prefixCls, column, sort, onSort } = this.props;
    const sorted = sort[column.dataIndex];
    const sortUpCls = classnames({
      [`${prefixCls}-sorter-up`]: true,
      [`${prefixCls}-sorter-active`]: !!sorted,
    });
    const sortDownCls = classnames({
      [`${prefixCls}-sorter-down`]: true,
      [`${prefixCls}-sorter-active`]: sorted !== undefined && !sorted,
    });

    return column.sorter ? (
      <span className={`${prefixCls}-sorter`} onClick={() => onSort(column)}>
        <span className={sortUpCls} />
        <span className={sortDownCls} />
      </span>
    ) : null;
  }
}

export default Sorter;
