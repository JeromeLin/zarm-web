import { MouseEventHandler, HTMLAttributes } from 'react';

// tslint:disable-next-line:max-line-length
export type animationType = 'fade' | 'door' | 'flip' | 'rotate' | 'zoom' | 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';

export interface ModalProps {
  prefixCls?: string;
  visible?: boolean;
  animationType?: animationType;
  animationDuration?: number;
  width?: number | string;
  minWidth?: number | string;
  className?: string;
  isRadius?: boolean;
  isRound?: boolean;
  onKeyPress?(e: KeyboardEvent): void;
  onMaskClick?(): void;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  height?: number | string;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  closable: boolean;
  onClose?: MouseEventHandler<HTMLDivElement>;
}

export interface StyleType {
  modal: {
    display?: string;
    [index: string]: any;
  };
  dialog: {
    width: string | number | undefined;
    minWidth: string | number | undefined;
    [index: string]: any;
  };
}
