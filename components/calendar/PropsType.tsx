export type dateType = {
  year?: number,
  month?: number,
  days?: number,
  firstDayOfWeek?: number,
};
export interface HeaderProps {
  prefixCls?: string;
  panel?: string;
  current: string;
  onChange: (cur: string) => void;
  onChangePanel: (panel: string) => void;
}

export interface YearTableProps {
  prefixCls?: string;
  value?: string;
  defaultValue?: string;
  visible?: boolean;
  current?: string;
  onYearClick: (value: any) => void;
}

export interface MonthTableProps {
  prefixCls?: string;
  value?: string;
  defaultValue?: string;
  visible?: boolean;
  current?: string;
  onMonthClick: (value: any) => void;
}

export interface DateTableProps {
  prefixCls?: string;
  value?: string;
  defaultValue?: string;
  visible?: boolean;
  current?: string;
  min?: string;
  max?: string;
  onDateClick: (value: any, isNow?: boolean) => void;
}

export default interface PropsType {
  prefixCls?: string;
  format?: string;
  min?: string;
  max?: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  style?: object;
  hasFooter?: boolean;
  showTime?: boolean;
  onChange?: (value: string, dropdown: boolean) => void;
}
