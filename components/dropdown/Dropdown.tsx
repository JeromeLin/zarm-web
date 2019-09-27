import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import events from '../utils/events';
import throttle from '../utils/throttle';
import { PropsType, StateType, Direction } from './PropsType';

function getOffsetElem(elem: HTMLElement) {
  let parentElem = elem.parentNode;
  while (parentElem) {
    if (parentElem instanceof HTMLElement) {
      if (parentElem.style.position === 'fixed'
        || window.getComputedStyle(parentElem).position === 'fixed'
        || parentElem === document.body) {
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
  let parentElem = elem.parentElement;
  let offsetParentElem = elem.offsetParent;
  const position: { top: number; left: number } = {
    top: elem.offsetTop,
    left: elem.offsetLeft,
  };
  while (relativeElem.contains(parentElem!)) {
    if (parentElem instanceof HTMLElement) {
      if (relativeElem === parentElem) {
        return position;
      }
      if (offsetParentElem === parentElem) {
        position.top += parentElem.offsetTop;
        position.left += parentElem.offsetLeft;
        offsetParentElem = parentElem.offsetParent;
      }
      position.top -= parentElem.scrollTop;
      position.left -= parentElem.scrollLeft;
      parentElem = parentElem.parentElement;
    }
  }
  return position;
}

// todo [首次不创建]
// bottom top left center right screen
const placementMap: Record<Direction, number> = {
  bottomLeft: 5,
  bottomCenter: 9,
  bottomRight: 17,
  topLeft: 6,
  topCenter: 10,
  topRight: 18,
  bottomScreen: 33,
  topScreen: 34,
};

const defaultProps = {
  visible: false,
  hideOnClick: true,
  prefixCls: 'zw-dropdown',
  direction: 'bottomLeft',
  trigger: 'click',
  disabled: false,
  zIndex: 2018,
  width: 'auto',
  triggerBoxProps: {},
};

const mountedInstance = new Set<Dropdown>();

export default class Dropdown extends React.Component<PropsType, StateType> {
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
    placement: PropsType['direction'] = 'bottomLeft',
    width: number,
    height: number,
    dropWidth: number,
    dropHeight: number,
  ): { top: number; left: number } {
    let top = 0;
    let left = 0;
    const placementCode = placementMap[placement];
    /* eslint-disable-next-line no-bitwise */
    if (placementCode & 1) {
      top = height;
      /* eslint-disable-next-line no-bitwise */
    } else if (placementCode & 2) {
      top = -dropHeight;
    }
    /* eslint-disable-next-line no-bitwise */
    if (placementCode & 8) {
      left = (width - dropWidth) / 2;
      /* eslint-disable-next-line no-bitwise */
    } else if (placementCode & 16) {
      left = width - dropWidth;
    }
    return {
      top, left,
    };
  }

  private static createDivBox(width: string | number): HTMLDivElement {
    const div = document.createElement('div');
    div.style.setProperty('position', 'absolute');
    div.style.setProperty('left', '0');
    div.style.setProperty('top', '0');
    div.style.setProperty('width', typeof width === 'number' ? `${width}px` : width);
    return div;
  }

  state = {
    visible: this.props.visible,
    positionInfo: {
      left: 0,
      top: 0,
    },
    animationState: null,
    // eslint-disable-next-line react/no-unused-state
    animationProps: null,
  };

  // 窗口大小变化的时候实时调整定位
  onWindowResize: () => void;

  // 创建挂载点
  private div: HTMLDivElement = Dropdown.createDivBox(this.props.width);

  // 触发层的dom元素
  private triggerBox!: HTMLDivElement;

  // 弹出层的dom元素
  private DropdownContent!: HTMLDivElement;

  private popContainer!: HTMLElement;

  private scrollParent!: HTMLElement;

  private isHoverOnDropContent = false;

  private hiddenTimer: number | undefined;

  private triggerBoxOffsetHeight!: number;

  constructor(props: Readonly<{ children?: ReactNode }> & Readonly<PropsType>) {
    super(props);
    // 窗口变化时，重新计算位置
    this.onWindowResize = throttle(this.reposition, 300);
  }

  componentDidMount() {
    const { getPopupContainer, visible, direction } = this.props;
    if (typeof getPopupContainer === 'function') {
      this.popContainer = getPopupContainer();
      this.popContainer.style.position = 'relative';
    } else {
      this.popContainer = getOffsetElem(this.triggerBox);
    }
    this.popContainer.appendChild(this.div);
    // 若一开始就显示 则需要先计算位置
    if (visible) {
      const { left, top } = this.getDropdownPosition(direction);
      this.setState({
        positionInfo: {
          left,
          top,
        },
      });
    }
    events.on(document, 'click', this.onDocumentClick);
    events.on(window, 'resize', this.onWindowResize);
    document.addEventListener('scroll', this.onParentScroll, true);

    // 存储当前实例，方便静态方法统一处理
    mountedInstance.add(this);
    this.triggerBoxOffsetHeight = this.triggerBox.offsetHeight;
  }

  componentDidUpdate(prevProps: this['props']) {
    const { visible, direction } = this.props;
    if (prevProps.visible === visible) {
      return;
    }
    if (visible) {
      this.enter(() => {
        if (visible) {
          this.setState({
            positionInfo: this.getDropdownPosition(direction),
          });
        }
      });
    } else {
      this.leave();
    }

    const height = this.triggerBox.offsetHeight;
    if (height !== this.triggerBoxOffsetHeight) {
      this.reposition();
      this.triggerBoxOffsetHeight = height;
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

  // 可滚动父容器滚动的时候调整定位
  onParentScroll = () => {
    this.reposition();
  };

  // 根据trigger方式不同绑定事件
  getEventObject = (triggerType: PropsType['trigger'] = 'click') => {
    if (triggerType === 'hover') {
      return {
        dropdownContentEvent: {
          onMouseLeave: this.onDropdownContentMouseLeave,
          onMouseEnter: this.onDropdownContentMouseEnter,
        },
        triggerEvent: {
          onMouseEnter: this.onTrigger,
          onMouseLeave: this.onTrigger,
        },
      };
    }
    if (triggerType === 'contextMenu') {
      return {
        dropdownContentEvent: {},
        triggerEvent: {
          onContextMenu: this.onTrigger,
        },
      };
    }
    return {
      dropdownContentEvent: {},
      triggerEvent: {
        onClick: this.onTrigger,
      },
    };
  };

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
      } else if (this.hiddenTimer) {
        clearTimeout(this.hiddenTimer);
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
  };

  // 鼠标放到弹框上的时候，设置变量
  onDropdownContentMouseEnter = (): void => {
    // 重新放置时候取消隐藏
    if (this.hiddenTimer) {
      clearTimeout(this.hiddenTimer);
    }
    if (this.isHoverOnDropContent === false) {
      this.isHoverOnDropContent = true;
    }
  };

  onDropdownContentMouseLeave = (): void => {
    this.isHoverOnDropContent = false;
    // 给消失一点缓冲时间
    this.hiddenTimer = setTimeout(() => {
      this.props.onVisibleChange(false);
    }, 300);
  };

  // 点击外部的时候
  onDocumentClick = (e: MouseEvent): void => {
    const { hideOnClick, onVisibleChange } = this.props;
    if (this.props.disabled === true || this.state.visible === false) {
      return;
    }
    const target = e.target as Node;
    // eslint-disable-next-line no-empty
    if (this.div.contains(target) || this.triggerBox.contains(target)) {

    } else {
      // eslint-disable-next-line no-lonely-if
      if (hideOnClick) {
        onVisibleChange(false);
      }
    }
  };

  // 获取元素的定位信息
  getDropdownPosition(placement: PropsType['direction'] = 'bottomLeft') {
    const rectInfo = getElemPosition(this.triggerBox, this.popContainer);
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
    const { direction } = this.props;
    const directionCode = placementMap[direction];
    return {
      /* eslint-disable-next-line no-bitwise */
      left: directionCode & 32 ? 0 : rectInfo.left + left - marginLeft,
      top: rectInfo.top + top - marginTop + offset,
    };
  }

  reposition = () => {
    if (!this.state.visible || this.props.disabled) {
      return;
    }
    const { left, top } = this.getDropdownPosition(this.props.direction);
    if (left === this.state.positionInfo.left && top === this.state.positionInfo.top) {
      return;
    }
    this.setState({
      positionInfo: { left, top },
    });
  };

  onAniEnd = (e: React.AnimationEvent) => {
    if (e.type.toLowerCase().endsWith('animationend')) {
      this.setState({
        visible: this.props.visible,
        animationState: null,
      });
    }
  };

  enter(callback: () => void): void {
    this.setState({
      visible: true,
      animationState: 'enter',
    }, callback);
  }

  leave(): void {
    this.setState({
      visible: true,
      animationState: 'leave',
    });
  }

  render() {
    const {
      disabled,
      children,
      content,
      className,
      trigger,
      prefixCls,
      style,
      direction = 'bottomLeft',
      zIndex,
      notRenderInDisabledMode,
      visible,
      hideOnClick,
      onVisibleChange,
      getPopupContainer,
      triggerBoxProps,
      ...others
    } = this.props;

    const { positionInfo, animationState, visible: stateVisible } = this.state;
    // 根据placement判断向上动画还是向下动画
    /* eslint-disable-next-line no-bitwise */
    const animationProps = (placementMap[direction] & 1) ? 'scaleDown' : 'scaleUp';
    const cls = classnames({
      [prefixCls]: true,
      [`${className}`]: !!className,
      [`${animationProps}-${animationState}`]: !!animationState,
    });

    const dropdownBoxStyle: React.CSSProperties = {
      minWidth: (this.triggerBox && this.triggerBox.offsetWidth) || 0,
      ...style,
      ...positionInfo,
      position: 'absolute',
      animationDuration: '300ms',
      // eslint-disable-next-line no-nested-ternary
      display: disabled ? 'none' : (stateVisible ? 'block' : 'none'),
      overflow: 'hidden',
      zIndex,
    };
    const { triggerEvent, dropdownContentEvent } = this.getEventObject(trigger);
    const { className: triggerBoxPropsClassName } = triggerBoxProps;
    const triggerBoxCls = classnames({
      [`${prefixCls}-trigger-box`]: true,
      [`${triggerBoxPropsClassName}`]: !!(triggerBoxProps && triggerBoxProps.className),
    });
    return (
      <React.Fragment>
        <div
          ref={(e) => { this.triggerBox = e as HTMLDivElement; }}
          {...triggerBoxProps}
          className={triggerBoxCls}
          {...triggerEvent}
        >
          {children}
        </div>
        {
          createPortal(
            <div
              onAnimationEnd={this.onAniEnd}
              className={cls}
              ref={(e) => {
                this.DropdownContent = e as HTMLDivElement;
              }}
              style={dropdownBoxStyle}
              {...others}
              {...dropdownContentEvent}
            >
              {(notRenderInDisabledMode && disabled) ? null : content}
            </div>,
            this.div,
          )
        }
      </React.Fragment>
    );
  }
}
