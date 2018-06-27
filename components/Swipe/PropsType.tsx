export type direction = 'left' | 'right' | 'top' | 'bottom';

export default interface PropsType {
  prefixCls?: string;
  direction: direction;
  height?: number;
  activeIndex?: number;
  speed?: number;
  autoPlay?: boolean;
  autoPlayIntervalTime?: number;
  moveDistanceRatio: number;
  moveTimeSpan: number;
  className?: string;
  style?: object;
}
