export interface DataSource {
  percent?: number;
  name?: string;
  url?: string;
  thumbUrl?: string;
}

export interface ListProps {
  prefixCls?: string;
  className?: string;
  type?: string;
  dataSource: DataSource[];
  isRadius?: boolean;
  radius?: boolean;
  onDelete: (item: any) => void;
}

export default interface PropsType {
  prefixCls?: string;
  fileName: string;
  startUpload?: boolean;
  autoUpload?: boolean;
  data: object;
  url: string;
  multiple?: boolean;
  fileExt?: string;
  className?: string;
  style?: object;
  headers?: Record<string, string>;
  onSelect: (files: any) => boolean;
  onProgress: () => void;
  onComplete: (file: any, res?) => void;
  onError: () => void;
}
