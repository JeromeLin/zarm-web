export default interface PropsType {
  prefixCls?: string;
  message?: string;
  visible?: boolean;
  width?: number | string;
  okText?: string;
  cancelText?: string;
  locale?: {
    confirm: string,
    cancel: string,
  };
  onOk: () => void;
  onCancel: () => void;
}
