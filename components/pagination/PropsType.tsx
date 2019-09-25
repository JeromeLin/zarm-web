export default interface PropsType {
  prefixCls?: string;
  className?: string;
  style?: object;
  value?: number;
  defaultValue?: number;
  pageSize: number;
  pageSizeOptions?: Array<number>;
  total: number;
  showTotal?: boolean;
  showQuickJumper?: boolean;
  showPageSizeChanger?: boolean;
  simple?: boolean;
  size?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  onPageSizeChange: (value: number, pageSize: number) => void;
  locale?: { [propName: string]: any };
  onChange: (pageInfo: { currentPage: number; pageSize: number }) => void;
}
