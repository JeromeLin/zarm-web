import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Radio extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'za-radio',
    defaultChecked: false,
    disabled: false,
    onChange: () => {},
  };

  static Group;

  static Button;

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

  onClick(e) {
    const { onChange } = this.props;
    this.setState({
      checked: true,
    });
    onChange(e);
  }

  render() {
    const { checked } = this.state;
    const {
      prefixCls, value, disabled, className, children,
    } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      'is-checked': checked,
      'is-disabled': disabled,
      [className!]: !!className,
    });

    return (
      <label className={`${prefixCls}__wrapper`}>
        <span className={cls}>
          <input
            className="za-radio__input"
            type="radio"
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={(e) => this.onClick(e)}
          />
          <span className="za-radio__inner" />
          {children}
        </span>
      </label>
    );
  }
}

export default Radio;
