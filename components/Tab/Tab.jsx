
import React, { Component, PropTypes } from 'react';
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
        selected: !!nextProps.selected
      });
    }
  }

  render () {
    const props = this.props;
    const { children, selected, ...others } = props;

    const cls = classnames({
      'ui-tab-body-item'       : true,
      'ui-tab-body-item-active': this.state.selected
    })

    return (
      <div {...others} className={cls}>
        {children}
      </div>
    );
  }
}

Tab.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled    : PropTypes.bool,
};

Tab.defaultProps = {
  defaultChecked: false,
  isDisabled    : false,
};

export default Tab;