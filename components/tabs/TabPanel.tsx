import React, { Component } from 'react';
import classnames from 'classnames';
import { TabPanelProps } from './PropsType';

class Tab extends Component<TabPanelProps, any> {
  static displayName = 'Tab';

  static defaultProps = {
    prefixCls: 'zw-tabs',
  };

  static getDerivedStateFromProps(props) {
    if ('selected' in props) {
      return {
        selected: !!props.selected,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || props.defaultSelected,
    };
  }

  render() {
    const { className, children, style, prefixCls } = this.props;
    const { selected } = this.state;

    const cls = classnames(className, `${prefixCls}__body__item`, {
      [`${prefixCls}__body__item--active`]: selected,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default Tab;
