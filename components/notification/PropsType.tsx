import React from 'react';

export type Type = 'success' | 'warning' | 'info' | 'error';
export interface PropsType {
  prefixCls?: string;
  style?: React.CSSProperties;
  top?: number | string;
  type?: Type;
  title?: string;
  message?: string;
  stayTime: number;
  btn?: React.ReactElement<any>;
  timeout?: null;
  willUnMount?: any;
  onClick?: (e?: React.SyntheticEvent<any>) => void;
  onClose?: (e?: React.SyntheticEvent<any>) => void;
  className?: string;
  isMessage?: boolean;
}
export interface NotificationApi {
  info(props: PropsType): void;
  error(props: PropsType): void;
  success(props: PropsType): void;
  warning(props: PropsType): void;
  open(props: PropsType): void;
}
