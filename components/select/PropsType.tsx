import { CSSProperties, MouseEvent, ReactNode } from 'react';
export type size = 'xl' | 'lg' | 'sm' | 'xs';

export interface OptionProps {
  value: string | number;
  checked?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  showCheckIcon?: boolean;
  style?: CSSProperties;
  onChange: (e: MouseEvent) => void;
  onDoubleClick?: (e: MouseEvent) => void;
}

export interface IDisableProps {
  isDisabled: boolean | undefined;
  disabled?: boolean;
}

export interface MultipleProps {
  prefixCls?: string;
  checked?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  isRadius?: boolean;
  size?: size;
  style?: CSSProperties;
  onChange: (value: any, row: object) => () => void;
  onDoubleClick?: () => void;
}

interface ChangeValue { value: string | number; text: ReactNode; index: number; }
export type themeType = 'default' | 'info' | 'success' | 'warning' | 'error';
export default interface PropsType {
  prefixCls?: string;
  value?: string | number | Array<string | number>;
  multiple?: boolean;
  defaultValue?: string | number | Array<string | number>;
  size?: size;
  className?: string;
  style?: CSSProperties;
  radius?: boolean;
  isRadius?: boolean;
  disabled?: boolean;
  isDisabled?: boolean;
  search?: boolean;
  isSearch?: boolean;
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
