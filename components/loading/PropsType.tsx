import { CSSProperties } from 'react';

export type LoadingSize = 'lg' | 'sm' | 'xs';
export default interface PropsType {
  prefixCls?: string;
  visible?: boolean;
  style?: CSSProperties;
  text?: React.ReactNode;
  size?: LoadingSize;
  className?: string;
  fullscreen?: boolean;
  indicator?: React.ReactElement;
  delay?: number;
}
