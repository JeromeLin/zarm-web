import * as React from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import events from '../utils/events';
import throttle from '../utils/throttle';
import { propsType, stateType, trigger } from "./PropsType";
type ReactMouseEvent = (e: React.MouseEvent) => void;

function getElemPosition(elem: HTMLElement, relativeElem: HTMLElement = document.documentElement) {
  let parentElem = elem.offsetParent;
  const position = {
    top: elem.offsetTop,
    left: elem.offsetLeft
  }
  while (relativeElem.contains(parentElem)) {
    position.top += (parentElem as HTMLElement).offsetTop;
    position.left += (parentElem as HTMLElement).offsetLeft;
    parentElem = (parentElem as HTMLElement).offsetParent;
  }
  return position;
}

// todo [首次不创建]
const placementMap = {
  bottomLeft: 5,
  bottomCenter: 9,
  bottomRight: 17,
  topLeft: 6,
  topCenter: 10,
  topRight: 18
}

const defaultProps = {
  visible: false,
  isRadius: false,
  prefixCls: 'ui-dropdown',
  placement: 'bottomLeft',
  trigger: 'click',
  defaultProps: () => { },
  disabled: false,
  zIndex: 999
}

export default class Dropdown extends React.Component<propsType, stateType> {
  static mountedInstance: Set<Dropdown> = new Set();
  static hide(): void {
    Dropdown.mountedInstance.forEach((instance) => {
      instance.props.onVisibleChange(false);
    });
  }
  static show(): void {
    Dropdown.mountedInstance.forEach((instance) => {
      instance.props.onVisibleChange(true);
    });
  }
  static createDivBox(): HTMLDivElement {
    const div = document.createElement('div');
    div.style.setProperty('position', 'absolute');
    div.style.setProperty('left', '0');
    div.style.setProperty('top', '0');
    div.style.setProperty('width', 'auto');
    return div;
  }

  // 根据定位点计算定位信息
  static calcPosition(placement: string,
    width: number, height: number, dropWidth: number, dropHeight: number): { top: number, left: number } {
    let top: number = 0,
      left: number = 0;
    const placementCode = placementMap[placement];
    if (placementCode & 1) {
      top = height;
    } else if (placementCode & 2) {
      top = -dropHeight;
    }
    if (placementCode & 8) {
      left = (width - dropWidth) / 2;
    } else if (placementCode & 16) {
      left = width - dropWidth;
    }
    return {
      top, left
    }
  }

  static defaultProps = defaultProps;

  private div: HTMLDivElement = Dropdown.createDivBox();
  private triggerBox: HTMLDivElement;
  private DropdownContent: HTMLDivElement;
  private isHoverOnDropContent: boolean = false;
  private hiddenTimer!: number;
  state = {
    visible: this.props.visible,
    positionInfo: {
      left: 0,
      top: 0
    },
    isPending: false,
    animationState: null,
    animationProps: null
  }


  // 显示与否的回调函数
  onTrigger = (e: React.MouseEvent): void => {
    // 禁用状态不做任何处理
    if (this.props.disabled === true) {
      return;
    }
    const { type } = e;
    if (type === 'click') {
      this.props.onVisibleChange(!this.props.visible);
    }
    else if (type === 'contextmenu') {
      e.preventDefault();
      this.props.onVisibleChange(!this.props.visible);
    }
    else if (type === 'mouseenter') {
      if (this.props.visible === false) {
        this.props.onVisibleChange(true);
      } else {
        if (this.hiddenTimer) {
          clearTimeout(this.hiddenTimer);
        }
      }
    }
    else if (type === 'mouseleave') {
      // 缓冲一点一时间给间隙
      this.hiddenTimer = setTimeout(() => {
        // 若当前鼠标在弹出层上 不消失
        if (this.isHoverOnDropContent === false) {
          this.props.onVisibleChange(false);
        }
      }, 300);
    }
  }

  // 鼠标放到弹框上的时候，设置变量
  onDropdownContentMouseEnter = (): void => {
    // 重新放置时候取消隐藏
    if (this.hiddenTimer) {
      clearTimeout(this.hiddenTimer);
    }
    if (this.isHoverOnDropContent === false) {
      this.isHoverOnDropContent = true;
    }
  }

  onDropdownContentMouseLeave = (): void => {
    this.isHoverOnDropContent = false;
    // 给消失一点缓冲时间
    this.hiddenTimer = setTimeout(() => {
      this.props.onVisibleChange(false);
    }, 300);
  }


  DropdownContentEvent: {
    onMouseLeave?: () => void,
    onMouseEnter?: () => void
  } = {};
  triggerEvent: {
    onClick?: ReactMouseEvent,
    onMouseEnter?: ReactMouseEvent,
    onMouseLeave?: ReactMouseEvent,
    onContextMenu?: ReactMouseEvent,
  } = {};

  setEventObject(trigger: trigger) {
    if (trigger === 'hover') {
      this.DropdownContentEvent.onMouseLeave = this.onDropdownContentMouseLeave;
      this.DropdownContentEvent.onMouseEnter = this.onDropdownContentMouseEnter;
      this.triggerEvent.onMouseEnter = this.onTrigger;
      this.triggerEvent.onMouseLeave = this.onTrigger;
    }
    else if (trigger === 'click') {
      this.triggerEvent.onClick = this.onTrigger;
    }
    else if (trigger === 'contextMenu') {
      this.triggerEvent.onContextMenu = this.onTrigger;
    }
  }

  constructor(props) {
    super(props);
    this.setEventObject(props.trigger);
  }

  componentDidMount() {
    document.body.appendChild(this.div);
    if (this.props.visible) {
      const { left, top } = this.getDropdownPosition(this.props.placement);
      this.setState({
        positionInfo: {
          left,
          top
        }
      });
    }
    events.on(document, 'click', this.onDocumentClick);
    events.on(window, 'resize', this.onWindowResize);
    Dropdown.mountedInstance.add(this);
  }

  onDocumentClick = (e): void => {
    if (this.props.disabled === true) {
      return;
    }
    const target: Node = e.target;
    if (this.div.contains(target) || this.triggerBox.contains(target)) {
      return;
    } else {
      this.props.onVisibleChange(false);
    }
  }

  // 窗口大小变化的时候实时调整定位
  onWindowResize = throttle((): void => {
    if (!this.state.visible || this.props.disabled) {
      return;
    }
    const { left, top } = this.getDropdownPosition(this.props.placement);
    if (left === this.state.positionInfo.left && top === this.state.positionInfo.top) {
      return;
    }
    this.setState({
      positionInfo: { left, top }
    });
  }, 300)

  // 获取元素的定位信息
  getDropdownPosition(placement) {
    let rectInfo = getElemPosition(this.triggerBox);
    const { offsetWidth, offsetHeight } = this.DropdownContent;
    const computerStyle = window.getComputedStyle(this.DropdownContent);
    const marginTop = parseFloat(this.DropdownContent.style.marginTop || computerStyle.marginTop || '0');
    const marginLeft = parseFloat(this.DropdownContent.style.marginLeft || computerStyle.marginLeft || '0');
    const { top, left } = Dropdown.calcPosition(
      placement,
      this.triggerBox.offsetWidth,
      this.triggerBox.offsetHeight,
      offsetWidth,
      offsetHeight
    );
    const offset = placement.startsWith('bottom') ? 5 : -5;
    return {
      left: rectInfo.left + left - marginLeft,
      top: rectInfo.top + top - marginTop + offset
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === this.props.visible) {
      return;
    }
    if (nextProps.trigger !== this.props.trigger) {
      this.setEventObject(nextProps.trigger);
    }
    if (nextProps.visible) {
      this.enter(() => {
        if (nextProps.visible) {
          const { left, top } = this.getDropdownPosition(nextProps.placement);
          this.setState({
            positionInfo: {
              left,
              top
            }
          });
        }
      });
    } else {
      this.leave();
    }
  }

  componentWillUnmount() {
    events.off(document, 'click', this.onDocumentClick);
    events.off(window, 'click', this.onWindowResize);
    Dropdown.mountedInstance.delete(this);
    document.body.removeChild(this.div);
  }

  onAniEnd = (e: React.AnimationEvent) => {
    if (e.type.toLowerCase().endsWith('animationend')) {
      this.setState({
        isPending: false,
        visible: this.props.visible,
        animationState: null
      });
    }
  }

  enter(callback) {
    this.setState({
      visible: true,
      isPending: true,
      animationState: 'enter'
    }, callback);
  }

  leave() {
    this.setState({
      visible: true,
      isPending: true,
      animationState: 'leave'
    });
  }

  render() {
    const {
      disabled,
      children,
      overlay,
      className,
      trigger,
      prefixCls,
      style,
      isRadius,
      placement,
      zIndex,
      notRenderInDisabledMode,
      ...others
    } = this.props;
    const { visible, positionInfo, animationState } = this.state;
    const animationProps = placementMap[placement as string] & 1 ? 'scaleDown' : 'scaleUp'
    const cls = classnames({
      [prefixCls!]: true,
      radius: 'radius' in this.props || isRadius,
      [className!]: !!className,
      [`${animationProps}-${animationState}`]: !!animationState
    });

    const dropdownBoxStyle: React.CSSProperties = {
      minWidth: (this.triggerBox && this.triggerBox.offsetWidth) || 0,
      ...style,
      ...positionInfo,
      position: 'absolute',
      animationDuration: '300ms',
      display: disabled ? 'none' : (visible ? 'block' : 'none'),
      zIndex,
    }

    return <React.Fragment>
      <div
        className={`${prefixCls}-trigger-box`}
        style={{ display: 'inline-block' }}
        ref={(e) => { this.triggerBox = e as HTMLDivElement }}
        {...this.triggerEvent}
      >
        {children}
      </div>
      {
        createPortal(
          <div
            onAnimationEnd={this.onAniEnd}
            className={cls}
            ref={(e) => this.DropdownContent = e as HTMLDivElement}
            style={dropdownBoxStyle}
            {...others}
            {...this.DropdownContentEvent}
          >
            {(notRenderInDisabledMode && disabled) ? null : overlay}
          </div>,
          this.div)
      }
    </React.Fragment >
  }
};