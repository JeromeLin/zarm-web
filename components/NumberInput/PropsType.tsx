import { CSSProperties } from 'react';

export default interface PropsType {
  className: string;
  decimal: number;
  style: CSSProperties;
  min: number;
  max: number;
  isDisabled: any;
  otherProps: any;
  value: any;
  onChange: any;
  onBlur: any;
  placeholder: any;
  showStepper: boolean;
  step: number;
}
