import React from 'react';

export type TabsType = 'card' | 'line' | 'noborder-card';
export type TabsDirection = 'horizontal' | 'vertical';
export type TabsSize = 'sm' | 'md' | 'lg';

export default interface TabsProps {
  value?: number;
  defaultValue?: number;
  type?: TabsType;
  direction?: TabsDirection;
  animated?: boolean;
  size?: TabsSize;
  style?: object;
  className?: string;
  prefixCls?: string;
  onChange: (index: number) => void;
  onTabClose: (index: number) => void;
}

export interface TabProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  disabled?: boolean;
  closable?: boolean;
  title?: string | React.ReactNode;
}
