import { MouseEvent } from 'react';
export type theme = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'loading';

export default interface PropsType {
  prefixCls?: string;
  type?: string;
  theme?: theme;
  style?: object;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}
