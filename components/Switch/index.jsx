
import React, { Component, PropTypes, Children } from 'react';
import classnames from 'classnames';

class Switch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  // componentDidMount() {
  //   const props = this.props;
  //   let checked = false;
  //   if ('checked' in props) {
  //     checked = !!props.checked;
  //   } else {
  //     checked = !!props.defaultChecked;
  //   }
  //   this.setState({
  //     checked: checked,
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  render() {
    const { size, isCheckedText, unCheckedText, ...others } = this.props;
    const { checked } = this.state;

    const cls = classnames({
      'ui-switch'        : true,
      ['size-' + size]   : size,
      'ui-switch-checked': checked,
    });

    return (
      <span className={cls} onClick={() => this._onClick()} {...others}>
        <span className="ui-switch-inner">{ checked ? isCheckedText : unCheckedText }</span>
      </span>
    );
  }

  _onClick() {
    const checked = !this.state.checked;
    this.setState({
      checked: checked
    });
    this.props.onChange(checked);
  }
}

Switch.propTypes = {
  size         : PropTypes.oneOf(['sm']),
  checked      : PropTypes.bool,
  defaultValue : PropTypes.bool,
  isCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  unCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onChange     : PropTypes.func,
};

Switch.defaultProps = {
  size         : null,
  defaultValue : false,
  isCheckedText: '',
  unCheckedText: '',
  onChange     : function () {},
};

export default Switch;