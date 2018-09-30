// tslint:disable:no-bitwise
import * as React from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import events from '../utils/events';
import throttle from '../utils/throttle';
import domUtil from '../utils/dom';
import { propsType, StateType } from './PropsType';
type ReactMouseEvent = (e: React.MouseEvent) => void;

function getOffsetElem(elem: HTMLElement) {
  let parentElem = elem.parentNode;
  while (parentElem) {
    if (parentElem instanceof HTMLElement) {
      if (parentElem.style.position === 'fixed' ||
        window.getComputedStyle(parentElem).position === 'fixed' ||
        parentElem === document.body) {
        return parentElem;
      }
      parentElem = parentElem.parentNode;
    } else {
      break;
    }
  }
  return document.body;
}

// 获取元素坐标
function getElemPosition(elem: HTMLElement, relativeElem: HTMLElement = document.body) {
  let parentElem = elem.offsetParent;
  const position: { top: number, left: number } = {
    top: elem.offsetTop,
    left: elem.offsetLeft,
  };
  while (relativeElem.contains(parentElem)) {
    if (parentElem instanceof HTMLElement) {
      if (relativeElem === parentElem) {
        return position;
      }
      position.top += parentElem.offsetTop;
      position.left += parentElem.offsetLeft;
      parentElem = parentElem.offsetParent;
    }
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
  topRight: 18,
};

const defaultProps = {
  visible: false,
  isRadius: false,
  hideOnClick: true,
  prefixCls: 'ui-dropdown',
  placement: 'bottomLeft',
  trigger: 'click',
  disabled: false,
  zIndex: 2018,
};

const mountedInstance = new Set();

export default class Dropdown extends React.Component<propsType, StateType> {
  static defaultProps = defaultProps;
  // 隐藏全部的Dropdown
  static hide(): void {
    mountedInstance.forEach((instance) => {
      instance.props.onVisibleChange(false);
    });
  }
  // 显示全部的Dropdown 除了disable
  static show(): void {
    mountedInstance.forEach((instance) => {
      instance.props.onVisibleChange(true);
    });
  }

  // 重新计算Dropdown定位
  static reposition() {
    mountedInstance.forEach((instance) => {
      instance.reposition();
    });
  }
  // 用于存储已生成的全部实例的Set
  // private static mountedInstance: Set<Dropdown> = new Set();
  // 根据定位点计算定位信息
  private static calcPosition(
    placement: string,
    width: number,
    height: number,
    dropWidth: number,
    dropHeight: number): { top: number, left: number } {
    let top: number = 0;
    let left: number = 0;
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
      top, left,
    };
  }
  private static createDivBox(): HTMLDivElement {
    const div = document.createElement('div');
    div.style.setProperty('position', 'absolute');
    div.style.setProperty('left', '0');
    div.style.setProperty('top', '0');
    div.style.setProperty('width', 'auto');
    return div;
  }

  state = {
    visible: this.props.visible,
    positionInfo: {
      left: 0,
      top: 0,
    },
    isPending: false,
    animationState: null,
    animationProps: null,
  };

  DropdownContentEvent: {
    onMouseLeave?: () => void,
    onMouseEnter?: () => void,
  } = {};

  triggerEvent: {
    onClick?: ReactMouseEvent,
    onMouseEnter?: ReactMouseEvent,
    onMouseLeave?: ReactMouseEvent,
    onContextMenu?: ReactMouseEvent,
  } = {};

  // 窗口大小变化的时候实时调整定位
  onWindowResize: () => void;
  // 可滚动父容器滚动的时候调整定位
  onParentScroll: () => void;
  private div: HTMLDivElement = Dropdown.createDivBox();
  private triggerBox: HTMLDivElement;
  private DropdownContent: HTMLDivElement;
  private popContainer: HTMLElement;
  private scrollParent: HTMLElement;
  private isHoverOnDropContent: boolean = false;
  private hiddenTimer: number | undefined;
  private triggerBoxOffsetHeight: number;

  constructor(props) {
    super(props);
    this.setEventObject(props.trigger);
    this.onWindowResize = throttle(this.reposition, 300);
    this.onParentScroll = this.reposition;
  }

  // 根据trigger方式不同绑定事件
  setEventObject = (triggerType: string) => {
    if (triggerType === 'hover') {
      this.DropdownContentEvent.onMouseLeave = this.onDropdownContentMouseLeave;
      this.DropdownContentEvent.onMouseEnter = this.onDropdownContentMouseEnter;
      this.triggerEvent.onMouseEnter = this.onTrigger;
      this.triggerEvent.onMouseLeave = this.onTrigger;
    } else if (triggerType === 'click') {
      this.triggerEvent.onClick = this.onTrigger;
    } else if (triggerType === 'contextMenu') {
      this.triggerEvent.onContextMenu = this.onTrigger;
    }
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
    } else if (type === 'contextmenu') {
      e.preventDefault();
      this.props.onVisibleChange(!this.props.visible);
    } else if (type === 'mouseenter') {
      if (this.props.visible === false) {
        this.props.onVisibleChange(true);
      } else {
        if (this.hiddenTimer) {
          clearTimeout(this.hiddenTimer);
        }
      }
    } else if (type === 'mouseleave') {
      // 缓冲一点一时间给间隙
      this.hiddenTimer = setTimeout(() => {
        // 若当前鼠标在弹出层上 则不消失
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

  componentDidMount() {
    if (typeof this.props.getPopupContainer === 'function') {
      this.popContainer = this.props.getPopupContainer();
      this.popContainer.style.position = 'relative';
    } else {
      this.popContainer = getOffsetElem(this.triggerBox);
    }
    this.popContainer.appendChild(this.div);
    if (this.props.visible) {
      const { left, top } = this.getDropdownPosition(this.props.placement);
      this.setState({
        positionInfo: {
          left,
          top,
        },
      });
    }
    this.scrollParent = domUtil.getScrollParent(this.triggerBox);
    events.on(document, 'click', this.onDocumentClick);
    events.on(window, 'resize', this.onWindowResize);
    events.on(this.scrollParent, 'scroll', this.onParentScroll);

    // 存储当前实例，方便静态方法统一处理
    mountedInstance.add(this);
    this.triggerBoxOffsetHeight = this.triggerBox.offsetHeight;
  }

  componentDidUpdate() {
    const height = this.triggerBox.offsetHeight;
    if (height !== this.triggerBoxOffsetHeight) {
      this.reposition();
      this.triggerBoxOffsetHeight = height;
    }
  }

  // 点击外部的时候
  onDocumentClick = (e): void => {
    if (this.props.disabled === true || this.state.visible === false) {
      return;
    }
    const target: Node = e.target;
    if (this.div.contains(target) || this.triggerBox.contains(target)) {
      return;
    } else {
      // this.props.onVisibleChange(false);
      if (this.props.hideOnClick) {
        this.props.onVisibleChange(false);
      }
    }
  }

  reposition = () => {
    if (!this.state.visible || this.props.disabled) {
      return;
    }
    const { left, top } = this.getDropdownPosition(this.props.placement);
    if (left === this.state.positionInfo.left && top === this.state.positionInfo.top) {
      return;
    }
    this.setState({
      positionInfo: { left, top },
    });
  }

  // 获取元素的定位信息
  getDropdownPosition(placement) {
    let rectInfo = getElemPosition(this.triggerBox, this.popContainer);
    const { offsetWidth, offsetHeight } = this.DropdownContent;
    const computerStyle = window.getComputedStyle(this.DropdownContent);
    const marginTop = parseFloat(this.DropdownContent.style.marginTop || computerStyle.marginTop || '0');
    const marginLeft = parseFloat(this.DropdownContent.style.marginLeft || computerStyle.marginLeft || '0');
    const { top, left } = Dropdown.calcPosition(
      placement,
      this.triggerBox.offsetWidth,
      this.triggerBox.offsetHeight,
      offsetWidth,
      offsetHeight,
    );
    const offset = placement.startsWith('bottom') ? 5 : -5;
    const scrollParent = this.scrollParent;
    let scrollLeft = 0;
    let scrollTop = 0;
    if (scrollParent !== this.popContainer && this.popContainer.contains(scrollParent)) {
      scrollLeft = domUtil.getScrollLeftValue(scrollParent);
      scrollTop = domUtil.getScrollTopValue(scrollParent);
    }
    return {
      left: rectInfo.left + left - marginLeft - scrollLeft,
      top: rectInfo.top + top - marginTop + offset - scrollTop,
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
          this.setState({
            positionInfo: this.getDropdownPosition(nextProps.placement),
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
    events.off(this.scrollParent, 'scroll', this.onParentScroll);
    mountedInstance.delete(this);
    setTimeout(() => {
      this.popContainer.removeChild(this.div);
    });
  }

  onAniEnd = (e: React.AnimationEvent) => {
    if (e.type.toLowerCase().endsWith('animationend')) {
      this.setState({
        isPending: false,
        visible: this.props.visible,
        animationState: null,
      });
    }
  }

  enter(callback): void {
    this.setState({
      visible: true,
      isPending: true,
      animationState: 'enter',
    }, callback);
  }

  leave(): void {
    this.setState({
      visible: true,
      isPending: true,
      animationState: 'leave',
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
      visible,
      hideOnClick,
      onVisibleChange,
      getPopupContainer,
      triggerBoxStyle,
      ...others
    } = this.props;

    const { positionInfo, animationState } = this.state;
    // 根据placement判断向上动画还是向下动画
    const animationProps = (placementMap[placement as string] & 1) ? 'scaleDown' : 'scaleUp';
    const cls = classnames({
      [prefixCls!]: true,
      radius: 'radius' in this.props || isRadius,
      [className!]: !!className,
      [`${animationProps}-${animationState}`]: !!animationState,
    });

    const dropdownBoxStyle: React.CSSProperties = {
      minWidth: (this.triggerBox && this.triggerBox.offsetWidth) || 0,
      ...style,
      ...positionInfo,
      position: 'absolute',
      animationDuration: '300ms',
      display: disabled ? 'none' : (this.state.visible ? 'block' : 'none'),
      overflow: 'hidden',
      zIndex,
    };

    return <React.Fragment>
      <div
        className={`${prefixCls}-trigger-box`}
        style={triggerBoxStyle}
        ref={(e) => { this.triggerBox = e as HTMLDivElement; }}
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
    </React.Fragment>;
  }
}
