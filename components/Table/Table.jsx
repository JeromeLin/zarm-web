
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Loading from '../Loading';

class Table extends Component {

  render () {
    const props = this.props;
    const { isBordered, isStriped, isRadius, isLoading, size, className } = props;

    const cls = classnames({
      'ui-table'         : true,
      'ui-table-bordered': ('bordered' in props || isBordered),
      'ui-table-striped' : ('striped' in props || isStriped),
      'ui-table-radius'  : ('radius' in props || isRadius),
      [`size-${size}`]   : !!size,
      [className]        : !!className,
    });

    const content = isLoading ? <Loading visible={true}>{this.renderTable()}</Loading>
                              : this.renderTable();
    return (
      <div className={cls}>
        <div className="ui-table-body">
          {content}
        </div>
      </div>
    );
  }

  renderTable() {
    const { columns, dataSource, ...others } = this.props;

    return (
      <table {...others}>
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
      return <th key={index} width={column.width}>{column.render(column, index)}</th>;
    else
      return <th key={index} width={column.width}>{column.title}</th>;
  }

  renderCell(column, row, rowIndex) {
    const value = row[column.dataIndex];

    if ('cellRender' in column)
      return <td key={column.dataIndex}>{column.cellRender(value, row, rowIndex)}</td>;
    else
      return <td key={column.dataIndex}>{value}</td>;
  }
}

Table.propTypes = {
  size      : PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBordered: PropTypes.bool,
  isStriped : PropTypes.bool,
  isRadius  : PropTypes.bool,
};

Table.defaultProps = {
  isBordered: false,
  isStriped : false,
  isRadius  : false,
};

export default Table;