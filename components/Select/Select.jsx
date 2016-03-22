
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import isNodeInTree from '../utils/isNodeInTree';
import Option from './Option';
import Dropdown from '../Dropdown';
import Menu from '../Menu';
import Icon from '../Icon';
import Mask from '../Mask';

class Select extends Component {

  constructor(props) {
    super(props);
    this.unmounted = false;
    this.state = {
      value   : props.value || props.defaultValue || this.getCheckedValue(props.children),
      dropdown: false,
    };
  }

  componentDidMount() {
    this.unmounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || this.getCheckedValue(nextProps.children)
      });
    }
  }

  componentWillUnmount() {
    this.unmounted = false;
    this.unbindOuterHandlers();
  }

  render () {
    const props = this.props;
    const { placeholder, isDisabled, size, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;

    let valueText = placeholder,
        hasValue = false;

    let children = React.Children.map(props.children, (option, index) => {
      if (this.state.value == option.props.value) {
        valueText = option.props.children;
        hasValue = true;
      }

      return (
        <Option
          {...option.props}
          onChange={(e) => this.onOptionChange(e, option.props, index)}
          checked={this.state.value === option.props.value} />
      );
    });

    const cls = classnames({
      'ui-select'         : true,
      'ui-select-open'    : this.state.dropdown,
      'ui-select-disabled': disabled,
      [`size-${size}`]    : !!size,
    });

    const textCls = classnames({
      'ui-select-text'            : true,
      'ui-select-text-placeholder': !hasValue,
    });

    return (
      <span className={cls} {...others}>
        <span className="ui-select-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" onClick={(e) => !disabled && this.onSelectClick(e)}>
          <span className={textCls}>{valueText}</span>
          <span className="ui-select-arrow">
            <Icon type="unfold" />
          </span>
        </span>
        <Dropdown visible={this.state.dropdown}>
          <Menu>
            {children}
          </Menu>
        </Dropdown>
      </span>
    );
  }

  getCheckedValue(children) {
    let checkedValue = null;
    React.Children.forEach(children, (option) => {
      if (option.props && option.props.checked) {
        checkedValue = option.props.value;
      }
    });
    return checkedValue;
  }

  onSelectClick(e) {
    e.preventDefault();
    this.setDropdown(!this.state.dropdown);
  }

  onOptionChange(e, props, index) {
    if ('disabled' in props) {
      return;
    }

    this.setState({
      value: props.value,
    });

    const selected = {
      index: index,
      value: props.value,
      text : props.children,
    };
    this.setDropdown(false, this.props.onChange(selected));
  }

  setDropdown(isOpen, callback) {
    if (!this.unmounted) return;

    if (isOpen) {
      this.bindOuterHandlers();
    } else {
      this.unbindOuterHandlers();
    }

    this.setState({
      dropdown: isOpen
    }, () => {
      callback && callback();
    });
  }

  handleKeyup(e) {
    (e.keyCode === 27) && this.setDropdown(false);
  }

  handleOuterClick(e) {
    if (!this.unmounted || isNodeInTree(e.target, ReactDOM.findDOMNode(this))) {
      return;
    }
    this.setDropdown(false);
  }

  bindOuterHandlers() {
    Events.on(document, 'click', (e) => this.handleOuterClick(e));
    Events.on(document, 'keyup', (e) => this.handleKeyup(e));
  }

  unbindOuterHandlers() {
    Events.off(document, 'click', (e) => this.handleOuterClick(e));
    Events.off(document, 'keyup', (e) => this.handleKeyup(e));
  }
}

Select.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled    : PropTypes.bool,
  onChange      : PropTypes.func,
};

Select.defaultProps = {
  defaultChecked: false,
  isDisabled    : false,
  onChange      : function () {},
};

export default Select;