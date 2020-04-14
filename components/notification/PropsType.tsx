import React from 'react';

export type NotificationIcon = 'default' | 'error' | 'success' | 'warning' | 'info' | 'loading';

export enum NotificationPositions {
  topLeft = 'topLeft',
  topRight = 'topRight',
  topCenter = 'topCenter',
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight',
}

export interface NotificationPropsBase {
  prefixCls?: string;

  style?: React.CSSProperties;
  className?: string;

  stayTime?: number;
  position?: NotificationPositions;

  icon?: React.ReactElement | NotificationIcon;
  content: React.ReactNode;

  onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;

  key?: string;
  top?: number | string;
  bottom?: number | string;
}

export interface NotificationProps extends NotificationPropsBase {
  title: React.ReactNode;
  footer?: React.ReactNode;
}

export interface NotificationReturnInstance {
  close(): void;
}

export interface NotificationInstance {
  open(props: NotificationProps): NotificationReturnInstance;
  success(options: NotificationOptions): NotificationReturnInstance;
  warning(options: NotificationOptions): NotificationReturnInstance;
  info(options: NotificationOptions): NotificationReturnInstance;
  error(options: NotificationOptions): NotificationReturnInstance;
  close(key: string): void;
  closeAll(): void;
  destroy(): void;
}

export interface NotificationStackItemProps extends NotificationPropsBase {
  Component: React.ComponentClass<NotificationPropsBase>;
  name?: string;
  willUnmount?: () => void;
}
