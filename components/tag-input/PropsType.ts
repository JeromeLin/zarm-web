import { ReactNode } from 'react';

export type themeType = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface ValueArray {
  key: any;
  value: ReactNode;
}

export default interface Props {
  search?: boolean;
  active?: boolean;
  placeholder?: string;
  searchValue?: string | null;
  radius?: boolean;
  disabled?: boolean;
  value?: React.ReactNode | Array<ValueArray>;
  tagTheme?: themeType;
  size?: 'sm' | 'xs' | 'xl' | 'lg';
  onDeleteTag?(e: MouseEvent, key: any, value: React.ReactNode, index: number): void;
  onSearchChange(e: React.UIEvent<HTMLDivElement>): void;
}
