import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Checkbox extends Component<PropsType, any> {
  static Group;

  static defaultProps = {
    prefixCls: 'ui-checkbox',
    defaultChecked: false,
    isDisabled: false,
    indeterminate: false,
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  _onClick(e) {
    const { checked } = this.state;

    this.setState({
      checked: !checked,
    });
    this.props.onChange(e);
  }

  render() {
    const { props } = this;
    const {
      prefixCls,
      value,
      isDisabled,
      className,
      children,
      style,
      indeterminate,
    } = props;
    const disabled = 'disabled' in props || isDisabled;
    const cls = classnames({
      [prefixCls!]: true,
      checked: this.state.checked,
      disabled,
      indeterminate: this.state.checked && indeterminate,
      [className!]: !!className,
    });

    return (
      <label style={style}>
        <span className={cls}>
          <input
            className={`${prefixCls}-input`}
            type="checkbox"
            value={value}
            checked={this.state.checked}
            disabled={disabled}
            onChange={e => this._onClick(e)}
          />
          <span className={`${prefixCls}-inner`} />
        </span>
        {children}
      </label>
    );
  }
}

export default Checkbox;
