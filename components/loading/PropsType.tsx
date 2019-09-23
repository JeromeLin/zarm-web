import { CSSProperties } from 'react';

export type Size = 'xl' | 'lg' | 'sm' | 'xs';
export default interface PropsType {
  prefixCls?: string;
  visible?: boolean;
  style?: CSSProperties;
  text?: React.ReactElement;
  size?: Size;
  className?: string;
  fullscreen?: boolean;
  indicator?: React.ReactElement;
  delay?: number;
}
