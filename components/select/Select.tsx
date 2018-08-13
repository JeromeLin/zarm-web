import React, { Component, ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import Events from '../utils/events';
import Option from './Option';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Icon from '../icon';
import PropsType from './PropsType';

class Select extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-select',
    isRadius: false,
    isDisabled: false,
    isSearch: false,
    onSearchChange: () => { },
    onChange: () => { },
  };

  static Option;
  static Multiple;

  constructor(props) {
    super(props);
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
    this.bindOuterHandlers();
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || this.getCheckedValue(nextProps.children),
      });
    }
  }

  componentWillUnmount() {
    this.unbindOuterHandlers();
  }

  getOptionList(children: Array<ReactNode>): Array<ReactNode> {
    return children.filter((child) => child instanceof Option);
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

  onOptionChange(_: React.MouseEvent, props, index) {
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
    if (this.state.dropdown === true && e.keyCode === 27) {
      this.setDropdown(false);
    }
  }

  bindOuterHandlers() {
    Events.on(document, 'keyup', e => this.handleKeyup(e));
  }

  unbindOuterHandlers() {
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
      zIndex,
      getPopupContainer,
    } = props;

    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;
    const search = 'search' in props || isSearch;

    let valueText = placeholder;
    let hasValue = false;

    const children = React.Children.map(props.children, (option, index) => {
      if (option && typeof option === 'object' && option.type === Option) {
        // tslint:disable-next-line:triple-equals
        if (this.state.value == option.props.value) {
          valueText = option.props.children;
          hasValue = true;
        }

        if (
          search &&
          option.props.children.toString().indexOf(this.state.searchValue) < 0
        ) {
          return null;
        }
        return (
          <Option
            {...option.props}
            onChange={e => this.onOptionChange(e, option.props, index)}
            checked={this.state.value === option.props.value}
          />
        );
      }
      return null;
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

    const menuStyle = {
      maxHeight: 250,
      overflow: 'auto',
    };
    const menus =
      children.length > 0 ? (
        <Menu size={size} style={menuStyle}>{children}</Menu>
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
      <Dropdown
        disabled={disabled}
        visible={this.state.dropdown}
        isRadius={radius}
        overlay={menus}
        zIndex={zIndex}
        getPopupContainer={getPopupContainer}
        onVisibleChange={(visible) => this.setState({ dropdown: visible })}
      >
        <span className={cls} style={style}>
          <span
            className={`${prefixCls}-selection`}
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {textRender}
            {inputRender}
            <Icon type="arrow-bottom" className={`${prefixCls}-arrow`} />
          </span>
        </span>
      </Dropdown>

    );
  }
}

export default Select;
