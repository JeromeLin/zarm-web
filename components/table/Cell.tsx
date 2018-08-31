import React, { Component } from 'react';
import Popover from '../popover';
import { CellProps } from './PropsType';

class Cell extends Component<CellProps, any> {
  renderMergedCell(column, columnIndex, render) {
    const { maxCellSize } = this.props;
    const { colSpan, rowSpan, value } = render;
    const { style = {} } = column;
    if (colSpan === 0 || rowSpan === 0) {
      return null;
    }
    // 字符长度判断
    if (typeof value === 'string' && value.length > maxCellSize) {
      return (
        <td
          key={column.dataIndex + columnIndex}
          style={style}
          colSpan={colSpan}
          rowSpan={rowSpan}
        >
          <Popover trigger="hover" direction="top" content={value}>
            <div className="ellipsis-cell" style={{ maxWidth: 15 * maxCellSize }}>{value}</div>
          </Popover>
        </td>
      );
    }
    return (
      <td
        style={style}
        key={column.dataIndex + columnIndex}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {value}
      </td>
    );
  }

  render() {
    const { maxCellSize, column, row, rowIndex, columnIndex } = this.props;
    const value = row[column.dataIndex];
    const { style = {} } = column;
    const render =
      'render' in column ? column.render(value, row, rowIndex) : value;

    // 渲染需合并的单元格
    if (render && typeof render === 'object' &&
      ('colSpan' in render || 'rowSpan' in render)
    ) {
      return this.renderMergedCell(column, columnIndex, render);
    }
    // 字符长度判断
    if (typeof render === 'string' && render.length > maxCellSize) {
      return (
        <td key={column.dataIndex + columnIndex} style={style}>
          <Popover trigger="hover" direction="top" content={render}>
            <div className="ellipsis-cell" style={{ maxWidth: 15 * maxCellSize }}>{render}</div>
          </Popover>
        </td>
      );
    }
    return <td key={column.dataIndex + columnIndex} style={style}>{render}</td>;
  }
}

export default Cell;
