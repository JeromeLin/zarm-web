export default interface PropsType {
  prefixCls?: string;
  size?: 'sm' | null;
  isDisabled?: boolean;
  isRadius?: boolean;
  style?: object;
  width?: number;
  initialPanelTitle?: string;
  selectedPanelTitle?: string;
  initialValue: object[];
  selectedValue?: object[];
  keyOfItem: string;
  displayNameOfItem: string;
  onAdd: (value: any) => void;
  onDoubleAdd: (value: any) => void;
  onMinus: (value: any) => void;
  onDoubleMinus: (value: any) => void;
}
