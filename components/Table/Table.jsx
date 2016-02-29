
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Table extends Component {

  render () { 
    const { className, columns, dataSource, ...others } = this.props;

    const cls = classnames({
      'ui-table'         : true,
      [className]        : !!className,
    });

    return (
      <table {...others} className={cls}>
        <thead>
          <tr>
          {
            columns.map((column, index) => {
              return <th key={index} width={column.width}>{column.title}</th>;
            })
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

  renderCell(column, row, rowIndex) {
    const text = row[column.dataIndex];

    if ('render' in column)
      return <td key={column.dataIndex}>{column.render(text, row, rowIndex)}</td>;
    else
      return <td key={column.dataIndex}>{text}</td>;
  }
}

export default Table;