import { CSSProperties, ReactNode } from 'react';

export type StepsDirection = 'horizontal' | 'vertical';
export type StepsStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepsProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  current?: number;
  direction?: StepsDirection;
  status?: StepsStatus;
  onChange?: (current?: number) => void;
}

export interface StepsItemProps {
  className?: string;
  style?: CSSProperties;
  title: ReactNode;
  description?: ReactNode;
  status?: StepsStatus;
  disabled?: boolean;
}
