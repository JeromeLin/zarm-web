import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import classnames from 'classnames';

import Portal from '../portal';
import ClickOutside from '../utils/clickOutside';
import { invertKeyValues } from '../utils';

export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

export interface PopperProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactElement<any>;
  visible?: boolean;
  hasArrow?: boolean;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger;
  popperOptions?: PopperJS.PopperOptions;
  title?: React.ReactNode;
  content?: React.ReactNode;
  container?: React.ReactInstance | (() => React.ReactInstance) | null;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onVisibleChange?: (visible: boolean) => void;
}

export const placementMap = {
  top: 'top',
  topLeft: 'top-start',
  topRight: 'top-end',
  right: 'right',
  rightTop: 'right-start',
  rightBottom: 'right-end',
  bottom: 'bottom',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
  left: 'left',
  leftTop: 'left-start',
  leftBottom: 'left-end',
};

function getOuterSizes (element: HTMLElement) {
  const _display = element.style.display;
  const _visibility = element.style.visibility;
  element.style.display = 'block';
  element.style.visibility = 'hidden';

  const styles = window.getComputedStyle(element, null);
  const x = parseFloat(styles.marginTop as string) + parseFloat(styles.marginBottom as string);
  const y = parseFloat(styles.marginLeft as string) + parseFloat(styles.marginRight as string);
  const result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x,
  };

  element.style.display = _display;
  element.style.visibility = _visibility;
  return result;
}

function getPopperClientRect (popperOffsets) {
  const offsets = { ...popperOffsets };
  offsets.right = offsets.left + offsets.width;
  offsets.bottom = offsets.top + offsets.height;
  return offsets;
}

function customArrowOffsetFn (data: PopperJS.Data) {
  const placement = data.placement.split('-')[0];
  const placement1 = data.placement.split('-')[1];
  const arrow: any = data.instance.options.modifiers && data.instance.options.modifiers!.arrow!.element;
  const reference = data.offsets.reference;
  const popper = getPopperClientRect(data.offsets.popper);
  const isVertical = ['left', 'right'].indexOf(placement) !== -1;
  const len = isVertical ? 'height' : 'width';
  const side = isVertical ? 'top' : 'left';
  const altSide = isVertical ? 'left' : 'top';
  const opSide = isVertical ? 'bottom' : 'right';
  const arrowSize = getOuterSizes(arrow as HTMLElement)[len];
  const offsetSize = parseFloat(getComputedStyle(data.instance.popper.children[1], null).paddingLeft as any);
  const hashMap = {
    start: reference[side] + offsetSize,
    center: reference[side] + reference[len] / 2 - arrowSize / 2,
    end: reference[opSide] - offsetSize - arrowSize,
  };
  const place = hashMap[placement1 || 'center'];
  let sideValue = place - popper[side];

  data.arrowElement = arrow;
  data.arrowStyles[side] = Math.floor(sideValue) as any;
  data.arrowStyles[altSide] = '';

  return data;
}

class Popper extends React.Component<PopperProps> {
  static defaultProps = {
    prefixCls: 'za-popper',
    hasArrow: true,
    trigger: 'click',
    placement: 'hover',
    mouseEnterDelay: 100,
    mouseLeaveDelay: 100,
    onVisibleChange: () => {},
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
    visible: PropTypes.bool,
    hasArrow: PropTypes.bool,
    trigger: PropTypes.oneOf(['click', 'hover', 'focus', 'manual']),
    content: PropTypes.node,
    placement: PropTypes.oneOf([
      'top',
      'topLeft',
      'topRight',
      'right',
      'rightTop',
      'rightBottom',
      'bottom',
      'bottomLeft',
      'bottomRight',
      'left',
      'leftTop',
      'leftBottom',
    ]),
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    onVisibleChange: PropTypes.func,
  };

  static getDerivedStateFromProps (props: PopperProps, state) {
    if ('visible' in props && props.trigger === 'manual') {
      return {
        ... state,
        visible: props.visible,
      };
    }
    return null;
  }

  state = {
    visible: false,
    placement: this.props.placement,
    arrowRef: null,
  };

  private popper: any;
  private popperNode: any;
  private reference: any;
  private arrowRef: any;
  private enterTimer: any;
  private leaveTimer: any;

  componentDidUpdate (prevProps, prevState) {
    if (
      !prevState.visible && prevState.visible !== this.state.visible ||
      prevProps.placement !== this.props.placement ||
      prevProps.popperOptions !== this.props.popperOptions
    ) {
      this.handleOpen();
    }
    if (prevState.visible && prevState.visible !== this.state.visible) {
      this.handleClose();
    }
  }

  componentWillUnmount () {
    this.handleClose();
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  handleOpen = () => {
    const { placement, popperOptions = {}, onVisibleChange } = this.props;
    const { visible } = this.state;
    const reference: any = ReactDOM.findDOMNode(this.reference);
    const popperNode: any = ReactDOM.findDOMNode(this.popperNode);

    if (!popperNode || !visible) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    this.popper = new PopperJS(reference, popperNode, {
      placement: placementMap[placement!] as any,
      modifiers: {
        preventOverflow: {
          boundariesElement: 'window',
        },
        arrow: {
          enabled: Boolean(this.arrowRef),
          element: this.arrowRef,
          fn: customArrowOffsetFn,
        },
      },
      ...popperOptions,
      onCreate: this.handlePopperUpdate,
      onUpdate: this.handlePopperUpdate,
    });

    onVisibleChange!(true);
  }

  handlePopperUpdate = data => {
    if (data.placement !== this.state.placement) {
      this.setState({
        placement: invertKeyValues(placementMap)[data.placement],
      });
    }
  }

  handleClose = () => {
    if (!this.popper) {
      return;
    }
    this.popper.destroy();
    this.popper = null;
    this.setState({ visible: false });
    this.props.onVisibleChange!(false);
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible });
  }

  handleEnter = event => {
    const { children, mouseEnterDelay } = this.props;
    const childrenProps = children.props;

    if (event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.enterTimer = setTimeout(() => {
      this.setState({ visible: true });
    }, mouseEnterDelay);
  }

  handleLeave = event => {
    const { children, mouseLeaveDelay } = this.props;
    const childrenProps = children.props;

    if (event.type === 'blur' && childrenProps.onBlur) {
      childrenProps.onBlur(event);
    }

    if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
      childrenProps.onMouseLeave(event);
    }

    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.leaveTimer = setTimeout(() => {
      this.setState({ visible: false });
    }, mouseLeaveDelay);
  }

  render () {
    const {
      children,
      title,
      content,
      prefixCls,
      style,
      className,
      trigger,
      hasArrow,
    } = this.props;

    const {
      visible,
      placement,
    } = this.state;

    const child = <div className={`${prefixCls}__inner`}>{children}</div>;
    const wrapperCls = classnames(prefixCls, `${prefixCls}__wrapper`, className);
    const innerCls = classnames(`${prefixCls}__content-wrapper`, `${prefixCls}__placement__${placement}`);
    const childrenProps: any = {
      ref: (node) => { this.reference = node; },
    };
    const event: React.DOMAttributes<HTMLDivElement> = {};
    if (trigger === 'click') {
      childrenProps.onClick = this.handleClick;
    }
    if (trigger === 'hover') {
      childrenProps.onMouseOver = this.handleEnter;
      childrenProps.onMouseLeave = this.handleLeave;
      event.onMouseOver = this.handleEnter;
      event.onMouseLeave = this.handleLeave;
    }
    if (trigger === 'focus') {
      childrenProps.onFocus = this.handleEnter;
      childrenProps.onBlur = this.handleLeave;
    }
    const childElement = React.cloneElement(child, childrenProps);

    return (
      <React.Fragment>
        <div className={wrapperCls} style={style}>
          <Portal container={document.body}>
            {
              visible && (
                <ClickOutside onClickOutside={this.handleClose} disabled={trigger === 'manual'}>
                  <div
                    role="tooltip"
                    style={{ position: 'absolute' }}
                    className={innerCls}
                    ref={node => this.popperNode = node}
                    {...event}
                  >
                    {title && <div className={`${prefixCls}__title`}>{title}</div>}
                    <div className={`${prefixCls}__content`}>{content}</div>
                    {hasArrow && <span className={`${prefixCls}__arrow`} ref={el => this.arrowRef = el} />}
                  </div>
                </ClickOutside>
              )
            }
          </Portal>
          {childElement}
        </div>
      </React.Fragment>
    );
  }
}

export default Popper;
