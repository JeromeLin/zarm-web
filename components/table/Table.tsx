import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Loading from '../loading';
import Checkbox from '../checkbox';
import domUtil from '../utils/dom';
import rAF from '../utils/rAF';
import FixedColumn from './FixedColumn';
import Cell from './Cell';
import Head from './Head';
import Body from './Body';
import { groupColumns, toggleHoverStatus } from './helpers';

class Table extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-table',
    size: 'md',
    isBordered: false,
    isStriped: false,
    isRadius: false,
    isHover: false,
    maxCellSize: 20,
    defaultExpandAllRows: false,
    columns: [],
    dataSource: [],
  };

  private scrollTable;
  private head;
  private body;
  private fixedLeftColumn;
  private fixedRightColumn;

  constructor(props) {
    super(props);
    const selectedRows =
      'rowSelection' in props
        ? props.rowSelection.value || props.rowSelection.defaultValue || []
        : [];
    const expandedRowKeys = this.getExpandedRowKeys();
    this.state = {
      selectedRows,
      sort: {},
      fixedColAttrs: {},
      expandedRowKeys,
    };
  }

  componentDidMount() {
    rAF.rAF(() => this.getFixedColAttrs());
  }

  componentWillReceiveProps(nextProps) {
    if ('rowSelection' in nextProps && 'value' in nextProps.rowSelection) {
      this.setState({
        selectedRows: nextProps.rowSelection.value,
      });
    }
    if (nextProps.dataSource !== this.props.dataSource) {
      // 数据变更重新计算固定列宽高
      rAF.rAF(() => this.getFixedColAttrs());
    }
  }

  onSort = (column) => {
    const { dataSource } = this.props;
    const sort = !this.state.sort[column.dataIndex];

    sort ? dataSource.sort(column.sorter) : dataSource.reverse();

    this.setState({
      sort: {
        [`${column.dataIndex}`]: sort,
      },
    });
  }

  onEnterRow = (index) => {
    const { fixedleftTbody } = this.fixedLeftColumn;
    const { fixedrightTbody } = this.fixedRightColumn;
    const { scrollbody } = this.body;

    if (!fixedleftTbody && !fixedrightTbody) {
      return;
    }

    [fixedleftTbody, fixedrightTbody, scrollbody].forEach((tbody) => {
      if (tbody) {
        toggleHoverStatus(tbody.querySelectorAll('tr'), index);
      }
    });
  }

  onLeaveRow = () => {
    this.onEnterRow(-1);
  }

  onScrollTable = (e) => {
    const { fixedleftCol } = this.fixedLeftColumn;
    const { fixedrightCol } = this.fixedRightColumn;
    const { getStyleComputedProperty } = domUtil;
    const { scrollLeft } = e.target;
    const containerWidth = parseInt(getStyleComputedProperty(e.target, 'width'), 10);
    const scrollTableWidth = parseInt(getStyleComputedProperty(this.scrollTable, 'width'), 10);

    if (containerWidth < scrollTableWidth) {
      if (fixedleftCol) {
        if (scrollLeft > 0) {
          fixedleftCol.classList.add('shadow');
        } else {
          fixedleftCol.classList.remove('shadow');
        }
      }
      if (fixedrightCol) {
        if (scrollLeft + containerWidth < scrollTableWidth) {
          fixedrightCol.classList.add('shadow');
        } else {
          fixedrightCol.classList.remove('shadow');
        }
      }
    }
  }

  getRowKey = (row, index) => {
    const { rowKey } =  this.props;
    let key;

    if (rowKey) {
      key = typeof rowKey === 'function' ? rowKey(row, index) : row[rowKey];
    } else {
      key = index;
    }
    return key;
  }

  // 获取初始化展开行
  getExpandedRowKeys() {
    const {
      expandedRowKeys, defaultExpandAllRows, defaultExpandedRowKeys, dataSource,
    } = this.props;

    if (defaultExpandAllRows) {
      return dataSource.map(this.getRowKey);
    }
    if (expandedRowKeys) {
      return Array.isArray(expandedRowKeys) ? expandedRowKeys : [expandedRowKeys];
    }
    if (defaultExpandedRowKeys) {
      return Array.isArray(defaultExpandedRowKeys) ? defaultExpandedRowKeys : [defaultExpandedRowKeys];
    }
    return [];
  }

  // 同步单元格宽度和高度
  getFixedColAttrs() {
    const { columns, rowSelection } = this.props;
    const { getStyleComputedProperty } = domUtil;

    if (!columns || columns.length < 2) {
      return;
    }
    const firstColumn = columns[0];
    const lastColumn = columns[columns.length - 1];
    const { thead, leftCell, rightCell } = this.head;
    const { row } = this.body;

    if (firstColumn.fixed || lastColumn.fixed || (rowSelection && rowSelection.fixed)) {
      const fixedColThHeight = getStyleComputedProperty(thead, 'height');
      const fixedleftColWidth = getStyleComputedProperty(leftCell, 'width');
      const fixedrightColWidth = getStyleComputedProperty(rightCell, 'width');
      let fixedColTdHeight = '40';
      if (row) {
        fixedColTdHeight = getStyleComputedProperty(row, 'height');
      }

      this.setState({
        fixedColAttrs: {
          fixedColThHeight,
          fixedColTdHeight,
          fixedleftColWidth,
          fixedrightColWidth,
        },
      });
    }
  }

  // 处理收起展开行
  toggleExpandRow = (key, row) => {
    const { onExpand } = this.props;
    const { expandedRowKeys } = this.state;
    const index = expandedRowKeys.indexOf(key);
    const keys = [...expandedRowKeys];

    if (index > -1) {
      keys.splice(index, 1);
    } else {
      keys.push(key);
    }

    if (onExpand) {
      onExpand(index < 0, row);
    }
    this.setState({
      expandedRowKeys: keys,
    });
  }

  // 渲染固定左侧的列
  renderFixedLeftCol() {
    const { columns, prefixCls, dataSource, rowSelection, rowClassName } = this.props;
    const { fixedColAttrs } = this.state;
    return (
      <FixedColumn
        ref={(fixedColumn) => { this.fixedLeftColumn = fixedColumn; }}
        direction="left"
        rowClassName={rowClassName}
        prefixCls={prefixCls}
        columns={columns}
        dataSource={dataSource}
        colAttrs={fixedColAttrs}
        renderSelect={this.renderSelect}
        renderSelectAll={this.renderSelectAll}
        rowSelection={rowSelection}
        onEnterRow={this.onEnterRow}
        onLeaveRow={this.onLeaveRow}
      />
    );
  }

  // 渲染固定右侧的列
  renderFixedRightCol() {
    const { columns, prefixCls, dataSource, rowClassName } = this.props;
    const { fixedColAttrs } = this.state;
    return (
      <FixedColumn
        ref={(fixedColumn) => { this.fixedRightColumn = fixedColumn; }}
        direction="right"
        rowClassName={rowClassName}
        prefixCls={prefixCls}
        columns={columns}
        dataSource={dataSource}
        colAttrs={fixedColAttrs}
        onEnterRow={this.onEnterRow}
        onLeaveRow={this.onLeaveRow}
      />
    );
  }

  // 渲染全选
  renderSelectAll = (rowSelection, dataSource, rowSpan, height = 50) => {
    return (
      <th
        style={{ minWidth: 50, height, textAlign: 'center' }}
        rowSpan={rowSpan}
      >
        <Checkbox
          checked={dataSource.length > 0 && (this.state.selectedRows.length === dataSource.length)}
          onChange={(e) => {
            const selected = e.target.checked;
            const selectedRows = selected ? dataSource.map(data => data) : [];

            this.setState({ selectedRows });
            if (rowSelection.onSelectAll) {
              rowSelection.onSelectAll(selected, selectedRows);
            }
          }}
        />
      </th>
    );
  }

  // 渲染单选
  renderSelect = (rowSelection, row, height = 40) => {
    return (
      <td style={{ width: 50, height, textAlign: 'center' }}>
        <Checkbox
          value={row}
          checked={this.state.selectedRows.indexOf(row) > -1}
          onChange={(e) => {
            const selected = e.target.checked;
            const { selectedRows } = this.state;

            if (selectedRows.indexOf(row) === -1) {
              selectedRows.push(row);
            } else {
              selectedRows.splice(selectedRows.indexOf(row), 1);
            }
            this.setState({ selectedRows });
            if (rowSelection.onSelect) {
              rowSelection.onSelect(selected, row, selectedRows);
            }
          }}
        />
      </td>
    );
  }

  // 渲染单元格
  renderCell = (column, row, rowIndex, columnIndex) => {
    const { maxCellSize } = this.props;
    return (
      <Cell
        key={column.dataIndex + rowIndex + columnIndex}
        maxCellSize={maxCellSize}
        row={row}
        rowIndex={rowIndex}
        column={column}
        columnIndex={columnIndex}
      />
    );
  }

  renderTable() {
    const {
      prefixCls,
      columns,
      dataSource,
      rowClick,
      rowKey,
      rowSelection,
      style,
      width,
      expandedRowRender,
      rowClassName,
    } = this.props;
    const { sort, expandedRowKeys } = this.state;
    const { headRows, dataColumns } = groupColumns(columns);
    const cls = classnames({
      [`${prefixCls}-scroll`]: true,
      [`${prefixCls}-multi-headrow`]: headRows.length > 1,
    });

    return (
      <table
        className={cls}
        style={{ ...style, width }}
        ref={(scrollTable) => { this.scrollTable = scrollTable; }}
      >
        <Head
          ref={(head) => { this.head = head; }}
          prefixCls={prefixCls}
          rows={headRows}
          sort={sort}
          expandedRowRender={expandedRowRender}
          rowSelection={rowSelection}
          dataSource={dataSource}
          onSort={this.onSort}
          renderSelectAll={this.renderSelectAll}
        />
        <Body
          prefixCls={prefixCls}
          ref={(body) => { this.body = body; }}
          rowSelection={rowSelection}
          dataSource={dataSource}
          dataColumns={dataColumns}
          rowKey={rowKey}
          expandedRowKeys={expandedRowKeys}
          expandedRowRender={expandedRowRender}
          toggleExpandRow={this.toggleExpandRow}
          onEnterRow={this.onEnterRow}
          onLeaveRow={this.onLeaveRow}
          rowClassName={rowClassName}
          rowClick={rowClick}
          renderCell={this.renderCell}
          renderSelect={this.renderSelect}
        />
      </table>
    );
  }

  render() {
    const { props } = this;
    const {
      isBordered,
      isStriped,
      isRadius,
      isHover,
      isLoading,
      size,
      className,
      prefixCls,
    } = props;

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-bordered`]: 'bordered' in props || isBordered,
      [`${prefixCls}-striped`]: 'striped' in props || isStriped,
      [`${prefixCls}-radius`]: 'radius' in props || isRadius,
      [`${prefixCls}-hover`]: 'hover' in props || isHover,
      [`size-${size}`]: !!size,
      [className!]: !!className,
    });

    const content = isLoading ? (
      <Loading visible>{this.renderTable()}</Loading>
    ) : (
      this.renderTable()
    );

    return (
      <div className={cls}>
        <div className={`${prefixCls}-body`} onScroll={this.onScrollTable}>
          {content}
          {this.renderFixedLeftCol()}
          {this.renderFixedRightCol()}
        </div>
      </div>
    );
  }
}

export default Table;
