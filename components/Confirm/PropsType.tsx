export default interface PropsType {
  message?: string;
  visible?: boolean;
  width?: number | string;
  okText?: string;
  cancelText?: string;
  onOk: () => void;
  onCancel: () => void;
}
