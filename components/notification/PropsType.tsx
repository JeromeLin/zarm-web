import React from 'react';

export type NotificationIcon = 'default' | 'error' | 'success' | 'warning' | 'info' | 'loading';
export type NotificationOptions = NotificationItemProps | React.ReactNode;

export enum NotificationPositions {
  topLeft = 'topLeft',
  topRight = 'topRight',
  topCenter = 'topCenter',
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight'
}

export interface NotificationItemProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;

  position?: NotificationPositions;
  stayTime?: number;

  icon?: React.ReactElement | NotificationIcon;
  title?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;

  locale?: {
    defaultTitles: {
      'error': string;
      'success': string;
      'warning': string;
      'default': string;
    };
  };

  onClick?: (e?: React.SyntheticEvent<any>) => void;
  onClose?: (e?: React.SyntheticEvent<any>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;

  key?: string;
  top?: number | string;
  bottom?: number | string;
  // getContainer?: () => HTMLElement | HTMLElement;
}

export interface NotificationProps extends NotificationItemProps {
  Component: React.ComponentClass<NotificationItemProps>;
  name?: string;
  willUnmount?: () => void;
}

export interface NotificationReturnInstance {
  close(): void;
}

export interface NotificationInstance {
  open(props: NotificationItemProps): NotificationReturnInstance;
  success(options: NotificationOptions): NotificationReturnInstance;
  warning(options: NotificationOptions): NotificationReturnInstance;
  info(options: NotificationOptions): NotificationReturnInstance;
  error(options: NotificationOptions): NotificationReturnInstance;
  close(key: string): void;
  closeAll(): void;
  destroy(): void;
}
