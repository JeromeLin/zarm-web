import { HTMLAttributes } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  shape?: 'circle' | 'square';
  size?: 'lg' | 'sm' | 'md' | 'xl' | 'xs';
  src?: string;
  alt?: string;
}
