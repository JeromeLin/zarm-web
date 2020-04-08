import { CSSProperties, ReactNode } from 'react';

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
  style?: CSSProperties;
  className?: string;
  prefixCls?: string;
  onChange?: (index?: number) => void;
  onTabClose?: (index?: number) => void;
  onPrevClick?: (e?: MouseEvent) => void;
  onNextClick?: (e?: MouseEvent) => void;
}

export interface TabPanelProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  closable?: boolean;
  title?: ReactNode;
}
