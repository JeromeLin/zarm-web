// tslint:disable:no-bitwise
import * as React from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import events from '../utils/events';
import throttle from '../utils/throttle';
import { propsType, StateType } from './PropsType';
type ReactMouseEvent = (e: React.MouseEvent) => void;

function isFixedElem(elem) {
  return elem.style.position === 'fixed' ||
    window.getComputedStyle(elem).position === 'fixed';
}

function getOffsetElem(elem: HTMLElement) {
  let parentElem = elem;
  while (parentElem.parentNode instanceof HTMLElement && parentElem !== document.body && !isFixedElem(parentElem)) {
    parentElem = parentElem.parentNode;
  }
  return parentElem;
}

// 获取元素坐标
function getElemPosition(elem: HTMLElement, relElem: HTMLElement = document.body) {
  let parentElem = elem;
  const position: { top: number, left: number } = { top: 0, left: 0 };
  while (relElem.contains(parentElem) && parentElem.offsetParent instanceof HTMLElement && relElem !== parentElem) {
    position.top += parentElem.offsetTop;
    position.left += parentElem.offsetLeft;
    parentElem = parentElem.offsetParent;
  }
  return position;
}

// todo [首次不创建]
// bottom = 0; top = 2; left = 4; middle = 8; right = 16;
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
  prefixCls: 'ui-dropdown',
  placement: 'bottomLeft',
  trigger: 'click',
  disabled: false,
  zIndex: 9999,
};

export default class Dropdown extends React.Component<propsType, StateType> {
  static defaultProps = defaultProps;
  // 隐藏全部的Dropdown
  static hide(): void {
    Dropdown.mountedInstance.forEach((instance) => {
      instance.props.onVisibleChange(false);
    });
  }
  // 显示全部的Dropdown 除了disable
  static show(): void {
    Dropdown.mountedInstance.forEach((instance) => {
      instance.props.onVisibleChange(true);
    });
  }

  // 重新计算Dropdown定位
  static reposition() {
    Dropdown.mountedInstance.forEach((instance) => {
      instance.reposition();
    });
  }

  // 用于存储已生成的全部实例的Set
  private static mountedInstance: Set<Dropdown> = new Set();

  // 根据定位点计算定位信息
  private static calcPosition(
    placement: string,
    width: number,
    height: number,
    dropWidth: number,
    dropHeight: number): { top: number, left: number } {
    const placementCode = placementMap[placement];
    let top: number = 0;
    let left: number = 0;
    // 包含bottom 或 包含top
    if (placementCode & 1) {
      top = height;
    } else if (placementCode & 2) {
      top = -dropHeight;
    }
    // 包含middle 或包含right
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
  private div: HTMLDivElement = Dropdown.createDivBox();
  private triggerBox: HTMLDivElement;
  private DropdownContent: HTMLDivElement;
  private popContainer: HTMLElement;
  private isHoverOnDropContent: boolean = false;
  private hiddenTimer!: number;

  private eventHandler = {
    click: () => {
      this.props.onVisibleChange(!this.props.visible);
    },
    contextmenu: (e) => {
      e.preventDefault();
      this.props.onVisibleChange(!this.props.visible);
    },
    mouseenter: () => {
      if (this.props.visible === false) {
        this.props.onVisibleChange(true);
      } else {
        if (this.hiddenTimer) {
          clearTimeout(this.hiddenTimer);
        }
      }
    },
    mouseleave: () => {
      // 缓冲一点一时间给间隙
      this.hiddenTimer = setTimeout(() => {
        // 若当前鼠标在弹出层上 不消失
        if (this.isHoverOnDropContent === false) {
          this.props.onVisibleChange(false);
        }
      }, 300);
    },
  };

  constructor(props) {
    super(props);
    this.setEventObject(props.trigger);
    this.onWindowResize = throttle(this.reposition, 300);
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
    const handler = this.eventHandler[type];
    if (handler) {
      handler(e);
    }
  }

  // 鼠标放到弹框上的时候，设置变量
  onDropdownContentMouseEnter = (): void => {
    // 重新放置时候取消隐藏
    if (this.hiddenTimer) {
      clearTimeout(this.hiddenTimer);
    }
    this.isHoverOnDropContent = true;
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
    events.on(document, 'click', this.onDocumentClick);
    events.on(window, 'resize', this.onWindowResize);
    // 存储当前实例，方便静态方法统一处理
    Dropdown.mountedInstance.add(this);
  }

  // 点击外部的时候
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
    return {
      left: rectInfo.left + left - marginLeft,
      top: rectInfo.top + top - marginTop + offset,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === this.props.visible) {
      return;
    }
    // 修改出发方式
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
      return;
    }
    this.leave();
  }

  componentWillUnmount() {
    events.off(document, 'click', this.onDocumentClick);
    events.off(window, 'click', this.onWindowResize);
    Dropdown.mountedInstance.delete(this);
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
      onVisibleChange,
      getPopupContainer,
      // tslint:disable-next-line:trailing-comma
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
        style={{ display: 'inline-block' }}
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
