import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Tab from './Tab';
import { GroupProps } from './PropsType';

class TabGroup extends Component<GroupProps, any> {
  static defaultProps = {
    prefixCls: 'ui-tab',
    theme: 'default',
    isRadius: true,
    type: 'card',
    onChange: () => {},
  };

  private tabHeader;

  private activeTab;

  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value
        || props.defaultValue
        || this.getSelectIndex(props.children)
        || 0,
      lineWidth: 0,
      lineOffsetLeft: 0,
    };
    this.tabHeader = React.createRef();
  }

  componentDidMount() {
    this.setActiveLineStyle();
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getSelectIndex(nextProps.children)) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  setActiveLineStyle() {
    const { width = 0, left = 0 } = this.activeTab && this.activeTab.getBoundingClientRect() || {};
    const { left: headerOffset = 0 } = this.tabHeader.current && this.tabHeader.current.getBoundingClientRect() || {};

    this.setState({
      lineWidth: width,
      lineOffsetLeft: left - headerOffset,
    });
  }

  getSelectIndex(children) {
    let selectIndex;
    React.Children.forEach(children, (item, $index) => {
      if ((item as ReactElement<any>).props && (item as ReactElement<any>).props.selected) {
        selectIndex = $index;
      }
    });
    return selectIndex;
  }

  getContentItemCls(idx) {
    const { prefixCls } = this.props;
    return idx === this.state.value
      ? `${prefixCls}-body-item active`
      : `${prefixCls}-body-item`;
  }

  handleTabClick = (index, disabled) => {
    const { onChange } = this.props;

    if (!disabled) {
      this.setState({ value: index }, () => {
        this.setActiveLineStyle();
        onChange(index);
      });
    }
  };

  render() {
    const {
      isRadius, theme, className, children, style, prefixCls, type,
    } = this.props;

    const cls = classnames({
      [prefixCls!]: true,
      radius: 'radius' in this.props || isRadius,
      line: type === 'line',
      [`theme-${theme}`]: !!theme,
      [className!]: !!className,
    });

    const items = React.Children.map(children, (item: React.ReactElement<any>, $index) => {
      const tabHeaderCls = classnames({
        [`${prefixCls}-header-item`]: true,
        [`${prefixCls}-header-item-disabled`]: !!item.props.disabled,
        active: $index === this.state.value,
      });
      const bindActiveRef = $index === this.state.value ? { ref: node => this.activeTab = node } : {};

      return (
        <li
          key={$index}
          className={tabHeaderCls}
          {...bindActiveRef}
          onClick={() => { this.handleTabClick($index, item.props.disabled); }}
        >
          {item.props.title}
        </li>
      );
    });

    const content = React.Children.map(children, (item, $index) => {
      return (
        <Tab {...(item as ReactElement<any>).props} selected={this.state.value === $index}>
          {(item as ReactElement<any>).props.children}
        </Tab>
      );
    });

    return (
      <div className={cls} style={style}>
        <ul className={`${prefixCls}-header`} ref={this.tabHeader}>
          {items}
          {
            type === 'line' && (
              <div
                className={classnames(`${prefixCls}-line`)}
                style={{
                  width: this.state.lineWidth,
                  transform: `translate3d(${this.state.lineOffsetLeft}px,0,0)`,
                }}
              />
            )
          }
        </ul>
        <div className={`${prefixCls}-body`}>{content}</div>
      </div>
    );
  }
}

export default TabGroup;
