import React from 'react';

export type cardType = 'card' | 'line' | 'noborder-card';
export type directionType = 'horizontal' | 'vertical';
export type sizeType = 'sm' | 'md' | 'lg';

export interface GroupProps {
  value?: number;
  defaultValue?: number;
  type?: cardType;
  direction?: directionType;
  animated?: boolean;
  closable?: boolean;
  size?: sizeType;
  style?: object;
  className?: string;
  prefixCls?: string;
  onChange: (index: number) => void;
  onClose: (index: number) => void;
  onTabClose: (targetIndex: number) => void;
  onPrevClick: (index: number) => void;
  onNextClick: (index: number) => void;
}

export default interface PropsType {
  prefixCls?: string;
  className?: string;
  style?: object;
  disabled?: boolean;
  closable?: boolean;
  title?: string | React.ReactNode;
}
