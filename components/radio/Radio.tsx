import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RadioProps from './PropsType';

class Radio extends Component<RadioProps, any> {
  static defaultProps = {
    prefixCls: 'zw-radio',
    defaultChecked: false,
    disabled: false,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    checked: PropTypes.bool,
  };

  static Group;

  static Button;

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if ('checked' in nextProps) {
  //     this.setState({
  //       checked: !!nextProps.checked,
  //     });
  //   }
  // }
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
    this.setState({
      checked: true,
    });
    onChange && onChange(e);
  }

  render() {
    const { prefixCls, value, disabled, className, children, style, id, shape } = this.props;
    const { checked } = this.state;


    const cls = classnames(className, {
      [`${prefixCls}`]: true,
      [`${prefixCls}--checked`]: checked,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--${shape}`]: shape,
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
          onChange={e => !disabled && this.onClick(e)}
        />
        <span className={innerCls} />
        {children}
      </label>
    );
  }
}

export default Radio;
