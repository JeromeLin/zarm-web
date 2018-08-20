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
  onMaskClick?: () => void;
}

export interface ModalBodyProps {
  prefixCls?: string;
  height?: number | string;
  style?: object;
  className?: string;
}

export interface ModalFooterProps {
  prefixCls?: string;
  style?: object;
  className?: string;
}

export interface ModalHeaderProps {
  prefixCls?: string;
  title?: string;
  style?: object;
  className?: string;
  onClose?: () => void;
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
