
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Table extends Component {

  render () { 
    const { isBordered, className, columns, dataSource, ...others } = this.props;

    const cls = classnames({
      'ui-table'         : true,
      'ui-table-bordered': ('bordered' in this.props || isBordered),
      [className]        : !!className,
    });

    return (
      <table {...others} className={cls}>
        <thead>
          <tr>
          {
            columns.map((column, index) => this.renderColumn(column, index))
          }
          </tr>
        </thead>
        <tbody>
          {
            dataSource.map((row, index) => {
              let rowIndex = index;
              return (
                <tr key={rowIndex}>
                {
                  columns.map((column, index) => this.renderCell(column, row, rowIndex))
                }  
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  renderColumn(column, index) {
    if ('render' in column)
      return <th key={index} width={column.width}>{column.render(column, this.props.dataSource, index)}</th>;
    else
      return <th key={index} width={column.width}>{column.title}</th>;
  }

  renderCell(column, row, rowIndex) {
    const text = row[column.dataIndex];

    if ('cellRender' in column)
      return <td key={column.dataIndex}>{column.cellRender(text, row, rowIndex)}</td>;
    else
      return <td key={column.dataIndex}>{text}</td>;
  }
}

export default Table;