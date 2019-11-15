import React, { Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tab from './Tab';
import Icon from '../icon';
import { GroupProps } from './PropsType';

class Tabs extends Component<GroupProps, any> {
  static Tab: typeof Tab;

  private tabHeaderWrap;

  private tabHeaderNav;

  private activeTab;

  static propTypes = {
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    type: PropTypes.oneOf(['card', 'line', 'noborder-card']),
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    animated: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    prefixCls: PropTypes.string,
    onChange: PropTypes.func,
    onTabClose: PropTypes.func,
  };

  static defaultProps = {
    value: 0,
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

  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value
        || props.defaultValue
        || Tabs.getSelectIndex(props.children)
        || 0,
      lineWidth: 0,
      lineOffsetLeft: 0,
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
    this.setActiveLineStyle();
  }

  setActiveLineStyle() {
    const { offsetLeft = 0 } = this.activeTab || {};
    const { width = 0 } = this.activeTab && this.activeTab.getBoundingClientRect();
    const { width: headerWidth, height: headerHeight } = this.tabHeaderWrap.current.getBoundingClientRect();
    const { width: scrollWidth, height: scrollHeight } = this.tabHeaderNav.current.getBoundingClientRect();
    const { direction } = this.props;
    const isArrowShown = (direction === 'horizontal' && scrollWidth > headerWidth) || (direction === 'vertical' && scrollHeight > headerHeight);
    this.setState({
      lineWidth: width,
      lineOffsetLeft: offsetLeft,
      headerWidth: direction === 'horizontal' && isArrowShown && headerWidth - 40,
      headerHeight: direction === 'vertical' && isArrowShown && headerHeight - 40,
      scrollWidth,
      scrollHeight,
      isArrowShown,
    });
  }

  getContentItemCls(idx) {
    const { prefixCls } = this.props;
    const { value } = this.state;
    return idx === value
      ? `${prefixCls}-body-item--active`
      : `${prefixCls}-body-item`;
  }

  handleTabClick = (e, index, disabled) => {
    const { onChange } = this.props;
    if (!disabled) {
      this.setState({ value: index }, () => {
        this.setActiveLineStyle();
        onChange(index);
      });
    }
  };

  handleTabClose = (e, index, disabled) => {
    e.preventDefault();
    const { onTabClose } = this.props;

    if (!disabled) {
      onTabClose(index);
    }
  };

  scrollRightOrBottom = () => {
    const { direction } = this.props;
    const { headerWidth, headerHeight, scrollWidth, scrollHeight, scrollOffset } = this.state;
    if (direction === 'horizontal') {
      const offset = scrollWidth - scrollOffset - headerWidth;
      this.setState({
        scrollOffset: scrollOffset + ((offset > headerWidth) ? headerWidth : offset),
      });
    } else {
      const offset = scrollHeight - scrollOffset - headerHeight;
      this.setState({
        scrollOffset: scrollOffset + ((offset > headerHeight) ? headerHeight : offset),
      });
    }
  };

  scrollLeftOrTop = () => {
    const { direction } = this.props;
    const { headerWidth, headerHeight, scrollOffset } = this.state;
    if (direction === 'horizontal') {
      this.setState({
        scrollOffset: scrollOffset - ((scrollOffset > headerWidth) ? headerWidth : scrollOffset),
      });
    } else {
      this.setState({
        scrollOffset: scrollOffset - ((scrollOffset > headerHeight) ? headerHeight : scrollOffset),
      });
    }
  };

  render() {
    const {
      className, children, style, prefixCls, type, direction, size, animated,
    } = this.props;
    const { value, lineWidth, lineOffsetLeft, isArrowShown, scrollOffset } = this.state;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${direction}`]: direction,
      [`${prefixCls}--${type}`]: type,
    });

    const arrowL = direction === 'horizontal' ? 'left' : 'top';
    const arrowR = direction === 'horizontal' ? 'right' : 'bottom';
    const scrollPadding = direction === 'horizontal' ? '0 20px' : '20px 0';
    const animateStyle = direction === 'horizontal' ? { marginLeft: `-${value * 100}%` } : {};
    const headerNavStyle = direction === 'horizontal' ? { transform: `translate3d(${-scrollOffset}px,0,0)` } : { transform: `translate3d(0,${-scrollOffset}px,0)` };

    const items = React.Children.map(children, (item: React.ReactElement<any>, $index) => {
      const tabHeaderCls = classnames({
        [`${prefixCls}-header-item`]: true,
        [`${prefixCls}-header-item--disabled`]: !!item.props.disabled,
        [`${prefixCls}-header-item--active`]: $index === value,
        [`${prefixCls}-header-item--${size}`]: size,
      });
      const bindActiveRef = $index === value ? { ref: (node) => { this.activeTab = node; } } : {};

      return (
        <div
          key={$index.toString()}
          className={tabHeaderCls}
          {...bindActiveRef}
          onClick={(e) => { this.handleTabClick(e, $index, item.props.disabled); }}
        >
          {item.props.title}
          {direction === 'horizontal' && item.props.closable && <Icon className={`${prefixCls}-header-item-icon`} type="wrong" onClick={(e) => { this.handleTabClose(e, $index, item.props.disabled); }} />}
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
        <div className={`${prefixCls}-header`} style={{ padding: isArrowShown ? scrollPadding : 0 }}>
          <div className={`${prefixCls}-scroll`} ref={this.tabHeaderWrap}>
            <div className={`${prefixCls}-nav`} ref={this.tabHeaderNav} style={headerNavStyle}>
              <div>{items}</div>
              {
                type === 'line' && (
                  <div
                    className={classnames(`${prefixCls}-line`)}
                    style={{
                      width: lineWidth,
                      transform: `translate3d(${lineOffsetLeft}px,0,0)`,
                    }}
                  />
                )
              }
            </div>
          </div>
          {
            isArrowShown && (
              <>
                <Icon type={`arrow-${arrowL}`} className={`${prefixCls}-arrow ${prefixCls}-arrow--${arrowL}`} onClick={() => this.scrollLeftOrTop()} />
                <Icon type={`arrow-${arrowR}`} className={`${prefixCls}-arrow ${prefixCls}-arrow--${arrowR}`} onClick={() => this.scrollRightOrBottom()} />
              </>
            )
          }
        </div>
        <div className={`${prefixCls}-body ${prefixCls}-body--${animated ? 'animate' : 'no-animate'}`} style={animateStyle}>{content}</div>
      </div>
    );
  }
}

export default Tabs;
