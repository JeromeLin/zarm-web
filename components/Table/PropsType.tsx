export type column = {
  fixed?: boolean | string;
  [propName: string]: any;
};
export type rowSelection = {
  fixed?: boolean;
  [propName: string]: any;
};
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
  style?: object;
  width?: number;
  dataSource: object[];
}
