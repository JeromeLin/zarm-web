import { CSSProperties, ReactNode } from 'react';

export type directionType = 'horizontal' | 'vertical';
export type stepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepsProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  current?: number;
  direction?: directionType;
  status?: stepStatus;
  onChange?: (current: number) => void;
}

export interface StepProps {
  className?: string;
  style?: CSSProperties;
  title: ReactNode;
  description?: ReactNode;
  status?: stepStatus;
  disabled?: boolean;
}
