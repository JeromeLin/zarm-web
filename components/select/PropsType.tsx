import { CSSProperties, MouseEvent, ReactNode } from 'react';
export type size = 'xl' | 'lg' | 'sm' | 'xs';

export interface OptionProps {
  value?: string | number;
  checked?: boolean;
  disabled?: boolean;
  showCheckIcon?: boolean;
  style?: CSSProperties;
  onChange?: (e: MouseEvent) => void;
  onDoubleClick?: (e: MouseEvent) => void;
}

export interface IDisableProps {
  disabled?: boolean;
}

export interface MultipleProps {
  prefixCls?: string;
  checked?: boolean;
  disabled?: boolean;
  value?: any;
  size?: size;
  style?: CSSProperties;
  onChange: (value: any, row: any, shiftKey?: boolean) => void;
  onDoubleClick?: (e: MouseEvent) => void;
}

interface ChangeValue { value: string | number; text: ReactNode; index: number; }
export type themeType = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export default interface PropsType {
  prefixCls?: string;
  value: any;
  multiple?: boolean;
  defaultValue?: any;
  size?: size;
  className?: string;
  style?: CSSProperties;
  radius?: boolean;
  disabled?: boolean;
  search?: boolean;
  remoteSearch?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  onChange: (value: ChangeValue | Array<string>, valueData?: Array<any>) => void;
  onSearchChange?: (e: any) => void;
  tagTheme?: themeType;
  zIndex?: number;
  title?: string;
  locale?: {
    [propName: string]: any,
  };
  getPopupContainer?(): HTMLElement;
}
