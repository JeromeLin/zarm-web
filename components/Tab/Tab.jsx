import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || props.defaultSelected,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('selected' in nextProps) {
      this.setState({
        selected: !!nextProps.selected,
      });
    }
  }

  render() {
    const { props } = this;
    const { className, children, style } = props;

    const cls = classnames({
      'ui-tab-body-item': true,
      'ui-tab-body-item-active': this.state.selected,
      [className]: !!className,
    });

    return (
      <div className={cls} style={style}>
        {children}
      </div>
    );
  }
}

Tab.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

Tab.defaultProps = {
  defaultChecked: false,
  isDisabled: false,
};

export default Tab;
