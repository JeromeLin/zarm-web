export default interface PropsType {
  // 样式前缀
  prefixCls?: string;
  // 样式名
  className?: string;
  // 内联样式
  style?: React.CSSProperties;
  // 当前页
  value?: number;
  // 默认页
  defaultValue?: number;
  // 禁用
  disabled?: boolean;
  // 本地化
  locale?: { [propName: string]: any };
  // 每页条数
  pageSize: number;
  // 每页条数下拉框的选项
  pageSizeOptions?: Array<number>;
  // 数据总数
  total: number;
  // 是否展示总数
  showTotal?: boolean;
  // 是否展示跳转
  showQuickJumper?: boolean;
  // 是否展示每页条数选择器
  showPageSizeChanger?: boolean;
  // 是否简洁分页
  simple?: boolean;
  // 分页器尺寸
  size?: 'md' | 'sm';
  // 每页展示条数变更触发的事件
  onPageSizeChange: (pageSize?: number) => void;
  // 页面切换和跳转时触发的事件
  onChange: (page?: number) => void;
}
