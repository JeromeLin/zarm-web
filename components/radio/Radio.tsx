import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PropsType from './PropsType';

class Radio extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'zw-radio',
    defaultChecked: false,
    disabled: false,
    onChange: () => {},
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
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
    const { prefixCls, value, disabled, className, children } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      'is-checked': checked,
      'is-disabled': disabled,
      [className!]: !!className,
    });

    const inputCls = classnames({
      [`${prefixCls}__input`]: true,
    });

    const innerCls = classnames({
      [`${prefixCls}__inner`]: true,
    });

    return (
      <label className={cls}>
        <input
          className={inputCls}
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={e => this.onClick(e)}
        />
        <span className={innerCls} />
        {children}
      </label>
    );
  }
}

export default Radio;
