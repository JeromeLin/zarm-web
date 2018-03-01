
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
    const { columns, dataSource, rowClick, rowSelection, ...others } = this.props;
    const { headRows, dataColumns } = this.groupColumns(columns);
    const cls = classnames({
      'ui-table-multi-headrow': headRows.length > 1
    });

    return (
      <table {...others} className={cls}>
        <thead>
          {
            headRows.map((row, index) => {
              return (
                <tr key={index}>
                  {
                    rowSelection && index === 0
                    ? this.renderSelectAll(rowSelection, dataSource, headRows.length)
                    : null
                  }
                  {row.map((column, columnIndex) => this.renderColumn(column, columnIndex))}
                </tr>
              );
            })
          }
        </thead>
        <tbody>
          {
            dataSource.map((row, rowIndex) => {
              const renderSelect = rowSelection
                                 ? this.renderSelect(rowSelection, row)
                                 : null;
              const renderCell = dataColumns.map((column, columnIndex) => {
                return this.renderCell(column, row, rowIndex, columnIndex);
              });

              return (
                <tr key={rowIndex} onClick={() => typeof rowClick === 'function' && rowClick(row)}>
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
  renderSelectAll(rowSelection, dataSource, rowSpan) {
    return (
      <th style={{width:50, textAlign: 'center'}} rowSpan={rowSpan}>
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
      <th
        key={column.dataIndex + index}
        width={column.width}
        rowSpan={column.rowSpan}
        colSpan={column.colSpan} >
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

    // 渲染需合并的单元格
    if (typeof render === 'object' && ('colSpan' in render || 'rowSpan' in render)) {
      return this.renderMergedCell(column, columnIndex, render);
    }
    return <td key={column.dataIndex + columnIndex}>{render}</td>;
  }

  // 合并单元格
  renderMergedCell(column, columnIndex, render) {
    const { colSpan, rowSpan, value } = render;
    if (colSpan === 0 || rowSpan === 0) {
      return null;
    }
    return (
      <td
        key={column.dataIndex + columnIndex}
        colSpan={colSpan}
        rowSpan={rowSpan}
        >
        {value}
      </td>
    );
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

  // 表头分组
  groupColumns(columns, currentRow = 0, parentColumn = {}, rows = [], dataColumns = []) {
    rows[currentRow] = rows[currentRow] || [];
    let group = [];

    function setRowSpan(column) {
      let rowSpan = rows.length - currentRow;
      if (column && !column.children &&
      rowSpan > 1 && (!column.rowSpan || column.rowSpan < rowSpan)) {
        column.rowSpan = rowSpan;
      }
    }
    columns.forEach((column, index) => {
      let newColumn = { ...column };
      rows[currentRow].push(newColumn);
      parentColumn.colSpan = parentColumn.colSpan || 0;
      if (newColumn.children && newColumn.children.length > 0) {
        newColumn.children = this.groupColumns(newColumn.children, currentRow + 1, newColumn, rows, dataColumns).group;
        parentColumn.colSpan = parentColumn.colSpan + newColumn.colSpan;
      } else {
        dataColumns.push(newColumn);
        parentColumn.colSpan++;
      }

      for (let i = 0; i < rows[currentRow].length - 1; ++i) {
        setRowSpan(rows[currentRow][i]);
      }
      if (index + 1 === columns.length) {
        setRowSpan(newColumn);
      }
      group.push(newColumn);
    });
    return { group, headRows: rows, dataColumns };
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
