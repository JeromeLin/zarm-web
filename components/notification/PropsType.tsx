import React from 'react';

export default interface PropsType {
  prefixCls?: string;
  style?: React.CSSProperties;
  top?: number | string;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'loading';
  title?: string;
  message?: string;
  stayTime?: number | string;
  timeout?: null;
  willUnMount?: any;
  onClick?: (e: React.SyntheticEvent) => void;
  className?: string;
  isMessage?: boolean;
}
