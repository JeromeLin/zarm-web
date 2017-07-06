
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Loading from '../Loading';
import Checkbox from '../Checkbox';

class Table extends Component {

  constructor(props) {
    super(props);
    let selectedRows = ('rowSelection' in props)
                     ? props.rowSelection.value || props.rowSelection.defaultValue || []
                     : [];
    this.state = {
      selectedRows: selectedRows,
      sort        : {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (('rowSelection' in nextProps) && ('value' in nextProps.rowSelection)) {
      this.setState({
        selectedRows: nextProps.rowSelection.value
      });
    }
  }

  render () {
    const props = this.props;
    const { isBordered, isStriped, isRadius, isHover, isLoading, size, className } = props;

    const cls = classnames({
      'ui-table'         : true,
      'ui-table-bordered': ('bordered' in props || isBordered),
      'ui-table-striped' : ('striped' in props || isStriped),
      'ui-table-radius'  : ('radius' in props || isRadius),
      'ui-table-hover'   : ('hover' in props || isHover),
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
    const { columns, dataSource, rowSelection, rowClick, ...others } = this.props;

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
            dataSource.map((row, rowIndex) => {
              const renderSelect = rowSelection
                                 ? this.renderSelect(rowSelection, row)
                                 : null;
              const renderCell = columns.map((column, columnIndex) => {
                return this.renderCell(column, row, rowIndex, columnIndex);
              });

              return (
                <tr key={rowIndex} onClick={() => { rowClick && rowClick(row); }}>
                  {renderSelect}
                  {renderCell}
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
        <Checkbox checked={this.state.selectedRows.length === dataSource.length} onChange={(e) => {
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
    let render = ('columnRender' in column)
               ? column.columnRender(column, index)
               : column.title;

    return (
      <th key={index} width={column.width}>
        {render}
        {this.renderSorter(column)}
      </th>
    );
  }

  // 排序渲染
  renderSorter(column) {
    const sort = this.state.sort[column.dataIndex];
    const sortUpCls = classnames({
      'ui-table-sorter-up'    : true,
      'ui-table-sorter-active': !!sort,
    });
    const sortDownCls = classnames({
      'ui-table-sorter-down'  : true,
      'ui-table-sorter-active': (sort !== undefined) && !sort,
    });

    return column.sorter ? (
      <span className="ui-table-sorter" onClick={() => this.onSort(column)}>
        <span className={sortUpCls}></span>
        <span className={sortDownCls}></span>
      </span>
    ) : null;
  }

  // 单元格渲染
  renderCell(column, row, rowIndex, columnIndex) {
    const value = row[column.dataIndex];
    const render = ('render' in column)
                 ? column.render(value, row, rowIndex)
                 : value;

    return <td key={column.dataIndex + columnIndex}>{render}</td>;
  }

  onSort(column) {
    const { dataSource } = this.props;
    const sort = !this.state.sort[column.dataIndex];

    sort ? dataSource.sort(column.sorter)
         : dataSource.reverse(column.sorter);

    this.setState({
      dataSource,
      sort: {
        [`${column.dataIndex}`]: sort,
      }
    });
  }
}

Table.propTypes = {
  size      : PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBordered: PropTypes.bool,
  isStriped : PropTypes.bool,
  isRadius  : PropTypes.bool,
  isHover   : PropTypes.bool,
};

Table.defaultProps = {
  isBordered: false,
  isStriped : false,
  isRadius  : false,
  isHover   : false,
};

export default Table;
