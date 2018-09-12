import React, { Component } from 'react';
import Sorter from './Sorter';
import { HeadProps } from './PropsType';

class Head extends Component<HeadProps, any> {

  // @ts-ignore
  private thead;
  // @ts-ignore
  private leftCell;
  // @ts-ignore
  private rightCell;
  // 排序渲染
  renderSorter(column) {
    const { prefixCls, sort, onSort } = this.props;

    return (
      <Sorter
        prefixCls={prefixCls}
        sort={sort}
        onSort={onSort}
        column={column}
      />
    );
  }

  // 表头列渲染
  renderColumn(column, index, rowIndex, length) {
    const render =
      'columnRender' in column
        ? column.columnRender(column, index)
        : column.title;
    const {
      dataIndex, width, rowSpan, colSpan, style = {},
    } = column;

    let refAttr = {};
    if (rowIndex === 0) {
      if (index === 0) {
        refAttr = { ref: (leftCell) => { this.leftCell = leftCell; } };
      } else if (index === length - 1) {
        refAttr = { ref: (rightCell) => { this.rightCell = rightCell; } };
      }
    }
    return (
      <th
        key={dataIndex + index}
        rowSpan={rowSpan}
        colSpan={colSpan}
        style={{ ...style, width }}
        {...refAttr}
      >
        {render}
        {this.renderSorter(column)}
      </th>
    );
  }

  renderExpandIconPlaceholder() {
    const { expandedRowRender } = this.props;

    if (expandedRowRender) {
      return (
        <th key="expand-icon">
          <span />
        </th>
      );
    }
  }

  render() {
    const {
      rows, renderSelectAll, rowSelection, dataSource,
    } = this.props;
    const headRows = rows.map((row, index) => {
      return (
        <tr key={index}>
          {this.renderExpandIconPlaceholder()}
          {
            rowSelection && index === 0
            ? renderSelectAll(
                rowSelection,
                dataSource,
                rows.length,
              )
            : null}
          {
            row.map((column, columnIndex) =>
            this.renderColumn(column, columnIndex, index, row.length))}
        </tr>
      );
    });
    return (
      <thead ref={(thead) => { this.thead = thead; }}>
        {headRows}
      </thead>
    );
  }
}

export default Head;
