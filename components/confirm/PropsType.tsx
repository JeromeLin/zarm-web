export default interface PropsType {
  prefixCls?: string;
  message?: string;
  visible?: boolean;
  width?: number | string;
  okText?: string;
  cancelText?: string;
  onOk: () => void;
  onCancel: () => void;
}
