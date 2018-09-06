import { CSSProperties } from 'react';

export interface PropsType {
  prefixCls?: string;
  separator?: string;
  className?: string;
  style?: CSSProperties;
}

export interface ItemPropsType {
  separator?: string;
  href?: string;
  className?: string;
  style?: CSSProperties;
}
