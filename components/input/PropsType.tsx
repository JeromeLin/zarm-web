import { ReactNode } from 'react';
export type size = 'xl' | 'lg' | 'sm' | 'xs';

export interface OtherProps {
  value?: string;
  defaultValue?: string;
  [propName: string]: any;
}

export interface ReactNodeFn {
  (): ReactNode;
}

export interface AddonIF {
  fillType?: 'fill' | 'default' | string;
  addon: ReactNodeFn | ReactNode;
}

export function isAddon(addon: ReactNode | AddonIF): addon is AddonIF {
  return !!addon && addon.hasOwnProperty('addon');
}

export interface AddonPropsIF {
  size?: size;
  addon: ReactNode | ReactNodeFn | AddonIF;
  shape: 'rect' | 'radius';
  position: 'before' | 'after';
  param?: any;
  composePosition?: 'before' | 'after' | 'middle';
}

interface PropsIF {
  prefixCls: 'string';
  type: string;                                 // default is text  若为 textarea 则转为 TextareaElement
  shape: 'rect' | 'radius';
  size?: 'xl' | 'lg' | 'sm' | 'xs';                          // 控制Input的大小
  value?: string | number;                                   // 组件的值
  addonPrefix?: AddonIF | ReactNode | ReactNodeFn;
  addonBefore?: AddonIF | ReactNode | ReactNodeFn;
  addonAfter?: AddonIF | ReactNode | ReactNodeFn;
  showLength?: boolean;
}

export default PropsIF;
