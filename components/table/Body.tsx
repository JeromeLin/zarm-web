import React, { Component } from 'react';
import { BodyProps } from './PropsType';

class Body extends Component<BodyProps, any> {

  // @ts-ignore
  private scrollbody;
  // @ts-ignore
  private row;

  renderExpandIcon() {
    // TODO
    const { prefixCls, expandedRowRender } = this.props;

    if (expandedRowRender) {
      return (
        <td><span className={`${prefixCls}-expand-icon`} /></td>
      );
    }
  }
  render() {
    const {
      dataSource, dataColumns, rowSelection, renderSelect,
      renderCell, onEnterRow, onLeaveRow, rowClick,
    } = this.props;
    return (
      <tbody ref={(scrollbody) => { this.scrollbody = scrollbody; }}>
        {
          dataSource.map((row, rowIndex) => {
          const selection = rowSelection
            ? renderSelect(rowSelection, row)
            : null;
          const cells = dataColumns.map((column, columnIndex) => {
            return renderCell(column, row, rowIndex, columnIndex);
          });

          const refAttr = rowIndex === 0 ? { ref: (row) => { this.row = row; } } : {};
          return (
            <tr
              key={rowIndex}
              {...refAttr}
              onMouseEnter={() => onEnterRow(rowIndex)}
              onMouseLeave={() => onLeaveRow()}
              onClick={() => typeof rowClick === 'function' && rowClick(row)}
            >
              {selection}
              {cells}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default Body;
