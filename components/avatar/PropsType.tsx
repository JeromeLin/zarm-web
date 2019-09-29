export interface PropsType {
  prefixCls?: string;
  shape?: 'circle' | 'square';
  size?: 'lg' | 'sm' | 'md' | 'xl' | 'xs';
  src?: string;
  alt?: string;
  className?: string;
}

export interface StateType {
  loadError: boolean;
  childrenScale: number;
}
