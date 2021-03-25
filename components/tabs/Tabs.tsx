import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import TabPanel from './TabPanel';
import Icon from '../icon';
import TabsProps from './PropsType';

class Tabs extends Component<TabsProps, any> {
  static displayName = 'Tabs';

  static Panel: typeof TabPanel;

  private tabHeaderWrap;

  private tabHeaderNav;

  private activeTab;

  static defaultProps = {
    defaultValue: 0,
    prefixCls: 'zw-tabs',
    type: 'line',
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
      value: props.value || props.defaultValue || Tabs.getSelectIndex(props.children) || 0,
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
    this.updateArrow();
    this.setActiveLineStyle();
  }

  componentDidUpdate(prevProps, prevState) {
    const { size: prevSize, children: prevChildren, direction: prevDirection } = prevProps;
    const {
      headerWidth: prevHeaderWidth,
      headerHeight: prevHeaderHeight,
      scrollWidth: prevScrollWidth,
    } = prevState;
    const { size: currentSize, children = [], direction } = this.props || {};
    const { headerWidth, headerHeight, scrollWidth, scrollOffset } = this.state;
    if (prevSize !== currentSize || prevDirection !== direction) {
      this.setActiveLineStyle();
    }
    if (
      prevHeaderWidth !== headerWidth ||
      prevHeaderHeight !== headerHeight ||
      prevChildren !== children
    ) {
      this.updateArrow();
    }
    if (scrollWidth < prevScrollWidth) {
      const result = scrollOffset - (prevScrollWidth - scrollWidth);
      if (result > 0) {
        this.updateScrollOffset(result);
      }
    }
  }

  setActiveLineStyle() {
    const { width = 0, height = 0 } =
      (this.activeTab && this.activeTab.getBoundingClientRect()) || {};
    this.setState({
      lineWidth: width,
      lineHeight: height,
    });
  }

  getScrollOffset(target) {
    const { direction } = this.props;
    const { scrollOffset, headerWidth, headerHeight } = this.state;
    const { offsetLeft, offsetTop } = target;
    const { width, height } = target.getBoundingClientRect();
    if (direction === 'horizontal') {
      const diff =
        scrollOffset + headerWidth < offsetLeft + width
          ? offsetLeft + width - headerWidth
          : scrollOffset;
      return scrollOffset > offsetLeft ? offsetLeft : diff;
    }
    const diff =
      scrollOffset + headerHeight < offsetTop + height
        ? offsetTop + height - headerHeight
        : scrollOffset;
    return scrollOffset > offsetTop ? offsetTop : diff;
  }

  getHeaderStyle() {
    const { width: headerWidth = 0, height: headerHeight = 0 } =
      (this.tabHeaderWrap &&
        this.tabHeaderWrap.current &&
        this.tabHeaderWrap.current.getBoundingClientRect()) ||
      {};
    const { width: scrollWidth = 0, height: scrollHeight = 0 } =
      (this.tabHeaderNav &&
        this.tabHeaderNav.current &&
        this.tabHeaderNav.current.getBoundingClientRect()) ||
      {};
    return {
      headerWidth,
      headerHeight,
      scrollWidth,
      scrollHeight,
    };
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
      typeof onChange === 'function' && onChange(index);
    }
  };

  handleTabClose = (e, index, disabled) => {
    e.stopPropagation();
    const { onTabClose } = this.props;
    if (!disabled) {
      typeof onTabClose === 'function' && onTabClose(index);
    }
  };

  scrollRightOrBottom = (e) => {
    const { direction, onNextClick } = this.props;
    const { headerWidth, headerHeight, scrollWidth, scrollHeight, scrollOffset } = this.state;
    const scrollDimension = direction === 'horizontal' ? scrollWidth : scrollHeight;
    const headerDimension = direction === 'horizontal' ? headerWidth : headerHeight;
    const offset = scrollDimension - scrollOffset - headerDimension;
    this.setState({
      scrollOffset: scrollOffset + (offset > headerDimension ? headerDimension : offset),
    });
    onNextClick && onNextClick(e);
  };

  scrollLeftOrTop = (e) => {
    const { direction, onPrevClick } = this.props;
    const { headerWidth, headerHeight, scrollOffset } = this.state;
    const headerDimension = direction === 'horizontal' ? headerWidth : headerHeight;
    this.setState({
      scrollOffset:
        scrollOffset - (scrollOffset > headerDimension ? headerDimension : scrollOffset),
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

  updateScrollOffset(scrollOffset) {
    this.setState({ scrollOffset });
  }

  updateArrow() {
    const { direction } = this.props;
    const { headerWidth, headerHeight, scrollWidth, scrollHeight } = this.getHeaderStyle();
    const isArrowShown =
      (direction === 'horizontal' && scrollWidth > headerWidth) ||
      (direction === 'vertical' && scrollHeight > headerHeight);
    this.setState(
      {
        isArrowShown,
      },
      () => {
        this.setState(this.getHeaderStyle());
        this.updateTabBar(this.activeTab);
      },
    );
  }

  updateTabBar(target) {
    const { scrollOffset, isArrowShown } = this.state;
    const offset = isArrowShown ? this.getScrollOffset(target) : scrollOffset;
    this.updateScrollOffset(offset);
  }

  renderHeaderLine() {
    const { direction, prefixCls } = this.props;
    const { lineWidth, lineHeight } = this.state;
    const { offsetLeft = 0, offsetTop = 0 } = this.activeTab || {};
    const headerLineStyle =
      direction === 'horizontal'
        ? { width: lineWidth, height: 0, transform: `translate3d(${offsetLeft}px,0,0)` }
        : { width: 0, height: lineHeight, transform: `translate3d(0,${offsetTop}px,0)` };
    return <div className={`${prefixCls}__header__line`} style={headerLineStyle} />;
  }

  render() {
    const { className, children, style, prefixCls, type, direction, size, animated } = this.props;
    const {
      value,
      isArrowShown,
      scrollOffset,
      headerWidth,
      headerHeight,
      scrollWidth,
      scrollHeight,
    } = this.state;

    const headerDimension = direction === 'horizontal' ? headerWidth : headerHeight;
    const scrollDimension = direction === 'horizontal' ? scrollWidth : scrollHeight;
    const arrowL = direction === 'horizontal' ? 'left' : 'top';
    const arrowR = direction === 'horizontal' ? 'right' : 'bottom';
    const isArrowLDisabled = scrollOffset === 0;
    const isArrowRDisabled =
      Math.floor(Math.abs(scrollOffset + headerDimension - scrollDimension)) === 0;
    const animateStyle = direction === 'horizontal' ? { marginLeft: `-${value * 100}%` } : {};
    const headerNavStyle =
      direction === 'horizontal'
        ? { transform: `translate3d(${-scrollOffset}px,0,0)` }
        : { transform: `translate3d(0,${-scrollOffset}px,0)` };
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
          onClick={(e) => {
            this.handleTabClick(e, $index, item.props.disabled);
          }}
        >
          {item.props.title}
          {direction === 'horizontal' && item.props.closable && (
            <Icon
              type="wrong"
              onClick={(e) => {
                this.handleTabClose(e, $index, item.props.disabled);
              }}
            />
          )}
        </div>
      );
    });

    const content = React.Children.map(children, (item, $index) => {
      return (
        <TabPanel {...(item as ReactElement<any>).props} selected={value === $index}>
          {(item as ReactElement<any>).props.children}
        </TabPanel>
      );
    });

    return (
      <div className={cls} style={style}>
        <div className={headerCls}>
          <div className={`${prefixCls}__header__scroll`} ref={this.tabHeaderWrap}>
            <div
              className={`${prefixCls}__header__nav`}
              ref={this.tabHeaderNav}
              style={isArrowShown ? headerNavStyle : {}}
            >
              {items}
              {type === 'line' && this.renderHeaderLine()}
            </div>
          </div>
          {isArrowShown && (
            <>
              <span
                className={arrowLCls}
                onClick={(e) => !isArrowLDisabled && this.scrollLeftOrTop(e)}
              >
                <Icon type={`arrow-${arrowL}`} />
              </span>
              <span
                className={arrowRCls}
                onClick={(e) => !isArrowRDisabled && this.scrollRightOrBottom(e)}
              >
                <Icon type={`arrow-${arrowR}`} />
              </span>
            </>
          )}
        </div>
        <div className={bodyCls} style={animateStyle}>
          {content}
        </div>
      </div>
    );
  }
}

export default Tabs;
