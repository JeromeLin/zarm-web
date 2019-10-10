export default interface PropsType {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: number;
  defaultValue?: number;
  locale?: { [propName: string]: any };
  pageSize: number;
  pageSizeOptions?: Array<number>;
  total: number;
  showTotal?: boolean;
  showQuickJumper?: boolean;
  showPageSizeChanger?: boolean;
  simple?: boolean;
  size?: 'md' | 'sm';
  onPageSizeChange: (pageSize?: number) => void;
  onChange: (page?: number) => void;
}
