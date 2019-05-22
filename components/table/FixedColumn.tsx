import React, { Component } from 'react';
import classnames from 'classnames';
import { FixedColumnProps } from './PropsType';

class FixedColumn extends Component<FixedColumnProps, any> {
  renderRows(fixedColumns, height) {
    const { dataSource, onEnterRow, onLeaveRow, rowClassName, rowSelection, renderSelect } = this.props;
    const size = dataSource.length;
    let iHeight = parseInt(height, 10);

    if (isNaN(iHeight)) {
      iHeight = 41;
    }
    return dataSource.map((data, index) => {
      const tdHeight = index === size - 1 ? iHeight - 1 : height;
      const rowClass = classnames({
        [`${rowClassName && rowClassName(data)}`]: !!(rowClassName && rowClassName(data)),
      });
      return (
        <tr
          key={index}
          onMouseEnter={() => onEnterRow(index)}
          onMouseLeave={() => onLeaveRow()}
          className={rowClass}
        >
          {rowSelection && renderSelect!(rowSelection, data, tdHeight)}
          {fixedColumns.map(({ render, dataIndex, title }) => {
              return (
                <td key={title} style={{ height: tdHeight }}>
                  {
                    typeof render === 'function'
                    ? render(data[dataIndex], data, index)
                    : data[dataIndex]
                  }
                </td>
              );
            })}
        </tr>
      );
    });
  }

  getFixedColumns() {
    const { direction, columns = [] } = this.props;

    return columns.filter(({ fixed }) => fixed === direction);
  }

  render() {
    const {
        direction, prefixCls, colAttrs, rowSelection,
        renderSelectAll, dataSource,
      } = this.props;
    const {
      fixedColThHeight, fixedColTdHeight,
    } = colAttrs;
    const fixedColumns = this.getFixedColumns();

    if (!fixedColumns.length && (!rowSelection || (rowSelection && !rowSelection.fixed))) {
      // 没有固定列，并且没有复选框或复选框不需要固定
      return null;
    }
    const cls = `${prefixCls}-fixed-${direction}`;

    return (
      <table
        ref={(fixedCol) => { this[`fixed${direction}Col`] = fixedCol; }}
        className={cls}
      >
        <thead>
          <tr>
            {
              direction === 'left' && rowSelection &&
              renderSelectAll!(
                rowSelection,
                dataSource,
                1,
                fixedColThHeight,
              )
            }
            {fixedColumns.map(({ title }) => {
                return (
                  <th key={title} style={{ height: fixedColThHeight }}>
                    {title}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody
          ref={(fixedTbody) => { this[`fixed${direction}Tbody`] = fixedTbody; }}
        >
          {this.renderRows(fixedColumns, fixedColTdHeight)}
        </tbody>
      </table>
    );
  }
}

export default FixedColumn;
