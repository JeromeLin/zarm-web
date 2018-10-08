import React, { Component } from 'react';
import classnames from 'classnames';
import { FixedColumnProps } from './PropsType';

class FixedColumn extends Component<FixedColumnProps, any> {
  renderRows(column, height) {
    const { dataSource, onEnterRow, onLeaveRow, rowClassName } = this.props;
    const { render, dataIndex } = column;
    const size = dataSource.length;
    let iHeight = parseInt(height, 10);

    if (isNaN(iHeight)) {
      iHeight = 41;
    }
    return dataSource.map((data, index) => {
      const tdHeight = index === size - 1 ? iHeight - 1 : height;
      const rowClass = classnames({
        [`${rowClassName && rowClassName(data)}`]: !!rowClassName && rowClassName(data),
      });
      return (
        <tr
          key={index}
          onMouseEnter={() => onEnterRow(index)}
          onMouseLeave={() => onLeaveRow()}
          className={rowClass}
        >
          <td style={{ height: tdHeight }}>
            {
              typeof render === 'function'
              ? render(data[dataIndex], data, index)
              : data[dataIndex]
            }
          </td>
        </tr>
      );
    });
  }

  renderSelection(thHeight, tdHeight) {
    const {
      prefixCls, direction, rowSelection, renderSelect,
      renderSelectAll, onEnterRow, onLeaveRow, dataSource, rowClassName,
    } = this.props;
    const size = dataSource.length;
    let iHeight = parseInt(tdHeight, 10);

    if (isNaN(iHeight)) {
      iHeight = 41;
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
              rowSelection
              ? renderSelectAll!(
                  rowSelection,
                  dataSource,
                  1,
                  thHeight,
                )
              : null
            }
          </tr>
        </thead>
        <tbody
          ref={(fixedTbody) => { this[`fixed${direction}Tbody`] = fixedTbody; }}
        >
          {
            dataSource.map((data, index) => {
              const height = index === size - 1 ? iHeight - 1 : tdHeight;
              const rowClass = classnames({
                [`${rowClassName && rowClassName(data)}`]: !!rowClassName && rowClassName(data),
              });
              return (
                <tr
                  key={index}
                  onMouseEnter={() => onEnterRow(index)}
                  onMouseLeave={() => onLeaveRow()}
                  className={rowClass}
                >
                  {
                    rowSelection
                    ? renderSelect!(rowSelection, data, height)
                    : null
                  }
                </tr>
              );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { direction, columns = [],  prefixCls, colAttrs, rowSelection } = this.props;
    const {
      fixedColThHeight, fixedColTdHeight,
      fixedleftColWidth, fixedrightColWidth,
    } = colAttrs;
    const column = direction === 'left' ? columns[0] : columns[columns.length - 1];
    const columnWidth = direction === 'left' ? fixedleftColWidth : fixedrightColWidth;

    if (!column) {
      return null;
    }
    const { fixed, title } = column;
    const cls = `${prefixCls}-fixed-${direction}`;

    if (direction === 'left' && rowSelection && rowSelection.fixed) {
      return this.renderSelection(fixedColThHeight, fixedColTdHeight);
    }
    if (fixed && fixed === direction) {
      return (
        <table
          ref={(fixedCol) => { this[`fixed${direction}Col`] = fixedCol; }}
          className={cls}
        >
          <thead>
            <tr>
              <th style={{ width: columnWidth, height: fixedColThHeight }}>
                {title}
              </th>
            </tr>
          </thead>
          <tbody
            ref={(fixedTbody) => { this[`fixed${direction}Tbody`] = fixedTbody; }}
          >
            {this.renderRows(column, fixedColTdHeight)}
          </tbody>
        </table>
      );
    }
    return null;
  }
}

export default FixedColumn;
