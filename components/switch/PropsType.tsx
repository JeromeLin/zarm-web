import React, { ReactNode } from 'react';

export interface PropsType {
  prefixCls?: string;
  size?: 'sm';
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
  onChange: (e: React.MouseEvent<HTMLSpanElement>, checked: boolean) => void;
  className?: string;
}

export interface StateType {
  checked?: boolean;
}
