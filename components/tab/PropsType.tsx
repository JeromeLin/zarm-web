import React from 'react';

export type theme = 'default' | 'info' | 'success' | 'warning' | 'error';

export type cardType = 'card' | 'line';

export interface GroupProps {
  prefixCls?: string;
  theme?: theme;
  value?: string;
  defaultValue?: string;
  radius?: boolean;
  isRadius?: boolean;
  className?: string;
  style?: object;
  type?: cardType;
  onChange: (value: any) => void;
}

export default interface PropsType {
  prefixCls?: string;
  selected?: boolean;
  title?: string | React.ReactNode;
  className?: string;
  style?: object;
  disabled?: boolean;
}
