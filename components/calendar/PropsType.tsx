export type dateType = {
  year?: number,
  month?: number,
  days?: number,
  firstDayOfWeek?: number,
};
export interface HeaderProps {
  prefixCls?: string;
  panel?: string;
  locale: { [propName: string]: any };
  localeCode: string;
  current: string | Date;
  isShowPrev?: boolean;
  isShowNext?: boolean;
  onChange: (cur: string) => void | undefined;
  onChangePanel: (panel: string) => void;
}

export interface YearTableProps {
  prefixCls?: string;
  value?: string;
  defaultValue?: string;
  visible?: boolean;
  current?: string | Date;
  onYearClick: (value: any) => void;
}

export interface MonthTableProps {
  prefixCls?: string;
  value?: string;
  defaultValue?: string;
  visible?: boolean;
  locale: { [propName: string]: any };
  current?: string | Date;
  disabledMonth?: (value: any) => void;
  onMonthClick: (value: any) => void;
}

export interface DateTableProps {
  prefixCls?: string;
  value?: string;
  selectedValue?: string[] | Date[];
  defaultValue?: string;
  visible?: boolean;
  current?: string | Date;
  min?: string;
  max?: string;
  locale: { [propName: string]: any };
  onDateClick: (value: any, isNow?: boolean) => void;
}

export default interface PropsType {
  prefixCls?: string;
  format?: string;
  min?: string;
  max?: string;
  current?: string | Date;
  value?: string | Date;
  selectedValue?: string[] | Date[];
  defaultValue?: string;
  className?: string;
  style?: object;
  hasFooter?: boolean;
  locale: { [propName: string]: any };
  isLeftCalendar?: boolean; // 在 rangeCalendar 中表示是开始日历，
  isRightCalendar?: boolean; // 在 rangeCalendar 中表示是结束日历，
  showTime?: boolean;
  onChange?: (value: string, dropdown: boolean, isTimeChange?: boolean) => void;
  isShowPrev?: boolean;
  isShowNext?: boolean;
  disabledMonth?: (value: any) => void;
  onPanelChange?: (value: any) => void;
}
