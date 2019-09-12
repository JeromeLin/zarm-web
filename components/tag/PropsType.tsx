import { ReactNode, CSSProperties } from 'react';

export type TagSize = 'lg' | 'md' | 'sm' | 'xs';
export type TagShape = 'radius' | 'round' | 'rect';

interface BasicProps {
  prefixCls?: string;
  size?: TagSize;
  bordered?: boolean;
  shape: TagShape;
  className?: ReactNode;
  style?: CSSProperties;
}

interface CommonTagProps extends BasicProps {
  color?: string;
  closable?: boolean;
  onClose?: (e) => void;
}

interface CheckableProps extends BasicProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: (e: boolean) => void;
}

export type TagProps = React.HTMLAttributes<any> & CommonTagProps;

export type CheckableTagProps = React.HTMLAttributes<any> & CheckableProps;
