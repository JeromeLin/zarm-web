import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Tab from './Tab';
import { GroupProps } from './PropsType';

class TabGroup extends Component<GroupProps, any> {
  static defaultProps = {
    prefixCls: 'ui-tab',
    theme: 'default',
    isRadius: false,
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value:
        props.value ||
        props.defaultValue ||
        this.getSelectIndex(props.children) ||
        0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getSelectIndex(nextProps.children)) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  // eslint-disable-next-line
  getSelectIndex(children) {
    let selectIndex;
    React.Children.forEach(children, (item, $index) => {
      if ((item as ReactElement<any>).props && (item as ReactElement<any>).props.selected) {
        selectIndex = $index;
      }
    });
    return selectIndex;
  }

  getTitleItemCls(idx) {
    const { prefixCls } = this.props;
    return idx === this.state.value
      ? `${prefixCls}-header-item active`
      : `${prefixCls}-header-item`;
  }

  getContentItemCls(idx) {
    const { prefixCls } = this.props;
    return idx === this.state.value
      ? `${prefixCls}-body-item active`
      : `${prefixCls}-body-item`;
  }

  render() {
    const { props } = this;
    const {
      isRadius, theme, className, children, onChange, style, prefixCls,
    } = props;

    const cls = classnames({
      [prefixCls!]: true,
      radius: 'radius' in props || isRadius,
      [`theme-${theme}`]: !!theme,
      [className!]: !!className,
    });

    // eslint-disable-next-line
    const items = React.Children.map(children, (item, $index) => {
      return (
        <li
          key={$index}
          className={this.getTitleItemCls($index)}
          onClick={() => { this.setState({ value: $index }, () => onChange($index)); }}
        >
          {(item as ReactElement<any>).props.title}
        </li>
      );
    });

    // eslint-disable-next-line
    const content = React.Children.map(children, (item, $index) => {
      return (
        <Tab {...(item as ReactElement<any>).props} selected={!!(this.state.value === $index)}>
          {(item as ReactElement<any>).props.children}
        </Tab>
      );
    });

    return (
      <div className={cls} style={style}>
        <ul className={`${prefixCls}-header`}>{items}</ul>
        <div className={`${prefixCls}-body`}>{content}</div>
      </div>
    );
  }
}

export default TabGroup;
