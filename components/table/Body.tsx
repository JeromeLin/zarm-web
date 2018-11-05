import React, { Component } from 'react';
import classnames from 'classnames';
import { BodyProps } from './PropsType';

class Body extends Component<BodyProps, any> {

  // @ts-ignore
  private scrollbody;
  // @ts-ignore
  private row;

  getRowKey(row, index) {
    const { rowKey } =  this.props;
    let key;

    if (rowKey) {
      key = typeof rowKey === 'function' ? rowKey(row, index) : row[rowKey];
    } else {
      key = index;
    }
    return key;
  }

  handleToggleExpandRow(e, key, row) {
    e.stopPropagation();
    const { toggleExpandRow } = this.props;

    toggleExpandRow(key, row);
  }

  renderExpandIcon(row, index) {
    const { prefixCls, expandedRowRender, expandedRowKeys } = this.props;
    const key = this.getRowKey(row, index);
    const cls = classnames(`${prefixCls}-expand-icon`, {
      [`${prefixCls}-icon-expanded`]: expandedRowKeys.indexOf(key) > -1,
      [`${prefixCls}-icon-collapsed`]: expandedRowKeys.indexOf(key) < 0,
    });

    if (expandedRowRender) {
      return (
        <td onClick={(e) => this.handleToggleExpandRow(e, key, row)}><span className={cls} /></td>
      );
    }
  }

  renderExpandedRow(row, index) {
    const {
      expandedRowRender, expandedRowKeys, rowSelection,
      prefixCls, dataColumns,
    } = this.props;
    const key = this.getRowKey(row, index);
    let colSpan = dataColumns.length + 1;

    if (rowSelection) {
      colSpan += 1;
    }
    if (expandedRowKeys.indexOf(key) > -1) {
      return (
        <tr key={`expanded-row-${index}`} className={`${prefixCls}-expanded-row`}>
          <td colSpan={colSpan}>
            {expandedRowRender && expandedRowRender(row, index)}
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }

  render() {
    const {
      dataSource, dataColumns, rowSelection, renderSelect,
      renderCell, onEnterRow, onLeaveRow, rowClick, rowClassName,
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
            const rowClass = classnames({
              [`${rowClassName && rowClassName(row)}`]: !!rowClassName && rowClassName(row),
            });

            const refAttr = rowIndex === 0 ? { ref: (row) => { this.row = row; } } : {};
            return (
              [
                <tr
                  key={rowIndex}
                  {...refAttr}
                  onMouseEnter={() => onEnterRow(rowIndex)}
                  onMouseLeave={() => onLeaveRow()}
                  onClick={() => typeof rowClick === 'function' && rowClick(row)}
                  className={rowClass}
                >
                  {this.renderExpandIcon(row, rowIndex)}
                  {selection}
                  {cells}
                </tr>,
                this.renderExpandedRow(row, rowIndex),
              ]
            );
        })}
      </tbody>
    );
  }
}

export default Body;
