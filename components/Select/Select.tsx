import React, { Component, ReactElement } from 'react';
import classnames from 'classnames';
import Events from '../utils/events';
import isNodeInTree from '../utils/isNodeInTree';
import Option from './Option';
import Dropdown from '../Dropdown';
import Menu from '../Menu';
import Icon from '../Icon';
import PropsType from './PropsType';

class Select extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-select',
    isRadius: false,
    isDisabled: false,
    isSearch: false,
    onSearchChange: () => {},
    onChange: () => {},
  };
  static Option;
  static Multiple;

  private unmounted: boolean;
  private select: any;

  constructor(props) {
    super(props);
    this.unmounted = false;
    this.state = {
      value:
        props.value ||
        props.defaultValue ||
        this.getCheckedValue(props.children),
      dropdown: false,
      searchValue: '',
    };
  }

  componentDidMount() {
    this.unmounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || this.getCheckedValue(nextProps.children),
      });
    }
  }

  componentWillUnmount() {
    this.unmounted = false;
    this.unbindOuterHandlers();
  }

  // eslint-disable-next-line
  getCheckedValue(children) {
    let checkedValue = null;
    React.Children.forEach(children, (option) => {
      if ((option as ReactElement<any>).props && (option as ReactElement<any>).props.checked) {
        checkedValue = (option as ReactElement<any>).props.value;
      }
    });
    return checkedValue;
  }

  onSelectClick(e) {
    e.preventDefault();
    if (!this.state.dropdown) {
      this.setDropdown(!this.state.dropdown);
    }
  }

  onOptionChange(_, props, index) {
    if ('disabled' in props || props.isDisabled) {
      return;
    }

    this.setState({
      value: props.value,
      searchValue: '',
    });

    const selected = {
      index,
      value: props.value,
      text: props.children,
    };
    this.setDropdown(false, () => this.props.onChange(selected));
  }

  setDropdown(isOpen, callback?) {
    if (!this.unmounted) {
      return;
    }

    if (isOpen) {
      this.bindOuterHandlers();
    } else {
      this.unbindOuterHandlers();
    }

    this.setState(
      {
        dropdown: isOpen,
        searchValue: '',
      },
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      },
    );
  }

  handleKeyup(e) {
    if (e.keyCode === 27) {
      this.setDropdown(false);
    }
  }

  handleOuterClick(e) {
    if (!this.unmounted || isNodeInTree(e.target, this.select)) {
      return;
    }
    this.setDropdown(false);
  }

  bindOuterHandlers() {
    Events.on(document, 'click', e => this.handleOuterClick(e));
    Events.on(document, 'keyup', e => this.handleKeyup(e));
  }

  unbindOuterHandlers() {
    Events.off(document, 'click', e => this.handleOuterClick(e));
    Events.off(document, 'keyup', e => this.handleKeyup(e));
  }

  render() {
    const { props } = this;
    const {
      prefixCls,
      placeholder,
      searchPlaceholder,
      isRadius,
      isDisabled,
      isSearch,
      size,
      onSearchChange,
      style,
    } = props;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;
    const search = 'search' in props || isSearch;

    let valueText = placeholder;
    let hasValue = false;

    const children = React.Children.map(props.children, (option, index) => {
      // tslint:disable-next-line:triple-equals
      if (this.state.value == (option as ReactElement<any>).props.value) {
        valueText = (option as ReactElement<any>).props.children;
        hasValue = true;
      }

      if (
        search &&
        (option as ReactElement<any>).props.children.toString().indexOf(this.state.searchValue) < 0
      ) {
        return null;
      }

      return (
        <Option
          {...(option as ReactElement<any>).props}
          onChange={e => this.onOptionChange(e, (option as ReactElement<any>).props, index)}
          checked={this.state.value === (option as ReactElement<any>).props.value}
        />
      );
    });

    const cls = classnames({
      [prefixCls!]: true,
      [`${prefixCls}-open`]: this.state.dropdown,
      disabled,
      radius,
      [`size-${size}`]: !!size,
    });

    const textCls = classnames({
      [`${prefixCls}-text`]: true,
      [`${prefixCls}-text-placeholder`]:
        !hasValue || (search && hasValue && this.state.dropdown),
    });

    const menus =
      children.length > 0 ? (
        <Menu size={size}>{children}</Menu>
      ) : (
        <span className={`${prefixCls}-notfound`}>没有找到数据</span>
      );

    const inputPlaceholder = this.state.dropdown // eslint-disable-line
      ? hasValue
        ? valueText
        : searchPlaceholder
      : valueText;

    const textRender = !(search && this.state.searchValue.length > 0) && (
      <span className={textCls}>{inputPlaceholder}</span>
    );

    const inputRender = search &&
      !disabled && (
        <span className={textCls}>
          <input
            value={this.state.searchValue}
            // tslint:disable-next-line:jsx-no-multiline-js
            onChange={(e) => {
              const searchValue = e.target.value;
              this.setState({ searchValue }, () => onSearchChange!(searchValue));
            }}
          />
        </span>
    );

    return (
      <span className={cls} style={style} ref={(ele) => { this.select = ele; }}>
        <span
          className={`${prefixCls}-selection`}
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={e => !disabled && this.onSelectClick(e)}
        >
          {textRender}
          {inputRender}
          <Icon type="arrow-bottom" className={`${prefixCls}-arrow`} />
        </span>
        <Dropdown visible={this.state.dropdown} isRadius={radius}>
          {menus}
        </Dropdown>
      </span>
    );
  }
}

export default Select;
