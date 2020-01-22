import React from 'react';

export enum Positions {
  topLeft = 'topLeft', topRight = 'topRight', topCenter = 'topCenter',
  bottomLeft = 'bottomLeft', bottomRight = 'bottomRight'
}

export type IconType = 'default' | 'error' | 'success' | 'warning' | 'info' | 'loading';
export type APIPropsType = ItemPropsType | string | React.ReactElement;

export interface ItemPropsType {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;

  position?: Positions;
  stayTime?: number;

  title?: string;
  icon?: React.ReactElement | IconType;
  message?: string | React.ReactElement;
  footer?: React.ReactElement;

  onClick?: (e?: React.SyntheticEvent<any>) => void;
  onClose?: (e?: React.SyntheticEvent<any>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;

  key?: string;
  top?: number;
  bottom?: number;
  getContainer?: () => HTMLElement | HTMLElement;
}

export interface PropsType extends ItemPropsType {
  Component: React.ComponentClass<ItemPropsType>;
  name?: string;
  willUnmount?: () => void;
}

export interface APIReturn {
  close(): void;
}

export interface NotificationAPI {
  open(props: ItemPropsType): APIReturn;
  success(props: APIPropsType): APIReturn;
  warning(props: APIPropsType): APIReturn;
  info(props: APIPropsType): APIReturn;
  error(props: APIPropsType): APIReturn;
  close(key: string): void;
  closeAll(): void;
  destroy(): void;
}
