export type theme = 'defualt' | 'info' | 'success' | 'warning' | 'error';
export type size = 'xl'| 'lg'| 'sm'| 'xs';

export default interface PropsType {
  prefixCls?: string;
  theme?: theme;
  size?: size;
  className?: string;
  radius?: boolean;
  isRadius?: boolean;
  round?: boolean;
  isRound?: boolean;
  mask?: boolean;
  percent?: number;
  style?: object;
  render?: (percent: number) => React.ReactNode;
  onMaskClick?: () => void;
}
