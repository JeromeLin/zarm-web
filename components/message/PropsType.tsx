export type theme = 'info' | 'warning' | 'success' | 'error';
export type message = { m: string, duration?: number };

export interface ItemProps {
  prefixCls?: string;
  content?: React.ReactNode;
  theme?: theme;
  duration?: number;
  style?: object;
}

export default interface PropsType {
  prefixCls?: string;
  theme?: theme;
  msg: message[];
  duration?: number;
  style?: object;
}
