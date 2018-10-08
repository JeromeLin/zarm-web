export type column = {
  fixed?: boolean | string;
  [propName: string]: any;
};
export type rowSelection = {
  fixed?: boolean;
  [propName: string]: any;
};
export type colAttrsType = {
  fixedColThHeight: number;
  fixedColTdHeight: number;
  fixedleftColWidth: number;
  fixedrightColWidth: number;
};

export interface HeadProps {
  prefixCls?: string;
  rows: any[];
  sort: object;
  rowSelection?: rowSelection;
  dataSource: object[];
  expandedRowRender?: (row: any, index: number) => React.ReactNode;
  onSort: (column: column) => void;
  renderSelectAll: (
    rowSelection: rowSelection,
    dataSource: object[],
    rowSpan: number,
    height?: number,
  ) => React.ReactNode;
}

export interface BodyProps {
  prefixCls?: string;
  dataSource: object[];
  dataColumns: object[];
  rowSelection?: rowSelection;
  rowClick?: (row: any) => void;
  onEnterRow: (index: number) => void;
  onLeaveRow: () => void;
  rowKey?: (row: any, index: number) => string | string;
  expandedRowKeys: any[];
  toggleExpandRow: (key: string, row: any) => void;
  expandedRowRender?: (row: any, index: number) => React.ReactNode;
  renderCell: (column: column, row: any, rowIndex: number, columnIndex: number) => React.ReactNode;
  renderSelect: (rowSelection: rowSelection, row: any, height?: number) => React.ReactNode;
  rowClassName?: (row: any) => string;
}

export interface CellProps {
  maxCellSize: number;
  column: column;
  row: any;
  rowIndex: number;
  columnIndex: number;
}

export interface SorterProps {
  prefixCls?: string;
  column: column;
  sort: object;
  onSort: (column: column) => void;
}

export interface FixedColumnProps {
  prefixCls?: string;
  direction: string;
  columns: column[];
  dataSource: object[];
  colAttrs: colAttrsType;
  rowSelection?: rowSelection;
  rowClassName?: (row: any) => string;
  onEnterRow: (index: number) => void;
  onLeaveRow: () => void;
  renderSelectAll?: (
    rowSelection: rowSelection,
    dataSource: object[],
    rowSpan: number,
    height: number,
  ) => React.ReactNode;
  renderSelect?: (rowSelection: rowSelection, row: any, height: number) => React.ReactNode;
}

export default interface PropsType {
  prefixCls?: string;
  size?: string;
  hover?: boolean;
  isHover?: boolean;
  bordered?: boolean;
  isBordered?: boolean;
  isLoading?: boolean;
  striped?: boolean;
  isStriped?: boolean;
  radius?: boolean;
  isRadius?: boolean;
  className?: string;
  columns: column[];
  rowClick?: (row: any) => void;
  rowSelection?: rowSelection;
  rowKey?: (row: any, index: number) => string | string;
  defaultExpandAllRows?: boolean;
  defaultExpandedRowKeys?: any[];
  expandedRowKeys?: any[];
  expandedRowRender?: (row: any, index: number) => React.ReactNode;
  onExpand?: (expanded: boolean, row: any) => void;
  style?: object;
  width?: number;
  maxCellSize: 20;
  dataSource: object[];
  rowClassName?: (row: any) => string;
}
