import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Tab extends Component<PropsType, any> {
  static Group;

  static defaultProps = {
    prefixCls: 'ui-tab',
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || props.defaultSelected,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('selected' in nextProps) {
      this.setState({
        selected: !!nextProps.selected,
      });
    }
  }

  render() {
    const { props } = this;
    const { className, children, style, prefixCls } = props;

    const cls = classnames({
      [`${prefixCls}-body-item`]: true,
      [`${prefixCls}-body-item-active`]: this.state.selected,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default Tab;
