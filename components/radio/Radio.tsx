import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PropsType from './PropsType';

class Radio extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'za-radio',
    defaultChecked: false,
    disabled: false,
    onChange: () => {},
  };
  static propTypes = {
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
    this.setState({
      checked: true,
    });
    this.props.onChange(e);
  }

  render() {
    const { props } = this;
    const {
      prefixCls, value, disabled, className, children,
    } = props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      'is-checked': this.state.checked,
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
            checked={this.state.checked}
            disabled={disabled}
            onChange={e => this.onClick(e)}
          />
          <span className="za-radio__inner" />
          {children}
        </span>
      </label>
    );
  }
}

export default Radio;
