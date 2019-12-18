import React, { Component } from 'react';
import classnames from 'classnames';
import RadioProps from './PropsType';

interface RadioStates {
  checked: boolean;
}
class Radio extends Component<RadioProps, RadioStates> {
  static displayName = 'Radio';

  static defaultProps = {
    prefixCls: 'zw-radio',
    defaultChecked: false,
    disabled: false,
  };

  static Group;

  static Button;

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if ('checked' in props) {
      return {
        ...state,
        checked: props.checked,
      };
    }
    return null;
  }

  onClick(e) {
    const { onChange } = this.props;

    if (!('checked' in this.props)) {
      this.setState({ checked: e.target.checked });
    }

    typeof onChange === 'function' && onChange(e);
  }

  render() {
    const { prefixCls, value, disabled, className, children, style, id } = this.props;
    const { checked } = this.state;

    const cls = classnames(className, prefixCls, {
      [`${prefixCls}--checked`]: checked,
      [`${prefixCls}--disabled`]: disabled,
    });

    const inputCls = classnames({
      [`${prefixCls}__input`]: true,
    });

    const innerCls = classnames({
      [`${prefixCls}__inner`]: true,
    });

    return (
      <label className={cls} style={style}>
        <input
          className={inputCls}
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          id={id}
          onChange={(e) => !disabled && this.onClick(e)}
        />
        <span className={innerCls} />
        {children && <span>{children}</span>}
      </label>
    );
  }
}

export default Radio;
