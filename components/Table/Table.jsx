
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Loading from '../Loading';
import Checkbox from '../Checkbox';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRows  : [],
    };
  }

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
    const { columns, dataSource, rowSelection, ...others } = this.props;

    return (
      <table {...others}>
        <thead>
          <tr>
            {rowSelection ? this.renderSelectAll(rowSelection, dataSource) : null}
            {columns.map((column, index) => this.renderColumn(column, index))}
          </tr>
        </thead>
        <tbody>
          {
            dataSource.map((row, index) => {
              let rowIndex = index;
              return (
                <tr key={rowIndex}>
                  {rowSelection ? this.renderSelect(rowSelection, row) : null}
                  {columns.map((column, index) => this.renderCell(column, row, rowIndex))}  
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  // 全选所有行
  renderSelectAll(rowSelection, dataSource) {
    return (
      <th style={{width:50, textAlign: 'center'}}>
        <Checkbox checked={this.state.selectedRows.length == dataSource.length} onChange={(e) => {
          const selected = e.target.checked;
          const selectedRows = selected
                             ? dataSource.map((data) => data)
                             : [];

          this.setState({selectedRows});
          rowSelection.onSelectAll && rowSelection.onSelectAll(selected, selectedRows);
        }} />
      </th>
    );
  }

  // 单选指定行
  renderSelect(rowSelection, row) {
    return (
      <td style={{width:50, textAlign: 'center'}}>
        <Checkbox value={row} checked={this.state.selectedRows.indexOf(row) > -1} onChange={(e) => {
          const selected = e.target.checked;
          let selectedRows = this.state.selectedRows;

          if (selectedRows.indexOf(row) === -1) {
            selectedRows.push(row);
          } else {
            selectedRows.splice(selectedRows.indexOf(row), 1);
          }
          this.setState({selectedRows});
          rowSelection.onSelect && rowSelection.onSelect(selected, row, selectedRows);
        }} />
      </td>
    );
  }

  // 表头渲染
  renderColumn(column, index) {
    if ('columnRender' in column)
      return <th key={index} width={column.width}>{column.columnRender(column, index)}</th>;
    else
      return <th key={index} width={column.width}>{column.title}</th>;
  }

  // 单元格渲染
  renderCell(column, row, rowIndex) {
    const value = row[column.dataIndex];

    if ('render' in column)
      return <td key={column.dataIndex}>{column.render(value, row, rowIndex)}</td>;
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