import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  render() {
    const { props } = this;
    const {
      className, isRadius, children, style,
    } = props;
    const { visible } = this.state;

    const cls = classnames({
      'ui-dropdown': true,
      'ui-dropdown-hidden': !visible,
      radius: 'radius' in props || isRadius,
      [className]: !!className,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

Dropdown.propTypes = {
  visible: PropTypes.bool,
  isRadius: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  visible: false,
  isRadius: false,
  isDisabled: false,
  onChange: () => {},
};

export default Dropdown;
