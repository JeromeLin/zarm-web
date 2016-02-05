
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Radio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  render () {
    const props = this.props;
    const { value, checked, isDisabled, className, children, ...others } = props;

    const cls = classnames({
      'ui-radio'         : true,
      'ui-radio-checked' : this.state.checked,
      'ui-radio-disabled': ('disabled' in props || isDisabled),
    });

    return (
      <label className="ui-radio">
        <span className={cls}>
          <input type="radio" value={value} className="ui-radio-input" onChange={(e) => this._onClick(e)} {...others} />
          <span className="ui-radio-inner"></span>
        </span>
        {children}
      </label>
    );
  }

  _onClick(e) {
    this.setState({
      checked: true
    });
    this.props.onChange(e);
  }
}

Radio.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled    : PropTypes.bool,
  onChange      : PropTypes.func,
};

Radio.defaultProps = {
  defaultChecked: false,
  isDisabled    : false,
  onChange      : function () {},
};

export default Radio;