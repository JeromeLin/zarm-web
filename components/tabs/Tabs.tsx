import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Tab from './Tab';
import Icon from '../icon';
import TabsProps from './PropsType';

class Tabs extends Component<TabsProps, any> {
  static displayName = 'Tabs';

  static Tab: typeof Tab;

  private tabHeaderWrap;

  private tabHeaderNav;

  private activeTab;

  static defaultProps = {
    defaultValue: 0,
    prefixCls: 'zw-tabs',
    type: 'card',
    direction: 'horizontal',
    size: 'md',
    onChange: () => {},
    onTabClose: () => {},
    animated: true,
  };

  static getSelectIndex(children) {
    let selectIndex;
    React.Children.forEach(children, (item, $index) => {
      if ((item as ReactElement<any>).props && (item as ReactElement<any>).props.selected) {
        selectIndex = $index;
      }
    });
    return selectIndex;
  }

  static getDerivedStateFromProps(props) {
    const newState = {
      value: null,
    };
    if ('value' in props) {
      newState.value = props.value;
      return newState;
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value
        || props.defaultValue
        || Tabs.getSelectIndex(props.children)
        || 0,
      lineWidth: 0,
      lineHeight: 0,
      scrollOffset: 0,
      headerWidth: 0,
      headerHeight: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      isArrowShown: false,
    };
    this.tabHeaderWrap = React.createRef();
    this.tabHeaderNav = React.createRef();
  }

  componentDidMount() {
    this.getHeaderStyle();
    this.setActiveLineStyle();
  }

  componentDidUpdate(prevProps, prevState) {
    const { size: prevSize } = prevProps;
    const { headerWidth: preHeaderWidth, headerHeight: preHeaderHeight } = prevState;
    const { size: currentSize } = this.props;
    const { headerWidth, headerHeight } = this.state;
    if (prevSize !== currentSize) {
      this.setActiveLineStyle();
    }
    if (preHeaderWidth !== headerWidth || preHeaderHeight !== headerHeight) {
      this.getHeaderStyle();
    }
  }

  getHeaderStyle() {
    const { width: headerWidth, height: headerHeight } = this.tabHeaderWrap.current.getBoundingClientRect();
    const { width: scrollWidth, height: scrollHeight } = this.tabHeaderNav.current.getBoundingClientRect();
    const { direction } = this.props;
    const isArrowShown = (direction === 'horizontal' && scrollWidth > headerWidth) || (direction === 'vertical' && scrollHeight > headerHeight);
    this.setState({
      headerWidth,
      headerHeight,
      scrollWidth,
      scrollHeight,
      isArrowShown,
    });
  }

  setActiveLineStyle() {
    const { width = 0, height = 0 } = this.activeTab && this.activeTab.getBoundingClientRect();
    this.setState({
      lineWidth: width,
      lineHeight: height,
    });
  }

  handleTabClick = (e, index, disabled) => {
    const { onChange } = this.props;
    if (!disabled) {
      this.updateTabBar(e.target);
      if (!('value' in this.props)) {
        this.setState({
          value: index,
        });
      }
      onChange(index);
    }
  };

  handleTabClose = (e, index, disabled) => {
    e.stopPropagation();
    const { onTabClose } = this.props;
    if (!disabled) {
      this.setActiveLineStyle();
      onTabClose(index);
    }
  };

  scrollRightOrBottom = (e) => {
    const { direction, onNextClick } = this.props;
    const { headerWidth, headerHeight, scrollWidth, scrollHeight, scrollOffset } = this.state;
    const scrollDimension = direction === 'horizontal' ? scrollWidth : scrollHeight;
    const headerDimension = direction === 'horizontal' ? headerWidth : headerHeight;
    const offset = scrollDimension - scrollOffset - headerDimension;
    this.setState({
      scrollOffset: scrollOffset + ((offset > headerDimension) ? headerDimension : offset),
    });
    onNextClick && onNextClick(e);
  };

  scrollLeftOrTop = (e) => {
    const { direction, onPrevClick } = this.props;
    const { headerWidth, headerHeight, scrollOffset } = this.state;
    const headerDimension = direction === 'horizontal' ? headerWidth : headerHeight;
    this.setState({
      scrollOffset: scrollOffset - ((scrollOffset > headerDimension) ? headerDimension : scrollOffset),
    });
    onPrevClick && onPrevClick(e);
  };

  getActiveNode = (node) => {
    if (node) {
      if (this.activeTab !== node) {
        this.activeTab = node;
        this.setActiveLineStyle();
      }
    }
  };

  updateTabBar(target) {
    const { direction } = this.props;
    const { scrollOffset, headerWidth, headerHeight, isArrowShown } = this.state;
    const { offsetLeft, offsetTop } = target;
    const { width, height } = target.getBoundingClientRect();
    const getScrollOffset = () => {
      if (direction === 'horizontal') {
        const diff = scrollOffset + headerWidth < offsetLeft + width ? offsetLeft + width - headerWidth : scrollOffset;
        return scrollOffset > offsetLeft ? offsetLeft : diff;
      }
      const diff = scrollOffset + headerHeight < offsetTop + height ? offsetTop + height - headerHeight : scrollOffset;
      return scrollOffset > offsetTop ? offsetTop : diff;
    };
    this.setState({
      scrollOffset: isArrowShown ? getScrollOffset() : scrollOffset,
    });
  }

  renderHeaderLine() {
    const { direction, prefixCls } = this.props;
    const { lineWidth, lineHeight } = this.state;
    const { offsetLeft = 0, offsetTop = 0 } = this.activeTab || {};
    const headerLineStyle = direction === 'horizontal' ? { width: lineWidth, height: 0, transform: `translate3d(${offsetLeft}px,0,0)` } : { width: 0, height: lineHeight, transform: `translate3d(0,${offsetTop}px,0)` };
    return (
      <div className={`${prefixCls}__header__line`} style={headerLineStyle} />
    );
  }

  render() {
    const {
      className, children, style, prefixCls, type, direction, size, animated,
    } = this.props;
    const { value, isArrowShown, scrollOffset, headerWidth, headerHeight, scrollWidth, scrollHeight } = this.state;

    const headerDimension = direction === 'horizontal' ? headerWidth : headerHeight;
    const scrollDimension = direction === 'horizontal' ? scrollWidth : scrollHeight;
    const arrowL = direction === 'horizontal' ? 'left' : 'top';
    const arrowR = direction === 'horizontal' ? 'right' : 'bottom';
    const isArrowLDisabled = scrollOffset === 0;
    const isArrowRDisabled = Math.floor(scrollOffset + headerDimension - scrollDimension) === 0;
    const animateStyle = direction === 'horizontal' ? { marginLeft: `-${value * 100}%` } : {};
    const headerNavStyle = direction === 'horizontal' ? { transform: `translate3d(${-scrollOffset}px,0,0)` } : { transform: `translate3d(0,${-scrollOffset}px,0)` };
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${direction}`]: direction,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--${type}`]: direction === 'horizontal' && type,
    });
    const headerCls = classnames(`${prefixCls}__header`, {
      [`${prefixCls}__header--arrow-mode`]: isArrowShown,
    });
    const bodyCls = classnames(`${prefixCls}__body`, {
      [`${prefixCls}__body--animated`]: animated,
    });
    const arrowLCls = classnames(`${prefixCls}__header__arrow`, {
      [`${prefixCls}__header__arrow--${arrowL}`]: arrowL,
      [`${prefixCls}__header__arrow--disabled`]: isArrowLDisabled,
    });
    const arrowRCls = classnames(`${prefixCls}__header__arrow`, {
      [`${prefixCls}__header__arrow--${arrowR}`]: arrowR,
      [`${prefixCls}__header__arrow--disabled`]: isArrowRDisabled,
    });

    const items = React.Children.map(children, (item: React.ReactElement<any>, $index) => {
      const tabItemCls = classnames(`${prefixCls}__header__item`, {
        [`${prefixCls}__header__item--disabled`]: !!item.props.disabled,
        [`${prefixCls}__header__item--active`]: $index === value,
      });
      const bindActiveRef = $index === value ? { ref: this.getActiveNode } : {};

      return (
        <div
          key={$index.toString()}
          className={tabItemCls}
          {...bindActiveRef}
          onClick={(e) => { this.handleTabClick(e, $index, item.props.disabled); }}
        >
          {item.props.title}
          {direction === 'horizontal' && item.props.closable && <Icon type="wrong" onClick={(e) => { this.handleTabClose(e, $index, item.props.disabled); }} />}
        </div>
      );
    });

    const content = React.Children.map(children, (item, $index) => {
      return (
        <Tab {...(item as ReactElement<any>).props} selected={value === $index}>
          {(item as ReactElement<any>).props.children}
        </Tab>
      );
    });

    return (
      <div className={cls} style={style}>
        <div className={headerCls}>
          <div className={`${prefixCls}__header__scroll`} ref={this.tabHeaderWrap}>
            <div className={`${prefixCls}__header__nav`} ref={this.tabHeaderNav} style={isArrowShown ? headerNavStyle : {}}>
              {items}
              {
                type === 'line' && this.renderHeaderLine()
              }
            </div>
          </div>
          {
            isArrowShown && (
              <>
                <span className={arrowLCls} onClick={(e) => !isArrowLDisabled && this.scrollLeftOrTop(e)}>
                  <Icon type={`arrow-${arrowL}`} />
                </span>
                <span className={arrowRCls} onClick={(e) => !isArrowRDisabled && this.scrollRightOrBottom(e)}>
                  <Icon type={`arrow-${arrowR}`} />
                </span>
              </>
            )
          }
        </div>
        <div className={bodyCls} style={animateStyle}>{content}</div>
      </div>
    );
  }
}

export default Tabs;
