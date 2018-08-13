import React, { Component } from 'react';
import { SiderPropsType } from './PropsType';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../icon';

class Sider extends Component<SiderPropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-layout-sider',
    collapsible: false,
    collapsedWidth: 80,
    width: 236,
    onCollapse: () => {},
  };

  static childContextTypes = {
    siderCollapsed: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: 'collapsed' in props ? props.collapsed : false,
    };
  }

  componentWillReceiveProps(nextProps: SiderPropsType) {
    if ('collapsed' in nextProps) {
      this.setState({
        collapsed: nextProps.collapsed,
      });
    }
  }

  getChildContext() {
    return {
      siderCollapsed: this.state.collapsed,
    };
  }

  setCollapsed = (collapsed: boolean) => {
    if (!('collapsed' in this.props)) {
      this.setState({
        collapsed,
      });
    }
    const { onCollapse } = this.props;
    if (onCollapse) {
      onCollapse(collapsed);
    }
  }

  toggle = () => {
    const collapsed = !this.state.collapsed;
    this.setCollapsed(collapsed);
  }

  render() {
    const {
      prefixCls, className, style, width, collapsible,
      trigger, collapsedWidth, children,
    } = this.props;
    const { collapsed } = this.state;

    const siderWidth = collapsed ? collapsedWidth : width;
    const defaultTrigger = collapsed ? <Icon type="arrow-right" /> : <Icon type="arrow-left" />;
    const triggerDom = (
      trigger !== null &&
      <div className={`${prefixCls}-trigger`} onClick={this.toggle} style={{ width: siderWidth }}>
        {trigger || defaultTrigger}
      </div>
    );
    const siderStyle = {
      ...style,
      flex: `0 0 ${siderWidth}`,
      maxWidth: siderWidth,
      minWidth: siderWidth,
      width: siderWidth,
    };
    const siderCls = classnames(prefixCls, {
      [className!]: !!className,
    });

    return (
      <div className={siderCls} style={siderStyle}>
        <div className={`${prefixCls}-children`}>{children}</div>
        {collapsible && triggerDom}
      </div>
    );
  }
}

export default Sider;
