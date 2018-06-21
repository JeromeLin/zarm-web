export type theme = 'default' | 'info' | 'success' | 'warning' | 'error';

export default interface PropsType {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  showTip?: boolean;
  tipAlwayShow?: boolean;
  HandleAmount: number;
  isRound?: boolean;
  isSolid?: boolean;
  isRange?: boolean;
  isPass?: boolean;
  theme?: string;
  styleWidth?: number;
  rangeColors?: string;
  customCls?: string;
  getValue: (value: any, i: any) => void;
}
