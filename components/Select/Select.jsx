
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import isNodeInTree from '../utils/isNodeInTree';
import Option from './Option';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Menu from '../Menu';
import Icon from '../Icon';

class Select extends Component {

  constructor(props) {
    super(props);
    this.unmounted = false;
    this.state = {
      value      : props.value || props.defaultValue || this.getCheckedValue(props.children),
      dropdown   : false,
      searchValue: '',
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
    const { placeholder, dataSource, searchPlaceholder, isRadius, isDisabled, isSearch, size, onChange, onSearchChange, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;
    const search = 'search' in props || isSearch;

    let valueText = placeholder,
        hasValue = false;

    let children = React.Children.map(props.children, (option, index) => {
      if (this.state.value == option.props.value) {
        valueText = option.props.children;
        hasValue = true;
      }

      // if (search && option.props.children.toString().indexOf(this.state.searchValue) < 0) {
      //   return null;
      // }
      if (search && this.state.searchValue.length == 0) {
        return null;
      }

      return (
        <Option
          {...option.props}
          onChange={(e) => this.onOptionChange(e, option.props, index)}
          checked={this.state.value === option.props.value} />
      );
    });

    const cls = classnames({
      'ui-select'     : true,
      'ui-select-open': this.state.dropdown,
      'disabled'      : disabled,
      'radius'        : radius,
      [`size-${size}`]: !!size,
    });

    const textCls = classnames({
      'ui-select-text'            : true,
      'ui-select-text-placeholder': !hasValue || (hasValue && this.state.dropdown),
    });

    const menus = (children.length > 0)
                ? <Menu size={size}>{children}</Menu>
                : <span className="ui-select-notfound">没有找到数据</span>;

    const inputPlaceholder = this.state.dropdown
                           ? (hasValue ? valueText : searchPlaceholder)
                           : valueText;

    const searchInput = search
                      ? (
                          <div>
                            { this.state.searchValue == '' ? <div className={textCls}>{this.state.searchValue || inputPlaceholder}</div> : null}
                            <div className={textCls}>
                              <input ref="searchInput" value={this.state.searchValue} onChange={(e) => {
                                let searchValue = e.target.value;
                                this.setState({searchValue}, () => onSearchChange(searchValue));
                              }} />
                            </div>
                          </div>
                        )
                      : <span className={textCls}>{valueText}</span>;

    return (
      <span className={cls} {...others}>
        <span className="ui-select-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" onClick={(e) => !disabled && this.onSelectClick(e)}>
          {searchInput}
          <Icon type="arrow-bottom" className="ui-select-arrow" />
        </span>
        <Dropdown visible={this.state.dropdown} isRadius={radius}>
          {menus}
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
    !this.state.dropdown && this.setDropdown(!this.state.dropdown);
  }

  onOptionChange(e, props, index) {
    if ('disabled' in props || props.isDisabled) {
      return;
    }

    this.setState({
      value      : props.value,
      searchValue: '',
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
      dropdown   : isOpen,
      searchValue: ''
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
  isRadius      : PropTypes.bool,
  isDisabled    : PropTypes.bool,
  isSearch      : PropTypes.bool,
  onSearchChange: PropTypes.func,
  onChange      : PropTypes.func,
};

Select.defaultProps = {
  isRadius      : false,
  isDisabled    : false,
  isSearch      : false,
  onSearchChange: () => {},
  onChange      : () => {},
};

export default Select;