import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Dropdown extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-dropdown',
    visible: false,
    isRadius: false,
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  render() {
    const { props } = this;
    const {
      className, isRadius, children, style, prefixCls,
    } = props;
    const { visible } = this.state;

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-hidden`]: !visible,
      radius: 'radius' in props || isRadius,
      [className!]: !!className,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

export default Dropdown;
