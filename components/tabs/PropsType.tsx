import React from 'react';

export type cardType = 'card' | 'line' | 'noborder-card';
export type directionType = 'horizontal' | 'vertical';
export type sizeType = 'sm' | 'md' | 'lg';

export default interface TabsProps {
  value?: number;
  defaultValue?: number;
  type?: cardType;
  direction?: directionType;
  animated?: boolean;
  size?: sizeType;
  style?: object;
  className?: string;
  prefixCls?: string;
  onChange: (index: number) => void;
  onTabClose: (index: number) => void;
}

export interface PropsType {
  prefixCls?: string;
  className?: string;
  style?: object;
  disabled?: boolean;
  closable?: boolean;
  title?: string | React.ReactNode;
}
