import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PropsType from './PropsType';

class Tab extends Component<PropsType, any> {
  static Group;

  static defaultProps = {
    prefixCls: 'ui-tab',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
    const { className, children, style, prefixCls } = this.props;
    const { selected } = this.state;

    const cls = classnames({
      [`${prefixCls}-body-item`]: true,
      [`${prefixCls}-body-item-active`]: selected,
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
