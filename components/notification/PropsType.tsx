export default interface PropsType {
  top: number | string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration: number | string;
  timeout: null;
  willUnMount: any;
  onClick: any;
  className: string;
}
