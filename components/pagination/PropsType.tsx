export default interface PropsType {
  prefixCls?: string;
  value?: number;
  defaultValue?: number;
  pageSize: number;
  pageSizeSource?: Array<number>;
  total: number;
  showTotal?: boolean;
  showJumper?: boolean;
  showPageSizeSelector?: boolean;
  simple?: boolean;
  size?: string;
  className?: string;
  style?: object;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  onPageChange: (value: number, pageSize: number) => void;
  onPageSizeChange: (value: number, pageSize: number) => void;
  locale?: { [propName: string]: any };
  onChange: (pageInfo: { currentPage: number; pageSize: number }) => void;
}
