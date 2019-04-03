import React from 'react';

export default interface PropsType {
  prefixCls?: string;
  style?: React.CSSProperties;
  top?: number | string;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'loading';
  title?: string;
  message?: string;
  stayTime?: number | string;
  btn?: React.ReactElement<any>;
  timeout?: null;
  willUnMount?: any;
  onClick?: (e?: React.SyntheticEvent<any>) => void;
  onClose?: (e?: React.SyntheticEvent<any>) => void;
  className?: string;
  isMessage?: boolean;
  key?: string;
}
