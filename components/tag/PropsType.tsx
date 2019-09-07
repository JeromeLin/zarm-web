import { ReactNode, CSSProperties } from 'react';

export type TagSize = 'lg' | 'md' | 'sm' | 'xs';
export type TagShape = 'radius' | 'round' | 'rect';

export default interface TagProps {
  prefixCls?: string;
  size?: TagSize;
  shape: TagShape;
  color?: string;
  closable?: boolean;
  bordered?: boolean;
  className?: ReactNode;
  style?: CSSProperties;
  onClick: (e) => void;
  onClose: (e) => void;
}

export interface CheckableTagProps {
  prefixCls?: string;
  style?: CSSProperties;
  className?: string;
  shape?: TagShape;
  size?: TagSize;
  bordered?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: boolean) => void;
}
