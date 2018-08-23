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
  locale: { [propName: string]: any };
  localeCode: string;
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
  locale: { [propName: string]: any };
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
  locale: { [propName: string]: any };
  onDateClick: (value: any) => void;
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
  locale: { [propName: string]: any };
  onChange?: (value: string) => void;
}
