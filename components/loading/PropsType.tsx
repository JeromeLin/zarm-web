import { CSSProperties, ReactNode } from 'react';

export type LoadingSize = 'md' | 'lg' | 'sm';

export default interface PropsType {
  prefixCls?: string;
  size?: LoadingSize;
  style?: CSSProperties;
  className?: string;
  visible?: boolean;
  text?: ReactNode;
  fullscreen?: boolean;
  indicator?: ReactNode;
  delay?: number;
}
