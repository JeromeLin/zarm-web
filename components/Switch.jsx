
import React, { Component, PropTypes, Children } from 'react';
import classnames from 'classnames';

class Switch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  componentDidMount() {
    const props = this.props;
    let checked = false;
    if ('checked' in props) {
      checked = !!props.checked;
    } else {
      checked = !!props.defaultChecked;
    }
    this.setState({
      checked: checked,
    });
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  _onClick() {
    const checked = !this.state.checked;
    this.setState({
      checked: checked
    });
    this.props.onChange(checked);
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
      <div className={cls} onClick={() => this._onClick()} {...others}>
        <span className="ui-switch-inner">{ checked ? isCheckedText : unCheckedText }</span>
      </div>
    );
  }
}

Switch.propTypes = {
  size         : PropTypes.oneOf(['sm']),
  defaultValue : PropTypes.bool,
  isCheckedText: PropTypes.string,
  unCheckedText: PropTypes.string,
  onChange     : PropTypes.func,
};

Switch.defaultProps = {
  defaultValue : false,
  isCheckedText: '',
  unCheckedText: '',
  onChange     : function () {},
};

export default Switch;