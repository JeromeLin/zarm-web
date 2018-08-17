import React, { Component, ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import Events from '../utils/events';
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
    onSearchChange: () => { },
    onChange: () => { },
  };

  static Option;
  static Multiple;

  static getChildrenObject(children: React.ReactChild) {
    if (Array.isArray(children)) {
      return children.reduce((prev, elem) => {
        const { value } = elem.props;
        prev[String(value)] = elem.props;
        return prev;
      }, {});
    }
  }

  optionMap: {};

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
    this.optionMap = this.constructor.getChildrenObject(props.children));
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
    let checkedValue = React.Children.forEach(children, (option) => {
      if ((option as ReactElement<any>).props && (option as ReactElement<any>).props.checked) {
        return (option as ReactElement<any>).props.value;
      }
    });
    return checkedValue;
  }

  onOptionChange(_: React.MouseEvent, props, index) {
    if ('disabled' in props || props.isDisabled) {
      return;
    }
    let newValue = this.state.value;
    if (this.props.multiple) {
      const lens = newValue.length;
      let include = false;
      for (let i = 0; i < lens; i++) {
        if (newValue[i] === props.value) {
          newValue.splice(i, 1);
          include = true;
          break;
        }
      }
      if (include === false) {
        newValue.push(props.value);
      }
    } else {
      newValue = props.value;
    }
    this.setState({
      value: newValue,
      searchValue: '',
    }, () => {
      const selected = {
        index,
        value: props.value,
        text: props.children,
      };
      this.props.onChange(selected);
      if (!this.props.multiple) {
        this.setDropdown(false, () => this.props.onChange(selected));
      }
    });
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

  isChecked(value) {
    return this.props.multiple ? this.state.value.includes(value) : this.state.value === value;
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
            checked={this.isChecked(option.props.value)}
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
            {
              Array.isArray(this.state.value) ?
                <div className="select-btn-list">
                  {
                    this.state.value.map(valueItem => {
                      return (
                        <div
                          className="select-btn"
                          key={valueItem}
                          onClick={(e) => {
                            e.stopPropagation();
                            const index = this.state.value.indexOf(valueItem);
                            this.state.value.splice(index, 1);
                            this.forceUpdate();
                          }}
                        >
                          {this.optionMap[valueItem].children}
                          <Icon style={{ marginLeft: 5, color: '#333' }} type="wrong" theme="info" />
                        </div>
                      );
                    })
                  }
                </div>
                : textRender
            }
            {inputRender}
            <Icon type="arrow-bottom" className={`${prefixCls}-arrow`} />
          </span>
        </span>
      </Dropdown>

    );
  }
}

export default Select;
