import React from 'react';
import { Positions } from './enums';

export type NotificationIcon = 'default' | 'error' | 'success' | 'warning' | 'info' | 'loading';
export type NotificationAPIProps = NotificationItemProps | React.ReactNode;

export interface NotificationItemProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;

  position?: Positions;
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
  top?: number;
  bottom?: number;
  // getContainer?: () => HTMLElement | HTMLElement;
}

export interface NotificationProps extends NotificationItemProps {
  Component: React.ComponentClass<NotificationItemProps>;
  name?: string;
  willUnmount?: () => void;
}

export interface NotificationAPIReturn {
  close(): void;
}

export interface NotificationAPI {
  open(props: NotificationItemProps): NotificationAPIReturn;
  success(props: NotificationAPIProps): NotificationAPIReturn;
  warning(props: NotificationAPIProps): NotificationAPIReturn;
  info(props: NotificationAPIProps): NotificationAPIReturn;
  error(props: NotificationAPIProps): NotificationAPIReturn;
  close(key: string): void;
  closeAll(): void;
  destroy(): void;
}
