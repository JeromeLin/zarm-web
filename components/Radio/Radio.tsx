import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

class Radio extends Component<PropsType, any> {

  static defaultProps = {
    defaultChecked: false,
    isDisabled: false,
    onChange: () => {},
  };

  static Group;

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
    this.setState({
      checked: true,
    });
    this.props.onChange(e);
  }

  render() {
    const { props } = this;
    const {
      value, isDisabled, className, children,
    } = props;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      'ui-radio': true,
      checked: this.state.checked,
      disabled,
      [className!]: !!className,
    });

    return (
      <label>
        <span className={cls}>
          <input
            className="ui-radio-input"
            type="radio"
            value={value}
            checked={this.state.checked}
            disabled={disabled}
            onChange={e => this._onClick(e)}
          />
          <span className="ui-radio-inner" />
        </span>
        {children}
      </label>
    );
  }
}

export default Radio;
